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
        renderSignUpError(undefined, err.message);
       
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
    .catch(error => {
        console.log(error.text);
        renderSignUpError(undefined, error.message);
    });
}


function fetchForCreateNewItemInCloset(newItem) {
    const authToken = localStorage.getItem("authToken");
    console.log(closetChoice);
    let fetchPath=`/api/${closetChoice}closet/`;
    
    fetch(fetchPath, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, *',
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Bearer ${authToken}`
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
        const authToken = localStorage.getItem("authToken");
        let fetchPath=`/api/${closetChoice}closet/${closetitemId}/`;

        console.log(fetchPath);
        console.log(updateObject);
    console.log(JSON.stringify(updateObject));
    
        fetch(fetchPath, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, *',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(updateObject)
            })
            .then(response =>  {
                if (response.ok) {
                    console.log(response);
                    return response.json();
                }
                console.log(response);
                throw new Error(response.text);
            })
            .then(responseJson => {
                console.log('responseJson is ' + responseJson);
                //console.log('Success: ', JSON.stringify(responseJson));
                //$('.mycloset').empty();
               fetchCloset();
            })
            .catch(error => {
                console.error('Error: ', error)
            });
}

function fetchForDeleteClosetItemData(closetItemId) {
    const fetchPath= `/api/${closetChoice}closet/${closetItemId}`;
    const authToken = localStorage.getItem("authToken");
    fetch(fetchPath , {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json, text/plain, *',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        };
        throw new Error(response.text);
    })
    .then(responseJson => {
        console.log('Success:', JSON.stringify(responseJson));
        //$('.closet').empty();
        fetchCloset(closetChoice);
    })
    .catch(error => {
        console.error('Error: ', error)
    });
}





function fetchCloset() {
    console.log('fetchMycloset fired');
    const authToken = localStorage.getItem("authToken");
    //  GET fetch request for My Closet
        fetch(`/api/${closetChoice}item/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`
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
                console.log('Success:  ', JSON.stringify(data));
                renderCloset(data);
            } else {
                console.log('sorry, no data:  add your first item');
            };
        })
        .catch(error => console.log(error));
} 

