// lib/fontLoader.ts

const loadedFonts = new Set()

export async function loadFont(
  fontFamily,
  options={}
) {
  const { weights = [100, 200, 300, 400 , 500, 600, 700, 800, 900], timeout = 1500 } = options

  // ✅ already loaded → instant resolve
  if (loadedFonts.has(fontFamily)) {
    return
  }

  const id = `font-${fontFamily.replace(/\s/g, "-")}`

  if (!document.getElementById(id)) {
    const link = document.createElement("link")
    link.id = id
    link.rel = "stylesheet"
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(
      / /g,
      "+"
    )}:wght@${weights.join(";")}&display=swap`
    document.head.appendChild(link)
  }

  // 2️⃣ Wait for font readiness OR timeout (whichever first)
  await Promise.race([
    document.fonts.ready,
    new Promise((resolve) =>
      setTimeout(resolve, timeout)
    ),
  ])

  loadedFonts.add(fontFamily)
}
