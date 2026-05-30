import dotenv from "dotenv"
dotenv.config();


export async function getProkeralaToken() {
  try {
    const response = await fetch(
      "https://api.prokerala.com/token",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: process.env.ASTRO_CLIENT_ID!,
          client_secret:
            process.env.ASTRO_CLIENT_SECRET!,
        }),
      }
    );

    if (!response.ok) {
      const errorBody = await response.text().catch(() => "");
      throw new Error(`Failed to fetch Prokerala token: ${response.statusText} (${errorBody})`);
    }

    const data = await response.json();
    if (!data || !data.access_token) {
      throw new Error("Prokerala authentication response did not contain an access token");
    }

    return data.access_token;
  } catch (error: any) {
    console.error("Prokerala authentication failed:", error);
    throw new Error(`Authentication error: ${error.message || error}`);
  }
}