export declare function extractBrandGuidelinesFromText(pdfText: string, brandName: string): Promise<{
    brand_name: string;
    source_text_preview: string;
    extraction_date: string;
    voice_and_tone: {
        confidence_score: number;
        primary_voice: string;
        tone_attributes: string[];
        writing_style: string;
        vocabulary_preferences: string[];
        forbidden_words: string[];
        example_phrases: string[];
        voice_description?: string | undefined;
        tone_examples?: string[] | undefined;
        communication_approach?: string | undefined;
    };
    visual_identity: {
        confidence_score: number;
        color_palette: {
            primary_colors: {
                name: string;
                hex: string;
                usage: string;
                rgb?: string | undefined;
                cmyk?: string | undefined;
                pantone?: string | undefined;
                usage_context?: string | undefined;
            }[];
            secondary_colors: {
                name: string;
                usage: string;
                hex?: string | undefined;
                rgb?: string | undefined;
                cmyk?: string | undefined;
                pantone?: string | undefined;
                usage_context?: string | undefined;
            }[];
            color_combinations?: string[] | undefined;
            color_restrictions?: string[] | undefined;
        };
        typography: {
            primary_font: {
                usage_context: string;
                family: string;
                weights: string[];
                tracking?: string | undefined;
                case_rules?: string | undefined;
            };
            secondary_fonts: {
                usage_context: string;
                family: string;
                weights?: string[] | undefined;
            }[];
            typography_hierarchy?: string | undefined;
            typography_rules?: string[] | undefined;
        };
        imagery_style: {
            photography_guidelines: string;
            illustration_style: string;
            image_treatments: string[];
            photography_subjects?: string[] | undefined;
            photography_techniques?: string[] | undefined;
            image_composition?: string | undefined;
        };
        logo?: {
            description?: string | undefined;
            placement_rules?: string[] | undefined;
            size_requirements?: string | undefined;
            color_variations?: string[] | undefined;
            spacing_requirements?: string | undefined;
            usage_restrictions?: string[] | undefined;
        } | undefined;
        layout_guidelines?: string[] | undefined;
    };
    social_media: {
        confidence_score: number;
        platform_guidelines: Record<string, {
            tone_adjustments: string;
            content_types: string[];
            hashtag_strategy: string;
            visual_specs?: {
                image_dimensions?: string | undefined;
                video_specs?: string | undefined;
            } | undefined;
        }>;
        content_pillars: string[];
        engagement_rules: string;
    };
    messaging: {
        confidence_score: number;
        brand_story: string;
        elevator_pitch: string;
        brand_mission?: string | undefined;
        brand_vision?: string | undefined;
        core_values?: string[] | undefined;
        value_propositions?: string[] | undefined;
        key_messages?: string[] | undefined;
        taglines?: string[] | undefined;
        brand_positioning?: string | undefined;
        target_audience?: string | undefined;
        messaging_tone?: string | undefined;
    };
    guidelines: {
        confidence_score: number;
        dos: string[];
        donts: string[];
        brand_personality: string[];
        usage_rules?: string[] | undefined;
        quality_standards?: string[] | undefined;
        consistency_requirements?: string[] | undefined;
    };
    extraction_metadata: {
        confidence_scores: {
            voice: number;
            visual: number;
            social: number;
            messaging: number;
            guidelines: number;
        };
        average_confidence: number;
        original_confidence_scores: {
            voice: number;
            visual: number;
            social: number;
            messaging: number;
            guidelines: number;
        };
    };
}>;
//# sourceMappingURL=brandExtraction.d.ts.map