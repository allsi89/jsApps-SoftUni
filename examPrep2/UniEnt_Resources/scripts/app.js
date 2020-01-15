import router from "./router.js";
const app = Sammy("body", function() {
    this.use("Handlebars", "hbs");
    router(this);
})

app.run("/");

