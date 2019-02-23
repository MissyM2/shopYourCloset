window.HTTP_MODULE = {
    fetchAnalysis,
    fetchForData,
    fetchForResponse
};

//  most functions package their settings and call this generic fetch to connect to db

// the return for this function is actual data that is, then, manipulated
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

// the return function here is true or false
function fetchForResponse(url, settings) {
    return fetch(url, settings)
        .then(response => {
           return response;
        })
        .catch(error => {
            throw error;
        })
}

// this function executes two GET calls to obtain data from the IDEAL closet and then the MY closet to obtain data to manipulate
function fetchAnalysis() {

    // first, get and organize data from ideal closet
    STORE.selCloset = 'ideal';
    const jwtToken = localStorage.getItem("jwtToken");
    const authUser = localStorage.getItem('userid');
    if (STORE.authUserName === 'admin') {
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
                    throw new Error(response.status);
                } else if (response.status == 401) {
                    throw new Error(response.status);
                }
            }
        })
        .then(responseJson => {
                organizeData(responseJson);

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
                            throw new Error(response.status);
                        } else if (response.status == 401) {
                            throw new Error(response.status);
                        }
                    }
                })
                .then(responseJson => {
                    organizeData(responseJson)
                    STORE.selCloset = 'analyze';
                    renderAnalysis();
                })
                .catch(err => console.log("Error", err)
                );
        })
        .catch(err => console.log("Error", err));
        
    }
    
}