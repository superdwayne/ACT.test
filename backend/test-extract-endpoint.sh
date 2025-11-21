#!/bin/bash
# Test script for the extract-guidelines endpoint
# Usage: ./test-extract-endpoint.sh [path-to-pdf-file]
# Example: ./test-extract-endpoint.sh test-pdfs/brand-guidelines.pdf

ENDPOINT="http://localhost:4000/api/extract-guidelines"
PDF_FILE="${1:-}"

if [ -z "$PDF_FILE" ]; then
  echo "❌ Error: Please provide a PDF file path"
  echo ""
  echo "Usage: ./test-extract-endpoint.sh [path-to-pdf-file]"
  echo "Example: ./test-extract-endpoint.sh test-pdfs/brand-guidelines.pdf"
  echo ""
  echo "💡 Tip: Save your test PDFs in the 'test-pdfs/' directory"
  exit 1
fi

if [ ! -f "$PDF_FILE" ]; then
  echo "❌ Error: PDF file not found: $PDF_FILE"
  exit 1
fi

echo "🧪 Testing extract-guidelines endpoint..."
echo "📄 PDF file: $PDF_FILE"
echo "🔗 Endpoint: $ENDPOINT"
echo ""

response=$(curl -s -w "\n%{http_code}" -X POST "$ENDPOINT" \
  -F "file=@$PDF_FILE" \
  -F "brandName=Test Brand")

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

echo "📊 Response Status: $http_code"
echo ""
echo "📝 Response Body:"
echo "$body" | jq . 2>/dev/null || echo "$body"

if [ "$http_code" -eq 200 ]; then
  echo ""
  echo "✅ Success! Extraction completed."
else
  echo ""
  echo "❌ Error: Request failed with status $http_code"
fi

