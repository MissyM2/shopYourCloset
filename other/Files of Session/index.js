

function guestLogin() {
    console.log('guestLogin fired');
    const guest = {
        'username': $("#GET-username").val(),
        'password': $("#GET-password").val()
    };

    console.log(guest);
    logUserIn(guest);
}

function logUserIn(data) {
    console.log('logUserIn fired');
    fetch ('/auth/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(response.statusText);
        }
    })
    .then (responseJson => {
        token = responseJson.authToken;
        localStorage.setItem('authToken', token);
        console.log(token);
        $(location).attr("href", "./home.html");
    })
    .catch(error => {
        $('#login-error').empty().append(`<p class="alert">Usernamd or password is incorrect.</p>`);
    });
}

function createNewUser(newInfo) {
    console.log('create new user fired');

    fetch('/users', {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(newInfo)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(resJson => {
        const username = resJson.username;
        const firstname = resJson.firstname;
        const lastname = resJson.lastname;
        const authToken = resJson.authToken;
        console.log('did I make it to resJson?');
        $('#page-login').hide();
        $('.section-mycloset').hide();
        $('.section-login').show();
        $('#page-register').hide();

        $('.msgs-reg').empty().append(`<p class="user-created">User created: ` +
            `${username} Go ahead and login.`);
            $("#new-username").val('');
            $("#new-password").val('');
            $("#confirm-password").val('');
            $('#firstname').val('');
            $('#lastname').val('');
    })
    .catch(error => {
        console.log(error);
        $('#error-registration').empty().append(`<p class="alert">Shouldn't I get this info from the backend?there was an validation error</p>`)
    });
}

function listenForSignin() {
    console.log('listenforsignin fired');
    $('#btn-signin').click(event => {
        event.preventDefault();
        guestLogin();
    })
}

function listenForLogin() {
    $('#btn-login').click(function(event) {
        event.preventDefault();
        console.log('listenForLogin fired');
        $('#page-register').hide();
        $('.section-mycloset').hide();
        $('.section-options').hide();
        $('#form-reg').hide();
        $('#form-login').show();
    })

}
    
function listenForRegistration() {
    $("#btn-register").click(function(event) {
        event.preventDefault();
        console.log('listenForRegistrationSignUp fired');
        const newUsername = $("#new-username").val();
        const newPass = $("#new-password").val();
        const confirmPass = $("#confirm-password").val();
        const newFirstname = $('#firstname').val();
        const newLastname = $('#lastname').val();
        let newUser = {newUsername, newPass};
       
        // test for password validation characteristics:  proper length and 2 matching passwords
        if (newPass !== confirmPass) {
            // add current error
            $('.msgs-reg').empty().append(`<p class="alert">New password and confirm password do not match</p>`)
        } else {
            $('.js-new-username').val('');
            
            const signupInfo = {};
            if (newFirstname) signupInfo.firstname = newFirstname;
            if (newLastname) signupInfo.lastname = newLastname;
            if (newUsername) signupInfo.username = newUsername;
            if (newPass) signupInfo.password = newPass;
            console.log(signupInfo);
            createNewUser(signupInfo);
            
        };
    });
}

         

//  on page load do this
$(document).ready(function(){
    listenForRegistration();
    listenForLogin();
    listenForSignin();
  });