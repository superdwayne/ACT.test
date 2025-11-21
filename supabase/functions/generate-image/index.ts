const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')

Deno.serve(async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let body: any
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const prompt = body?.prompt as string | undefined
  const size = (body?.size as string | undefined) ?? '1024x1024'

  if (!prompt) {
    return new Response(JSON.stringify({ error: 'prompt is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (!OPENAI_API_KEY) {
    return new Response(JSON.stringify({ error: 'OPENAI_API_KEY is not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-image-1',
        prompt,
        size,
        n: 1,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return new Response(
        JSON.stringify({ error: 'OpenAI API error', details: errorText }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    const json = (await response.json()) as {
      data?: Array<{ url?: string; b64_json?: string }>
    }

    const first = json.data?.[0]
    if (!first) {
      return new Response(JSON.stringify({ error: 'No image returned from OpenAI' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const result = first.url
      ? { imageUrl: first.url }
      : { imageBase64: first.b64_json }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to generate image', details: String(error) }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
})
