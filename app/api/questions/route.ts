import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { normalizeQuestions } from "../../../lib/utils";
import { balancedByTens } from "../../../lib/balanced-sampling";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '586');
    const balanced = searchParams.get('balanced') === 'true';
    const groupCount = parseInt(searchParams.get('groups') || '10');
    const excludeParam = searchParams.get('exclude');
    const excludeIds = excludeParam ? excludeParam.split(',').map(id => parseInt(id)).filter(id => !isNaN(id)) : [];

    const filePath = path.join(process.cwd(), "data.json");
    const data = await readFile(filePath, "utf-8");

    // Handle the case where `data.json` may be a JSON array, a single object,
    // newline-delimited JSON, or a pretty-printed array (objects on multiple lines).
    let questions: any[] = [];

    // First try to parse the whole file as valid JSON (array or object)
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        questions = parsed;
      } else if (typeof parsed === 'object' && parsed !== null) {
        questions = [parsed];
      }
    } catch (e) {
      // If that fails, extract top-level JSON objects by scanning braces.
      const extractObjects = (text: string): string[] => {
        const objs: string[] = [];
        let depth = 0;
        let start = -1;
        let inString = false;
        let escape = false;
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (ch === '"' && !escape) {
            inString = !inString;
          }
          if (ch === '\\' && !escape) {
            escape = true;
          } else {
            escape = false;
          }
          if (inString) continue;
          if (ch === '{') {
            if (depth === 0) start = i;
            depth++;
          } else if (ch === '}') {
            depth--;
            if (depth === 0 && start !== -1) {
              objs.push(text.slice(start, i + 1));
              start = -1;
            }
          }
        }
        return objs;
      };

      const objects = extractObjects(data);
      questions = objects
        .map(s => {
          try {
            return JSON.parse(s);
          } catch (err) {
            console.error('Failed to parse object:', s, err);
            return null;
          }
        })
        .filter(q => q !== null);
    }

    // Deduplicate by exact normalized question text, then normalize output.
    const seen = new Map<string, number>(); // Map to track text -> first ID
    const dedupedRaw = [] as any[];

    for (const q of questions) {
      const normalizedText = (q?.question || q?.soal || "").toString().trim().toLowerCase().replace(/\s+/g, " ");

      if (!normalizedText || seen.has(normalizedText)) {
        continue;
      }

      seen.set(normalizedText, q?.id || 0);
      dedupedRaw.push(q);
    }

    const normalized = normalizeQuestions(dedupedRaw);

    // Filter out excluded question IDs
    const filteredQuestions = excludeIds.length > 0
      ? normalized.filter(q => !excludeIds.includes(typeof q.id === 'number' ? q.id : parseInt(String(q.id))))
      : normalized;

    // Apply balanced sampling if requested
    let finalQuestions = filteredQuestions;

    const session = parseInt(searchParams.get('session') || '0');
    const totalSessions = parseInt(searchParams.get('total_sessions') || '0');

    if (session > 0 && totalSessions > 0) {
      // Session-based slicing (deterministic)
      const totalQuestions = filteredQuestions.length;
      let start = 0;
      let end = 0;

      if (totalSessions === 6) {
        // Special case for Practice Mode: 100 questions per session for 1-5, remainder for 6
        const itemsPerSession = 100;
        start = (session - 1) * itemsPerSession;
        if (session === 6) {
          end = totalQuestions; // Last session takes the rest
        } else {
          end = start + itemsPerSession;
        }
        finalQuestions = filteredQuestions.slice(start, end);
      } else if (totalSessions === 4) {
        // Special case for Tryout Mode: 4 sessions, pool of ~146, select random 100
        const itemsPerPool = Math.ceil(totalQuestions / 4);
        start = (session - 1) * itemsPerPool;
        end = start + itemsPerPool;

        // Get the pool for this session
        const pool = filteredQuestions.slice(start, end);

        // Shuffle the pool
        for (let i = pool.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [pool[i], pool[j]] = [pool[j], pool[i]];
        }

        // Take top 100
        finalQuestions = pool.slice(0, 100);
      } else {
        // Default balanced slicing
        const itemsPerSession = Math.ceil(totalQuestions / totalSessions);
        start = (session - 1) * itemsPerSession;
        end = start + itemsPerSession;
        finalQuestions = filteredQuestions.slice(start, end);
      }
    } else if (balanced && filteredQuestions.length > limit) {
      finalQuestions = balancedByTens(filteredQuestions, {
        totalQuestions: limit,
        shuffleWithinGroups: true,
        shuffleGroups: true
      });
    } else {
      // Regular slicing if balanced sampling is not requested
      finalQuestions = filteredQuestions.slice(0, limit);
    }

    const response = {
      questions: finalQuestions,
      total: finalQuestions.length,
      balanced: balanced,
      totalAvailable: normalized.length,
      metadata: {
        balanced: balanced,
        groupCount: balanced ? groupCount : null,
        limit: limit,
        requested: limit,
        actual: finalQuestions.length
      }
    };

    return NextResponse.json(response);
  } catch (e) {
    console.error('API Error:', e);
    return NextResponse.json({ error: "Failed to load questions" }, { status: 500 });
  }
}
