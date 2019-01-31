
/*
//  GET fetch request for My Closet
const getMycloset = function getMyclosetData() {
    fetch('/mycloset', {
        method: 'get'
        })
        .then(function(response) {
        return response.json();
        })
        .then(data =>{
        //console.log(data);
        renderMycloset(data);
        })
        .catch(function(err) {
        // Error :(
        });
}

// POST fetch request for My Closet
const addItemToMycloset = function postMyClosetData() {

    fetch('/mycloset', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, *',
            'Content-Type': 'application/json'
            //'Authorization': 'Bearer token'
        },
        body: JSON.stringify({
            "season": "Always in Season",
            "appareltype": "bottom",
            "color": "BLACK",
            "shortdesc": "short-sleeved t-shirt"
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            };
            throw new Error(response.text);
            })
        .then(responseJson => {
            console.log('Success: ', JSON.stringify(responseJson));
            $('.mycloset').empty();
            getMycloset();
        })
        .catch(error => {
            console.error('Error: ', error)
        });
}

//  PUT fetch request for My Closet
function updateMyClosetItemData(myclosetitemId, data) {
    console.log(data);
    fetch('/mycloset/' + myclosetitemId, {
        method: 'put',
        headers: {
            'Accept': 'application/json, text/plain, *',
            'Content-Type': 'application/json'
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
            console.log('Success: ', JSON.stringify(responseJson));
            $('.mycloset').empty();
            getMycloset();
        })
        .catch(error => {
            console.error('Error: ', error)
        });
}

// DELETE fetch request for My Closet
function deleteMyClosetItemData(myclosetitemId) {
    console.log('/mycloset/' + myclosetitemId);
    fetch('/mycloset/' + myclosetitemId , {
        method: 'delete',
        headers: {
            'Accept': 'application/json, text/plain, *',
            'Content-Type': 'application/json'
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
        $('.mycloset').empty();
        getMycloset();
    })
    .catch(error => {
        console.error('Error: ', error)
    });
}

/*
function getRecentMyclosetItems(callbackFn) {
    // we use a `setTimeout` to make this asynchronous
    // as it would be with a real AJAX call.
	setTimeout(function(){ callbackFn(MOCK_MYCLOSET_ITEMS)}, 1);
}

// this function stays the same when we connect
// to real API later


// 
const renderMycloset = function renderMyclosetData(data) {
    $('.mycloset').append(
        `<div class="mycl-title"><br><h3><p>My Closet Items</p></h2>` +
        `<div class="mycl-itemcount"></div>` +
        `<br><button class="mycl-addbutton">add new</button><hr><br></div>`);

    let myclosetHtml = '';
    let appareltype1 = '';
    let color1 = '';
    let season1 = '';
    let shortdesc1 = '';
    let itemCount = 0;

    myclosetHtml += `<div id="mycl-body">`;
    

    $.each(data.items, function(i, item) {
        itemCount +=1;
        id1 = data.items[i]._id;
        season1 = data.items[i].season;
        appareltype1 = data.items[i].appareltype;
        color1 = data.items[i].color;
        shortdesc1 = data.items[i].shortdesc;
        size1 = data.items[i].size;
        
        myclosetHtml += `<div class="mycl-resultcell ${id1}class"><div class="mycl-resultbody">` +
            `<div class="itemrow mycl-id"><div class="item itemlabel">id: </div><div class="item itembody">${id1}</div></div>` +
            `<div class="itemrow mycl-season"><div class="item itemlabel">season: </div><div class="item itembody">${season1}</div></div>` +
            `<div class="itemrow mycl-appareltype"><div class="item itemlabel">type of clothing: </div><div class="item itembody">${appareltype1}</div></div>` +
            `<div class="itemrow mycl-color"><div class="item itemlabel">color: </div><div class="item itembody">${color1}</div></div>` +
            `<div class="itemrow mycl-shortdesc"><div class="item itemlabel">short description: </div><div class="item itembody">${shortdesc1}</div></div>` +
            `<div class="itemrow mycl-size"><div class="item itemlabel">size: </div><div class="item itembody">${size1}</div></div></div><br>` +
            `<div class="mycl-editbuttons"><button class="mycl-updatebtn1" data-id="${id1}" data-season="${season1}" data-appareltype="${appareltype1}" data-color="${color1}" data-shortdesc="${shortdesc1}" data-size="${size1}">update</button>` +
            `<button class="mycl-deletebtn" data-id="${id1}">delete</button></div></div>`; 
    });
    myclosetHtml += `</div>`;
    console.log(itemCount);
    $('.mycl-itemcount').html(`There are ${itemCount} items in your closet.`);
	$('.mycloset').append(myclosetHtml);
}
*/



/*
$(document).ready(function() {

    $('#page-login').hide();
    $('#page-register').hide();
    $('.section-mycloset').hide();
    $('.section-login').show();
   

    $('#btn-login').click(function() {
        $('#page-register').hide();
        $('.section-mycloset').hide();
        $('.section-login').hide();
        $('#page-login').show();
    })

    $('#register-link').click(function() {
        $('#page-login').hide();
        $('.section-mycloset').hide();
        $('.section-login').hide();
        $('#page-register').show();
    })

    $('#btn-register').click(function() {
        $('#page-login').hide();
        $('.section-mycloset').hide();
        $('.section-login').hide();
        $('#page-register').show();
    })
*/
 /*   
// listener for add new
$(document).on('click','.mycl-addbutton', (function(event){
    event.preventDefault();
    addItemToMycloset();
}));

// listener for delete
$(document).on('click', '.mycl-deletebtn', (function(e){
    console.log('.mycl-deletebtn has been clicked');
    let id = $(this).attr('data-id');
    console.log(id);
    e.preventDefault();
    deleteMyClosetItemData(id);
}));
*/
/*
// listener for update
$(document).on('click', '.mycl-updatebtn1', (function(e){
    console.log('.mycl-updatebtn has been clicked');
    const id = $(this).attr('data-id');
    const season=$(this).attr('data-season');
    const appareltype=$(this).attr('data-appareltype');
    const color = $(this).attr('data-color');
    const shortdesc = $(this).attr('data-shortdesc');
    const size = $(this).attr('data-size');
    console.log(season);
    console.log(id);
    console.log('.' + id + 'class');
    e.preventDefault();

    // change mycloset cell to an updateable format
    
    const updateFormBody = 
        `<div class="mycl-resultcell ${id}class"><div class="mycl-resultbody"><form action="/action_page.php">` +
        `<div class="mycl-resultbody">`+
            `<div class="itemrow mycl-id"><div class="item itemlabel">id: </div><div class="item itembody"><div id="js-itemid" data-value="${id}">${id}</div></div></div>` +
            `<div class="itemrow mycl-season"><div class="item itemlabel">season: </div><div class="item itembody"><input id="js-searchseason" type="text" name="season" value="${season}"></div></div>` +
            `<div class="itemrow mycl-appareltype"><div class="item itemlabel">type of clothing: </div><div class="item itembody"><input id="js-searchappareltype" type="text" name="appareltype" value="${appareltype}"></div></div>` +
                        `<div class="itemrow mycl-size"><div class="item itemlabel">size: </div><div class="item itembody"><input id="js-searchsize" type="text" name="size" value="${size}"></div></div>`;
`<div class="itemrow mycl-color"><div class="item itemlabel">color: </div><div class="item itembody"><input id="js-searchcolor" type="text" name="color" value="${color}"></div></div>` +
            `<div class="itemrow mycl-shortdesc"><div class="item itemlabel">short description: </div><div class="item itembody"><input id="js-searchshortdesc" type="text" name="shortdesc" value="${shortdesc}"></div></div>` +
    
    const updateEditButtons = `<div class="mycl-editbuttons">` +
        `<button class="mycl-updatebtn2" data-id="${id}" data-season="${season}" data-appareltype="${appareltype}" data-color="${color}" data-shortdesc="${shortdesc}" data-size="${size}">update</button>` +
        `<button class="mycl-cancelbtn">cancel</button>` +
        `</div></div></form>`;

    $('.' + id + 'class').replaceWith(updateFormBody );
    $('.' + id + 'class').append(updateEditButtons);

  }));

  // listener for update
$(document).on('click', '.mycl-updatebtn2', (function(e){
    e.preventDefault();
    console.log('update is listening ');
    const updateId = $('#js-itemid').text();
    console.log('id is ' + updateId);
    const updateSeason = $('#js-searchseason').val();
    console.log('season is ' + updateSeason);
    const updateAppareltype = $('#js-searchappareltype').val();
    console.log('appareltype is ' + updateAppareltype);
    const updateColor = $('#js-searchcolor').val();
    console.log('color is ' + updateColor);
    const updateShortdesc = $('#js-searchshortdesc').val();
    console.log('shortdesc is ' + updateShortdesc);
    const updateSize = $('#js-searchsize').val();
    console.log('size is ' + updateSize);

    // create object and send to update function
    updatedMyClosetItem = {
        id: updateId,
        season: updateSeason,
        appareltype: updateAppareltype,
        color: updateColor,
        shortdesc: updateShortdesc,
        size: updateSize
    }
    console.log(updatedMyClosetItem);
    updateMyClosetItemData(updateId, updatedMyClosetItem);

}));
*/

function guestLogin() {
    console.log('guestLogin fired');
    const guest = {
        'username': 'guest',
        'password': 'passwordpass'
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
            user = data.username;
            $('#user-signin').append(`<p>Welcome ${user}!</p>
            <button type="button" onclick="signOut();>Sign Out</button></br />
            `)
            return response.json();
        } else {
            throw new Error(response.statusText);
        }
    })
    .then (responseJson => {
        token = responseJson.authtoken;
        localStorage.setItem('authToken', token);
        console.log('made it to responseJson and localstoraget.setitem');
    })
    .catch(error => {
        $('#login-error').empty().append(`<p class="alert">Usernamd or password is incorrect.</p>`);
    });
}
/*
function logUserIn() {
    fetch('/auth/login'), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
        .then(res => {
            if (res.ok) {
                console.log('made it past res.ok on logUserIt');
                user = data.username;
                $('#user-signout').append(`
                    <p>Welcome ${user}!</p><button type="button" onclick="signOut();">Sign Out</button><br />
                    </p>
                `)
                return res.json();
            } else {
                throw new Error(res.statusText);
            }
        })
        .then(resJson => {
            token = resJson.authToken;
            localStorage.setItem('authToken', token);
            getMycloset();
        })
        .catch(err => {
            $('#error-registration').empty().append(`<p class="alert">Username or password is incorrect</p>`);
        });
}
*/
function createNewUser(newInfo) {
    console.log(newInfo);

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
        console.log(response);
        throw new Error(response.json());
    })
    .then(resJson => {
        console.log(resJson);
        user.username =resJson.username;
        console.log(user.username);
        user.firstName=resJson.firstname;
        user.lastName=resJson.lastname;
        user.authToken = resJson.authToken;
        let newuser=resJson.username;
        let newuserfname = resJson.firstname;
        let newuserlname = resJson.lastname;
        console.log('new user is ' + newuser, newuserfname, newuserlname);

        $('#user-created').empty().append(`<p class="user-created">User created: ` +
            `${newuser} with firstname: ${newuserfname} and last name: ${newuserlname}.`);
    })
    .catch(error => {
        console.error(error);
        $('#error-registration').empty().append(`<p class="alert">there was an validation error</p>`)
    });
}

function onSigninClick() {
    console.log('onSigninClick fired');
    $('#btn-signin').click(event => {
        event.preventDefault();
        guestLogin();
    })
}
/*
function onSigninClick() {
    $('#btn-signin').click(function(event) {
        event.preventDefault();
        fetch('/users', {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(newInfo)
        })
        .then(response => {
            if (Response.ok) {
                return response.json();
            }
            throw new Error(response.text);
        })
        .then(resJson => {
            user.username =resJson.username;
            user.firstName=resJson.firstname;
            user.lastName=resJson.lastname;
            user.authToken = resJson.authToken;
            let newuser=resJson.username;
            let newuserfname = resJson.firstname;
            let newuserlname = resJson.lastname;
            console.log('new user is ' + newuser, newuserfname, newuserlname);
    
            $('#user-created').empty().append(`<p class="user-created">User created: ` +
                `${newuser} with firstname: ${newuserfname} and last name: ${newuserlname}.`);
        })
        .catch(error => {
            console.error(error);
            $('#error-registration').empty().append(`<p class="alert">there was an validation error</p>`)
        });
    })
}
*/

/*
    $('#login-redirect').click(() => {
        //reset the signup form
        $('.js-new-username').val('').removeClass('error-field').attr('aria-invalid', false);
        $('.js-new-password').val('').removeClass('error-field').attr('aria-invalid', false);
        $('.js-confirm-password').val('').removeClass('error-field').attr('aria-invalid', false);
        $('.error-msg').remove();
     
        //switch to login page
        $('#page-login').show();
        $('#page-registration').hide();
    })
  */

         

//  on page load do this
$(document).ready(function(){
    listenForRegistration();
    listenForSignUp();
    listenForLogin();
    onSigninClick();
  });