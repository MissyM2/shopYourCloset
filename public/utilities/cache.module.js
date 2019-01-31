// saving and retrieving user from cache (localstorage)

window.CACHE_MODULE = {
    getAuthenticatedUserFromCache,
    saveAuthenticatedUserIntoCache,
    deleteAuthenticatedUserFromCache
};

function getAuthenticatedUserFromCache() {

    const jwtToken = localStorage.getItem('jwtToken');
    const userid = localStorage.getItem('userid');
    const username = localStorage.getItem('username');
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');

    if (jwtToken) {
        return {
            jwtToken,
            userid,
            username,
            name,
            email
        };
    } else {
        return undefined;
    }
}

function saveAuthenticatedUserIntoCache(userData) {
    if(!userData.id) throw new Error('no user id');
    localStorage.setItem('jwtToken', userData.jwtToken);
    localStorage.setItem('userid', userData.id);
    localStorage.setItem('username', userData.username);
    localStorage.setItem('name', userData.name);
    localStorage.setItem('email', userData.email);
}

function deleteAuthenticatedUserFromCache() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userid');
    localStorage.removeItem('username');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
}


