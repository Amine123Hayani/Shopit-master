import { Router } from 'express'
import { protect, admin } from '../middelware/authMiddelware.js'
const router = Router()
import {
  authUser,
  deleteUser,
  getUserProfile,
  getUsers,
  registerUser,
  updateUserProfile,
  getUserById,
  updateUser,
} from '../controllers/userController.js'

// @desc    auth the user and get a token
// @route   POST api/users/login
// @access  public
router.post('/login', authUser)

// @desc    get logged in a user
// @route   GET api/users/profile
// @access  private
// &&
// @desc    update user profile
// @route   PUT api/users/profile
// @access  private
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

// @desc    register a user
// @route   POST api/users
// @access  public
router.route('/').post(registerUser).get(protect, admin, getUsers)

router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
export default router
