import { NextResponse } from "next/server";
import { getDocument } from "pdfjs-dist";

export async function POST(req) {
  const form = await req.formData();
  const file = form.get("file");
  const arrayBuffer = await file.arrayBuffer();

  const pdf = await getDocument({ data: arrayBuffer }).promise;

  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    content.items.forEach(item => {
      fullText += item.str + "\n";
    });
  }

  return NextResponse.json({ text: fullText });
}
