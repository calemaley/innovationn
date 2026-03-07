'use server';
/**
 * @fileOverview This flow provides AI-generated suggestions for presentation topics and keywords
 * based on an innovator's expertise and current industry trends.
 *
 * - innovatorTopicSuggestion - A function that handles the topic suggestion process.
 * - InnovatorTopicSuggestionInput - The input type for the innovatorTopicSuggestion function.
 * - InnovatorTopicSuggestionOutput - The return type for the innovatorTopicSuggestion function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const InnovatorTopicSuggestionInputSchema = z.object({
  expertise: z.string().describe('The innovator\'s area of expertise.'),
  industryTrends: z.array(z.string()).describe('A list of current industry trends.'),
});
export type InnovatorTopicSuggestionInput = z.infer<typeof InnovatorTopicSuggestionInputSchema>;

const InnovatorTopicSuggestionOutputSchema = z.object({
  suggestedTopics: z.array(z.string()).describe('A list of suggested presentation topics.'),
  keywords: z.array(z.string()).describe('A list of relevant keywords for the topics.'),
});
export type InnovatorTopicSuggestionOutput = z.infer<typeof InnovatorTopicSuggestionOutputSchema>;

const innovatorTopicSuggestionPrompt = ai.definePrompt({
  name: 'innovatorTopicSuggestionPrompt',
  input: { schema: InnovatorTopicSuggestionInputSchema },
  output: { schema: InnovatorTopicSuggestionOutputSchema },
  prompt: `You are an AI assistant specialized in generating presentation topics and keywords for innovators.

Based on the provided innovator's expertise and current industry trends, suggest relevant and engaging presentation topics and associated keywords.

Innovator's Expertise: {{{expertise}}}
Current Industry Trends: {{{industryTrends}}}`,
});

const innovatorTopicSuggestionFlow = ai.defineFlow(
  {
    name: 'innovatorTopicSuggestionFlow',
    inputSchema: InnovatorTopicSuggestionInputSchema,
    outputSchema: InnovatorTopicSuggestionOutputSchema,
  },
  async (input) => {
    const { output } = await innovatorTopicSuggestionPrompt(input);
    return output!;
  }
);

export async function innovatorTopicSuggestion(input: InnovatorTopicSuggestionInput): Promise<InnovatorTopicSuggestionOutput> {
  return innovatorTopicSuggestionFlow(input);
}
