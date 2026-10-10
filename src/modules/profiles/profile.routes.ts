import { Router } from 'express';
import profileController from './profile.controller';

const router = Router();

// * create profile **
router.post('/', profileController.createProfile);

// * get all profiles **
router.get('/', profileController.getProfiles);

// * get user by id **
router.get('/:id', (req, res) => {
  res.send('Profile by id');
});

const profileRoutes = router;
export default profileRoutes;
