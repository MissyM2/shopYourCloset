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
        renderNavOne(userData.username);
        renderOptionsScreen(userData.username);
    })
    .catch(() => {
        renderLoginError();
    });
}


function fetchForCreateNewItemInCloset(newItem, closet) {
    const jwtToken = localStorage.getItem("jwtToken");
    const loggedinUser = localStorage.getItem("userid");
    let fetchPath = '';
    if (localStorage.getItem("name") == 'Admin ID') {
        fetchPath = '/api/idealcloset/';
    } else {
        fetchPath = `/api/userclosets/${loggedinUser}`;
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
            fetchCloset(closet);
        })
        .catch(error => {
            console.log('Error: ', error)
        });
}

function fetchForUpdateClosetItemData(selectedId, updateObject) {
    const jwtToken = localStorage.getItem('jwtToken');
    console.log(selectedId);

    console.log('updateItemInMycloset fired');

    let fetchPath = '';
    if (localStorage.getItem("name") == 'Admin ID') {
        fetchPath = `/api/idealcloset/${selectedId}`;
    } else {
        fetchPath = `/api/userclosets/${loggedinUser}/${selectedId}`;
    };
        
    //const fetchPath=`/api/${closetChoice}item/${selectedId}/`;
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

function fetchForDeleteClosetItemData(selectedItemId, closet) {
    const jwtToken = localStorage.getItem("jwtToken");

    const loggedinUser = localStorage.getItem("userid");
    let fetchPath = '';
    if (localStorage.getItem("name") == 'Admin ID') {
        fetchPath = `/api/idealcloset/${selectedId}`;
    } else {
        fetchPath = `/api/userclosets/${loggedinUser}/${selectedItemId}`;
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
        fetchCloset(closet);
    })
    .catch(error => {
        console.log(error.message);
        //renderDeletionError(error.message);
    });
}

// show all items for the logged-in user
function fetchCloset(closet) {
    console.log('which closet is selected? ' + closet);
    console.log('fetchMycloset fired');
    const jwtToken = localStorage.getItem("jwtToken");
    const loggedinUser = localStorage.getItem("userid");
    let dataMsg;
    let fetchPath;
    if (localStorage.getItem("name") == 'Admin ID') {
        fetchPath = '/api/idealcloset/';
    } else {
        switch(closet) {
            case 'ideal':
            fetchPath = '/api/idealcloset/';
              break;
            case 'my':
                fetchPath = `/api/userclosets/${loggedinUser}`;
              break;
            case 'giveaway':
                console.log('giveaway fetchpath will go here ', closet);
                renderFake(closet, loggedinUser);
              break;
            case 'donation':
                console.log('donation fetch path will go here ', closet);
                renderFake(closet, loggedinUser);
              break;
            case 'analyze':
                console.log('analyze fetchPath will go here ', closet);
                renderFake(closet, loggedinUser);
              break;
            default:
                console.log('it is another closet! ', closet);
                renderFake(closet, loggedinUser);
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
                    renderNavTwo(closet);
                } else {
                    renderNavAdmin(closet);
                }
                renderCloset(data, closet, loggedinUser);
            } else {
                if (localStorage.getItem("name") !== 'Admin ID') {
                    renderNavTwo(closet);
                } else {
                    renderNavAdmin(closet);
                }
                renderAddItemForm(dataMsg, closet);
            };
        })
        .catch(error => console.log(error));
} 
