import { homeController } from "./controllers/homeController.js";
import { userController } from "./controllers/userController.js";
import {recipeController} from "./controllers/recipeController.js";

export default function Router(app) {
    app.get("/", homeController.getHome);
    app.get("/index.html", homeController.getHome);
    app.get("/home", homeController.getHome);
    app.get("/about", homeController.getAbout);

    app.get("/register", userController.getRegister);
    app.post("/register", userController.postRegister);
    app.get("/login", userController.getLogin);
    app.post("/login", userController.postLogin);
    app.get("/logout", userController.logout);

    app.get("/recipes/:recipeId", recipeController.getRecipeInfo);

    app.get("/create", recipeController.getCreate);
    app.post("/create", recipeController.postCreate);

    app.get("/edit/:recipeId", recipeController.getEdit);
    app.post("/edit/:recipeId", recipeController.postEdit);

    app.get("/del/:recipeId", recipeController.archive);
    app.get("/like/:recipeId", recipeController.like);
}