# AI Chat Setup Guide

## Real LLM Integration

The AI Chat page now uses a **real LLM** (GPT-4o-mini by default) instead of mock responses.

### Setup Instructions

1. **Get an OpenAI API Key**
   - Go to https://platform.openai.com/api-keys
   - Create a new API key
   - Copy the key

2. **Add API Key to Environment**
   ```bash
   cd frontend_next
   cp .env.example .env.local
   ```

3. **Edit `.env.local`**
   ```env
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

4. **Restart Dev Server**
   ```bash
   npm run dev
   ```

### Features

✅ **Real-time Streaming** - Responses stream in character by character
✅ **Context Aware** - Maintains conversation history
✅ **Mode Switching** - Adapts responses based on selected mode (Summary/Code/Design/Research)
✅ **Error Handling** - Graceful fallback if API fails
✅ **Hiking Expert** - Specialized system prompt for outdoor/hiking assistance

### API Route

- **Endpoint**: `/api/chat`
- **Method**: POST
- **Model**: `gpt-4o-mini` (fast and cost-effective)
- **Temperature**: 0.7 (balanced creativity)

### System Prompt

The AI is configured as a knowledgeable hiking and outdoor adventure assistant for MNTN, providing:
- Trail recommendations
- Gear advice
- Safety information
- Weather guidance
- Outdoor activity tips

### Cost Considerations

- **GPT-4o-mini** is very affordable (~$0.15 per 1M input tokens)
- Streaming provides better UX
- Conversation history is sent with each request for context

### Alternative Models

You can easily switch to other models by editing `/src/app/api/chat/route.ts`:

```typescript
// Use GPT-4 for better quality
model: openai('gpt-4-turbo')

// Use GPT-3.5 for lower cost
model: openai('gpt-3.5-turbo')
```

### Testing Without API Key

If you don't have an API key yet, the chat will show an error message. The rest of the UI (sidebar, conversation switching, search) will still work perfectly.

### Troubleshooting

**Error: "Failed to get response"**
- Check that `OPENAI_API_KEY` is set in `.env.local`
- Verify the API key is valid
- Check your OpenAI account has credits

**Slow Responses**
- This is normal for streaming - responses appear gradually
- Check your internet connection
- Consider using a faster model like `gpt-3.5-turbo`

**No Streaming**
- Ensure you're using a modern browser
- Check browser console for errors
- Verify the API route is accessible at `/api/chat`
