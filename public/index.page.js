'use strict';
let STATE = {};

// all these modules are defined in /public/utilities
const HTTP = window.HTTP_MODULE;
const RENDER = window.RENDER_MODULE;
const CACHE = window.CACHE_MODULE;

let closetChoice='';




function onPageLoad() {
    updateAuthenticatedUI();
    if (STATE.authUser) {
        console.log('is jwtToken in application?');
      //  HTTP.getUserNotes({
       //     jwtToken: STATE.authUser.jwtToken
            
            //onSuccess: RENDER.renderNotesList
        //});
    }
}


// ***** LISTENERS


// listeners for registration and login

function onRegisterNewUserClick() {
    $(document).on('click', '#btn-register', function(event){
        event.preventDefault();
        $('#error-msg').remove();
        const newName = $('#new-name').val();
        const newEmail = $('#new-email').val();
        const newUsername = $('#new-username').val();
        const newPassword = $("#new-password").val();
        const newPasswordConfirm = $("#confirm-password").val();
        
        if (newName === '' || newEmail === '' || newUsername === '' || newPassword === '') {
            // add current error
            $('#btn-register').before('<p class="error-msg" id="error-msg" aria-live="assertive"><i class="fas fa-exclamation-circle"></i> One of your entries is blank.</p>');
        } else if (newPassword != newPasswordConfirm) {
            console.log('password and new pass are not the same');
            // add current error
            $('#btn-register').before('<p class="error-msg" id="error-msg" aria-live="assertive"><i class="fas fa-exclamation-circle"></i> Password and Confirmation Password are not the same</p>');

        } else {
            const userData = {
                name: newName,
                email: newEmail,
                username: newUsername,
                password: newPassword
            };
            
            HTTP.fetchForCreateNewUser(userData);
        };
    });
}

function onSigninClick() {
    $(document).on('click', '#btn-signin', function(event) {
        event.preventDefault();
        $('#error-msg').remove();
        const userData = {
            username: $("#GET-username").val(),
            password: $("#GET-password").val()
        };
        HTTP.fetchForLogUserIn(userData);
    });
}

function onSignupRequestClick() {
    $(document).on('click', '#btn-signup', function(event) {
        event.preventDefault();
        $('#error-msg').remove();
        renderRegistrationForm();
    });
}

function onLogoutClick() {
    $(document).on('click', '.nav-logout', function(event) {
        event.preventDefault();
        console.log('onLogoutClick fired');
        //return to login page
        $('.col-closet').empty();
        $('.section-options').hide();
        $('.section-login').show();
        $('.nav-greeting').html(`<p>Goodbye!  Come back soon!</p>`);
        $('.col-logout').html('');
        deleteAuthenticatedUserFromCache();
        RENDER.renderLoginForm();
    });
}

/*
// listeners for closet functions

function onIdealclosetFunctionsClick() {
    $('.section-options').on('click', '#btn-view-idealcloset', (function(event) {
        event.preventDefault();
        console.log("onIdealclosetFunctionsClick fired");
        closetChoice='ideal';
        fetchCloset();
}));
}
*/
function onViewMyclosetClick() {
    $('.section-options').on('click', '#btn-view-mycloset', (function(event) {
        event.preventDefault();
        console.log("onMyclosetFunctionsClick fired");
        closetChoice='my';
        HTTP.fetchCloset();    
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

/*
function onAddItemToIdealClosetClick() {
    $(document).on('click','.idealcl-addbutton', (function(event){
        event.preventDefault();
        closetChoice = 'ideal';
        console.log('listenforAddItemtoCloset fired');
        renderAddItemForm();
    }));
}
*/
function onFinalAddItemToMyClosetClick() {
    $(document).on('click','.mycl-addbtn2', function(event) {
        event.preventDefault();
        closetChoice = 'my';
        finalAddItemToCloset()
    });
}
/*
function onFinalAddItemToIdealClosetClick() {
    $(document).on('click','.idealcl-addbtn2', function(event) {
        event.preventDefault();
        closetChoice = 'ideal';
        finalAddItemToCloset()
    });
}
*/
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
        };
        console.log(updatedClosetItemObj);
        fetchForUpdateClosetItemData(updateId, updatedClosetItemObj);
    
    }));
}

function onDeleteItemInClosetClick() {
    $(document).on('click', '.cl-deletebtn', (function(event){
        event.preventDefault();
        closetChoice="my";
        console.log('.cl-deletebtn has been clicked');
        const selectedId = $(this).attr('data-id');
        // Step 2: Verify use is sure of deletion
        //const userSaidYes = confirm('Are you sure you want to delete this item?');
        //if (userSaidYes) {
            // step 3:  make fetch call to delete item from closet
            fetchForDeleteClosetItemData(selectedId);
        //}
    }));
}

/*
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

*/
function updateAuthenticatedUI() {
    const authUser = CACHE.getAuthenticatedUserFromCache();
    console.log(authUser);
    if (authUser) {
        STATE.authUser = authUser;
        $('#nav-greeting').html(`Welcome, ${authUser.name}`);
        $('#auth-menu').removeAttr('hidden');
    } else {
        renderLoginForm();
        //$('#default-menu').removeAttr('hidden');
    }
}


function finalAddItemToCloset() {
    console.log('listenforFinalAddItemToCloset fired');
    const season1=$('#js-additem-whichseason').val();
    const appareltype1=$('#js-additem-appareltype').val();
    const color1=$('#js-additem-color').val();
    const shortdesc1=$('#js-additem-shortdesc').val();
    const longdesc1=$('#js-additem-longdesc').val();
    const size1=$('#js-additem-size').val();

    // create object and send to add function
    const newItem= {
        season:season1,
        appareltype:appareltype1,
        color: color1,
        shortdesc:shortdesc1,
        longdesc: longdesc1,
        size: size1
    };
     console.log(newItem);
    fetchForCreateNewItemInCloset(newItem);
}


$(document).ready(function () {
    console.log('doc ready fired');
    onPageLoad();
    onSignupRequestClick();
    onRegisterNewUserClick();
    onSigninClick();
    onLogoutClick();
    onViewMyclosetClick();
    onAddItemToMyClosetClick();
    onFinalAddItemToMyClosetClick();
    onDeleteItemInClosetClick();
    onUpdateItemInClosetClick();
    onFinalUpdateItemInClosetClick();
});


