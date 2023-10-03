import { Router } from "express";
import { AdminController } from "./adminController";

const router: Router = Router();
const adminController: AdminController = new AdminController();
router.post("/login", adminController.login);
router.post("/create-admin", adminController.createAdmin);
router.post("/add-product", adminController.addProduct);

export const AdminRoute: Router = router;