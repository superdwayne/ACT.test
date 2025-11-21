console.log('hello-world edge function loaded')

Deno.serve((req) => {
  const { searchParams } = new URL(req.url)
  const name = searchParams.get('name') ?? 'world'

  const body = { message: `Hello, ${name}! From Supabase Edge Functions.` }

  return new Response(JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
})
