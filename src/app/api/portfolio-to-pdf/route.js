import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function POST(req) {
  try {
    const { url } = await req.json();
    const html = await fetch(url).then((res) => res.text());
    const $ = cheerio.load(html);

    // Extract data
    const name =
      $("h1").first().text().trim() || "Unnamed Portfolio";

    const about =
      $("section:contains('About'), p:contains('About')")
        .first()
        .text()
        .trim() || "No about section found.";

    const projects = [];
    $("section:contains('Projects') a").each((i, el) => {
      projects.push($(el).text().trim());
    });

    // Create PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    let y = 760;

    const write = (text, size = 14, bold = false) => {
      page.drawText(text, {
        x: 40,
        y,
        size,
        font: bold ? fontBold : font,
        color: rgb(0, 0, 0),
      });
      y -= size + 12;
    };

    // Header
    write(name, 24, true);
    write(url, 12);

    write(" ");
    write("About", 18, true);
    write(about.substring(0, 300) + "...", 12);

    write(" ");
    write("Projects", 18, true);
    projects.slice(0, 10).forEach((p) => write("• " + p, 12));

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="portfolio.pdf"',
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to generate PDF" });
  }
}
