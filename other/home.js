let token = localStorage.getItem("authToken");
let user = localStorage.getItem("userid");
console.log(user);

fetch('/users/:id', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({user})
    })
    .then(response => {
        console.log('made it to new page');
        console.log(token);
        console.log()
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(response.statusText);
        }
    })
    .then (responseJson => {
        console.log(responseJson);
        $('#username').text(responseJson.firstname + ' ' + responseJson.lastname);
    })
    .catch(error => {

    });
