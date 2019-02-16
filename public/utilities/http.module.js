window.HTTP_MODULE = {
    fetchForCreateNewUser,
    fetchForLogUserIn,
    fetchCloset,
    //get closet item by id
    fetchForCreateNewItemInCloset,
    fetchForUpdateClosetItemData,
    fetchForDeleteClosetItemData,
    fetchForAnalysis,
    fetchForDonation,
    fetchForGiveaway,
    fetchForReturn,
    handleErrors
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
        renderLoginForm();
        $('.error-msg').html('username/password problem.  Try again.').css('visibility','visible');
        //renderLoginError();
    });
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



function fetchForCreateNewItemInCloset(newItem) {
    const jwtToken = localStorage.getItem("jwtToken");
    const authUser = localStorage.getItem("userid");
    let closet = STORE.selCloset;
    let fetchPath = '';
    if (STORE.authUserName === 'admin') {
        fetchPath = '/api/idealcloset/';
    } else {
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

function fetchForDeleteClosetItemData(selectedItemId) {
    console.log('from fetchForDeleteClosetItemData ', selectedItemId);
    const jwtToken = localStorage.getItem("jwtToken");
    let closet = STORE.selCloset;
    let fetchPath = '';

    if (localStorage.getItem("name") === 'Admin ID') {
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


function fetchForDonation() {
    //first we are going to delete the item from the user's my closet
    const jwtToken = localStorage.getItem("jwtToken");
    const authUser = localStorage.getItem("userid");
    let selectedItemId = STORE.currentEditItem.id;
    console.log('inside fetchForDonation ', selectedItemId);
    let fetchPath = '';
    alert(`about to delete ${STORE.currentEditItem.season}, ${STORE.currentEditItem.color} ${STORE.currentEditItem.appareltype} from your closet and move it to the donation closet.  OK? `);

    fetchPath = `/api/userclosets/mycloset/${authUser}/${selectedItemId}`;
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
            console.log('item has been deleted from your closet.  It is ready to move to donation closet.');
            // switch closet to donation closet
            //STORE.selCloset = 'donation';
        })
        .catch(error => {
            console.log(error.message);
            //renderDeletionError(error.message);
    });

    //next we are going to add the object to the user's donation closet

    fetchPath = '';
    fetchPath = `/api/userclosets/donationcloset/${authUser}`;
    fetch(fetchPath, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, *',
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify(STORE.currentEditItem)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            };
            throw new Error(response.text);
        })
        .then(responseJson => {
            alert(`Your ${STORE.currentEditItem.color} ${STORE.currentEditItem.appareltype} is now in the donation closet.`);
           // STORE.selCloset = 'my';
            fetchCloset();
        })
        .catch(error => {
            console.log('Error: ', error)
        });
}

function fetchForGiveaway() {
    //first we are going to delete the item from the user's my closet
    const jwtToken = localStorage.getItem("jwtToken");
    const authUser = localStorage.getItem("userid");
    let selectedItemId = STORE.currentEditItem.id;
    console.log('inside fetchForGivewaway ', selectedItemId);
    let fetchPath = '';

    fetchPath = `/api/userclosets/mycloset/${authUser}/${selectedItemId}`;
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
            console.log('item has been deleted from your closet.  It is ready to move to donation closet.');
            // switch closet to donation closet
            STORE.selCloset = 'donation';
        })
        .catch(error => {
            console.log(error.message);
            //renderDeletionError(error.message);
    });

    //next we are going to add the object to the public giveaway closet

    fetchPath = '';
    fetchPath = `/api/groupclosets/giveawaycloset`;
    fetch(fetchPath, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, *',
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify(STORE.currentEditItem)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            };
            throw new Error(response.text);
        })
        .then(responseJson => {
            alert('one item has been added to the public giveaway closet.');
            STORE.selCloset = 'my';
            fetchCloset();
        })
        .catch(error => {
            console.log('Error: ', error)
        });
}

function  fetchForReturn() {
    //first we are going to delete the item from the user's my closet
    const jwtToken = localStorage.getItem("jwtToken");
    const authUser = localStorage.getItem("userid");
    let selectedItemId = STORE.currentEditItem.id;
    console.log('inside fetchForReturn ', selectedItemId);
    let fetchPath = '';

    fetchPath = `/api/userclosets/donationcloset/${authUser}/${selectedItemId}`;
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
            console.log('item has been deleted from your donation closet.  It is ready to be returned to your personal closet.');
            // switch closet to donation closet
            STORE.selCloset = 'my';
        })
        .catch(error => {
            console.log(error.message);
            //renderDeletionError(error.message);
    });

    //next we are going to add the object to your personal closet

    fetchPath = '';
    fetchPath = fetchPath = `/api/userclosets/mycloset/${authUser}`;;
    fetch(fetchPath, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, *',
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify(STORE.currentEditItem)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            };
            throw new Error(response.text);
        })
        .then(responseJson => {
            alert('one item has been returned to your personal closet.');
            STORE.selCloset = 'donation';
            fetchCloset();
        })
        .catch(error => {
            console.log('Error: ', error)
        });
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response.json;
}
