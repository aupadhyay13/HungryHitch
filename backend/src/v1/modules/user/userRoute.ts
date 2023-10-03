import { Router } from "express";
import { UserController } from "./userController";

const router: Router = Router();
const userController: UserController = new UserController();
router.post("/signup", userController.signUp);
router.post("/login", userController.login);
export const UserRoute: Router = router;