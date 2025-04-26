import express from 'express';
import { isAuth, login, logout, register } from '../controllers/UserController.js';
import authUser from '../middlewares/authUser.js';

const userRouter = express.Router(); // create a new router object

userRouter.post('/register', register)
userRouter.post('/login', login) // define the login route and associate it with the login controller
userRouter.get('/is-auth', authUser , isAuth) // define the is-auth route and associate it with the authUser middleware and isAuth controller
userRouter.get('/logout', authUser , logout) // define the logout route and associate it with the authUser middleware and logout controller


export default userRouter; // export the router object to be used in other files