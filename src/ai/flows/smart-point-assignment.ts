'use server';

/**
 * @fileOverview An AI agent that determines reasonable point values for tasks based on their titles.
 *
 * - assignPoints - A function that handles the point assignment process.
 * - AssignPointsInput - The input type for the assignPoints function.
 * - AssignPointsOutput - The return type for the assignPoints function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AssignPointsInputSchema = z.object({
  title: z.string().describe('The title of the task.'),
});
export type AssignPointsInput = z.infer<typeof AssignPointsInputSchema>;

const AssignPointsOutputSchema = z.object({
  points: z
    .number()
    .optional()
    .describe('The suggested point value for the task, if determinable.'),
});
export type AssignPointsOutput = z.infer<typeof AssignPointsOutputSchema>;

export async function assignPoints(input: AssignPointsInput): Promise<AssignPointsOutput> {
  return assignPointsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'assignPointsPrompt',
  input: {schema: AssignPointsInputSchema},
  output: {schema: AssignPointsOutputSchema},
  prompt: `You are a task point value estimator. Given the title of a task, you will determine a reasonable point value for it.

  If you cannot determine an appropriate point value, you will return an empty JSON object.

  Respond in JSON format.

  Task Title: {{{title}}}`,
});

const assignPointsFlow = ai.defineFlow(
  {
    name: 'assignPointsFlow',
    inputSchema: AssignPointsInputSchema,
    outputSchema: AssignPointsOutputSchema,
  },
  async input => {
    try {
      const {output} = await prompt(input);
      return output!;
    } catch (e) {
      console.error('Error assigning points:', e);
      return {};
    }
  }
);
