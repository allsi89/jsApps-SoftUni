export function loadAllPartials(ctx, partials) {
    const defaultPartials = {
        header: "./templates/common/header.hbs",
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
    ctx.username = sessionStorage.getItem("username");
    ctx.userId = sessionStorage.getItem("userId");
}

export function setSessionInfo(uData) {
    sessionStorage.setItem("userId", uData._id);
    sessionStorage.setItem("authtoken", uData._kmd.authtoken);
    sessionStorage.setItem("username", uData.username);
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
    }, 3000)

}