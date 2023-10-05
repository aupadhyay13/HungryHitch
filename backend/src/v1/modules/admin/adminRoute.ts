import { Router } from "express";
import { AdminController } from "./adminController";
import { Middleware } from "../../../middleware";

const router: Router = Router();
const middleware: Middleware = new Middleware();
const adminController: AdminController = new AdminController();
router.post("/login", adminController.login);
router.post("/create-admin", adminController.createAdmin);
router.post("/add-product", middleware.getAuthorizedAdmin,adminController.addProduct);
router.get("/get-product-list", middleware.getAuthorizedAdmin,adminController.getProducts);

export const AdminRoute: Router = router;