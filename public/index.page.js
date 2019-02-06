'use strict';
let STATE = {
};


// all these modules are defined in /public/utilities
const HTTP = window.HTTP_MODULE;
const RENDER = window.RENDER_MODULE;
const CACHE = window.CACHE_MODULE;

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

function updateAuthenticatedUI() {
    const authUser = CACHE.getAuthenticatedUserFromCache();
    console.log(authUser);
    if (authUser) {
        STATE.authUser = authUser;
        $('#nav-greeting').html(`Welcome, ${authUser.name}`);
        $('#auth-menu').removeAttr('hidden');
    } else {
        RENDER.renderLoginForm();
        //$('#default-menu').removeAttr('hidden');
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
    $(document).on('click', '#signin-btn', function(event) {
        console.log('sign in fired');
        event.preventDefault();
        $('#error-msg').remove();
        const userData = {
            username: $("#GET-username").val(),
            password: $("#GET-password").val()
        };
        $('.section-options').html('');
        $('.section-login').html('');
        $('.section-closet').html('');
        $('.section-nav').html('');
        HTTP.fetchForLogUserIn(userData);
    });
}

function onSignupRequestClick() {
    $(document).on('click', '#signup-btn', function(event) {
        event.preventDefault();
        $('#error-msg').remove();
        RENDER.renderRegistrationForm();
    });
}

function onLogoutClick() {
    $(document).on('click', '#header-logout', function(event) {
        event.preventDefault();
        console.log('onLogoutClick fired');
        //return to login page
        const loggedinUser = localStorage.getItem("username");

        CACHE.deleteAuthenticatedUserFromCache();
        $('.section-options').html('');
        $('.section-login').html('');
        $('.section-closet').html('');
        $('.section-nav').html('');
        RENDER.renderNavLogout(loggedinUser);
        RENDER.renderLoginForm();
    });
}

function onGoHome() {
    $(document).on('click', '#header-title', function(event) {
        event.preventDefault();
        RENDER.renderOptionsScreen();
    });
}


// listeners for closet functions

function onViewClosetClick() {
    $('.section-options').on('click', (function(event) {
        event.preventDefault();
        console.log('the state of the closet is ' + STORE.selCloset)
        let closetElement;
        if (event.target.id.includes('btn') && event.target.id != "") {
            closetElement=event.target.id;
            console.log('selected button is', closetElement);
        } else {
            closetElement=event.target.parentElement.id;
            console.log('selected closet is', closetElement);
        }
        let selectedClosetArr = [];
        selectedClosetArr = closetElement.split("-");
        console.log(selectedClosetArr[0]);
        STORE.selCloset=selectedClosetArr[0];
        //HTTP.fetchCloset(selectedClosetArr[0]);
        HTTP.fetchCloset();
        
}));
}

function onViewClosetFromNavMenuClick() {
    $('.section-nav').on('click', '.nav-menu', (function(event) {
        console.log('made it to view closet');
        event.preventDefault();
        let closetElement;
        closetElement=event.target.id;
        console.log(closetElement);
        let closetElementArr = [];
        closetElementArr = closetElement.split("-");
        console.log(closetElementArr[0]);
        STORE.selCloset = closetElementArr[0]
        HTTP.fetchCloset(); 
}));
}

function onAddItemToClosetClick() {
    $(document).on('click','#cl-addbutton', (function(event){
        event.preventDefault();
        STORE.selCloset = $(this).attr('data-closet');
        const selUser = $(this).attr('data-user');
        const selMsg = "";
        console.log(STORE.selCloset);
        console.log(selUser)
        RENDER.renderAddItemForm(selMsg, selUser);
    }));
}

function onSaveItemClosetClick() {
    $(document).on('click','#cl-savebtn', function(event) {
        STORE.selCloset = $(this).attr('data-closet');
        const selUser = $(this).attr('data-user');
        event.preventDefault();
        const newItem= {
            season: $("input[name='season']:checked").val(),
            appareltype:$("input[name='appareltype']:checked").val(),
            color: $("input[name='color']:checked").val(),
            shortdesc:$('#js-additem-shortdesc').val(),
            longdesc: $('#js-additem-longdesc').val(),
            size: $("input[name='size']:checked").val()
        };
         console.log(newItem);
    
        HTTP.fetchForCreateNewItemInCloset(newItem, selUser);
    });
}

function onUpdateItemInClosetClick() {
    $(document).on('click', '#clupdate-btn', (function(event) {
        console.log('update form is listening');
        event.preventDefault();
        const updateObj = {
            id: $(this).attr('data-id'),
            season: $(this).attr('data-season'),
            appareltype: $(this).attr('data-appareltype'),
            color: $(this).attr('data-color'),
            shortdesc: $(this).attr('data-shortdesc'),
            longdesc: $(this).attr('data-longdesc'),
            size: $(this).attr('data-size')
        }
        console.log(updateObj);
        RENDER.renderUpdateForm(updateObj);
    }));
}

function onFinalUpdateItemInClosetClick() {
    $(document).on('click', '#cl-updatebtn2', function(event){
        event.preventDefault();
        STORE.selCloset = $(this).attr('data-closet');
        event.preventDefault();
        const idToUpdate = $("#js-itemid").text();
        // create object and send to update function
        const updatedClosetItemObj = {
            season: $("#js-updateseason").val(),
            color: $("#js-updatecolor").val(),
            appareltype: $("#js-updateappareltype").val(),
            shortdesc: $("#js-updateshortdesc").val(),
            longdesc: $("#js-updatelongdesc").val(),
            size: $("#js-updatesize").val()
        };
        HTTP.fetchForUpdateClosetItemData(idToUpdate, updatedClosetItemObj);
    });
}

function onDeleteItemInClosetClick() {
    $(document).on('click', '#cl-deletebtn', (function(event){
        event.preventDefault();
        STORE.selCloset = $(this).attr('data-closet');
        console.log('the state of the closet is: ', STORE.selCloset);
        const selItemId = $(this).attr('data-id');
        // Step 2: Verify use is sure of deletion
        const userSaidYes = confirm('Are you sure you want to delete this item?');
        if (userSaidYes) {
            // step 3:  make fetch call to delete item from closet
            HTTP.fetchForDeleteClosetItemData(selItemId);
        }
    }));
}


function onCancelAddItemClick() {
    $(document).on('click', '#cl-cancelbtn', (function(event) {
        event.preventDefault();
        console.log('onCancelAdd or updateItemClick fired.');
        HTTP.fetchCloset();
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








$(document).ready(function () {
    console.log('doc ready fired');
    onPageLoad();
    onSignupRequestClick();
    onRegisterNewUserClick();
    onSigninClick();
    onLogoutClick();
    onGoHome();
    onViewClosetClick();
    onViewClosetFromNavMenuClick();
    onAddItemToClosetClick();
    onSaveItemClosetClick()
    onDeleteItemInClosetClick();
    onUpdateItemInClosetClick();
    onCancelAddItemClick();
});


