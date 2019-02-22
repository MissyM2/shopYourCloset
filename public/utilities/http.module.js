window.HTTP_MODULE = {
    fetchAnalysis,
    fetchForData,
    fetchForResponse
};

//  most functions package their settings and call this generic fetch to connect to db

function fetchForData(url, settings, callback) {
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
        .then(responseJson => {
            callback(responseJson)
        })
        .catch(err => console.log("Error", err));
}
function fetchForResponse(url, settings) {
    return fetch(url, settings)
        .then(response => {
           return response;
        })
        .catch(error => {
            console.log('what the heck?');
            throw error;
        })
}

function fetchAnalysis() {

    // first, get and organize data from ideal closet
    STORE.selCloset = 'ideal';
    const jwtToken = localStorage.getItem("jwtToken");
    const authUser = localStorage.getItem('userid');
    if (STORE.authUserName === 'admin') {
       console.log('this is admin.  no analysis');
    } else {
        let getIdealDataSettings = {
            "method": "GET",
            "headers": {
                'Accept': 'application/json, text/plain, *',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            }
        };
        fetch('/api/idealcloset/', getIdealDataSettings)
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
        .then(responseJson => {
                organizeData(responseJson);
                console.log('data from ideal closet should be there now');
                // next, get and organize data from my closet
                STORE.selCloset = 'my';
                let getMyDataSettings = {
                    "method": "GET",
                    "headers": {
                        'Accept': 'application/json, text/plain, *',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwtToken}`
                    }
                };
                fetch(`/api/userclosets/mycloset/${authUser}`, getMyDataSettings)
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
                .then(responseJson => {
                    organizeData(responseJson)
                    renderNavMenu('users');
                    STORE.selCloset = 'analyze';
                    renderAnalysis();
                })
                .catch(err => console.log("Error", err)
                );
        })
        .catch(err => console.log("Error", err));
        
    }
    
}