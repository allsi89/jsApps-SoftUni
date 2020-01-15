import {
    getSessionInfo,
    loadAllPartials
} from "../helpers.js";
import { get } from "../requester.js";

export const homeController = {
    getHome: function (ctx) {
        getSessionInfo(ctx);

        if(ctx.loggedIn) {
            get("appdata", "events", "Kinvey")
            .then(rData => {
                const partials = {
                    eventInfo: "../templates/home/eventInfo.hbs",
                    noEvent: "../templates/home/noEvent.hbs"
                }
                ctx.events = rData.sort((a,b)=> b.participants.length - a.participants.length);
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