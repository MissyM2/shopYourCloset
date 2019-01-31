// saving and retrieving user from cache (localstorage)

window.CACHE_MODULE = {
    getAuthenticatedUserFromCache,
    //saveAuthenticatedUserIntoCache,
    //deleteAuthenticatedUserFromCache
};

function getAuthenticatedUserFromCache() {
    console.log('getAuthenticatedUserFromCache fired');
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
        console.log('there is no token in localstorage');
        return undefined;
    }
}

function saveAuthenticatedUserIntoCache(userData) {
    localStorage.setItem('jwtToken', userData.jwtToken);
    localStorage.setItem('userid', userData.user.id);
    localStorage.setItem('username', userData.user.username);
    localStorage.setItem('name', userData.user.name);
    localStorage.setItem('email', userData.user.email);
}
/*
function deleteAuthenticatedUserFromCache() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userid');
    localStorage.removeItem('username');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
}

*/
