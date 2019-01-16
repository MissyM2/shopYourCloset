function logUserIn(data) {
    console.log('logUserIn fired');
    fetch ('api/auth/login/', {
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

function listenforSignin() {
    $('#btn-signin').click(function(event) {
        event.preventDefault();
        console.log('listenforSignin fired');
        const signinName = $("#GET-username").val();
        const signinPass = $("#GET-password").val();
        let userSignin = {signinName, signinPass};
        console.log(userSignin);
        logUserIn(userSignin);

    });
}

function listenforLoginRequest() {
    $('#btn-login').click(function(event) {
        event.preventDefault();
        console.log('listenforLoginRequest fired');
        $('#form-reg').hide();
        $('#form-login').show();
    });
}

       
       /*
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
            */
    


function createNewUser(newInfo) {
    console.log('createnewuser fired');
    
    fetch('/api/users', {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(newInfo)
    })
    .then(response => {
        console.log('response is ' + response);
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => {
        console.log('responseJSON i' + JSON.stringify(responseJson.authToken));
        if (responseJson.ok) return responseJson;
        return Promise.reject(responseJson);
    })
    .then(responseJson => {
        const username = responseJson.username;
        const firstname = responseJson.firstname;
        const lastname = responseJson.lastname;
        const authToken = responseJson.authToken;
        //getAndDisplayMyclosetItems(true);
        console.log('was new user created? check postman');
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
        console.log('error' + error);
        //displaySignUpError(err.location, err.message)
        //$('#msgs-reg').empty().append(`<p class="alert">Shouldn't I get this info from the backend?there was an validation error</p>`)
    });
}


function listenforRegisterNewUser() {
    $('#btn-register').click(function(event){
        event.preventDefault();
        console.log('listenforRegisterNewUser fired.');
        const newUsername = $("#new-username").val();
        const newPass = $("#new-password").val();
        const confirmPass = $("#confirm-password").val();
        const newFirstname = $('#new-firstname').val();
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
    })
}

function displayRegistrationLoginForm() {
    console.log('displayRegistrationLoginForm fired');
    $('#reg-login').append(`
        <div class="msgs-reg"></div>
            <form id="form-reg" class="form-reg-login">
                    <div id="div-reg">
                        <p>Register</p>
                    <div id="f-name" class="form-elements"><label class="input-label">First Name:</label><input type="text" class="form-input js-new-firstname" name="new-firstname" id="new-firstname" placeholder="First Name"></div>
                    <div id="l-name" class="form-elements"><label class="input-label">Last Name</label><input type="text" class="form-input js-new-lastname"name="new-lastname" id="lastname" placeholder="Last Name"></div>
                    <div id="u-name" class="form-elements"><label class="input-label">Choose username:</label><input type="text" class="form-input js-new-username" name="new-username" id="new-username" class="js-new-username" placeholder="myname@gmail.com" required></div>                           
                    <div id="p-word" class="form-elements"><label class="input-label">Enter password:</label><input type="password" class="form-input js-new-password"name="new-password" id="new-password" class="js-new-password" placeholder="password" required></div>
                    <div id="confirm-p-word" class="form-elements"><label class="input-label">Retype password:</label><input type="password" class="form-input js-confirm-password"name="confirm-password" id="confirm-password" class="js-confirm-password" placeholder="password" required></div>
                    <div id="btn-sign-me-up" class="form-elements form-element-button"><button type="button" id="btn-register" value="Sign me up!">Sign me up!</button></div>
                    <div id="btn-login" class="form-elements form-elements-button"><p>Already registered?</p></label><button type="button" id="btn-login" class="form-input-button">Log In</button></div>
                </div>
            </form>
            <form id="form-login" class="form-reg-login" style="display:none">
                <div id="div-login">
                    <p>Log In</p>
                    <div class="form-elements"><label for="GET-username">Username:</label><input type="text" name="GET-username" id="GET-username" class="form-input" placeholder="myname@gmail.com" required></div>
                    <div class="form-elements"><label for="GET-password">Password:</label><input type="password" name="GET-password" id="GET-password" class="form-element-button" placeholder="password" required></div>
                    <div class="form-elements form-element-button"><button type="click" id="btn-signin">Sign In</button></div>
                    <p class="demo">For demo:  <br>username: tester <br>password: testertester</p>
                </div>
            </form>
                        `);

}

$(document).ready(function() {
    console.log('doc is ready');
    displayRegistrationLoginForm();
    listenforRegisterNewUser();
    listenforLoginRequest();
    listenforSignin();
});