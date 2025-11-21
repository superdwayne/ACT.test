/**
 * Brand Guidelines Extraction Agent - Test Script
 *
 * This script demonstrates the multi-pass extraction approach for converting
 * PDF brand guidelines into structured data.
 *
 * Requirements:
 * - npm install @ai-sdk/anthropic ai zod
 * - Set ANTHROPIC_API_KEY in environment
 *
 * Usage:
 * - Replace PDF_URL with your test brand guidelines PDF
 * - Run: npx tsx test-brand-extraction.ts
 */

import { writeFileSync } from 'node:fs';
import { anthropic } from '@ai-sdk/anthropic';
import { generateObject } from 'ai';
import { z } from 'zod';

const generateObjectUntyped = generateObject as (args: any) => Promise<any>;

// Configuration
const PDF_URL = 'YOUR_PDF_URL_HERE'; // Replace with actual PDF URL
const BRAND_NAME = 'Test Brand';

// Schemas for structured extraction
const VoiceToneSchema = z.object({
  primary_voice: z.string().describe('Main voice characteristic (e.g., professional, friendly, authoritative)'),
  tone_attributes: z.array(z.string()).describe('List of tone attributes (e.g., conversational, confident, empathetic)'),
  writing_style: z.string().describe('Description of writing style'),
  vocabulary_preferences: z.array(z.string()).describe('Preferred words or phrases'),
  forbidden_words: z.array(z.string()).describe('Words or phrases to avoid'),
  example_phrases: z.array(z.string()).describe('Example phrases that exemplify the brand voice'),
  confidence_score: z.number().min(0).max(1).describe('Confidence in extraction (0-1)'),
});

const VisualIdentitySchema = z.object({
  color_palette: z.object({
    primary_colors: z.array(z.object({
      name: z.string(),
      hex: z.string(),
      rgb: z.string().optional(),
      usage: z.string().describe('When/where to use this color'),
    })),
    secondary_colors: z.array(z.object({
      name: z.string(),
      hex: z.string(),
      rgb: z.string().optional(),
      usage: z.string(),
    })),
  }),
  typography: z.object({
    primary_font: z.object({
      family: z.string(),
      weights: z.array(z.string()),
      usage_context: z.string(),
    }),
    secondary_fonts: z.array(z.object({
      family: z.string(),
      weights: z.array(z.string()),
      usage_context: z.string(),
    })),
  }),
  imagery_style: z.object({
    photography_guidelines: z.string(),
    illustration_style: z.string(),
    image_treatments: z.array(z.string()),
  }),
  confidence_score: z.number().min(0).max(1),
});

const SocialMediaSchema = z.object({
  platform_guidelines: z.record(z.object({
    tone_adjustments: z.string().describe('How tone differs on this platform'),
    content_types: z.array(z.string()).describe('Types of content for this platform'),
    hashtag_strategy: z.string(),
    visual_specs: z.object({
      image_dimensions: z.string().optional(),
      video_specs: z.string().optional(),
    }).optional(),
  })),
  content_pillars: z.array(z.string()).describe('Main content themes/topics'),
  engagement_rules: z.string(),
  confidence_score: z.number().min(0).max(1),
});

const MessagingSchema = z.object({
  brand_story: z.string(),
  value_propositions: z.array(z.string()),
  key_messages: z.array(z.string()),
  taglines: z.array(z.string()),
  elevator_pitch: z.string(),
  confidence_score: z.number().min(0).max(1),
});

const GuidelinesSchema = z.object({
  dos: z.array(z.string()).describe('Things the brand should do'),
  donts: z.array(z.string()).describe('Things the brand should never do'),
  brand_personality: z.array(z.string()).describe('Brand personality traits'),
  confidence_score: z.number().min(0).max(1),
});

// Main extraction function
async function extractBrandGuidelines(pdfUrl: string, brandName: string) {
  console.log('🚀 Starting brand guidelines extraction...\n');
  console.log(`📄 PDF: ${pdfUrl}`);
  console.log(`🏢 Brand: ${brandName}\n`);

  try {
    console.log('📝 Pass 1/5: Extracting Voice & Tone...');
    const voiceExtraction = await generateObjectUntyped({
      model: anthropic('claude-sonnet-4'),
      schema: VoiceToneSchema,
      prompt: `Analyze the brand guidelines PDF available at ${pdfUrl} for "${brandName}" and extract all voice and tone information.

Focus on:
- Brand voice characteristics (formal, casual, professional, friendly, etc.)
- Tone attributes and when to use them
- Writing style preferences (sentence structure, paragraph length, etc.)
- Preferred vocabulary and terminology
- Words/phrases to avoid
- Example phrases that exemplify the brand voice

Provide a confidence score based on how explicit and detailed the guidelines are.
Be thorough and extract all relevant information.`,
    });
    console.log('✅ Voice & Tone extraction complete');
    console.log(`   Confidence: ${(voiceExtraction.object.confidence_score * 100).toFixed(0)}%\n`);

    console.log('🎨 Pass 2/5: Extracting Visual Identity...');
    const visualExtraction = await generateObjectUntyped({
      model: anthropic('claude-sonnet-4'),
      schema: VisualIdentitySchema,
      prompt: `Extract all visual identity guidelines from the ${brandName} PDF located at ${pdfUrl}.

Extract:
- Complete color palette with exact hex codes
  - Primary colors (main brand colors)
  - Secondary colors (supporting colors)
  - Include usage rules for each color
- Typography hierarchy
  - Primary font (main brand font)
  - Secondary fonts (supporting fonts)
  - Font weights available
  - Usage context for each font
- Imagery style guidelines
  - Photography style and guidelines
  - Illustration style
  - Image treatments and filters

Be precise with color codes (hex format) and exact font names.
Provide a confidence score based on completeness of visual specifications.`,
    });
    console.log('✅ Visual Identity extraction complete');
    console.log(`   Confidence: ${(visualExtraction.object.confidence_score * 100).toFixed(0)}%\n`);

    console.log('📱 Pass 3/5: Extracting Social Media Guidelines...');
    const socialExtraction = await generateObjectUntyped({
      model: anthropic('claude-sonnet-4'),
      schema: SocialMediaSchema,
      prompt: `Extract social media specific guidelines for ${brandName} using the PDF at ${pdfUrl}.

Look for:
- Platform-specific rules (Instagram, LinkedIn, Twitter/X, Facebook, TikTok, etc.)
- How tone/voice adjusts per platform
- Content types recommended for each platform
- Hashtag strategies
- Engagement guidelines (how to respond, comment style)
- Visual specifications per platform (image sizes, video specs)
- Content pillars/themes (main topics the brand covers)

If no specific social media guidelines exist, infer reasonable rules based on the overall brand guidelines.
Provide a confidence score.`,
    });
    console.log('✅ Social Media extraction complete');
    console.log(`   Confidence: ${(socialExtraction.object.confidence_score * 100).toFixed(0)}%\n`);

    console.log('💬 Pass 4/5: Extracting Messaging & Positioning...');
    const messagingExtraction = await generateObjectUntyped({
      model: anthropic('claude-sonnet-4'),
      schema: MessagingSchema,
      prompt: `Extract core messaging and positioning for ${brandName} from the PDF at ${pdfUrl}.

Find:
- Brand story/narrative (the origin and mission)
- Value propositions (what makes the brand unique)
- Key messages (main points to communicate)
- Taglines and slogans
- Elevator pitch (concise brand description)

Provide a confidence score based on how clearly these are articulated in the guidelines.`,
    });
    console.log('✅ Messaging extraction complete');
    console.log(`   Confidence: ${(messagingExtraction.object.confidence_score * 100).toFixed(0)}%\n`);

    console.log("✅❌ Pass 5/5: Extracting Guidelines (Dos & Don'ts)...");
    const guidelinesExtraction = await generateObjectUntyped({
      model: anthropic('claude-sonnet-4'),
      schema: GuidelinesSchema,
      prompt: `Extract explicit dos and don'ts and brand personality traits for ${brandName} from the PDF at ${pdfUrl}.

Look for:
- What the brand SHOULD do (best practices, recommended approaches)
- What the brand should NEVER do (forbidden practices, things to avoid)
- Brand personality attributes (adjectives that describe the brand)
- Brand characteristics and values

Provide a confidence score.`,
    });
    console.log('✅ Guidelines extraction complete');
    console.log(`   Confidence: ${(guidelinesExtraction.object.confidence_score * 100).toFixed(0)}%\n`);

    const brandConfig = {
      brand_name: brandName,
      source_pdf_url: pdfUrl,
      extraction_date: new Date().toISOString(),
      voice_and_tone: voiceExtraction.object,
      visual_identity: visualExtraction.object,
      social_media: socialExtraction.object,
      messaging: messagingExtraction.object,
      guidelines: guidelinesExtraction.object,
      extraction_metadata: {
        confidence_scores: {
          voice: voiceExtraction.object.confidence_score,
          visual: visualExtraction.object.confidence_score,
          social: socialExtraction.object.confidence_score,
          messaging: messagingExtraction.object.confidence_score,
          guidelines: guidelinesExtraction.object.confidence_score,
        },
        average_confidence:
          (voiceExtraction.object.confidence_score +
           visualExtraction.object.confidence_score +
           socialExtraction.object.confidence_score +
           messagingExtraction.object.confidence_score +
           guidelinesExtraction.object.confidence_score) / 5,
      },
    };

    return brandConfig;
  } catch (error) {
    console.error('❌ Error during extraction:', error);
    throw error;
  }
}

async function testExtraction() {
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║   Brand Guidelines Extraction Agent - Test Script     ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');

  const startTime = Date.now();

  try {
    const result = await extractBrandGuidelines(PDF_URL, BRAND_NAME);

    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    console.log('═══════════════════════════════════════════════════════');
    console.log('✨ EXTRACTION COMPLETE');
    console.log('═══════════════════════════════════════════════════════\n');

    console.log(`⏱️  Duration: ${duration}s`);
    console.log(`📊 Average Confidence: ${(result.extraction_metadata.average_confidence * 100).toFixed(1)}%\n`);

    console.log('📋 EXTRACTION SUMMARY:\n');

    console.log('Voice & Tone:');
    console.log(`  - Primary Voice: ${result.voice_and_tone.primary_voice}`);
    console.log(`  - Tone Attributes: ${result.voice_and_tone.tone_attributes.slice(0, 3).join(', ')}${result.voice_and_tone.tone_attributes.length > 3 ? '...' : ''}`);
    console.log(`  - Vocabulary Preferences: ${result.voice_and_tone.vocabulary_preferences.length} items`);
    console.log(`  - Forbidden Words: ${result.voice_and_tone.forbidden_words.length} items\n`);

    console.log('Visual Identity:');
    console.log(`  - Primary Colors: ${result.visual_identity.color_palette.primary_colors.length}`);
    console.log(`  - Secondary Colors: ${result.visual_identity.color_palette.secondary_colors.length}`);
    console.log(`  - Primary Font: ${result.visual_identity.typography.primary_font.family}`);
    console.log(`  - Secondary Fonts: ${result.visual_identity.typography.secondary_fonts.length}\n`);

    console.log('Social Media:');
    console.log(`  - Platforms Covered: ${Object.keys(result.social_media.platform_guidelines).join(', ')}`);
    console.log(`  - Content Pillars: ${result.social_media.content_pillars.length}\n`);

    console.log('Messaging:');
    console.log(`  - Value Propositions: ${result.messaging.value_propositions.length}`);
    console.log(`  - Key Messages: ${result.messaging.key_messages.length}`);
    console.log(`  - Taglines: ${result.messaging.taglines.length}\n`);

    console.log('Guidelines:');
    console.log(`  - Dos: ${result.guidelines.dos.length} items`);
    console.log(`  - Don'ts: ${result.guidelines.donts.length} items`);
    console.log(`  - Personality Traits: ${result.guidelines.brand_personality.length}\n`);

    const outputPath = '/tmp/brand-extraction-result.json';
    writeFileSync(outputPath, JSON.stringify(result, null, 2));
    console.log(`💾 Full results saved to: ${outputPath}\n`);

    console.log('═══════════════════════════════════════════════════════');
    console.log('📊 CONFIDENCE SCORES:');
    console.log('═══════════════════════════════════════════════════════\n');
    console.log(`Voice & Tone:     ${(result.extraction_metadata.confidence_scores.voice * 100).toFixed(1)}%`);
    console.log(`Visual Identity:  ${(result.extraction_metadata.confidence_scores.visual * 100).toFixed(1)}%`);
    console.log(`Social Media:     ${(result.extraction_metadata.confidence_scores.social * 100).toFixed(1)}%`);
    console.log(`Messaging:        ${(result.extraction_metadata.confidence_scores.messaging * 100).toFixed(1)}%`);
    console.log(`Guidelines:       ${(result.extraction_metadata.confidence_scores.guidelines * 100).toFixed(1)}%\n`);

    const avgConfidence = result.extraction_metadata.average_confidence;
    const reviewNeeded = avgConfidence < 0.8;

    if (reviewNeeded) {
      console.log('⚠️  RECOMMENDATION: Manual review recommended (confidence < 80%)');
    } else {
      console.log('✅ RECOMMENDATION: Extraction quality is high, ready to use');
    }

  } catch (error) {
    console.error('\n❌ TEST FAILED:', error);
    process.exit(1);
  }
}

// Run test
void testExtraction();
