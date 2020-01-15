import {
    loadAllPartials,
    setSessionInfo,
    displayError,
    displaySuccess,
    getSessionInfo
} from "../helpers.js";

import {
    post, get
} from "../requester.js";


export const userController = {

    getRegister: function (ctx) {
        const partials = {
            registerForm: "../templates/register/registerForm.hbs"
        };
        loadAllPartials(ctx, partials)
            .partial("../templates/register/registerPage.hbs")
    },

    postRegister: function (ctx) {
        const {
            username,
            password,
            rePassword
        } = ctx.params;

        if (username && password && rePassword) {
            if(password === rePassword) {
                post("user", "", {
                    username,
                    password
                }, "Basic")
                .then(() => {
                    displaySuccess("Successful registration!");

                    setTimeout(() => {
                        ctx.redirect("/login")
                    }, 2000)
                })
                .catch(e => displayError(e.message));
            } else {
                displayError("Passwords don't match!")
            }
           
        } else {
            displayError("No empty fields allowed!")
        }
    },

    getLogin: function (ctx) {
        const partials = {
            loginForm: "../templates/login/loginForm.hbs"
        };
        loadAllPartials(ctx, partials)
            .partial("../templates/login/loginPage.hbs");
    },

    postLogin: function (ctx) {
        const {
            username,
            password,
        } = ctx.params;

        if(username && password) {
            post("user", "login", {
                username,
                password
            }, "Basic")
            .then(uData => {
                setSessionInfo(uData);
            })
            .then(() => {
                displaySuccess("Successful login!");
                ctx.redirect("/");
            })
            .catch(e => {
                displayError(e.message);
            });
        }
    },

    logout: function (ctx) {
        post("user", "_logout", {}, "Kinvey")
        .then(() => {
            sessionStorage.clear();
            
        })
        .then(()=> {
            displaySuccess("Successfully logged out!")
            ctx.redirect("/")
        })
        .catch(e => displayError(e.message));
    },

    getProfile: function (ctx) {
        getSessionInfo(ctx);
        const id = ctx.userId;

        get("appdata", "events", "Kinvey")
        .then(data => {
            ctx.events = data.filter(e=> e._acl.creator === id);
            ctx.eventCount = ctx.events.length;

            const partials = {
                profileInfo: "../templates/profile/profileInfo.hbs"
            };

            loadAllPartials(ctx, partials)
            .partial("../templates/profile/profilePage.hbs");
        })
        .catch(e => displayError(e.message))
    }
}