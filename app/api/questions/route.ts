import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data.json");
    const data = await readFile(filePath, "utf-8");
    const parsed = JSON.parse(data);
    // Deduplicate by normalized 'soal' text
    const seen = new Set<string>();
    const deduped = [] as any[];
    for (const q of parsed) {
      const key = (q?.soal || "").toString().trim().toLowerCase().replace(/\s+/g, " ");
      if (!key) continue;
      if (seen.has(key)) continue;
      seen.add(key);
      deduped.push(q);
    }
    return NextResponse.json(deduped);
  } catch (e) {
    return NextResponse.json({ error: "Failed to load questions" }, { status: 500 });
  }
}
