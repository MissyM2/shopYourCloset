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
    $(document).on('click', '#signin-btn', function(event) {
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
    $(document).on('click', '#signup-btn', function(event) {
        event.preventDefault();
        $('#error-msg').remove();
        renderRegistrationForm();
    });
}

function onLogoutClick() {
    $(document).on('click', '#header-logout', function(event) {
        event.preventDefault();
        console.log('onLogoutClick fired');
        //return to login page
        $('.closet-display').html('');
        $('.section-options').html('');
        $('.section-login').show();
        $('#nav-one').html(`<p>Goodbye!  Come back soon!</p>`);
        $('.nav-two').html('').css('border-bottom', 'none');
        $('.nav-admin').html('').css('border-bottom', 'none');
        deleteAuthenticatedUserFromCache();
        RENDER.renderLoginForm();
    });
}


// listeners for closet functions

function onViewClosetClick() {
    $('.section-options').on('click', (function(event) {
        event.preventDefault();
        let selectedCloset;
        if (event.target.id.includes('btn') && event.target.id != "") {
            selectedCloset=event.target.id;
            console.log('selected button is', selectedCloset);
        } else {
            selectedCloset=event.target.parentElement.id;
            console.log('selected closet is', selectedCloset);
        }
        let selectedClosetArr = [];
        selectedClosetArr = selectedCloset.split("-");
        console.log(selectedClosetArr[0]);
        HTTP.fetchCloset(selectedClosetArr[0]);
        
}));
}

function onViewClosetFromNavTwoClick() {
    $('.nav-two').on('click', (function(event) {
        event.preventDefault();
        let selectedCloset;
        selectedCloset=event.target.id;
        console.log(selectedCloset);
        let selectedClosetArr = [];
        selectedClosetArr = selectedCloset.split("-");
        console.log(selectedClosetArr[0]);
        HTTP.fetchCloset(selectedClosetArr[0]); 
}));
}

function onAddItemToClosetClick() {
    $(document).on('click','#cl-addbutton', (function(event){
        event.preventDefault();
        const selCloset = $(this).attr('data-closet');
        const selUser = $(this).attr('data-user');
        const selMsg = "";
        console.log(selCloset);
        console.log(selUser)
        renderAddItemForm(selMsg, selCloset, selUser);
    }));
}

function onSaveItemClosetClick() {
    $(document).on('click','#cl-savebtn', function(event) {
        const selCloset = $(this).attr('data-closet');
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
    
        fetchForCreateNewItemInCloset(newItem, selCloset, selUser);
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
        closetChoice = 'my';
        finalUpdateItemInCloset();
    });
}

function onDeleteItemInClosetClick() {
    $(document).on('click', '#cl-deletebtn', (function(event){
        event.preventDefault();
        const selCloset = $(this).attr('data-closet');
        const selItemId = $(this).attr('data-id');
        // Step 2: Verify use is sure of deletion
        const userSaidYes = confirm('Are you sure you want to delete this item?');
        if (userSaidYes) {
            // step 3:  make fetch call to delete item from closet
            fetchForDeleteClosetItemData(selItemId,selCloset);
        }
    }));
}


function onCancelAddItemClick() {
    $(document).on('click', '#cl-cancelbtn', (function(event) {
        event.preventDefault();
        console.log('onCancelAdd or updateItemClick fired.');
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

function finalUpdateItemInCloset() {
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
;    fetchForUpdateClosetItemData(idToUpdate, updatedClosetItemObj);
}





$(document).ready(function () {
    console.log('doc ready fired');
    onPageLoad();
    onSignupRequestClick();
    onRegisterNewUserClick();
    onSigninClick();
    onLogoutClick();
    onViewClosetClick();
    onViewClosetFromNavTwoClick();
    onAddItemToClosetClick();
    onSaveItemClosetClick()
    onDeleteItemInClosetClick();
    onUpdateItemInClosetClick();
    onCancelAddItemClick();
    onFinalUpdateItemInClosetClick();
});


