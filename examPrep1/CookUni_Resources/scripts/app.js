import router from "./router.js";
const app = Sammy("#rooter", function() {
    this.use("Handlebars", "hbs");
    router(this);
})

app.run();

