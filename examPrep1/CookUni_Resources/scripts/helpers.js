export function loadAllPartials(ctx, partials) {
    const defaultPartials = {
        header: "./templates/common/header.hbs",
        notifications: "./templates/common/notifications.hbs",
        footer: "./templates/common/footer.hbs"
    };

    for (const key in partials) {
        if (partials.hasOwnProperty(key)) {
            defaultPartials[key] = partials[key];
        }
    }
    return ctx.loadPartials(defaultPartials);
}

export function getSessionInfo(ctx) {
    ctx.loggedIn = sessionStorage.getItem("authtoken") !== null;
    ctx.authtoken = sessionStorage.getItem("authtoken");
    ctx.fullName = sessionStorage.getItem("fullName");
    ctx.userId = sessionStorage.getItem("userId");
}

export function setSessionInfo(uData) {
    sessionStorage.setItem("userId", uData._id);
    sessionStorage.setItem("authtoken", uData._kmd.authtoken);
    sessionStorage.setItem("fullName", `${uData.firstName} ${uData.lastName}`);
}

export function displayError(msg) {
    const errorBox = document.getElementById("errorBox");
    errorBox.style.display = "block";
    errorBox.textContent = msg;
    setTimeout(() => {
        errorBox.style.direction = "none";
    }, 2000)

}

export function displaySuccess(msg) {
    const successBox = document.getElementById("successBox");
    successBox.style.display = "block";
    successBox.textContent = msg;
    setTimeout(() => {
        successBox.style.direction = "none";
    }, 4000)

}