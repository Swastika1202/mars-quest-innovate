import { Request, Response } from 'express';
import { Community } from '../models/Community';
import { User } from '../models/User';
import { StatusCodes } from 'http-status-codes';

export const createCommunity = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const adminId = req.user?.userId; // Assuming user ID is available from auth middleware

  if (!adminId) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized: Admin ID not found' });
  }

  try {
    const community = new Community({
      name,
      description,
      admin: adminId,
      members: [adminId], // Admin is automatically a member
    });
    await community.save();

    // Add community to admin's joined communities
    await User.findByIdAndUpdate(adminId, { $addToSet: { communities: community._id } });

    res.status(StatusCodes.CREATED).json(community);
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(StatusCodes.CONFLICT).json({ message: 'Community with this name already exists' });
    }
    console.error('Error creating community:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
  }
};

export const joinCommunity = async (req: Request, res: Response) => {
  const { communityId } = req.params;
  const userId = req.user?.userId; // Assuming user ID is available from auth middleware

  if (!userId) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized: User ID not found' });
  }

  try {
    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Community not found' });
    }

    // Add user to community's members and community to user's joined communities
    const updatedCommunity = await Community.findByIdAndUpdate(communityId, { $addToSet: { members: userId } }, { new: true });
    await User.findByIdAndUpdate(userId, { $addToSet: { communities: communityId } });

    res.status(StatusCodes.OK).json(updatedCommunity);
  } catch (error) {
    console.error('Error joining community:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
  }
};

export const leaveCommunity = async (req: Request, res: Response) => {
  const { communityId } = req.params;
  const userId = req.user?.userId; // Assuming user ID is available from auth middleware

  if (!userId) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized: User ID not found' });
  }

  try {
    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Community not found' });
    }

    // Remove user from community's members and community from user's joined communities
    const updatedCommunity = await Community.findByIdAndUpdate(communityId, { $pull: { members: userId } }, { new: true });
    await User.findByIdAndUpdate(userId, { $pull: { communities: communityId } });

    res.status(StatusCodes.OK).json(updatedCommunity);
  } catch (error) {
    console.error('Error leaving community:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
  }
};

export const getCommunities = async (req: Request, res: Response) => {
  try {
    const communities = await Community.find().populate('admin', 'username fullName avatarUrl'); // Populate admin details
    res.status(StatusCodes.OK).json(communities);
  } catch (error) {
    console.error('Error fetching communities:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
  }
};

export const getUserCommunities = async (req: Request, res: Response) => {
  const userId = req.params.userId; // User ID from request params

  try {
    const user = await User.findById(userId).populate({
      path: 'communities',
      select: 'name description members',
    });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
    }

    res.status(StatusCodes.OK).json(user.communities);
  } catch (error) {
    console.error('Error fetching user communities:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
  }
};
