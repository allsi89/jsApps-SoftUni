import { homeController } from "./controllers/homeController.js";
import { userController } from "./controllers/userController.js";
import {eventController} from "./controllers/eventController.js";

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
    app.get("/profile", userController.getProfile);

    app.get("/details/:eventId", eventController.getEventDetails);

    app.get("/create", eventController.getCreate);
    app.post("/create", eventController.postCreate);

    app.get("/edit/:eventId", eventController.getEdit);
    app.post("/edit/:eventId", eventController.postEdit);

    app.get("/del/:eventId", eventController.close);
    app.get("/join/:eventId", eventController.join);
}