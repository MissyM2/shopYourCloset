window.HTTP_MODULE = {
    //fetchForUpdateClosetItemData,
    //handleErrors,
    genericFetch,
    cbLogin,
    cbGetCloset
};

//  most functions package their settings and call this generic fetch to connect to db
function genericFetch(url, settings, callback) {
    fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                if (response.status == 400 || response.status == 204) {
                    console.log('respons status is bad! ' + response.status);
                    throw new Error(response.status);
                } else if (response.status == 401) {
                    console.log('what the heck?');
                    throw new Error(response.status);
                }
            }
        })
        .then(responseJson => callback(responseJson))
        .catch(err => console.log("Error", err));
}

function cbLogin(data) {
    const userData = {
        jwtToken: data.jwtToken,
        id: data.user.id,
        name: data.user.name,
        username: data.user.username,
        email: data.user.email
    };
    saveAuthenticatedUserIntoCache(userData);
    STORE.authUser = localStorage.getItem("userid");
    STORE.authUserName = localStorage.getItem("username");
    renderNavLoggedIn();
    renderOptionsPage();
}

// fetch all items from the db to show in closets




function cbGetCloset(data) {
    let selMenu = '';
    if (data.length !== 0) {
        if (STORE.authUserName !== 'admin') {
            selMenu='users'
        } else {
            selMenu='admin';
        }
        renderNavMenu(selMenu);
        organizeData(data);
    } else {
        if (STORE.authUserName !== 'admin') {
            selMenu='users'
        } else {
            selMenu='admin';
        }
        renderNavMenu(selMenu);

        if (STORE.selCloset === 'my') {
            dataMsg = "Add your first item here.";
            renderAddItemForm(dataMsg);
        } else {
            renderInformationPage();
        }
    }
}


