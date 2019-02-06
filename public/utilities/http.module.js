window.HTTP_MODULE = {
    fetchForCreateNewUser,
    fetchForLogUserIn,
    fetchCloset,
    //get closet item by id
    fetchForCreateNewItemInCloset,
    fetchForUpdateClosetItemData,
    fetchForDeleteClosetItemData
};

function fetchForCreateNewUser(userData) {
    fetch('/api/user/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        return response.json();
    })
    .then(responseJson => {
        if (responseJson.error) {
            throw new Error(responseJson.error);
        }
        return responseJson;
    })
    .then(responseJson => {     
        const userData = {
            jwtToken: responseJson.jwtToken,
            id: responseJson.id,
            name: responseJson.name,
            username: responseJson.username,
            email: responseJson.email
        };
        saveAuthenticatedUserIntoCache(responseJson);
        renderLoginForm();
    })
    .catch(err => {
        console.log('threw new 400 error');
        renderSignUpError(err.message);
       
    });
}

function fetchForLogUserIn(userData) {
    fetch ('/api/auth/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        return response.json();
    })
    .then(responseJson => {
        if (responseJson.error) {
            throw new Error(responseJson.error);
        }
        return responseJson;
    })
    .then (responseJson => {
        const userData = {
            jwtToken: responseJson.jwtToken,
            id: responseJson.user.id,
            name: responseJson.user.name,
            username: responseJson.user.username,
            email: responseJson.user.email
        };
        saveAuthenticatedUserIntoCache(userData);
        renderNavLoggedIn(userData.username);
        renderOptionsScreen(userData.username);
    })
    .catch(() => {
        renderLoginError();
    });
}


function fetchForCreateNewItemInCloset(newItem) {
    const jwtToken = localStorage.getItem("jwtToken");
    const loggedinUser = localStorage.getItem("userid");
    console.log(STORE.selCloset);
    let closet = selCloset;
    let fetchPath = '';
    if (localStorage.getItem("name") == 'Admin ID') {
        fetchPath = '/api/idealcloset/';
    } else {
        fetchPath = `/api/userclosets/${closet}closet/${loggedinUser}`;
    };
    console.log(fetchPath);
    fetch(fetchPath, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, *',
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify(newItem)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            };
            throw new Error(response.text);
        })
        .then(responseJson => {
            fetchCloset();
        })
        .catch(error => {
            console.log('Error: ', error)
        });
}

function fetchForUpdateClosetItemData(selectedItemId, updateObject) {
    const jwtToken = localStorage.getItem("jwtToken");
    const loggedinUser = localStorage.getItem("userid");
    let closet = STORE.selCloset;
    let fetchPath = '';
    if (localStorage.getItem("name") == 'Admin ID') {
        fetchPath = '/api/idealcloset/';
    } else {
        fetchPath = `/api/userclosets/${closet}closet/${loggedinUser}/${selectedItemId}`;
    };
        
   console.log(fetchPath);
    fetch(fetchPath, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, *',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify(updateObject)
        })

        .then(response =>  {
            if (response.ok) {
                return;
            }
            throw new Error(response.statusText);
        })
        .then(() => {
            fetchCloset();
        })
        
        .catch(error => {
            console.error('Error: ', error)
        });
}

function fetchForDeleteClosetItemData(selectedItemId) {
    const jwtToken = localStorage.getItem("jwtToken");
    const loggedinUser = localStorage.getItem("userid");
    let closet = STORE.selCloset;
    let fetchPath = '';

    if (localStorage.getItem("name") == 'Admin ID') {
        fetchPath = `/api/idealcloset/${selectedId}`;
    } else {
        fetchPath = `/api/userclosets/mycloset/${loggedinUser}/${selectedItemId}`;
    };
    console.log(fetchPath);
    fetch(fetchPath , {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json, text/plain, *',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        }
    })
    .then(response => {
        if (response.ok) {
            return;
        };
        throw new Error(response.text);
        })
    .then(() => {
        fetchCloset();
    })
    .catch(error => {
        console.log(error.message);
        //renderDeletionError(error.message);
    });
}

// show all items for the logged-in user
function fetchCloset() {
    console.log('which closet is selected? ' + STORE.selCloset);
    console.log('fetchMycloset fired');
    const jwtToken = localStorage.getItem("jwtToken");
    const loggedinUser = localStorage.getItem("userid");
    let dataMsg;
    let fetchPath;
    if (localStorage.getItem("name") == 'Admin ID') {
        fetchPath = '/api/idealcloset/';
    } else {
        switch(STORE.selCloset) {
            case 'ideal':
                fetchPath = '/api/idealcloset/';
                console.log('ideal fetchpath ' + fetchPath)
              break;
            case 'my':
                fetchPath = `/api/userclosets/mycloset/${loggedinUser}`;
              break;
            case 'giveaway':
                fetchPath = `/api/userclosets/giveawaycloset/${loggedinUser}`;
                console.log('giveaway fetchpath will go here: ' + STORE.selCloset + fetchPath );
                renderFake(loggedinUser);
              break;
            case 'donation':
                fetchPath = `/api/userclosets/donationcloset/${loggedinUser}`;
                console.log('giveaway fetchpath will go here: ' + STORE.selCloset, fetchPath );
                renderFake(loggedinUser);
              break;
            case 'analyze':
                console.log('analyze fetchPath will go here ', STORE.selCloset);
                renderFake(loggedinUser);
              break;
            default:
                console.log('it is another closet! ', STORE.selCloset);
                renderFake(loggedinUser);
        }
    };
    console.log(fetchPath);
    //  GET fetch request for My Closet
        fetch(fetchPath, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
        .then(response => {
            console.log(response);
            if (response.ok) {
            return response.json();
        };
        throw new Error(response.text);
        })
        .then(data => {
            if (data.length !== 0) {
                if (localStorage.getItem("name") !== 'Admin ID') {
                    renderNavMenu();
                } else {
                    renderNavAdmin();
                }
                renderCloset(data, loggedinUser);
            } else {
                if (localStorage.getItem("name") !== 'Admin ID') {
                    renderNavTwo();
                } else {
                    renderNavAdmin();
                }
                renderAddItemForm(dataMsg);
            };
        })
        .catch(error => console.log(error));
} 
