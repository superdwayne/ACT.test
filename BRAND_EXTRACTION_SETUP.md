# Brand Extraction Setup

## Backend API Endpoint Added ✓

I've added the `/api/extract-brand` endpoint to your backend server that handles:
- PDF document parsing
- Image analysis with OpenAI Vision
- AI-powered brand identity extraction
- Structured JSON output

## How to Use

### 1. Start the Backend Server

```bash
cd backend
npm run dev
```

The server should start on `http://localhost:4000`

### 2. Test the Brand Extraction

1. Go to: http://localhost:3000/mntn#brand-config
2. Click "Brand Config" in the navigation
3. Upload a PDF or image with brand guidelines
4. Click "Extract Brand Identity"
5. Wait 5-10 seconds for AI processing
6. View extracted colors, fonts, and brand info

## What It Extracts

### From PDFs:
- Parses text content
- Identifies colors mentioned
- Extracts font families
- Detects brand tone

### From Images:
- Uses OpenAI Vision (GPT-4o)
- Analyzes visual brand elements
- Extracts colors with hex codes
- Identifies typography
- Detects logos

## API Response Format

```json
{
  "success": true,
  "brandData": {
    "theme": {
      "primaryColor": "#FF6B35",
      "secondaryColor": "#004E89",
      "accentColor": "#F77F00",
      "backgroundColor": "#FFFFFF",
      "textColor": "#1A1A1A"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "Poppins",
      "fontSize": {
        "base": "16px",
        "heading": "32px"
      }
    },
    "logo": {
      "url": "logo_url_if_detected",
      "width": 200,
      "height": 60
    },
    "tone": "Professional, friendly, and approachable"
  }
}
```

## Technical Details

### Endpoint
- **URL**: `POST http://localhost:4000/api/extract-brand`
- **Content-Type**: `multipart/form-data`
- **Field**: `file` (PDF or image)

### Processing Flow
1. File upload via multer
2. PDF parsing with pdf-parse OR image analysis with GPT-4o Vision
3. AI structuring with GPT-4o
4. JSON response with brand data

### Dependencies Used
- `multer` - File upload handling
- `pdf-parse` - PDF text extraction
- `@ai-sdk/openai` - OpenAI API integration
- `ai` - AI SDK for structured generation

## Environment Variables Required

Make sure your backend `.env` has:
```env
OPENAI_API_KEY=your_openai_api_key
PORT=4000
```

## Troubleshooting

### "Failed to extract brand" Error
- ✅ **Fixed!** Backend endpoint is now created
- Make sure backend server is running on port 4000
- Check backend console for detailed error logs

### Backend Not Starting
```bash
cd backend
npm install  # Install dependencies if needed
npm run dev  # Start development server
```

### CORS Issues
The backend already has CORS enabled for all origins, so this should work.

### File Upload Fails
- Check file size (should be under 10MB)
- Ensure file format is PDF, PNG, or JPG
- Check backend console for upload errors

## Testing with Sample Files

You can test with:
- Brand guidelines PDF
- Logo image (PNG/JPG)
- Color palette screenshot
- Typography specimen

## Next Steps

Once extraction works:
1. Save brand config to database
2. Apply theme to entire site
3. Use in social media generator
4. Create brand-aware AI responses

## Cost Considerations

- **PDF extraction**: Free (text parsing)
- **Image analysis**: ~$0.01 per image (GPT-4o Vision)
- **Structuring**: ~$0.001 per extraction (GPT-4o)
- **Total**: ~$0.01-0.02 per extraction

Very affordable for occasional brand uploads!
