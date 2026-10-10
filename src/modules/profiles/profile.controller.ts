import type { Request, Response } from 'express';
import profileService from './profile.service';

const createProfile = async (req: Request, res: Response) => {
  try {
    const result = await profileService.createProfile(req.body);
    res.status(201).json({
      success: true,
      message: 'Profile created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
};

const getProfiles = async (req: Request, res: Response) => {
  try {
    const result = await profileService.getProfiles();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
};
// const getUserById = async (req: Request, res: Response) => {
//   const id = req.params.id;
//   try {
//     const result = await profileService.getUserById(id as string);
//     if (!result) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found',
//       });
//     } else {
//       res.status(200).json({
//         success: true,
//         message: 'User fetched successfully',
//         data: result,
//       });
//     }
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//       error,
//     });
//   }
// };

const profileController = {
  createProfile,
  getProfiles,
  //   getUserById,
};

export default profileController;
