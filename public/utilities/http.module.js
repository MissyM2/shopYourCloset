window.HTTP_MODULE = {
    fetchForCreateNewUser,
    fetchForLogUserIn,
    fetchCloset,
    //get closet item by id
    fetchForCreateNewItemInCloset,
    fetchForUpdateClosetItemData,
    fetchForDeleteClosetItemData,
    fetchForAnalysis
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
        //saveAuthenticatedUserIntoCache(responseJson);
        renderLoginForm();
    })
    .catch(err => {
       
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
        STORE.authUser = localStorage.getItem("userid");
        STORE.authUserName = localStorage.getItem("username");
        renderNavLoggedIn();
        renderOptionsPage();
    })
    .catch(() => {
        renderLoginError();
    });
}

// show all items for the logged-in user
function fetchCloset() {
    console.log(STORE.selCloset);
    const jwtToken = localStorage.getItem("jwtToken");
    console.log(STORE.authUser);
    let dataMsg;
    let fetchPath;
    if (STORE.authUserName === 'admin') {
        switch(STORE.selCloset) {
            case 'ideal':
                fetchPath = '/api/idealcloset/';
              break;
            case 'giveaway':
                fetchPath = `/api/groupclosets/giveawaycloset/`;
              break;
            default:
                console.log('error coming from fetch module! ', STORE.selCloset);
                
        }
    } else {
        switch(STORE.selCloset) {
            case 'ideal':
                fetchPath = '/api/idealcloset/';
              break;
            case 'my':
                fetchPath = `/api/userclosets/mycloset/${STORE.authUser}`;
              break;
            case 'giveaway':
                fetchPath = `/api/groupclosets/giveawaycloset/`;
              break;
            case 'donation':
                fetchPath = `/api/userclosets/donationcloset/${STORE.authUser}`;
              break;
            case 'analyze':
                console.log('analyze fetchPath will go here ', STORE.selCloset);
              break;
            default:
                console.log('error coming from fetch module ', STORE.selCloset);
                
        }
    };
    //  GET fetch request for My Closet

    if (STORE.selCloset === 'my' || STORE.selCloset === 'ideal' || STORE.selCloset === 'donation' || STORE.selCloset === 'giveaway') {
        console.log(fetchPath);
                fetch(fetchPath, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`
                    }
                })
                .then(response => {
                    if (response.ok) {
                    return response.json();
                };
                throw new Error(response.text);
                })
                .then(data => {
                    if (data.length !== 0) {
                        if (STORE.authUserName !== 'admin') {
                            renderNavMenu();
                        } else {
                            renderNavAdmin();
                           
                        }
                        ETC.organizeData(data);
                    } else {
                        if (STORE.authUserName !== 'admin') {
                            renderNavMenu();
                        } else {
                            renderNavAdmin();
                        }
                        if (STORE.selCloset === 'my') {
                            dataMsg = "There are no items in your closet.  Add the first one here.";
                            renderAddItemForm(dataMsg);
                        } else {
                            renderInformationPage();
                        }
                    };
                })
                .catch(error => console.log(error));
    } else if (STORE.selCloset == 'analyze') {
        RENDER.renderNavMenu();
        HTTP.fetchForAnalysis();
    } else {
        console.log('ran out of closets.  Whoopsy, mistakes have been made!');
    }
} 



function fetchForCreateNewItemInCloset(newItem) {
    const jwtToken = localStorage.getItem("jwtToken");
    const authUser = localStorage.getItem("userid");
    let closet = STORE.selCloset;
    console.log(closet);
    let fetchPath = '';
    if (STORE.authUserName === 'admin') {
        fetchPath = '/api/idealcloset/';
    } else {
        console.log('selected closet is ', STORE.selCloset);
        fetchPath = `/api/userclosets/${STORE.selCloset}closet/${authUser}`;
    };
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
    const authUser = localStorage.getItem('userid');
    console.log('selected item is ', selectedItemId);
    let closet = STORE.selCloset;
    let fetchPath = '';
    if (STORE.authUserName === 'admin') {
        fetchPath = `/api/idealcloset/${selectedItemId}`;
    } else {
        fetchPath = `/api/userclosets/${closet}closet/${authUser}/${selectedItemId}`;
    };
        
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
            HTTP.fetchCloset();
        })
        
        .catch(error => {
            console.error('Error: ', error)
        });
}

function fetchForDeleteClosetItemData(selectedItemId) {
    const jwtToken = localStorage.getItem("jwtToken");
    let closet = STORE.selCloset;
    let fetchPath = '';

    if (localStorage.getItem("name") == 'Admin ID') {
        fetchPath = `/api/idealcloset/${selectedId}`;
    } else {
        fetchPath = `/api/userclosets/mycloset/${STORE.authUser}/${selectedItemId}`;
    };
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


function fetchForAnalysis() {
    const jwtToken = localStorage.getItem("jwtToken");
    //  GET fetch request for My Closet and put number in STORE
    let fetchPath = `/api/idealcloset/`;
        fetch(fetchPath, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
        .then(response => {
            if (response.ok) {
            return response.json();
        };
        throw new Error(response.text);
        })
        .then(data => {
            if (data.length !== 0) {
                STORE.idealClosetLength = data.length;
            } else {
                console.log('is data length 0?');
            }
        })
        .catch(error => console.log(error));

        //  GET fetch request for My closet and put number in STORE
        fetchPath = `/api/userclosets/mycloset/${STORE.authUser}`;
        fetch(fetchPath, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
        .then(response => {
            if (response.ok) {
            return response.json();
        };
        throw new Error(response.text);
        })
        .then(data => {
            if (data.length !== 0) {
                STORE.myClosetLength = data.length;
                RENDER.renderNavMenu();
                RENDER.renderAnalysis();
            } else {
                console.log('is data length 0?');
            }
        })
        .catch(error => console.log(error));
         
         RENDER.renderNavMenu();
         RENDER.renderAnalysis();

}
