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
    
    // Apply balanced sampling if requested
    let finalQuestions = normalized;
    if (balanced && normalized.length > limit) {
      finalQuestions = balancedByTens(normalized, {
        totalQuestions: limit,
        shuffleWithinGroups: true,
        shuffleGroups: true
      });
    } else {
      // Regular slicing if balanced sampling is not requested
      finalQuestions = normalized.slice(0, limit);
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
