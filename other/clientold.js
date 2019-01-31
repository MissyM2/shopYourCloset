'use strict';

let closetChoice='';


function finalAddItemToCloset() {
    console.log('listenforFinalAddItemToCloset fired');
    const season1=$('#js-additem-season').val();
    const appareltype1=$('#js-additem-appareltype').val();
    const color1=$('#js-additem-color').val();
    const shortdesc1=$('#js-additem-shortdesc').val();
    const longdesc1=$('#js-additem-longdesc').val();
    const size1=$('#js-additem-size').val();

    // create object and send to add function
    const newItem= {
        season: season1,
        appareltype:appareltype1,
        color: color1,
        shortdesc:shortdesc1,
        longdesc: longdesc1,
        size: size1
    };
     console.log(newItem);
    fetchForCreateNewItemInCloset(newItem);
}
// FETCH calls
function fetchForLogUserIn(data) {
    console.log('fetchForLogUserIn fired');
    fetch ('/api/auth/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        console.log(response);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(response.statusText);
        }
    })
    .then (responseJson => {
        const loggedinUser = responseJson.user.username;
        localStorage.setItem('authToken', responseJson.jwtToken);
        localStorage.setItem('userid', responseJson.user.id);
        
        renderOptionsScreen(loggedinUser);
    })
    .catch(error => {
        console.log(error);
        $('#login-error').html(`<p class="alert">Username or password is incorrect.</p>`);
    });
}



       
       
    
function fetchForCreateNewItemInCloset(newItem) {
    console.log('fetchForCreateNewItemInCloset fired');
    const authToken = localStorage.getItem("authToken");
    console.log(closetChoice);
    let fetchPath=`/api/${closetChoice}closet/`;
    
    fetch(fetchPath, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, *',
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Bearer ${authToken}`
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

function fetchForUpdateClosetItemData(closetitemId, updateObject) {
        console.log('updateItemInMycloset fired');
        const authToken = localStorage.getItem("authToken");
        let fetchPath=`/api/${closetChoice}closet/${closetitemId}/`;

        console.log(fetchPath);
        console.log(updateObject);
    console.log(JSON.stringify(updateObject));
    
        fetch(fetchPath, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, *',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(updateObject)
            })
            .then(response =>  {
                if (response.ok) {
                    console.log(response);
                    return response.json();
                }
                console.log(response);
                throw new Error(response.text);
            })
            .then(responseJson => {
                console.log('responseJson is ' + responseJson);
                //console.log('Success: ', JSON.stringify(responseJson));
                //$('.mycloset').empty();
               fetchCloset();
            })
            .catch(error => {
                console.error('Error: ', error)
            });
}

function fetchForDeleteClosetItemData(closetItemId) {
    const fetchPath= `/api/${closetChoice}closet/${closetItemId}`;
    const authToken = localStorage.getItem("authToken");
    fetch(fetchPath , {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json, text/plain, *',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        };
        throw new Error(response.text);
    })
    .then(responseJson => {
        console.log('Success:', JSON.stringify(responseJson));
        //$('.closet').empty();
        fetchCloset(closetChoice);
    })
    .catch(error => {
        console.error('Error: ', error)
    });
}

function fetchForCreateNewUser(newInfo) {
    console.log('createnewuser fired');
    const fetchPath='/api/users/';
    console.log(newInfo);
    
    fetch(fetchPath, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(newInfo)
    })
    .then(response => {
        console.log('response is ', response);
        if (response.ok || response.status === 422) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => {
        console.log('responseJSON' + JSON.stringify(responseJson.username));
        if (responseJson.ok) return responseJson;
        return Promise.reject(responseJson);
    })
    .then(responseJson => {
        const username = responseJson.username;
        //const authToken = responseJson.authToken;
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
    .catch(err => {
        console.log('error', JSON.stringify(err));
        renderSignUpError(undefined, err.message);
       
    });
}



function fetchCloset() {
    console.log('fetchMycloset fired');
    const authToken = localStorage.getItem("authToken");
    //  GET fetch request for My Closet
        fetch(`/api/${closetChoice}item/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
        .then(response => {
            console.log(response);
            if (response.ok) {
            return response.json();
        };
        throw new Error(response.text);
        })
        .then(data => {
            if (data.length !== 0) {
                console.log('Success:  ', JSON.stringify(data));
                renderCloset(data);
            } else {
                console.log('sorry, no data:  add your first item');
            };
        })
        .catch(error => console.log(error));
} 

//  RENDER data to screen

function renderRegistrationForm() {
    console.log('renderRegistrationForm fired');
    $('.reg-login').html(`
        <form class="form-reg-login">
            <div id="div-reg">
                <h3>Register</h3>
                <div class="reg-item">
                    <p>name:</p>
                    <div class="reg-input-container">
                        <input type="text" class="reg-input" name="new-name" id="new-name" class="js-new-name" placeholder="First Last" required>
                    </div>
                </div> 
                <div class="reg-item">
                    <p>email:</p>
                    <div class="reg-input-container">
                        <input type="text" class="reg-input" name="new-email" id="new-email" class="js-new-email" placeholder="myname@gmail.com" required>
                    </div>
                </div>                      
                <div class="reg-item">
                    <p>password:</p>
                    <div class="input-container">
                        <input type="password" class="reg-input" name="new-password" id="new-password" class="js-new-password" value="password" required>
                        <i class="far fa-eye-slash password-icon"></i>
                    </div>
                </div>
                <div class="reg-item">
                    <p>retype password:</p>
                    <div class="input-container">
                        <input type="password" class="reg-input" name="confirm-password" id="confirm-password" class="js-confirm-password" value="password" required>
                        <i class="far fa-eye-slash password-confirm-icon"></i>
                    </div>
                </div>
                <div id="btn-sign-me-up" class="reg-editbuttons">
                    <button type="button" class="btn-register" id="btn-register" value="Sign me up!">Sign me up!</button>
                </div>
                <div class="form-elements form-elements-button">
                    <p>Already registered?</p>
                    <button type="button" id="btn-login" class="form-input-button">Log In</button>
                </div>
            </div>
        </form>
    `);

}

function renderLoginForm() {
    console.log('renderLoginForm fired');
    $('.reg-login').html(`
        <form id="form-login" class="form-reg-login">
            <div id="div-login">
                <div class="login-item">
                    <div class="input-container">
                        <i class="fas fa-user user-icon"></i>
                        <input type="text" name="GET-username" id="GET-username" class="login-input" required>
                    </div>
                </div>
                <div class="login-item">
                    <div class="input-container">
                        <i class="fas fa-key user-icon"></i>
                        <input type="password" name="GET-password" id="GET-password" class="login-input" required>
                        <i class="far fa-eye-slash password-icon"></i>
                    </div>
                </div>
                <div class="btn-signin">
                    <button type="click" id="btn-signin">Sign In</button>
                </div>
                <div class="demo-item">
                    <p class="demo"><p>For demo:  </p><p>username: chuckles </p><p>password: chuck</p>
            </div>
        </form>
    `);
}

function renderOptionsScreen(userName) {
    $('#div-login').hide();
    $('.section-login').hide();
    $('.topnav').html(`<div class="col-4">` +
                            `<p class="nav nav-title">shopYourCloset</p>` +
                        `</div>` +
                        `<div class="col-4">` +
                            `<p class="nav nav-greeting">Welcome, ${userName}!</p>` +
                        `</div>` +
                        `<div class="col-4 col-logout">` +
                            `<p class="nav nav-logout">Logout</p>` +
                        `</div>` +
                    `</div>`);
    $('.section-options').show();
    $('.section-options').html(`
                <div class="col-4 buttons-options" id="btn-view-mycloset"><i class="fas fa-door-open"></i>
                <h5 class="closet-functions">view/add to your closet</h5></div>
                <div class="col-4 buttons-options" id="btn-view-idealcloset"><i class="fas fa-tshirt"></i>
                <h5 class="closet-functions">view/add to the ideal closet</h5></div>
                <div class="col-4 buttons-options" id="btn-view-recommendations"><i class="fas fa-atom"></i>
                <h5 class="closet-functions">Analyze your wardrobe</h5><div>
     `);
    
}

function renderCloset(closetItems) {
    console.log('renderCloset fired');
    $('.col-closet').html(`
        <br>
        <div class="cl-header"><h3>${closetChoice} Closet Items</h2>
            <div class="cl-itemcount"></div>
            <div class="nav cl-editbuttons ${closetChoice}cl-addbutton">add new item</div>
            <hr>
        </div>`);

    let closetHtml = '';
    let id1 = '';
    let appareltype1 = '';
    let color1 = '';
    let size1 = '';
    let season1 = '';
    let shortdesc1 = '';
    let longdesc1 = '';
    let itemCount = 0;

    closetHtml= '<div id="cl-body">';

    for (let i=0; i < closetItems.items.length; i++) {
        itemCount +=1;

        id1 = closetItems.items[i]._id;
        season1 = closetItems.items[i].season;
        appareltype1 = closetItems.items[i].appareltype;
        color1 = closetItems.items[i].color;
        shortdesc1 = closetItems.items[i].shortdesc;
        longdesc1 = closetItems.items[i].longdesc;
        size1 = closetItems.items[i].size;



        closetHtml += `<div class="cl-resultcell ${id1}class">` +
                `<div class="cl-editbutton-row">` +
                    `<div class="nav cl-editbuttons cl-updatebtn1" data-id="${id1}" data-season="${season1}" data-appareltype="${appareltype1}" data-color="${color1}" data-shortdesc="${shortdesc1}" data-longdesc="${longdesc1}" data-size="${size1}">update</div>` +
                    `<div class="nav cl-editbuttons cl-deletebtn" data-id="${id1}">delete</div>` +
                `</div>` +
                `<div class="cl-resultbody">` +
                        `<div class="itemrow cl-season"><div class="item itemlabel"><p>season: </p></div><div class="item itembody"><p>${season1}</p></div></div>` +
                        `<div class="itemrow cl-appareltype"><div class="item itemlabel"><p>type: </p></div><div class="item itembody"><p>${appareltype1}</p></div></div>` +
                        `<div class="itemrow cl-color"><div class="item itemlabel"><p>color: </p></div><div class="item itembody"><p>${color1}</p></div></div>` +
                        `<div class="itemrow cl-shortdesc"><div class="item itemlabel"><p>short: </p></div><div class="item itembody"><p>${shortdesc1}</p></div></div>` +
                        `<div class="itemrow cl-longdesc"><div class="item itemlabel"><p>long: </p></div><div class="item itembody"><p>${longdesc1}</p></div></div>` +
                        `<div class="itemrow cl-size"><div class="item itemlabel"><p>size: </p></div><div class="item itembody"><p>${size1}</p></div></div>` +
                `</div>` +
                `<br>` +
            `</div>`; 
         `<br>`;
    };

    closetHtml+='</div>';
    $('.section-options').html(`
        <div class="col-4 buttons-options-mini" id="btn-view-mycloset">
            <p class="closet-functions">Your Closet</p></div>
        <div class="col-4 buttons-options-mini" id="btn-view-idealcloset">
            <p class="closet-functions">Ideal Closet</p></div>
        <div class="col-4 buttons-options-mini" id="btn-view-recommendations">
            <p class="closet-functions">Analyze</p><div>`);
    $('.cl-itemcount').append(`There are ${itemCount} items in your closet.`);
    $('.col-closet').append(closetHtml);

}
function renderAddItemForm() {
    // change closet cell to updateable form
    const updateFormBody = `<div class="cl-header"><h5>Add new item to ${closetChoice} Closet</h5></div>` +
        `<div class="cl-resultcell additem-class"><div class="cl-resultbody"><form action="/action_page.php">` +
        `<div class="itemrow cl-season"><div class="item itemlabel"><p>season: </p></div><div class="item itembody"><input class="js-additems js-additem-season" type="text" name="season"></div></div>` +
        `<div class="itemrow cl-appareltype"><div class="item itemlabel"><p>type of clothing: </p></div><div class="item itembody"><input id="js-additem-appareltype" type="text" name="appareltype"></div></div>` +
        `<div class="itemrow cl-color"><div class="item itemlabel"><p>color: </p></div><div class="item itembody"><input id="js-additem-color" type="text" name="color"></div></div>` +
        `<div class="itemrow cl-shortdesc"><div class="item itemlabel"><p>short description: </p></div><div class="item itembody"><input id="js-additem-shortdesc" type="text" name="shortdesc"></div></div>` +
        `<div class="itemrow cl-longdesc"><div class="item itemlabel"><p>long description: </p></div><div class="item itembody"><input id="js-additem-longdesc" type="text" name="longdesc"></div></div>` +
        `<div class="itemrow cl-size"><div class="item itemlabel"><p>size: </p></div><div class="item itembody"><input id="js-additem-size" type="text" name="size"></div></div>`;

       

    const updateEditButtons = `<div class="cl-editbuttons">` +
    `<button class="${closetChoice}cl-addbtn2">add</button>` +
    `<button class="cl-cancel-additem-btn">cancel</button>` +
    `</div></div></form>`;
    $(`.col-closet`).html(updateFormBody);
    $(`.col-closet`).append(updateEditButtons);
}

// ** render errors

function renderSignUpError(errLocation, errMessage) {
    console.log('made it to signup error');
    //reset previous errors
    $('.new-password').removeClass('error-field');
    $('.confirm-password').removeClass('error-field');
    $('.error-msg').remove();
    if (errLocation === 'username'){
        $('.new-username').addClass('error-field').attr('aria-invalid', false);
    } else {
        $('.new-password').val('').addClass('error-field').attr('aria-invalid', false);
        $('.confirm-password').val('').addClass('error-field').attr('aria-invalid', false);
    };
    $('.btn-register').before(`<p class="error-msg" aria-live="assertive">
    <i class="fas fa-exclamation-circle"></i> ${errLocation}: ${errMessage}</p>`);
    }

     //$('#msgs-reg').empty().append(`<p class="alert">Shouldn't I get this info from the backend?there was an validation error</p>`)


// ***** LISTENERS


// listeners for registration and login

function onRegisterNewUserClick() {
    $('#btn-register').click(function(event){
        event.preventDefault();
        console.log('onRegisterNewUserClick fired.');
        const newUsername = $("#new-username").val();
        const newPass = $("#new-password").val();
        const confirmPass = $("#confirm-password").val();
        let newUser = {newUsername, newPass};
       
        // test for password validation characteristics:  proper length and 2 matching passwords
        if (newPass !== confirmPass) {
            // add current error
            $('.msgs-reg').html(`<p class="alert">New password and confirm password do not match</p>`)
        } else {
            $('.js-new-username').val(''); 
            const signupInfo = {};
            if (newUsername) signupInfo.username = newUsername;
            if (newPass) signupInfo.password = newPass;
            console.log(signupInfo);
            fetchForCreateNewUser(signupInfo);
        };
    })
}

function onSigninClick() {
    $(document).on('click', '#btn-signin', function(event) {
        event.preventDefault();
        console.log('onSigninClick fired');
        const username = $("#GET-username").val();
        const password = $("#GET-password").val();
        let userSignin = {username, password};
        fetchForLogUserIn(userSignin);

    });
}

function onLoginRequestClick() {
    $(document).on('click', '#btn-login', function(event) {
        event.preventDefault();
        console.log('onLoginRequestClick fired');
        renderLoginForm();
    });
}

function onLogoutClick() {
    $(document).on('click', '.nav-logout', function(event) {
        event.preventDefault();
        console.log('onLogoutClick fired');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userid');
        //return to login page
        $('.col-closet').empty();
        $('.section-options').hide();
        $('.section-login').show();
        $('.nav-greeting').html(`<p>Goodbye!  Come back soon!</p>`);
        $('.col-logout').html('');
        renderRegistrationForm();
    });
}


// listeners for closet functions

function onIdealclosetFunctionsClick() {
    $('.section-options').on('click', '#btn-view-idealcloset', (function(event) {
        event.preventDefault();
        console.log("onIdealclosetFunctionsClick fired");
        closetChoice='ideal';
        fetchCloset();
}));
}

function onMyclosetFunctionsClick() {
    $('.section-options').on('click', '#btn-view-mycloset', (function(event) {
        event.preventDefault();
        console.log("onMyclosetFunctionsClick fired");
        closetChoice='my';
        fetchCloset();    
}));
}
function onAddItemToMyClosetClick() {
    $(document).on('click','.mycl-addbutton', (function(event){
        event.preventDefault();
        closetChoice = 'my';
        console.log('listenforAddItemtoCloset fired');

        renderAddItemForm();
    }));
}

function onAddItemToIdealClosetClick() {
    $(document).on('click','.idealcl-addbutton', (function(event){
        event.preventDefault();
        closetChoice = 'ideal';
        console.log('listenforAddItemtoCloset fired');
        renderAddItemForm();
    }));
}

function onFinalAddItemToMyClosetClick() {
    $(document).on('click','.mycl-addbtn2', function(event) {
        event.preventDefault();
        closetChoice = 'my';
        finalAddItemToCloset()
    });
}

function onFinalAddItemToIdealClosetClick() {
    $(document).on('click','.idealcl-addbtn2', function(event) {
        event.preventDefault();
        closetChoice = 'ideal';
        finalAddItemToCloset()
    });
}

function onUpdateItemInClosetClick() {
    $(document).on('click', '.cl-updatebtn1', (function(event) {
        event.preventDefault();
        console.log('listenforUpdateItemInMycloset fired');
        const id1=$(this).attr('data-id');
        const season1=$(this).attr('data-season');
        const appareltype1=$(this).attr('data-appareltype');
        const color1 = $(this).attr('data-color');
        const shortdesc1 = $(this).attr('data-shortdesc');
        console.log('shsortdesc1 is ' + shortdesc1);
        const longdesc1 = $(this).attr('data-longdesc');
        console.log('longdesc1 is ' + longdesc1);
        const size1 = $(this).attr('data-size');
        console.log(id1, season1, appareltype1, color1, shortdesc1, longdesc1, size1);

        // change closet cell to updateable form
    
        const updateFormBody = `<div class="cl-resultbody"><form id='form-update-closet'>` +
            `<div class="itemrow cl-id"><div class="item itemlabel">id: </div><div class="item itembody"><div id="js-itemid" data-value="${id1}">${id1}</div></div></div>` +
            `<div class="itemrow cl-season"><div class="item itemlabel">season: </div><div class="item itembody"><input id="js-searchseason" type="text" name="season" value="${season1}"></div></div>` +
            `<div class="itemrow cl-appareltype"><div class="item itemlabel">type of clothing: </div><div class="item itembody"><input id="js-searchappareltype" type="text" name="appareltype" value="${appareltype1}"></div></div>` +
            `<div class="itemrow cl-color"><div class="item itemlabel">color: </div><div class="item itembody"><input id="js-searchcolor" type="text" name="color" value="${color1}"></div></div>` +
            `<div class="itemrow cl-shortdesc"><div class="item itemlabel">short description: </div><div class="item itembody"><input id="js-searchshortdesc" type="text" name="shortdesc" value="${shortdesc1}"></div></div>` +
            `<div class="itemrow cl-longdesc"><div class="item itemlabel">long description: </div><div class="item itembody"><input id="js-searchlongdesc" type="text" name="longdesc" value="${longdesc1}"></div></div>` +
            `<div class="itemrow cl-size"><div class="item itemlabel">size: </div><div class="item itembody"><input id="js-searchsize" type="text" name="size" value="${size1}"></div></div></div>` +
            `<div class="cl-editbuttons">` +
            `<button class="cl-updatebtn2" data-id="${id1}" data-season="${season1}" data-appareltype="${appareltype1}" data-color="${color1}" data-shortdesc="${shortdesc1}" data-longdesc="${longdesc1}" data-size="${size1}">update</button>` +
            `<button class="cl-cancelbtn">cancel</button>` +
            `</div></form>`;
        $(`.${id1}class`).html(updateFormBody);
    }));
}

function onFinalUpdateItemInClosetClick() {
    $(document).on('click', '.cl-updatebtn2', (function(event){
        event.preventDefault();
        console.log('onFinalUpdateItemInClosetClick fired');
        const updateId = $('#js-itemid').text();
        const updateColor = $('#js-searchcolor').val();
        const updateSeason = $('#js-searchseason').val();
        const updateAppareltype = $('#js-searchappareltype').val();
        const updateShortdesc = $('#js-searchshortdesc').val();
        const updateLongdesc = $('#js-searchlongdesc').val();
        const updateSize = $('#js-searchsize').val();
    
        // create object and send to update function
        const updatedClosetItemObj = {
            id: updateId,
            season: updateSeason,
            color: updateColor,
            appareltype: updateAppareltype,
            shortdesc: updateShortdesc,
            longdesc: updateLongdesc,
            size: updateSize
        }
        fetchForUpdateClosetItemData(updateId, updatedClosetItemObj);
    
    }));
}

function onDeleteItemInClosetClick() {
$(document).on('click', '.cl-deletebtn', (function(event){
    event.preventDefault();
    closetChoice="my";
    console.log('.cl-deletebtn has been clicked');
    let id1 = $(this).attr('data-id');
    fetchForDeleteClosetItemData(id1);
}));
}

function onCancelAddItemClick() {
    $(document).on('click', '.cl-cancel-additem-btn', (function(event) {
        event.preventDefault();
        console.log('onCancelAddItemClick fired.');
        fetchCloset();
    }))
}

function onPasswordRevealClick() {
    $(document).on('click', '.password-icon', (function(event) {
        event.preventDefault();
        console.log('onPasswordRevealClick fired');
        if ($( "input[name='new-password']").attr('type') === 'password') {
            console.log("found the right element password");
            $( "input[name='new-password']").attr('type','text');
            $(this).removeClass("fa-eye-slash").addClass("fa-eye");
            
          } else {
            $( "input[name='new-password']").attr('type','password');
            console.log('password');
            $(this).removeClass("fa-eye");
            $(this).addClass("fa-eye-slash");
          };
    }));
}

function onLoginPasswordRevealClick() {
    $(document).on('click', '.password-icon', (function(event) {
        event.preventDefault();
        console.log('onPasswordRevealClick fired');
        if ($( "input[name='GET-password']").attr('type') === 'password') {
            console.log("found the right element password");
            $( "input[name='GET-password']").attr('type','text');
            $(this).removeClass("fa-eye-slash").addClass("fa-eye");
            
          } else {
            $( "input[name='GET-password']").attr('type','password');
            console.log('password');
            $(this).removeClass("fa-eye");
            $(this).addClass("fa-eye-slash");
          };
    }));
}

function onConfirmPasswordRevealClick() {
    $(document).on('click', '.password-confirm-icon', (function(event) {
        event.preventDefault();
        console.log('onPasswordRevealClick fired');
        if ($( "input[name='confirm-password']").attr('type') === 'password') {
            console.log("found the right element password");
            $( "input[name='confirm-password']").attr('type','text');
            $(this).removeClass("fa-eye-slash").addClass("fa-eye");
            
          } else {
            $( "input[name='confirm-password']").attr('type','password');
            console.log('password');
            $(this).removeClass("fa-eye");
            $(this).addClass("fa-eye-slash");
          };
    }));
}



$(document).ready(function() {
    console.log('doc is ready');
    renderRegistrationForm();
    onRegisterNewUserClick();
    onLoginRequestClick();
    onSigninClick();
    onLogoutClick();
    onMyclosetFunctionsClick();
    onIdealclosetFunctionsClick();
    onAddItemToMyClosetClick();
    onAddItemToIdealClosetClick();
    onCancelAddItemClick();
    onFinalAddItemToMyClosetClick();
    onFinalAddItemToIdealClosetClick()
    onUpdateItemInClosetClick();
    onFinalUpdateItemInClosetClick();
    onDeleteItemInClosetClick();

    // listener for password icon
    onPasswordRevealClick();
    onConfirmPasswordRevealClick();
    onLoginPasswordRevealClick()
});