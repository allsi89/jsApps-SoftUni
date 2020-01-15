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

export const eventController = {
    getEventDetails: function (ctx) {
        getSessionInfo(ctx);
        const id = ctx.params.eventId;
        const linkParams = `${location.protocol}//${location.host}`;

        get("appdata", `events/${id}`, "Kinvey")
            .then(data => {
                ctx.name = data.name;
                ctx.dateTime = data.dateTime;
                ctx.description = data.description;
                ctx.imageURL = data.imageURL;
                ctx.isAuthor = data._acl.creator === ctx.userId;
                ctx.eventId = data._id;
                ctx.participantsCount = data.participants.length;
                ctx.author = data.author;

                sessionStorage.setItem("author", data._acl.creator);

                const partials = {
                    eventDetails: `${linkParams}/templates/details/eventDetails.hbs`
                }

                loadAllPartials(ctx, partials)
                    .partial(`${linkParams}/templates/details/detailsPage.hbs`);

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
            name,
            dateTime,
            description,
            imageURL
        } = ctx.params;

        const participants = [];
        const author = ctx.username;

        const eventData = {
            name,
            dateTime,
            description,
            imageURL,
            participants,
            author
        };

        if (name && dateTime && description && imageURL) {
            post("appdata", "events", eventData, "Kinvey")
                .then(ctx.redirect("/home"))
                .then(displaySuccess("Successfully created!"))
                .catch(e => displayError(e.message))
        } else {
            displayError("All fields must be filled!")
        }

    },

    getEdit: function (ctx) {
        getSessionInfo(ctx);
        const id = ctx.params.eventId;

        get("appdata", `events/${id}`, "Kinvey")
            .then(data => {
                ctx.name = data.name;
                ctx.dateTime = data.dateTime;
                ctx.description = data.description;
                ctx.imageURL = data.imageURL;
                ctx.eventId = id;

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
            name,
            dateTime,
            description,
            imageURL
        } = ctx.params;

        const author = sessionStorage.getItem("author");
        sessionStorage.removeItem("author");

        const id = ctx.params.eventId;

        if (author === ctx.userId) {
            if (name && dateTime && description && imageURL) {
                get("appdata", `events/${id}`, "Kinvey")
                .then(data => {
                    put("appdata", `events/${id}`, {
                        name,
                        dateTime,
                        description,
                        imageURL,
                        author: data.author,
                        participants: data.participants
                    }, "Kinvey")
                }).then(() => {
                    displaySuccess("Successfully updated!")
                    ctx.redirect("/home")
                })
                .catch(e => displayError(e.message));
                    
            } else {
                displayError("All fields must be filled!");
            }
            
            
        } else {
            displayError("Unauthorized operation!");
        }
    },

    join: function (ctx) {
        getSessionInfo(ctx);
        const id = ctx.params.eventId;
        const userId = ctx.userId;

        get("appdata", `events/${id}`, "Kinvey")
            .then(data => {
                if (data._acl.creator === userId) {
                    throw new Error("Unauthorized operation!")
                }
                data.participants.push(userId);
                return data;
            })
            .then(data => put("appdata", `events/${id}`, data, "Special"))
            .then(displaySuccess("Successfully joined!"))
            .then(ctx.redirect("/"))
            .catch(e => displayError(e.message));
    },

    close: function (ctx) {
        getSessionInfo(ctx);
        const id = ctx.params.eventId;
        const author = sessionStorage.getItem("author");
        sessionStorage.removeItem("author");

        if(author === ctx.userId) {
            del("appdata", `events/${id}`, "Kinvey")
            .then(displaySuccess("Event closed!"))
            .then(() => {
                ctx.redirect("/");
            })
            .catch(e => displayError(e.message));
        } else {
            displayError("Unauthorized operation!")
        }
    }
}