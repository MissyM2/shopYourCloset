window.HTTP_MODULE = {
    fetchCloset,
    fetchForUpdateClosetItemData,
    //handleErrors,
    genericFetch
};

function genericFetch(url, settings, callback) {
    fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                if (response.status == 400) {
                    return console.log('respons status is bad! ' + response.status);
                } else {
                    return console.log('what the heck?');
                }
            }
        })
        .then(responseJson => callback(responseJson))
        .catch(err => console.log("Error", err));
}

// show all items for the logged-in user
function fetchCloset() {
    const jwtToken = localStorage.getItem("jwtToken");
    const authUser = localStorage.getItem('userid');

    let getClosetUrl = '';
    if (STORE.authUserName === 'admin') {
        switch(STORE.selCloset) {
            case 'ideal':
                    getClosetUrl = '/api/idealcloset/';
                    break;
            case 'giveaway':
                    getClosetUrl = `/api/groupclosets/giveawaycloset/`;
                    break;
            default:
                    console.log('error coming from fetch module! ', STORE.selCloset);
                
        }
    } else {
        switch(STORE.selCloset) {
            case 'ideal':
                    getClosetUrl = '/api/idealcloset/';
                    break;
            case 'my':
                    getClosetUrl = `/api/userclosets/mycloset/${authUser}`;
                    break;
            case 'giveaway':
                    getClosetUrl = `/api/groupclosets/giveawaycloset/`;
                    break;
            case 'donation':
                    getClosetUrl = `/api/userclosets/donationcloset/${authUser}`;
                    break;
            case 'analyze':
                    fetchForAnalysis();
                    break;
            default:
                    console.log('error coming from fetch module ', STORE.selCloset);
                
        }
    }
    
    let getClosetSettings = {
        "method": "GET",
        "headers": {
            'Accept': 'application/json, text/plain, *',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        }
    }

    HTTP.genericFetch(getClosetUrl, getClosetSettings, cbGetCloset);
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


function cbGetCloset(data) {
    if (data.length !== 0) {
        if (STORE.authUserName !== 'admin') {
            renderNavMenu();
        } else {
            renderNavAdmin();
        }
        organizeData(data);
    } else {
        if (STORE.authUserName !== 'admin') {
            renderNavMenu();
        } else {
            renderNavAdmin();
        }
        if (STORE.selCloset === 'my') {
            dataMsg = "Add your first item here.";
            renderAddItemForm(dataMsg);
        } else {
            renderInformationPage();
        }
    }
}

function fetchForUpdateClosetItemData() {
    const jwtToken = localStorage.getItem("jwtToken");
    const authUser = localStorage.getItem('userid');
    let closet = STORE.selCloset;
    let fetchPath = '';
    if (STORE.authUserName === 'admin') {
        fetchPath = `/api/idealcloset/${selectedItemId}`;
    } else {
        fetchPath = `/api/userclosets/${closet}closet/${authUser}/${STORE.currentEditItem.id}`;
    };
        
    fetch(fetchPath, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, *',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify(STORE.currentEditItem)
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




