'use strict';

const user = {
    username: null,
    authToken: null
};

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
        console.log(responseJson);
        token = responseJson.authToken;
        localStorage.setItem('authToken', responseJson.token);
        localStorage.setItem('userid', responseJson.user._id);
        console.log(token);
        $(location).attr("href", "home.html")
    })
    .catch(error => {
        $('#login-error').empty().append(`<p class="alert">Usernamd or password is incorrect.</p>`);
    });
}

function createNewUser(newInfo) {
    console.log('create new user fired');
    
    fetch('/api/users', {
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
    .then(responseJson => {
        if (responseJson.ok) return responseJson;
        return Promise.reject(responseJson);
    })
    .then(responseJson => {
        const username = responseJson.username;
        const firstname = responseJson.firstname;
        const lastname = responseJson.lastname;
        const authToken = responseJson.authToken;
        getAndDisplayMyclosetItems(true);
    })
      //  console.log('did I make it to resJson?');
       // $('#page-login').hide();
       // $('.section-mycloset').hide();
       // $('.section-login').show();
       // $('#page-register').hide();

      //  $('.msgs-reg').empty().append(`<p class="user-created">User created: ` +
       //     `${username} Go ahead and login.`);
       //     $("#new-username").val('');
        //    $("#new-password").val('');
        //    $("#confirm-password").val('');
         //   $('#firstname').val('');
         //   $('#lastname').val('');
    .catch(error => {
        console.log(error);
        displaySignUpError(err.location, err.message)
        //$('#msgs-reg').empty().append(`<p class="alert">Shouldn't I get this info from the backend?there was an validation error</p>`)
    });
}

function getAndDisplayMyclosetItems(isNewUser){
        console.log('getAndDisplayMyclosetItems fired');
        $('#page-login').hide();
        $('.section-mycloset').show();
        $('.section-login').show();
        $('#page-register').hide();
        if (isNewUser) {
            $('.my-closet').html(`<div id="new-user-msg"><h2>Account Created!</h2>
            <h3>Let's Get Started</h3></div>`);
        }
        //getMycloset(displayMycloset);

      //  $('.msgs-reg').empty().append(`<p class="user-created">User created: ` +
       //     `${username} Go ahead and login.`);
       //     $("#new-username").val('');
        //    $("#new-password").val('');
        //    $("#confirm-password").val('');
         //   $('#firstname').val('');
         //   $('#lastname').val('');
}


function onSigninClick() {
    console.log('onSigninClick fired');
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



         

//  on page load do this
$(document).ready(function(){
    listenForRegistration();
    //listenForLogin();
    //onSigninClick();
  });