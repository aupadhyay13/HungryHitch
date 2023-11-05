import { Router } from "express";
import { AdminController } from "./adminController";
import { Middleware } from "../../../middleware";

const router: Router = Router();
const middleware: Middleware = new Middleware();
const adminController: AdminController = new AdminController();
router.post("/login", adminController.login);
router.post("/create-admin",adminController.createAdmin);
router.get("/disable-enable-admin", middleware.getAuthorizedAdmin,adminController.changeAdminStatus);
router.post("/add-product",adminController.addProduct);
router.get("/disable-enable-food", middleware.getAuthorizedAdmin,adminController.changeFoodStatus)
router.get("/get-product-list", middleware.getAuthorizedAdmin,adminController.getProducts);
router.get("/get-admin-list", middleware.getAuthorizedAdmin,adminController.getAdminList);
router.get("/get-user-list", middleware.getAuthorizedAdmin,adminController.getUserList);
export const AdminRoute: Router = router;