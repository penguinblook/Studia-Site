import { ImageResponse } from "next/og";

export const alt = "Studia — Lock in. Prove it. Climb.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadArchivoBlack(): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(
      "https://fonts.gstatic.com/s/archivoblack/v21/HTxqL289NzCGg4MzN6KJ7eW6OYuP_x7yx3A.ttf"
    );
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OgImage() {
  const archivoBlack = await loadArchivoBlack();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#15181f",
          padding: "72px 80px",
          fontFamily: archivoBlack ? "Archivo Black" : "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 28,
              height: 28,
              backgroundColor: "#3a5d9c",
              display: "flex",
            }}
          />
          <div
            style={{
              color: "#8a909c",
              fontSize: 26,
              letterSpacing: 8,
              display: "flex",
            }}
          >
            STUDIA — STRAVA FOR STUDYING
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontWeight: 900,
            fontSize: 124,
            lineHeight: 1.02,
            letterSpacing: -2,
          }}
        >
          <div style={{ color: "#faf9f5", display: "flex" }}>LOCK IN.</div>
          <div style={{ color: "#faf9f5", display: "flex" }}>PROVE IT.</div>
          <div style={{ color: "#5577b6", display: "flex" }}>CLIMB.</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#8a909c",
            fontSize: 24,
            letterSpacing: 6,
          }}
        >
          <div style={{ display: "flex" }}>FREE ON IOS</div>
          <div style={{ display: "flex" }}>STUDIAIOS.COM</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: archivoBlack
        ? [
            {
              name: "Archivo Black",
              data: archivoBlack,
              style: "normal" as const,
              weight: 900 as const,
            },
          ]
        : undefined,
    }
  );
}
