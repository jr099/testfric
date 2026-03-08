Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  return new Response(JSON.stringify({ ok: true, message: "Reward claim queued" }), {
    headers: { "content-type": "application/json" }
  });
});
