import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { normalizeQuestions } from "../../../lib/utils";

export async function GET() {
  try {
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
    
    return NextResponse.json(normalized);
  } catch (e) {
    return NextResponse.json({ error: "Failed to load questions" }, { status: 500 });
  }
}
