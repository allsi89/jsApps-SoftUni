import {
    getSessionInfo,
    loadAllPartials
} from "../helpers.js";
import { get } from "../requester.js";

export const homeController = {
    getHome: function (ctx) {
        getSessionInfo(ctx);
        if(ctx.loggedIn) {
            const partials = {
                recipe: "../templates/home/recipe.hbs"
            }
            get("appdata", "recipes", "Kinvey")
            .then(rData => {
                ctx.recipes = rData;
                loadAllPartials(ctx, partials)
                .partial("../templates/home/home.hbs");
            })
            .catch(console.error);

           
        } else {
            loadAllPartials(ctx)
            .partial("../templates/home/homeAnonymous.hbs");
        }
    },

    // getAbout: function (ctx) {
    //     getSessionInfo(ctx);
    //     loadAllPartials(ctx)
    //         .partial("../templates/about/about.hbs");
    // }
}