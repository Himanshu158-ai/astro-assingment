
export async function getProkeralaToken() {
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

  const data = await response.json();

  return data.access_token;
}