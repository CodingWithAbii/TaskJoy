'use server';

import { assignPoints } from '@/ai/flows/smart-point-assignment';

export async function getSmartPoints(title: string): Promise<number> {
  if (!title) return 5; // Default points for empty title
  try {
    const result = await assignPoints({ title });
    // Assign random points between 5 and 50 if AI can't determine, or returns undefined.
    return result.points ?? Math.floor(Math.random() * 10 + 1) * 5;
  } catch (error) {
    console.error("Error getting smart points:", error);
    // Return random points on error as well
    return Math.floor(Math.random() * 10 + 1) * 5;
  }
}
