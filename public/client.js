'use strict';


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
        localStorage.setItem('authToken', responseJson.token);
        localStorage.setItem('userid', responseJson.user._id);
        
        renderOptionsScreen(loggedinUser);
    })
    .catch(error => {
        console.log(error);
        $('#login-error').empty().append(`<p class="alert">Usernamd or password is incorrect.</p>`);
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
    
function fetchForCreateNewItemInCloset(newItem, closetChoice) {
    console.log('fetchForCreateNewItemInCloset fired');
    const authToken = localStorage.getItem("authToken");
    let fetchPath='/api/mycloset/';
    //if (closetChoice == 'my') {
     //   fetchPath = '/api/mycloset';

    //} else if (closetChoice = 'ideal') {
   //     fetchPath = '/api/idealcloset';
    //} else {
   //     console.log('error');
   // };
    console.log(fetchPath);
    console.log(newItem);

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
            fetchCloset(closetChoice);
        })
        .catch(error => {
            console.log('Error: ', error)
        });
}

function fetchForUpdateClosetItemData(closetChoice, closetitemId, data) {
        console.log('updateItemInMycloset fired');
        const authToken = localStorage.getItem("authToken");
        fetch(`/api/${closetChoice}closet/${closetitemId}/`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, *',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(data)
            })
            .then(response =>  {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.text);
            })
            .then(responseJson => {
                //console.log('Success: ', JSON.stringify(responseJson));
                //$('.mycloset').empty();
               fetchCloset(closetChoice);
            })
            .catch(error => {
                console.error('Error: ', error)
            });
}

function fetchForDeleteClosetItemData(closetChoice, closetItemId) {
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
        console.log('responseJSON' + JSON.stringify(responseJson.authToken));
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
        //renderSignUpError(err.location, err.message)
        //$('#msgs-reg').empty().append(`<p class="alert">Shouldn't I get this info from the backend?there was an validation error</p>`)
    });
}



function fetchCloset(selected) {
    console.log('fetchMycloset fired');
    const authToken = localStorage.getItem("authToken");
    //  GET fetch request for My Closet
        fetch(`/api/${selected}closet/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
        .then(response => {
            if (response.ok) {
            return response.json();
        };
        throw new Error(response.text);
        })
        .then(data => {
           // console.log('Success: ', JSON.stringify(data));
            renderCloset(data, selected);
        })
        .catch(error => console.log(error));
} 

//  RENDER data to screen

function renderRegistrationLoginForm() {
    console.log('renderRegistrationLoginForm fired');
    $('#reg-login').append(`
        <div class="msgs-reg"></div>
            <form id="form-reg" class="form-reg-login">
                    <div id="div-reg">
                        <p>Register</p>
                    <div id="f-name" class="itemrow reg-fname"><div class="item reglabel">First Name:</div><div class="item itembody"><input type="text" class="form-input js-new-firstname" name="new-firstname" id="new-firstname" placeholder="First Name"></div></div>
                    <div id="l-name" class="itemrow reg-lname"><div class="item reglabel">Last Name</div><div class="item itembody"><input type="text" class="form-input js-new-lastname"name="new-lastname" id="lastname" placeholder="Last Name"></div></div>
                    <div id="u-name" class="itemrow reg-uname"><div class="item reglabel">Choose username:</div><div class="item itembody"><input type="text" class="form-input js-new-username" name="new-username" id="new-username" class="js-new-username" placeholder="myname@gmail.com" required></div></div>                           
                    <div id="p-word" class="itemrow reg-pword"><div class="item reglabel">Enter password:</div><div class="item itembody"><input type="password" class="form-input js-new-password"name="new-password" id="new-password" class="js-new-password" value="password" required></div></div>
                    <div id="confirm-p-word" class="itemrow reg-confirm-pword"><div class="item reglabel">Retype password:</div><div class="item itembody"><input type="password" class="form-input js-confirm-password"name="confirm-password" id="confirm-password" class="js-confirm-password" placeholder="password" required></div></div>
                    <div id="btn-sign-me-up" class="reg-editbuttons">
                        <button type="button" class="btn-register" id="btn-register" value="Sign me up!">Sign me up!</button></div>
                       <div id="btn-login" class="form-elements form-elements-button"><p>Already registered?</p><button type="button" id="btn-login" class="form-input-button">Log In</button></div></div>
                </div>
            </form>
            <form id="form-login" class="form-reg-login" style="display:none">
                <div id="div-login">
                    <p>Log In</p>
                    <div class="form-elements"><label for="GET-username">Username:</label><input type="text" name="GET-username" id="GET-username" class="form-input" value="chuckles" required></div>
                    <div class="form-elements"><label for="GET-password">Password:</label><input type="password" name="GET-password" id="GET-password" class="form-element-button" value="chuck" required></div>
                    <div class="form-elements form-element-button"><button type="click" id="btn-signin">Sign In</button></div>
                    <p class="demo">For demo:  <br>username: chuckles <br>password: chuck</p>
                </div>
            </form>
                        `);

}

function renderOptionsScreen(User) {
    $('#div-login').hide();
    $('.section-login').hide();
    $('.topnav').append(`
        <div class='col-4 greeting'>Welcome, ${User}!</div>
        <div class='col-4'><button type="click" id="btn-logout">Logout</button></div>
        `);
    $('.options-closet').show();
    $('.options-closet').append(`
                <div class="col-4 buttons-options"><button id="btn-view-mycloset">View My Closet</button></div>
                <div class="col-4 buttons-options"><button id="btn-view-idealcloset">View Ideal Closet</button></div>
                <div class="col-4 buttons-options"><button id="btn-view-recommendations">View Recommendations</button><div>
     `);
    
}

function renderCloset(closetItems, closet) {
    console.log('renderCloset fired');
    $('.col-closet').empty();
    $('.col-closet').append(`
        <br>
        <div class="cl-header"><h3>${closet} Closet Items</h2>
            <br>
            <div class="cl-itemcount"></div>
            <br>
            <button class="mycl-addbutton">add new item</button>
            <hr>
            <br>
        </div>`);

    let closetHtml = '';
    let id1 = '';
    let appareltype1 = '';
    let color1 = '';
    let size1 = '';
    let season1 = '';
    let shortdesc1 = '';
    let itemCount = 0;

    closetHtml= '<div id="cl-body">';

    for (let i=0; i < closetItems.items.length; i++) {
        itemCount +=1;

        id1 = closetItems.items[i]._id;
        season1 = closetItems.items[i].season;
        appareltype1 = closetItems.items[i].appareltype;
        color1 = closetItems.items[i].color;
        shortdesc1 = closetItems.items[i].shortdesc;
        //longdesc1 = closetItems.items[i].longdesc;
        size1 = closetItems.items[i].size;



        closetHtml += `<div class="cl-resultcell ${id1}class">` +
                `<div class="cl-resultbody">` +
                        `<div class="itemrow cl-season"><div class="item itemlabel">season: </div><div class="item itembody">${season1}</div></div>` +
                        `<div class="itemrow cl-appareltype"><div class="item itemlabel">type of clothing: </div><div class="item itembody">${appareltype1}</div></div>` +
                        `<div class="itemrow cl-color"><div class="item itemlabel">color: </div><div class="item itembody">${color1}</div></div>` +
                        `<div class="itemrow cl-shortdesc"><div class="item itemlabel">short description: </div><div class="item itembody">${shortdesc1}</div></div>` +
                        `<div class="itemrow cl-size"><div class="item itemlabel">size: </div><div class="item itembody">${size1}</div></div>` +
                `</div>` +
                `<br>` +
                `<div class="cl-editbuttons">` +
                    `<button class="cl-updatebtn1" data-id="${id1}" data-season="${season1}" data-appareltype="${appareltype1}" data-color="${color1}" data-shortdesc="${shortdesc1}" data-size="${size1}">update</button>` +
                    `<button class="cl-deletebtn" data-id="${id1}">delete</button>` +
                `</div>` +
            `</div>`; 
         `<br>`;
    };

    closetHtml+='</div>';

    $('.cl-itemcount').html(`There are ${itemCount} items in your closet.`);
    $('.col-closet').append(closetHtml);

}


// ***** LISTENERS

function listenForIdealclosetFunctions() {
    $('.section-options').on('click', '#btn-view-idealcloset', (function(event) {
        event.preventDefault();
        console.log("listenForIdealclosetFunctions fired");
        const selectedCloset='ideal';
        fetchCloset(selectedCloset, selectedCloset);
}));
}

function listenForMyclosetFunctions() {
    $('.section-options').on('click', '#btn-view-mycloset', (function(event) {
        event.preventDefault();
        console.log("listenForMyclosetFunctions fired");
        const selectedCloset="my";
        fetchCloset(selectedCloset);    
}));
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
            fetchForCreateNewUser(signupInfo);
            
        };
    })
}

function listenforSignin() {
    $('#btn-signin').click(function(event) {
        event.preventDefault();
        console.log('listenforSignin fired');
        const username = $("#GET-username").val();
        const password = $("#GET-password").val();
        let userSignin = {username, password};
        fetchForLogUserIn(userSignin);

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

function listenforLogout() {
    $(document).on('click', '#btn-logout', function(event) {
        event.preventDefault();
        console.log('listenforLogout fired');

        localStorage.removeItem('authToken');
        localStorage.removeItem('userid');
        
        //return to login page
        $('.col-closet').empty();
        $('.section-options').hide();
        $('.section-login').show();
        $('.greeting').html('Goodbye!  Come back soon!');
        renderRegistrationLoginForm();
    });
}

function listenforAddItemToCloset() {
    $(document).on('click','.mycl-addbutton', (function(event){
        event.preventDefault();
        let closetChoice = 'my';
        console.log('listenforAddItemtoCloset fired');
        $('.col-closet').empty();
        $('.col-closet').append(`
            <br>
            <div class="cl-header"><h3>Add new item to ${closetChoice} Closet</h2>
            </div>`);

        // change closet cell to updateable form
        const updateFormBody = 
        `<div class="cl-resultcell additem-class"><div class="cl-resultbody"><form action="/action_page.php">` +
            `<div class="itemrow cl-season"><div class="item itemlabel">season: </div><div class="item itembody"><input id="js-additem-season" type="text" name="season"></div></div>` +
            `<div class="itemrow cl-appareltype"><div class="item itemlabel">type of clothing: </div><div class="item itembody"><input id="js-additem-appareltype" type="text" name="appareltype"></div></div>` +
            `<div class="itemrow cl-size"><div class="item itemlabel">size: </div><div class="item itembody"><input id="js-additem-size" type="text" name="size"></div></div>` +
            `<div class="itemrow cl-color"><div class="item itemlabel">color: </div><div class="item itembody"><input id="js-additem-color" type="text" name="color"></div></div>` +
            `<div class="itemrow cl-shortdesc"><div class="item itemlabel">short description: </div><div class="item itembody"><input id="js-additem-shortdesc" type="text" name="shortdesc"></div></div>`;

        const updateEditButtons = `<div class="cl-editbuttons">` +
        `<button class="cl-addbtn2">add</button>` +
        `<button class="cl-cancel-additem-btn">cancel</button>` +
        `</div></div></form>`;
        $(`.col-closet`).append(updateFormBody);
        $(`.col-closet`).append(updateEditButtons);
    }));
}

function listenforFinalAddItemToCloset() {
    $(document).on('click','.cl-addbtn2', function(event) {
        event.preventDefault();
        const closetChoice = 'my';
        console.log('listenforFinalAddItemToCloset fired');
        
        const season1=$('#js-additem-season').val();
        const appareltype1=$('#js-additem-appareltype').val();
        const size1=$('#js-additem-size').val();
        const color1=$('#js-additem-color').val();
        const shortdesc1=$('#js-additem-shortdesc').val();

        // create object and send to add function
        const newItem= {
            season: season1,
            appareltype:appareltype1,
            size: size1,
            color: color1,
            shortdesc:shortdesc1
        };

        console.log(newItem);

        fetchForCreateNewItemInCloset(newItem, closetChoice);
    })

}

function listenforUpdateItemInCloset() {
    $(document).on('click', '.cl-updatebtn1', (function(event) {
        event.preventDefault();
        console.log('listenforUpdateItemInMycloset fired');
        let closetChoice = 'my';
        const id1=$(this).attr('data-id');
        const season1=$(this).attr('data-season');
        const appareltype1=$(this).attr('data-appareltype');
        const color1 = $(this).attr('data-color');
        const shortdesc1 = $(this).attr('data-shortdesc');
        const size1 = $(this).attr('data-size');

        // change closet cell to updateable form
    
        const updateFormBody = 
        `<div class="cl-resultcell ${id1}class"><div class="cl-resultbody"><form action="/action_page.php">` +
            `<div class="itemrow cl-id"><div class="item itemlabel">id: </div><div class="item itembody"><div id="js-itemid" data-value="${id1}">${id1}</div></div></div>` +
            `<div class="itemrow cl-season"><div class="item itemlabel">season: </div><div class="item itembody"><input id="js-searchseason" type="text" name="season" value="${season1}"></div></div>` +
            `<div class="itemrow cl-appareltype"><div class="item itemlabel">type of clothing: </div><div class="item itembody"><input id="js-searchappareltype" type="text" name="appareltype" value="${appareltype1}"></div></div>` +
            `<div class="itemrow cl-size"><div class="item itemlabel">size: </div><div class="item itembody"><input id="js-searchsize" type="text" name="size" value="${size1}"></div></div>` +
            `<div class="itemrow cl-color"><div class="item itemlabel">color: </div><div class="item itembody"><input id="js-searchcolor" type="text" name="color" value="${color1}"></div></div>` +
            `<div class="itemrow cl-shortdesc"><div class="item itemlabel">short description: </div><div class="item itembody"><input id="js-searchshortdesc" type="text" name="shortdesc" value="${shortdesc1}"></div></div>`;

        const updateEditButtons = `<div class="cl-editbuttons">` +
        `<button class="cl-updatebtn2" data-id="${id1}" data-season="${season1}" data-appareltype="${appareltype1}" data-color="${color1}" data-shortdesc="${shortdesc1}" data-size="${size1}">update</button>` +
        `<button class="cl-cancelbtn">cancel</button>` +
        `</div></div></form>`;
        $(`.${id1}class`).replaceWith(updateFormBody);
        $(`.${id1}class`).append(updateEditButtons);
    }));
}

function listenforFinalUpdateItemInCloset(closet) {
    $(document).on('click', '.cl-updatebtn2', (function(e){
        e.preventDefault();
        const closetChoice = closet;
        const updateId = $('#js-itemid').text();
        const updateSeason = $('#js-searchseason').val();
        const updateAppareltype = $('#js-searchappareltype').val();
        const updateColor = $('#js-searchcolor').val();
        const updateShortdesc = $('#js-searchshortdesc').val();
        const updateSize = $('#js-searchsize').val();
    
        // create object and send to update function
        const updatedClosetItem = {
            id: updateId,
            season: updateSeason,
            appareltype: updateAppareltype,
            color: updateColor,
            shortdesc: updateShortdesc,
            size: updateSize
        }
        fetchForUpdateClosetItemData(closetChoice, updateId, updatedClosetItem);
    
    }));
}

function listenforDeleteItemInCloset() {
$(document).on('click', '.cl-deletebtn', (function(event){
    event.preventDefault();
    const closetChoice="my";
    console.log('.cl-deletebtn has been clicked');
    let id1 = $(this).attr('data-id');
    fetchForDeleteClosetItemData(closetChoice, id1);
}));
}

function listenforCancelAddItem() {
    $(document).on('click', '#cl-cancel-additem-btn', (function(event) {
        event.preventDefault();
        console.log('listenforCancelAddItem fired.');
        const closetChoice = 'my';
        fetchCloset(closetChoice);


    }))
}


$(document).ready(function() {
    console.log('doc is ready');
    renderRegistrationLoginForm();
    listenforRegisterNewUser();
    listenforLoginRequest();
    listenforSignin();
    listenforLogout();
    listenForMyclosetFunctions();
    listenForIdealclosetFunctions();
    listenforAddItemToCloset();
    listenforFinalAddItemToCloset();
    listenforUpdateItemInCloset();
    listenforFinalUpdateItemInCloset('my');
    listenforDeleteItemInCloset()
});