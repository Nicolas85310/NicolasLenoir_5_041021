
function makeUrl(endpoint) {
    return `${API_URL}/${endpoint}`
};


function get(endpoint) {
    return fetch(makeUrl(endpoint));
}


function post(endpoint, data) {
    return fetch(makeUrl(endpoint), {});
}

