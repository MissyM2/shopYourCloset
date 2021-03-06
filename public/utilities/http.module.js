window.HTTP_MODULE = {
    fetchAnalysis,
    genericFetch
};

function genericFetch(url, settings, callback) {
    fetch(url, settings)
        .then(response => {
                if (response.ok) {
                    if (response.status == 200) {
                        //return response.text();
                        return response.json();
                    } else if (response.status == 201) {
                        return response.json();
                        //return response.text();
                    } else if (response.status == 204) {
                        return response.text();
                            //return response;
                        }
                    } else if (response.status === 400 || response.status === 401 || response.status === 404) {
                        throw new Error (response.status);
                    } else {
                        return response.text();
                        //return response.json();
                    }
        })

       .then(responseJson => {
          callback(responseJson);
        })
        .catch(err => {
            //console.log("Error", err);
            callback(err);
        });
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