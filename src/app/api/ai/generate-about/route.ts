import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

export async function POST(req: Request) {
    try {
        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'GROQ_API_KEY not configured' }, { status: 500 });
        }

        const groq = new Groq({
            apiKey: apiKey,
        });
        const { businessName, location, existingDescription, services, reviews, additionalInfo } = await req.json();

        const prompt = `
You are an expert business profiler and professional copywriter specializing in Google Business Profile descriptions, website "About Us" pages, and local SEO.

Your task:
1. Analyze ALL provided information about the business.
2. Identify the MOST accurate primary domain/industry/sector of the business. Be specific and granular — avoid vague terms like "services" or "retail". Use sub-categories where appropriate (examples: "Authentic South Indian Vegetarian Restaurant", "Luxury Residential Real Estate Broker in Mumbai", "Digital Marketing Agency specializing in e-commerce SEO", "Multi-specialty Dental Clinic with cosmetic focus", "Organic Grocery Store & Delivery Service").
   - Base this on business name, location, existing description, services offered, keywords, customer reviews, and any other clues.
   - If multiple domains are possible, choose the one that best fits the majority of evidence and customer perception.
   - Output only ONE primary domain.
3. Write a compelling, professional "About Us" / business description (ideal length: 300–600 characters / 50–120 words for Google Business Profile compatibility; can be longer for websites).
   - Make it engaging, trustworthy, and customer-focused.
   - Highlight the unique value proposition, key strengths, and what sets the business apart.
   - Naturally incorporate positive themes from reviews (e.g., friendly staff, fast service, quality products, reliability).
   - Use warm, approachable language suitable for the domain (e.g., warm & inviting for restaurants, professional & reassuring for clinics, modern & innovative for tech).
   - Include relevant local SEO keywords (e.g., "Mumbai", "Bandra", "best biryani in Andheri") without keyword stuffing.
   - End with a subtle call-to-action if it fits naturally (e.g., "Visit us today!", "Book your consultation").
   - Write in first-person plural ("we") or third-person ("[Business Name] is...") — choose what feels most natural for the domain.

Input data:
- Business Name: ${businessName}
- Location: ${location}
- Existing Description (if any): ${existingDescription}
- Services / Categories: ${services}
- Recent Reviews / Customer Feedback: ${reviews}
- Additional Info: ${additionalInfo}

Output format exactly like this (nothing else before or after):

**Primary Domain:** [One specific domain here]

**About Us Description:**
[Full text here]

**Character Count:** [exact count]

**Why this fits best:** [1-2 sentences explaining why the domain and description align with the evidence]
`;

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            model: 'openai/gpt-oss-120b',
        });

        const content = completion.choices[0]?.message?.content || '';

        return NextResponse.json({ content });
    } catch (error: any) {
        console.error('Error generating AI content:', error);

        let errorMessage = 'Failed to generate content';
        if (error?.message) {
            errorMessage = error.message;
        }

        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
