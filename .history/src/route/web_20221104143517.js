import express from "express";
import homeController from "../controller/homeController"
import userController from '../controller/userController'
const router = express.Router();

let initWebRoute = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCrud);
    router.post('/post-crud', homeController.postCrud);
    router.get('/get-crud', homeController.displayGetCrud);
    router.get('/edit-crud', homeController.getEditCrud);
    router.post('/put-crud', homeController.putCrud);
    router.get('/delete-crud', homeController.deleteCrud);

    router.post('/api/login', userController.handleLogin)
    return app.use("/", router);
}

export default initWebRoute;