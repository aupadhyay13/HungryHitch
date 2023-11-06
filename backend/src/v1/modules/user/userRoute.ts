import { Router } from "express";
import { UserController } from "./userController";
import { Middleware } from "../../../middleware";

const middlware = new Middleware();
const router: Router = Router();
const userController: UserController = new UserController();
router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.get("/get-food-list",userController.getProducts);
router.get("/get-food-item",userController.getProduct);
router.post("/update-profile", middlware.getAuthorizedUser,userController.updateProfile);

export const UserRoute: Router = router;