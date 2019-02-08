'use strict';
let STATE = {
};


// all these modules are defined in /public/utilities
const HTTP = window.HTTP_MODULE;
const RENDER = window.RENDER_MODULE;
const CACHE = window.CACHE_MODULE;

function onPageLoad() {
    updateAuthenticatedUI();
}

function updateAuthenticatedUI() {
    const authUser = CACHE.getAuthenticatedUserFromCache();
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
        event.preventDefault();
        $('#error-msg').remove();
        const userData = {
            username: $("#GET-username").val(),
            password: $("#GET-password").val()
        };
        $('.section-options').html('');
        $('.section-login').html('');
        $('.closet-container').html('');
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
        //return to login page
        const userName= localStorage.getItem("username");

        CACHE.deleteAuthenticatedUserFromCache();
        $('.section-options').html('');
        $('.section-login').html('');
        $('.closet-container').html('');
        $('.section-nav').html('');
        RENDER.renderLogout(userName);
        RENDER.renderLoginForm();
    });
}

function onGoHome() {
    $(document).on('click', '#header-title', function(event) {
        event.preventDefault();$('.section-options').html('');
        $('.section-login').html('');
        $('.closet-container').html('');
        $('.section-nav').html(''); $('.closet-container').html('');
        RENDER.renderNavLoggedIn();
        RENDER.renderOptionsScreen();
    });
}


// listeners for closet functions

function onViewClosetClick() {
    $('.section-options').on('click', (function(event) {
        event.preventDefault();
        let closetElement;
        if (event.target.id.includes('btn') && event.target.id != "") {
            closetElement=event.target.id;
        } else {
            closetElement=event.target.parentElement.id;
        }
        let selectedClosetArr = [];
        selectedClosetArr = closetElement.split("-");
        STORE.selCloset=selectedClosetArr[0];
        HTTP.fetchCloset();
}));
}


function onViewClosetFromNavMenuClick() {
   // $('.section-nav').on('click',(function(event) {
    $(document).on('click','.options-btns-min',(function(event) {
        event.preventDefault();
        let closetElement;
        closetElement=event.target.id;
        let closetElementArr = [];
        closetElementArr = closetElement.split("-");
        STORE.selCloset = closetElementArr[0]
        HTTP.fetchCloset(); 
}));
}

function onAddItemToClosetClick() {
    $('.section-closet').on('click', '#cl-add-btn', (function(event){
        event.preventDefault();
        alert('hello');
        console.log(event.target);
        STORE.selCloset = $(this).attr('data-closet');
        const selUser = $(this).attr('data-user');
        const selMsg = "";
        RENDER.renderAddItemForm(selMsg, selUser);
    }));
}

function onSaveItemToClosetClick() {
    $('.section-closet').on('click','.additem-edit-btns', function(event) {
        event.preventDefault();
        console.log(event.target);
        console.log(event.currentTarget);
        console.log(event.target.id);
        const newItem= {
            season: $("input[name='season']:checked").val(),
            appareltype:$("input[name='appareltype']:checked").val(),
            color: $("input[name='color']:checked").val(),
            shortdesc:$('#js-additem-shortdesc').val(),
            longdesc: $('#js-additem-longdesc').val(),
            size: $("input[name='size']:checked").val()
        };
    
        HTTP.fetchForCreateNewItemInCloset(newItem);
    });
}

function onUpdateItemInClosetClick() {
    $(document).on('click', '#clupdate-btn', (function(event) {
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
        HTTP.fetchCloset();
    }))
}

function onPasswordRevealClick() {
    $(document).on('click', '.password-icon', (function(event) {
        event.preventDefault();
        if ($( "input[name='new-password']").attr('type') === 'password') {
            $( "input[name='new-password']").attr('type','text');
            $(this).removeClass("fa-eye-slash").addClass("fa-eye");
            
          } else {
            $( "input[name='new-password']").attr('type','password');
            $(this).removeClass("fa-eye");
            $(this).addClass("fa-eye-slash");
          };
    }));
}

function onLoginPasswordRevealClick() {
    $(document).on('click', '.password-icon', (function(event) {
        event.preventDefault();
        if ($( "input[name='GET-password']").attr('type') === 'password') {
            $( "input[name='GET-password']").attr('type','text');
            $(this).removeClass("fa-eye-slash").addClass("fa-eye");
            
          } else {
            $( "input[name='GET-password']").attr('type','password');
            $(this).removeClass("fa-eye");
            $(this).addClass("fa-eye-slash");
          };
    }));
}

function onConfirmPasswordRevealClick() {
    $(document).on('click', '.password-confirm-icon', (function(event) {
        event.preventDefault();
        if ($( "input[name='confirm-password']").attr('type') === 'password') {
            $( "input[name='confirm-password']").attr('type','text');
            $(this).removeClass("fa-eye-slash").addClass("fa-eye");
            
          } else {
            $( "input[name='confirm-password']").attr('type','password');
            $(this).removeClass("fa-eye");
            $(this).addClass("fa-eye-slash");
          };
    }));
}








$(document).ready(function () {
    onPageLoad();
    onSignupRequestClick();
    onRegisterNewUserClick();
    onSigninClick();
    onLogoutClick();
    onGoHome();
    onViewClosetClick();
    onViewClosetFromNavMenuClick();
    onAddItemToClosetClick();
    onSaveItemToClosetClick()
    onDeleteItemInClosetClick();
    onUpdateItemInClosetClick();
    onCancelAddItemClick();
});


