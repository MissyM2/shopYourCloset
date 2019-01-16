
let token = localStorage.getItem("authToken");

fetch('/getUserInformation', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(response.statusText);
        }
    })
    .then (responseJson => {
        $("#username").text(responseJson.firstname + " " + responseJson.lastname);
    })
    .catch(error => {

    });