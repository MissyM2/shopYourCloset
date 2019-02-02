window.HTTP_MODULE = {
    fetchForCreateNewUser,
    fetchForLogUserIn,
    fetchCloset,
    //get closet item by id
    fetchForCreateNewItemInCloset,
    fetchForUpdateClosetItemData,
    fetchForDeleteClosetItemData,
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
        renderOptionsScreen(userData.name);
    })
    .catch(() => {
        renderLoginError();
    });
}


function fetchForCreateNewItemInCloset(newItem) {
    const jwtToken = localStorage.getItem("jwtToken");
    console.log(closetChoice);
    fetch('/api/myitem/', {
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

function fetchForUpdateClosetItemData(closetitemId, updateObject) {
        console.log('updateItemInMycloset fired');
        const jwtToken = localStorage.getItem('jwtToken');
        const fetchPath=`/api/${closetChoice}item/${closetitemId}/`;
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
                    return response.json();
                }
                //throw new Error('HTTP error, status = ' + response.text, response.status);
               
            })

            .then(responseJson => {
                if (responseJson.error) {
                    throw new Error(responseJson.error);
                }
                return responseJson;
            })
            .then(responseJson => {
                console.log('responseJson is ' + JSON.stringify(responseJson));
                console.log('Success: ', JSON.stringify(responseJson));
                //$('.mycloset').empty();
               //fetchCloset();
            })
            
            .catch(error => {
                console.error('Error: ', error)
            });
}

function fetchForDeleteClosetItemData(selectedId) {
    const jwtToken = localStorage.getItem("jwtToken");
    const fetchPath= `/api/${closetChoice}item/${selectedId}`;
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
            console.log(response);
            return response.json();
        };
        throw new Error(response.text);
        })
    .then(responseJson => {
        fetchCloset();
    })
    .catch(error => {
        console.log(error.message);
        //renderDeletionError(error.message);
    });
}





function fetchCloset() {
    console.log('fetchMycloset fired');
    const jwtToken = localStorage.getItem("jwtToken");
    //  GET fetch request for My Closet
        fetch(`/api/${closetChoice}item/`, {
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
                renderOptionsScreenMin();
                renderCloset(data);
            } else {
                renderOptionsScreenMin();
                renderCloset();
                //renderAddItemForm();
            };
        })
        .catch(error => console.log(error));
} 

