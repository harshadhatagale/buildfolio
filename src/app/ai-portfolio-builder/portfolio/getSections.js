export const getSections = async (data) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/ai/generate-portfolio`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ onboardingData: data }),
      }
    )

    if (!res.ok) {
      throw new Error("Failed to fetch sections")
    }

    const result = await res.json()

    return result.portfolio || []

  } catch (error) {
    console.error("getSections error:", error)
    return []
  }
}
