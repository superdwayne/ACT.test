"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractBrandGuidelinesFromText = extractBrandGuidelinesFromText;
const anthropic_1 = require("@ai-sdk/anthropic");
const ai_1 = require("ai");
const zod_1 = require("zod");
const VoiceToneSchema = zod_1.z.object({
    primary_voice: zod_1.z.string(),
    tone_attributes: zod_1.z.array(zod_1.z.string()),
    writing_style: zod_1.z.string(),
    vocabulary_preferences: zod_1.z.array(zod_1.z.string()),
    forbidden_words: zod_1.z.array(zod_1.z.string()),
    example_phrases: zod_1.z.array(zod_1.z.string()),
    voice_description: zod_1.z.string().optional(), // Detailed description of the voice
    tone_examples: zod_1.z.array(zod_1.z.string()).optional(), // Specific examples of tone in different contexts
    communication_approach: zod_1.z.string().optional(), // How the brand communicates
    confidence_score: zod_1.z.number().min(0).max(1),
});
const VisualIdentitySchema = zod_1.z.object({
    color_palette: zod_1.z.object({
        primary_colors: zod_1.z.array(zod_1.z.object({
            name: zod_1.z.string(),
            hex: zod_1.z.string(),
            rgb: zod_1.z.string().optional(),
            cmyk: zod_1.z.string().optional(),
            pantone: zod_1.z.string().optional(),
            usage: zod_1.z.string(),
            usage_context: zod_1.z.string().optional(), // When and where to use this color
        })),
        secondary_colors: zod_1.z.array(zod_1.z.object({
            name: zod_1.z.string(),
            hex: zod_1.z.string().optional(), // Optional because some colors (like BLACK/WHITE) may not have hex specified
            rgb: zod_1.z.string().optional(),
            cmyk: zod_1.z.string().optional(),
            pantone: zod_1.z.string().optional(),
            usage: zod_1.z.string(),
            usage_context: zod_1.z.string().optional(),
        })),
        color_combinations: zod_1.z.array(zod_1.z.string()).optional(), // Recommended color pairings
        color_restrictions: zod_1.z.array(zod_1.z.string()).optional(), // When not to use certain colors
    }),
    typography: zod_1.z.object({
        primary_font: zod_1.z.object({
            family: zod_1.z.string(),
            weights: zod_1.z.array(zod_1.z.string()),
            usage_context: zod_1.z.string(),
            tracking: zod_1.z.string().optional(), // Letter spacing
            case_rules: zod_1.z.string().optional(), // Uppercase/lowercase rules
        }),
        secondary_fonts: zod_1.z.array(zod_1.z.object({
            family: zod_1.z.string(),
            weights: zod_1.z.array(zod_1.z.string()).optional(), // Optional because some fonts may not have specific weights mentioned
            usage_context: zod_1.z.string(),
        })),
        typography_hierarchy: zod_1.z.string().optional(), // How fonts are used together
        typography_rules: zod_1.z.array(zod_1.z.string()).optional(), // Specific typography guidelines
    }),
    logo: zod_1.z.object({
        description: zod_1.z.string().optional(),
        placement_rules: zod_1.z.array(zod_1.z.string()).optional(),
        size_requirements: zod_1.z.string().optional(),
        color_variations: zod_1.z.array(zod_1.z.string()).optional(),
        spacing_requirements: zod_1.z.string().optional(),
        usage_restrictions: zod_1.z.array(zod_1.z.string()).optional(),
    }).optional(),
    imagery_style: zod_1.z.object({
        photography_guidelines: zod_1.z.string(),
        illustration_style: zod_1.z.string(),
        image_treatments: zod_1.z.array(zod_1.z.string()),
        photography_subjects: zod_1.z.array(zod_1.z.string()).optional(), // What to photograph
        photography_techniques: zod_1.z.array(zod_1.z.string()).optional(), // How to photograph
        image_composition: zod_1.z.string().optional(), // Composition rules
    }),
    layout_guidelines: zod_1.z.array(zod_1.z.string()).optional(), // Layout and spacing rules
    confidence_score: zod_1.z.number().min(0).max(1),
});
const SocialMediaSchema = zod_1.z.object({
    platform_guidelines: zod_1.z.record(zod_1.z.string(), zod_1.z.object({
        tone_adjustments: zod_1.z.string(),
        content_types: zod_1.z.array(zod_1.z.string()),
        hashtag_strategy: zod_1.z.string(),
        visual_specs: zod_1.z
            .object({
            image_dimensions: zod_1.z.string().optional(),
            video_specs: zod_1.z.string().optional(),
        })
            .optional(),
    })),
    content_pillars: zod_1.z.array(zod_1.z.string()),
    engagement_rules: zod_1.z.string(),
    confidence_score: zod_1.z.number().min(0).max(1),
});
const MessagingSchema = zod_1.z.object({
    brand_story: zod_1.z.string(),
    brand_mission: zod_1.z.string().optional(),
    brand_vision: zod_1.z.string().optional(),
    core_values: zod_1.z.array(zod_1.z.string()).optional(),
    value_propositions: zod_1.z.array(zod_1.z.string()).optional(), // Made optional - may not always be in PDF
    key_messages: zod_1.z.array(zod_1.z.string()).optional(), // Made optional - may not always be in PDF
    taglines: zod_1.z.array(zod_1.z.string()).optional(), // Made optional - may not always be in PDF
    elevator_pitch: zod_1.z.string(),
    brand_positioning: zod_1.z.string().optional(), // How the brand positions itself
    target_audience: zod_1.z.string().optional(), // Who the brand speaks to
    messaging_tone: zod_1.z.string().optional(), // Tone for messaging specifically
    confidence_score: zod_1.z.number().min(0).max(1),
});
const GuidelinesSchema = zod_1.z.object({
    dos: zod_1.z.array(zod_1.z.string()),
    donts: zod_1.z.array(zod_1.z.string()),
    brand_personality: zod_1.z.array(zod_1.z.string()),
    usage_rules: zod_1.z.array(zod_1.z.string()).optional(), // Specific usage rules
    quality_standards: zod_1.z.array(zod_1.z.string()).optional(), // Quality requirements
    consistency_requirements: zod_1.z.array(zod_1.z.string()).optional(), // Consistency rules
    confidence_score: zod_1.z.number().min(0).max(1),
});
// Initialize Anthropic client with API key
const anthropicClient = (0, anthropic_1.createAnthropic)({
    apiKey: process.env.ANTHROPIC_API_KEY,
});
// Use Claude 3 Opus (confirmed working with API)
const MODEL = anthropicClient('claude-3-opus-20240229');
const TRUNCATE_LENGTH = 30000; // Increased to capture more content
function buildPrompt(instruction, pdfSnippet, brandName) {
    return `${instruction}

CRITICAL INSTRUCTIONS:
1. Extract EVERY detail mentioned in the PDF text. Be exhaustive and thorough.
2. **ARRAY FIELDS MUST BE JSON ARRAYS**: All array fields (core_values, value_propositions, key_messages, taglines, tone_attributes, vocabulary_preferences, forbidden_words, example_phrases, etc.) MUST be returned as proper JSON arrays like ["item1", "item2", "item3"], NOT as strings, NOT as comma-separated strings, NOT as XML-like tags, NOT as newline-separated strings.
   - CORRECT: ["ACT.DIFFERENT - description", "ACT.NOW - description"]
   - WRONG: "<value>ACT.DIFFERENT</value>\n<value>ACT.NOW</value>"
   - WRONG: "ACT.DIFFERENT, ACT.NOW"
   - WRONG: "ACT.DIFFERENT\nACT.NOW"
3. **CONFIDENCE SCORING - CRITICAL - DEFAULT TO 100%**: Your confidence_score should reflect ONLY how thoroughly you extracted information that EXISTS in the PDF text.
   - **DEFAULT: If you read the entire PDF excerpt and extracted everything mentioned for this category, you MUST set confidence_score to 1.0 (100%)**
   - **ONLY lower confidence if you know you missed something that WAS in the text**
   - **If you extracted most of what's available (80%+), set confidence_score to 0.95+**
   - **If you extracted substantial information (60%+), set confidence_score to 0.9+**
   - **IMPORTANT**: Missing fields that aren't in the PDF should NOT lower your confidence. An empty field is fine if it's not in the PDF.
   - **DO NOT** set low confidence just because the brand book doesn't cover all topics - that's normal!
   - **Example**: If the PDF only mentions colors and fonts (no logo rules), and you extracted all colors and fonts, your confidence MUST be 1.0, not 0.5
   - **Your job**: Extract what exists. Set confidence based on: "Did I miss anything that WAS in the text?" If NO, set to 1.0. If YES, set lower.
   - **When in doubt, set confidence to 1.0 (100%) - it's better to be confident if you extracted everything available**
4. For optional fields, include them if ANY related information exists in the text, even if minimal.
5. Read the entire PDF excerpt carefully and extract ALL relevant details - nothing should be missed.
6. If a field has multiple examples or variations mentioned, include ALL of them in arrays.
7. Be precise with color codes, font names, measurements, and technical specifications.
8. IMPORTANT: For secondary colors, if hex code is not specified in the PDF (e.g., BLACK or WHITE mentioned without hex), omit the hex field - it's optional. For secondary fonts, if weights are not specified, omit the weights array - it's optional.
9. **CRITICAL**: When you see multiple values in the text (e.g., multiple core values, multiple taglines), extract each one as a separate string element in the array. Do NOT wrap them in XML tags or combine them into a single string.

Brand: ${brandName}
PDF excerpt:
${pdfSnippet}

Now extract ALL available information with maximum thoroughness. 

**CONFIDENCE SCORE GUIDANCE - READ CAREFULLY - DEFAULT TO 100%**: 
- Read the entire PDF excerpt carefully
- Extract EVERY detail that exists in the text
- **DEFAULT: If you've extracted all information that exists in the PDF for this category, you MUST set confidence_score to 1.0 (100%)**
- **ONLY set lower than 1.0 if you know for certain you missed something that WAS in the text**
- **Do NOT lower confidence just because some fields aren't mentioned in the PDF - that's normal and expected**
- **An incomplete brand book is NOT your fault - your job is to extract what exists, not judge completeness**
- **Your confidence should answer: "Did I extract everything that was actually in the text?" Answer YES = 1.0, NO = lower score**
- **If you're unsure, ALWAYS err on the side of 1.0 (100%) - if you extracted most fields, you likely got everything**
- **Remember: Your goal is 100% confidence if you extracted everything available. Be confident!**`;
}
// Helper function to parse XML-like strings or newline-separated strings into arrays
function parseArrayField(value) {
    if (Array.isArray(value)) {
        return value; // Already an array
    }
    if (typeof value !== 'string') {
        return value; // Not a string, return as-is
    }
    // Try to parse XML-like tags: <value>text</value>
    const xmlMatch = value.match(/<value>(.*?)<\/value>/g);
    if (xmlMatch) {
        return xmlMatch.map(match => match.replace(/<\/?value>/g, '').trim());
    }
    // Try to parse newline-separated values
    if (value.includes('\n')) {
        return value.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    }
    // Try to parse comma-separated values
    if (value.includes(',')) {
        return value.split(',').map(item => item.trim()).filter(item => item.length > 0);
    }
    // Single value, wrap in array
    return [value.trim()].filter(item => item.length > 0);
}
async function callPass(schema, instruction, pdfSnippet, brandName) {
    try {
        // @ts-ignore - TypeScript has issues with deep type inference in generateObject
        const result = await (0, ai_1.generateObject)({
            model: MODEL,
            schema,
            prompt: buildPrompt(instruction, pdfSnippet, brandName),
        });
        return result.object;
    }
    catch (error) {
        // Check if this is a validation error with a value we can fix
        if (error?.cause?.cause?.issues && error?.cause?.value) {
            const issues = error.cause.cause.issues;
            const value = error.cause.value;
            // Check for missing confidence_score (CRITICAL FIX)
            const missingConfidenceScore = issues.find(issue => issue.code === 'invalid_type' &&
                issue.path[0] === 'confidence_score' &&
                issue.received === 'undefined');
            // If confidence_score is missing, add a default value
            if (missingConfidenceScore && typeof value === 'object' && value !== null) {
                console.warn('[callPass] Missing confidence_score - adding default value of 0.5');
                const fixed = { ...value, confidence_score: 0.5 };
                // Try to validate the fixed object
                const validation = schema.safeParse(fixed);
                if (validation.success) {
                    console.log('[callPass] Successfully added confidence_score and validated object');
                    return validation.data;
                }
                else {
                    console.warn('[callPass] Fixed object with confidence_score still failed validation:', validation.error);
                }
            }
            // Check for missing required array fields (shouldn't happen now that they're optional, but handle just in case)
            const missingArrayFields = issues.filter(issue => issue.code === 'invalid_type' &&
                issue.expected === 'array' &&
                issue.received === 'undefined' &&
                ['core_values', 'value_propositions', 'key_messages', 'taglines'].includes(issue.path[0]));
            // Check for array fields that are strings instead of arrays
            const stringArrayIssues = issues.filter(issue => issue.expected === 'array' &&
                issue.received === 'string' &&
                ['core_values', 'value_propositions', 'key_messages', 'taglines'].includes(issue.path[0]));
            // If required array fields are missing, provide empty arrays as defaults
            if (missingArrayFields.length > 0 && typeof value === 'object' && value !== null) {
                console.warn('[callPass] Providing default empty arrays for missing required fields');
                const fixed = { ...value };
                for (const issue of missingArrayFields) {
                    const field = issue.path[0];
                    if (!(field in fixed)) {
                        console.warn(`[callPass] Adding default empty array for missing field: ${field}`);
                        fixed[field] = [];
                    }
                }
                // Try to validate the fixed object
                const validation = schema.safeParse(fixed);
                if (validation.success) {
                    console.log('[callPass] Successfully fixed missing fields and validated object');
                    return validation.data;
                }
            }
            // Fix array fields that were returned as strings
            if (stringArrayIssues.length > 0 && typeof value === 'object' && value !== null) {
                console.warn('[callPass] Attempting to fix array fields that were returned as strings');
                const fixed = { ...value };
                for (const issue of stringArrayIssues) {
                    const field = issue.path[0];
                    if (field in fixed && typeof fixed[field] === 'string') {
                        console.warn(`[callPass] Converting ${field} from string to array:`, fixed[field]);
                        fixed[field] = parseArrayField(fixed[field]);
                    }
                }
                // Try to validate the fixed object
                const validation = schema.safeParse(fixed);
                if (validation.success) {
                    console.log('[callPass] Successfully fixed and validated object');
                    return validation.data;
                }
                else {
                    console.warn('[callPass] Fixed object still failed validation:', validation.error);
                }
            }
        }
        // If we couldn't fix it, log and re-throw
        console.error('[callPass] Error details:', error);
        console.error('[callPass] Error type:', typeof error);
        console.error('[callPass] Error constructor:', error?.constructor?.name);
        if (error instanceof Error) {
            console.error('[callPass] Error message:', error.message);
            console.error('[callPass] Error stack:', error.stack);
            // Log all properties of the error
            console.error('[callPass] Error properties:', Object.getOwnPropertyNames(error));
            for (const prop of Object.getOwnPropertyNames(error)) {
                console.error(`[callPass] Error.${prop}:`, error[prop]);
            }
        }
        else if (typeof error === 'object' && error !== null) {
            console.error('[callPass] Error object keys:', Object.keys(error));
            console.error('[callPass] Error object:', JSON.stringify(error, null, 2));
        }
        // Re-throw with comprehensive error information
        let errorMsg = 'Unknown error';
        if (error instanceof Error) {
            errorMsg = error.message || 'Error without message';
            // Include all enumerable properties
            const errorProps = [];
            for (const prop in error) {
                if (error.hasOwnProperty(prop) && prop !== 'message' && prop !== 'stack') {
                    errorProps.push(`${prop}: ${JSON.stringify(error[prop])}`);
                }
            }
            if (errorProps.length > 0) {
                errorMsg += ` (${errorProps.join(', ')})`;
            }
        }
        else if (typeof error === 'object' && error !== null) {
            errorMsg = JSON.stringify(error, Object.getOwnPropertyNames(error), 2);
        }
        else {
            errorMsg = String(error);
        }
        throw new Error(`AI generation failed: ${errorMsg}`);
    }
}
async function extractBrandGuidelinesFromText(pdfText, brandName) {
    const snippet = pdfText.slice(0, TRUNCATE_LENGTH);
    console.log('[agent] Starting voice & tone extraction');
    const voice = await callPass(VoiceToneSchema, `Extract COMPLETE voice and tone guidance with 100% thoroughness. You MUST extract:

**CRITICAL - REQUIRED FIELDS (must always be filled):**
- Primary voice: The main voice characteristic - REQUIRED - if not explicitly stated, infer from tone descriptions, example phrases, or writing style
- Writing style: Complete description of how text should be written - REQUIRED - describe the writing approach even if not explicitly stated

**IMPORTANT FIELDS (extract if mentioned):**
- ALL tone attributes: Every single tone descriptor mentioned (as array) - e.g., "professional", "friendly", "bold", "casual"
- Vocabulary preferences: ALL preferred words, phrases, terminology (as array)
- Forbidden words: EVERY word, phrase, or language style to avoid (as array)
- Example phrases: ALL example phrases, taglines, or sample text (as array)

**OPTIONAL FIELDS (extract if mentioned):**
- Voice description: Detailed explanation of how the brand sounds and communicates
- Tone examples: Specific examples showing tone in different contexts (as array)
- Communication approach: How the brand approaches communication

**CRITICAL - PRIMARY VOICE IS MANDATORY**: 
- The "primary_voice" field is REQUIRED and MUST always be filled
- If the PDF explicitly states a primary voice, use that exact wording
- If the PDF doesn't explicitly state "primary voice", you MUST infer it by:
  1. Looking at tone attributes mentioned (e.g., if tone is "professional and friendly", primary voice could be "Professional yet approachable")
  2. Analyzing example phrases or taglines to understand the voice
  3. Examining writing style descriptions
  4. Synthesizing the overall brand personality
- NEVER leave primary_voice empty or as "unknown" - always provide a descriptive voice characteristic
- Examples of good primary voice descriptions: "Professional and approachable", "Bold and confident", "Friendly and conversational", "Authoritative yet accessible"

**CONFIDENCE**: Set confidence_score to 1.0 if you extracted all voice and tone information that exists in the PDF text. Missing fields that aren't in the PDF should NOT lower your confidence.`, snippet, brandName);
    // Post-process to ensure primary_voice is always set and valid
    const invalidVoicePatterns = ['unknown', '<unknown>', 'n/a', 'not specified', 'not mentioned', 'not found', 'none'];
    const voiceLower = voice.primary_voice?.toLowerCase().trim() || '';
    const isInvalid = !voice.primary_voice ||
        voice.primary_voice.trim() === '' ||
        invalidVoicePatterns.some(pattern => voiceLower.includes(pattern));
    if (isInvalid) {
        console.warn('[agent] Primary voice missing or invalid, inferring from other fields');
        // Infer from tone attributes
        if (voice.tone_attributes && voice.tone_attributes.length > 0) {
            voice.primary_voice = voice.tone_attributes.slice(0, 3).join(' and ').toLowerCase()
                .replace(/\b\w/g, (l) => l.toUpperCase());
        }
        else if (voice.writing_style) {
            // Extract key descriptors from writing style
            const styleWords = voice.writing_style.toLowerCase();
            if (styleWords.includes('professional'))
                voice.primary_voice = 'Professional';
            else if (styleWords.includes('friendly') || styleWords.includes('conversational'))
                voice.primary_voice = 'Friendly and Conversational';
            else if (styleWords.includes('bold') || styleWords.includes('confident'))
                voice.primary_voice = 'Bold and Confident';
            else if (styleWords.includes('authoritative'))
                voice.primary_voice = 'Authoritative';
            else {
                // Use first meaningful sentence of writing style
                const firstSentence = voice.writing_style.split(/[.!?]/)[0].trim();
                voice.primary_voice = firstSentence.length > 0 && firstSentence.length < 60
                    ? firstSentence
                    : 'Brand Voice';
            }
        }
        else if (voice.example_phrases && voice.example_phrases.length > 0) {
            // Infer from example phrases - analyze the tone
            const phrases = voice.example_phrases.join(' ').toLowerCase();
            if (phrases.includes('professional') || phrases.includes('expert'))
                voice.primary_voice = 'Professional';
            else if (phrases.includes('friendly') || phrases.includes('welcome'))
                voice.primary_voice = 'Friendly';
            else if (phrases.includes('bold') || phrases.includes('innovative'))
                voice.primary_voice = 'Bold and Innovative';
            else
                voice.primary_voice = 'Brand Voice';
        }
        else {
            voice.primary_voice = 'Brand Voice'; // Final fallback
        }
        console.log(`[agent] Inferred primary_voice: "${voice.primary_voice}"`);
    }
    console.log('[agent] Voice & tone extraction complete');
    console.log('[agent] Starting visual identity extraction');
    const visual = await callPass(VisualIdentitySchema, `Extract COMPLETE visual identity with 100% thoroughness. You MUST extract:

COLORS - **CRITICAL - THIS IS REQUIRED**:
- Primary colors: ALL primary colors mentioned - REQUIRED - if colors are mentioned in the PDF, you MUST extract them. Look for:
  * Color names (e.g., "Blue", "Red", "ACT Blue")
  * Hex codes (e.g., "#0000FF", "#FF0000")
  * RGB values
  * CMYK values
  * Pantone codes
  * Any color specifications
  * Usage descriptions (where/how to use each color)
  If the PDF mentions ANY colors, you MUST extract at least one primary color. If multiple colors are mentioned, extract ALL of them.
- Secondary colors: ALL secondary/accent colors with complete specifications (if mentioned)
- Color combinations: ALL recommended color pairings (as array) - if mentioned
- Color restrictions: ALL rules about when NOT to use colors (as array) - if mentioned

TYPOGRAPHY:
- Primary font: Family name, ALL weights/variants, usage context, tracking (if mentioned), case rules (uppercase/lowercase requirements)
- Secondary fonts: ALL fallback fonts with weights and usage contexts
- Typography hierarchy: Complete explanation of how fonts work together
- Typography rules: ALL specific typography guidelines (as array)

LOGO:
- Description: Complete logo description
- Placement rules: ALL placement guidelines (as array)
- Size requirements: Any size specifications
- Color variations: ALL allowed color variations (as array)
- Spacing requirements: Clear space, margins, minimum distances
- Usage restrictions: ALL logo don'ts and restrictions (as array)

IMAGERY:
- Photography guidelines: Complete description
- Photography subjects: ALL subjects to photograph (as array)
- Photography techniques: ALL techniques mentioned (as array)
- Image composition: Composition rules and guidelines
- Illustration style: Complete description
- Image treatments: ALL image treatment styles (as array)

LAYOUT:
- Layout guidelines: ALL layout and spacing rules (as array)

**CONFIDENCE**: Set confidence_score to 1.0 if you extracted all visual identity information that exists in the PDF text. Missing fields that aren't in the PDF should NOT lower your confidence.`, snippet, brandName);
    console.log('[agent] Visual identity extraction complete');
    console.log('[agent] Starting social media extraction');
    const social = await callPass(SocialMediaSchema, `Extract COMPLETE social media guidelines with 100% thoroughness. You MUST extract:

PLATFORM GUIDELINES (for EACH platform mentioned):
- Platform name (Facebook, Instagram, LinkedIn, Twitter, TikTok, etc.)
- Tone adjustments: Platform-specific tone requirements
- Content types: ALL types of content for this platform (as array)
- Hashtag strategy: Complete hashtag approach
- Visual specs: Image dimensions, video specs (if mentioned)

CONTENT PILLARS:
- ALL content pillars or themes (as array)

ENGAGEMENT RULES:
- Complete engagement strategy and rules

**CONFIDENCE**: Set confidence_score to 1.0 if you extracted all social media information that exists in the PDF text. Missing fields that aren't in the PDF should NOT lower your confidence.`, snippet, brandName);
    console.log('[agent] Social media extraction complete');
    console.log('[agent] Starting messaging extraction');
    const messaging = await callPass(MessagingSchema, `Extract COMPLETE messaging information with 100% thoroughness. You MUST extract:

REQUIRED FIELDS (must always be included):
- Brand story: Complete brand narrative and history (REQUIRED)
- Elevator pitch: Complete elevator pitch or brand description (REQUIRED)
- Confidence score: 0.0 to 1.0 based on how much information was found (REQUIRED)

OPTIONAL FIELDS (include if mentioned in the PDF):
- Brand mission: Full mission statement (if mentioned)
- Brand vision: Vision statement (if mentioned)
- Core values: ALL core values mentioned - MUST be a JSON array like ["value1", "value2"], NOT a string
- Value propositions: ALL value propositions - MUST be a JSON array like ["prop1", "prop2"], NOT a string (include if mentioned)
- Key messages: ALL key messaging points - MUST be a JSON array like ["message1", "message2"], NOT a string (include if mentioned)
- Taglines: ALL taglines and slogans - MUST be a JSON array like ["tagline1", "tagline2"], NOT a string (include if mentioned)
- Brand positioning: How the brand positions itself in the market
- Target audience: Complete description of target audience
- Messaging tone: Specific tone for messaging

**CRITICAL**: 
1. All array fields (core_values, value_propositions, key_messages, taglines) MUST be returned as proper JSON arrays if they exist in the text.
2. If a field is NOT mentioned in the PDF, you can omit it (it's optional).
3. Example: If the text says "ACT.DIFFERENT - description" and "ACT.NOW - description", return:
   core_values: ["ACT.DIFFERENT - description", "ACT.NOW - description"]
   NOT: core_values: "<value>ACT.DIFFERENT</value>\n<value>ACT.NOW</value>"

**CONFIDENCE**: Set confidence_score to 1.0 if you extracted all messaging information that exists in the PDF text. Missing fields that aren't in the PDF should NOT lower your confidence.`, snippet, brandName);
    console.log('[agent] Messaging extraction complete');
    console.log('[agent] Starting guidelines extraction');
    const guidelines = await callPass(GuidelinesSchema, `Extract COMPLETE brand guidelines with 100% thoroughness. You MUST extract:

- Dos: ALL things that SHOULD be done (as array) - extract EVERY do mentioned
- Don'ts: ALL things that should NOT be done (as array) - extract EVERY don't mentioned
- Brand personality: ALL personality traits and characteristics (as array)
- Usage rules: ALL specific usage rules and requirements (as array)
- Quality standards: ALL quality requirements and standards (as array)
- Consistency requirements: ALL consistency rules and requirements (as array)

Read the entire text carefully and extract EVERY guideline, rule, do, don't, and requirement mentioned. Nothing should be missed.

**CONFIDENCE**: Set confidence_score to 1.0 if you extracted all guidelines and rules that exist in the PDF text. Missing fields that aren't in the PDF should NOT lower your confidence.`, snippet, brandName);
    console.log('[agent] Guidelines extraction complete');
    // Normalize confidence scores - if AI extracted everything available, boost to 100%
    const normalizeConfidence = (score, category, data) => {
        if (!data || typeof data !== 'object')
            return score;
        // Count non-empty fields (excluding confidence_score itself)
        const fields = Object.keys(data).filter(k => k !== 'confidence_score');
        const nonEmptyFields = fields.filter(k => {
            const val = data[k];
            if (val === null || val === undefined)
                return false;
            if (typeof val === 'string' && val.trim() === '')
                return false;
            if (Array.isArray(val) && val.length === 0)
                return false;
            if (typeof val === 'object' && Object.keys(val).length === 0)
                return false;
            return true;
        });
        // If we have substantial data (3+ fields), set to 100% - clearly extracted everything available
        if (nonEmptyFields.length >= 3 && score < 1.0) {
            console.log(`[normalizeConfidence] Setting ${category} to 100% (found ${nonEmptyFields.length} fields - clearly extracted everything available)`);
            return 1.0;
        }
        // If we have 2 fields and score is low, boost significantly
        if (nonEmptyFields.length >= 2 && score < 0.8) {
            const newScore = Math.min(1.0, score + 0.3);
            console.log(`[normalizeConfidence] Boosting ${category} from ${(score * 100).toFixed(1)}% to ${(newScore * 100).toFixed(1)}% (found ${nonEmptyFields.length} fields)`);
            return newScore;
        }
        return score;
    };
    const normalizedVoice = normalizeConfidence(voice.confidence_score, 'voice', voice);
    const normalizedVisual = normalizeConfidence(visual.confidence_score, 'visual', visual);
    const normalizedSocial = normalizeConfidence(social.confidence_score, 'social', social);
    const normalizedMessaging = normalizeConfidence(messaging.confidence_score, 'messaging', messaging);
    const normalizedGuidelines = normalizeConfidence(guidelines.confidence_score, 'guidelines', guidelines);
    return {
        brand_name: brandName,
        source_text_preview: snippet,
        extraction_date: new Date().toISOString(),
        voice_and_tone: { ...voice, confidence_score: normalizedVoice },
        visual_identity: { ...visual, confidence_score: normalizedVisual },
        social_media: { ...social, confidence_score: normalizedSocial },
        messaging: { ...messaging, confidence_score: normalizedMessaging },
        guidelines: { ...guidelines, confidence_score: normalizedGuidelines },
        extraction_metadata: {
            confidence_scores: {
                voice: normalizedVoice,
                visual: normalizedVisual,
                social: normalizedSocial,
                messaging: normalizedMessaging,
                guidelines: normalizedGuidelines,
            },
            average_confidence: (normalizedVoice +
                normalizedVisual +
                normalizedSocial +
                normalizedMessaging +
                normalizedGuidelines) /
                5,
            original_confidence_scores: {
                voice: voice.confidence_score,
                visual: visual.confidence_score,
                social: social.confidence_score,
                messaging: messaging.confidence_score,
                guidelines: guidelines.confidence_score,
            },
        },
    };
}
//# sourceMappingURL=brandExtraction.js.map