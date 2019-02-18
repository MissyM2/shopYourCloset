window.HTTP_MODULE = {
    fetchForCreateNewUser,
    fetchCloset,
    fetchForUpdateClosetItemData,
    fetchForAnalysis,
    //fetchForDonation,
    //handleErrors,
    genericFetch
};

function genericFetch(url, settings, callback) {
    fetch(url, settings)
    
        .then(response => response.json())
        .then(responseJson => callback(responseJson))
        .catch(err => console.log("Error", err.statusText))
}


function fetchForCreateNewUser(userData) {
    /*
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
    */
}



// show all items for the logged-in user
function fetchCloset() {
    const jwtToken = localStorage.getItem("jwtToken");
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
                fetchForAnalysis();
              break;
            default:
                console.log('error coming from fetch module ', STORE.selCloset);
                
        }
    };
    //  GET fetch request for My Closet

    if (STORE.selCloset === 'my' || STORE.selCloset === 'ideal' || STORE.selCloset === 'donation' || STORE.selCloset === 'giveaway') {
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
    } else if (STORE.selCloset === 'analyze') {
        RENDER.renderNavMenu();
        HTTP.fetchForAnalysis();
    } else {
        console.log('ran out of closets.  Whoopsy, mistakes have been made!');
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



function fetchForAnalysis() {
    const jwtToken = localStorage.getItem("jwtToken");
    const authUser = localStorage.getItem('userid');

    // fetch all the data from the ideal closet to prepare for analysis
    fetch('/api/idealcloset/', {
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

            // call organizeData to count the number of items in each grouping
            STORE.selCloset = 'ideal';
            ETC.organizeData(data);
        } else {
                console.log('there are no items for the ideal closet');
        };
    })
    .catch(error => console.log(error));

    // fetch all the data from the authUser's closet to prepare for analysis
    fetch(`/api/userclosets/mycloset/${STORE.authUser}`, {
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

             // if there are documents in the collection, call organizeData to count the number of items in each grouping
             STORE.selCloset = 'my';
             ETC.organizeData(data);
        } else {
                console.log('there are no items for the ideal closet');
        };
    })
    .catch(error => console.log(error));

    console.log('check the counts in the STORE to see if the groupings have been counted');
       /*
         
         RENDER.renderNavMenu();
         RENDER.renderAnalysis();
         */

}



