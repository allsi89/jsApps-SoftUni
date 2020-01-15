import {
    loadAllPartials,
    setSessionInfo,
    displayError,
    displaySuccess
} from "../helpers.js";

import {
    post
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
            firstName,
            lastName,
            username,
            password,
            repeatPassword
        } = ctx.params;

        if (firstName && lastName && username && password && repeatPassword) {
            if(password === repeatPassword) {
                post("user", "", {
                    firstName,
                    lastName,
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
                displaySuccess("Successful login!")
                setTimeout(() => {
                    ctx.redirect("/")
                }, 2000)
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
            ctx.redirect("/")
        })
        .catch(console.error);
    }
}