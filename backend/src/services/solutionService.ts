import { Solution, ISolution } from '../models/solution';
import { Community } from '../models/Community';

export const createSolution = async (solutionData: Omit<ISolution, 'createdAt' | 'updatedAt' | 'votes'>): Promise<ISolution> => {
  try {
    const newSolution = new Solution(solutionData);
    await newSolution.save();

    // Increment solutionsCount in the associated community
    await Community.findByIdAndUpdate(solutionData.community, { $inc: { solutionsCount: 1 } });

    return newSolution;
  } catch (error: any) {
    throw new Error(`Error creating solution: ${error.message}`);
  }
};

export const getSolutionsByCommunity = async (communityId: string): Promise<ISolution[]> => {
  try {
    const solutions = await Solution.find({ community: communityId }).populate('creator', 'fullName');
    return solutions;
  } catch (error: any) {
    throw new Error(`Error fetching solutions for community: ${error.message}`);
  }
};

export const getSolutionById = async (solutionId: string): Promise<ISolution | null> => {
  try {
    const solution = await Solution.findById(solutionId).populate('creator', 'fullName');
    return solution;
  } catch (error: any) {
    throw new Error(`Error fetching solution by ID: ${error.message}`);
  }
};

export const voteSolution = async (solutionId: string, userId: string, voteType: 'upvote' | 'downvote'): Promise<ISolution | null> => {
  try {
    const solution = await Solution.findById(solutionId);
    if (!solution) {
      throw new Error('Solution not found');
    }

    // Implement voting logic here (e.g., prevent multiple votes from same user, or allow changing vote)
    // For simplicity, we'll just increment/decrement for now.
    if (voteType === 'upvote') {
      solution.votes += 1;
    } else {
      solution.votes -= 1;
    }
    await solution.save();
    return solution;
  } catch (error: any) {
    throw new Error(`Error voting on solution: ${error.message}`);
  }
};
