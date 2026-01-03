// scripts/generate-fonts.ts
import fs from "fs"

async function generateFonts() {
  const res = await fetch("https://fonts.google.com/metadata/fonts")
  let text = await res.text()

  text = text.replace(")]}'", "")
  const data = JSON.parse(text)

  // 🔥 CLEAN & SLIM
  const fonts = data.familyMetadataList.map((f) => ({
    name: f.family,
    category: f.category,
    weights: Object.keys(f.fonts || {}).map(w => Number(w.replace("i",""))),
    subsets: (f.subsets || []).filter(s => s !== "menu"),
  }))

  fs.writeFileSync(
    "public/fonts.json",
    JSON.stringify(fonts, null, 2)
  )

  console.log("✅ Clean fonts.json generated")
}

generateFonts()
