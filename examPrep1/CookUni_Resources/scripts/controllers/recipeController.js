import {
    loadAllPartials,
    getSessionInfo,
    displayError,
    displaySuccess
} from "../helpers.js";

import {
    get,
    put,
    post,
    del
} from "../requester.js";

const categories = {
    "Select category...": "",
    "Vegetables and legumes/beans": "https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549__340.jpg",
    "Fruits": "https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029__340.jpg",
    "Grain Food": "https://cdn.pixabay.com/photo/2014/12/11/02/55/corn-syrup-563796__340.jpg",
    "Milk, cheese, eggs and alternatives": "https://image.shutterstock.com/image-photo/assorted-dairy-products-milk-yogurt-260nw-530162824.jpg",
    "Lean meats and poultry, fish and alternatives": "https://t3.ftcdn.net/jpg/01/18/84/52/240_F_118845283_n9uWnb81tg8cG7Rf9y3McWT1DT1ZKTDx.jpg"
}

export const recipeController = {
    getRecipeInfo: function (ctx) {
        getSessionInfo(ctx);
        const id = ctx.params.recipeId;
        const linkParams = `${location.protocol}//${location.host}`;

        get("appdata", `recipes/${id}`, "Kinvey")
            .then(rData => {
                ctx.meal = rData.meal;
                ctx.ingredients = rData.ingredients;
                ctx.prepMethod = rData.prepMethod;
                ctx.description = rData.description;
                ctx.foodImageURL = rData.foodImageURL;
                ctx.likesCounter = rData.likesCounter;
                ctx.isAuthor = rData._acl.creator === ctx.userId;
                ctx.recipeId = rData._id;

                const partials = {
                    recipeActions: `${linkParams}/templates/details/recipeActions.hbs`
                }

                loadAllPartials(ctx, partials)
                    .partial(`${linkParams}/templates/details/details.hbs`);

            })
            .catch(console.error);
    },

    getCreate: function (ctx) {
        getSessionInfo(ctx);
        const partials = {
            createForm: "../templates/create/createForm.hbs"
        }

        loadAllPartials(ctx, partials)
            .partial("../templates/create/createPage.hbs");

    },

    postCreate: function (ctx) {
        getSessionInfo(ctx);
        const {
            meal,
            prepMethod,
            description,
            foodImageURL,
            category
        } = ctx.params;

        const ingredients = ctx.params.ingredients.split(", ").filter(e => e !== "");
        const categoryImageURL = categories[category];
        const likesCounter = 0;

        const recipeData = {
            meal,
            ingredients,
            prepMethod,
            description,
            foodImageURL,
            category,
            likesCounter,
            categoryImageURL
        };

        if (meal && prepMethod && description && foodImageURL && category && categoryImageURL && ingredients.length > 0) {
            post("appdata", "recipes", recipeData, "Kinvey")
                .then(ctx.redirect("/home"))
                .then(displaySuccess("Successfully created!"))
                .catch(e=> displayError(e.message))
        } else {
            displayError("All fields must be filled!")
        }

    },

    getEdit: function (ctx) {
        getSessionInfo(ctx);
        const id = ctx.params.recipeId;

        get("appdata", `recipes/${id}`, "Kinvey")
            .then(rData => {
                ctx.meal = rData.meal;
                ctx.ingredients = rData.ingredients.join(", ");
                ctx.prepMethod = rData.prepMethod;
                ctx.description = rData.description;
                ctx.category = rData.category;
                ctx.foodImageURL = rData.foodImageURL;
                ctx.recipeId = rData._id;
                sessionStorage.setItem("author", rData._acl.creator);

                const partials = {
                    editForm: "../templates/edit/editForm.hbs"
                }

                loadAllPartials(ctx, partials)
                    .partial("../templates/edit/editPage.hbs");
            })
            .catch(console.error)
    },

    postEdit: function (ctx) {
        getSessionInfo(ctx);
        const {
            meal,
            prepMethod,
            description,
            foodImageURL,
            category
        } = ctx.params;

        const categoryImageURL = categories[category];

        const ingredients = ctx.params.ingredients.split(", ").filter(e => e !== "");

        const author = sessionStorage.getItem("author");
        sessionStorage.removeItem("author");

        const id = ctx.params.recipeId;

        try {
            if (author !== ctx.userId) {
                let msg = "Unauthorized operation!";
                throw new Error(msg);
            }

            if (meal && prepMethod && description && foodImageURL &&
                category && categoryImageURL && ingredients.length > 0) {

                    put("appdata", `recipes/${id}`, {
                        meal,
                        ingredients,
                        prepMethod,
                        description,
                        category,
                        foodImageURL,
                        categoryImageURL
                    }, "Special")
                    .then(displaySuccess("Successfully updated!"))
                    .then(ctx.redirect("/"))
                    .catch(e=>displayError(e.message));
            } else {
                throw new Error("All fields must be filled!")

            }

        } catch (e) {
            displayError(e.message);
            setTimeout(() => {
                ctx.redirect(`/edit/${id}`)
            }, 2000)
        }
    },

    like: function (ctx) {
        getSessionInfo(ctx);
        const id = ctx.params.recipeId;

        get("appdata", `recipes/${id}`, "Kinvey")
            .then(rData => {
                if (rData._acl.creator === ctx.userId) {
                    throw new Error("Unauthorized operation!")
                }
                rData.likesCounter += 1;
                return rData;
            })
            .then(rData => put("appdata", `recipes/${id}`, rData, "Special"))
            .then(displaySuccess("Successfully updated!"))
            .then(ctx.redirect("/"))
            .catch(e=> displayError(e.message));
    },

    archive: function (ctx) {
        getSessionInfo(ctx);
        const id = ctx.params.recipeId;

        get("appdata", `recipes/${id}`, "Kinvey")
            .then(rData => {
                if (rData._acl.creator !== ctx.userId) {
                    throw new Error("Unauthorized operation!")
                }
                return rData;
            })
            .then(del("appdata", `recipes/${id}`, "Kinvey"))
            .then(displaySuccess("Recipe arhived!"))
            .then(() => {
                ctx.redirect("/");
            })
            .catch(e => displayError(e.message));
    }
}