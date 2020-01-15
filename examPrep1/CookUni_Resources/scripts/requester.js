const baseUrl = "https://baas.kinvey.com";
const appKey = "kid_BkCM3RBpr";
const appSecret = "03321639ff3f411689e30c2b2acdcbf1";
const masterSecret = "5b4e52b592ac482b9ae7b26e9ac3b5c6";

function createAuthorisation(type) {
    if(type === "Basic") return `Basic ${btoa(`${appKey}:${appSecret}`)}`;

    if(type === "Special") return `Basic ${btoa(`${appKey}:${masterSecret}`)}`;
    
    return `Kinvey ${sessionStorage.getItem("authtoken")}`;

//    return type === "Basic" 
//     ? `Basic ${btoa(`${appKey}:${appSecret}`)}` 
//     : `Kinvey ${sessionStorage.getItem("authtoken")}`;
}

function createHeaders(httpMethod, data, type) {
    const headers = {
        method: httpMethod,
        headers: {
            "Authorization": createAuthorisation(type),
            "Content-Type": "application/json"
        }
    }

    if (httpMethod === "POST" || httpMethod === "PUT") {
        headers.body = JSON.stringify(data);

    }

    return headers;
}

function handleError(e) {
    if (!e.ok) {
        throw new Error(e.statusText);
    }

    return e;
}

function serializeData(x) {
    if(x.status === 204){
        return x;
    }
    return x.json();
}

function fetchData(kinveyModule, endpoint, headers) {
    const url = `${baseUrl}/${kinveyModule}/${appKey}/${endpoint}`;

    return fetch(url, headers)
        .then(handleError)
        .then(serializeData)
}

function get(kinveyModule, endpoint, type) {
    const headers = createHeaders("GET", type);
    return fetchData(kinveyModule, endpoint, headers);
}

function post(kinveyModule, endpoint, data, type) {
    const headers = createHeaders("POST", data, type);
    return fetchData(kinveyModule, endpoint, headers);
}

function put(kinveyModule, endpoint, data, type) {
    const headers = createHeaders("PUT", data, type);
    return fetchData(kinveyModule, endpoint, headers);
}

function del(kinveyModule, endpoint, type) {
    const headers = createHeaders("DELETE", type);
    return fetchData(kinveyModule, endpoint, headers);
}

export {
    get,
    post,
    put,
    del
};