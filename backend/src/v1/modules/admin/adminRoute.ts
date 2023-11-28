import { Router } from "express";
import { AdminController } from "./adminController";
import { Middleware } from "../../../middleware";
import  multer from 'multer';
const router: Router = Router();
const upload = multer();
const middleware: Middleware = new Middleware();
const adminController: AdminController = new AdminController();
router.post("/login", adminController.login);
router.post("/create-admin",adminController.createAdmin);
router.get("/disable-enable-admin", middleware.getAuthorizedAdmin,adminController.changeAdminStatus);
router.post("/add-product",upload.single('foodImage'),adminController.addProduct);
router.post("/add-resturant",upload.single('logo'),adminController.addResturant);
router.get("/disable-enable-food", middleware.getAuthorizedAdmin,adminController.changeFoodStatus)
router.get("/disable-enable-resturant", middleware.getAuthorizedAdmin,adminController.changeResturantStatus)
router.post("/add-food-category",adminController.addFoodCategory);

router.get("/get-product-list", middleware.getAuthorizedAdmin,adminController.getProducts);

router.get("/get-resturant-list", middleware.getAuthorizedAdmin,adminController.getResturants);
router.get("/get-admin-list", middleware.getAuthorizedAdmin,adminController.getAdminList);
router.get("/get-user-list", middleware.getAuthorizedAdmin,adminController.getUserList);
export const AdminRoute: Router = router;