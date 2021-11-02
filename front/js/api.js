
function makeUrl(endpoint) {
    return `${API_URL}/${endpoint}`
};


function get(endpoint) {
    return fetch(makeUrl(endpoint));
}


function post(endpoint, options) {
    return fetch(makeUrl(endpoint), options);
}

