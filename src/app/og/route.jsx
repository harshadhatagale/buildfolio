import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get("title") || "BuildFolio";
  const subtitle =searchParams.get("subtitle") || "Create stunning developer portfolios";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #020617 0%, #0f172a 50%, #020617 100%)",
          color: "white",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Logo / Brand */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 60,
            fontSize: 28,
            fontWeight: 700,
            opacity: 0.9,
          }}
        >
          BuildFolio
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 36,
            maxWidth: 900,
            opacity: 0.8,
          }}
        >
          {subtitle}
        </p>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 60,
            fontSize: 24,
            opacity: 0.6,
          }}
        >
          buildfolio.space
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
