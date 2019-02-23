'use strict';

// all these modules are defined in /public/utilities
const RENDER = window.RENDER_MODULE;
const CACHE = window.CACHE_MODULE;
const ETC = window.ETC_MODULE;
const HTTP = window.HTTP_MODULE;

function onPageLoad() {
    updateAuthenticatedUser();
}

function updateAuthenticatedUser() {
    const authUser = getAuthenticatedUserFromCache();
    if (authUser) {
        STORE.authUser = authUser.userid;
        STORE.authUserName = authUser.username;
        renderNavLoggedIn();
        renderOptionsPage();
    } else {
        renderLoginForm();
    }
}


// ***** LISTENERS FOR REGISTRATION AND LOGIN

// request to register a new user
function watchSignupRequest() {
    $(document).on('click', '#signup-btn', function(event) {
        event.preventDefault();
        $('#error-msg').remove();
        renderRegistrationForm();
    });
}

// commit to register a new user
function watchRegisterNewUser() {
    $(document).on('submit', '#registration-form', function(event){
        event.preventDefault();
        const userData = {
            name: $('#new-name').val(),
            email: $('#new-email').val(),
            username: $('#new-username').val(),
            password: $("#new-pass").val()
        };

        const newUserUrl = '/api/user/';
        const newUserSettings = {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json; charset=utf-8",
            },
            "body": JSON.stringify(userData)
        };

        if (genericFetch(newUserUrl, newUserSettings, (data)=>{
            if (data.length !== 0) {
                renderLoginForm();
            }
        })) {
            console.log('we are back at watchRegisterNewUser - success!');
        } else {
            console.log('user is not registered.  highlight errors and have them try again.');
            $('#error-failure').html('<div id="error-icon" class="error-format"><i class="fas fa-exclamation-circle"></i></div><div id="error-verbage" class="error-format">Try again. Either your passwords didn"t match or you have already been registered.</div>');
            $('#error-failure').css("display", "block");
            $("#new-pass").focus();
        }   
    });
}

// login for existing user
function watchSignin() {
    $(document).on('click', '#signin-btn', function(event) {
        event.preventDefault();
        if ($("#GET-username").val() == '') {

            $('#error-username').html('<div class="error-format"><i class="fas fa-exclamation-circle"></i></div><div class="error-format">please fill in username</div>');
            $('#error-username').css("display", "block");
            $("#GET-username").focus();
        } else if ($("#GET-password").val() == '') {
            $('#error-password').html('<div class="error-format"><i class="fas fa-exclamation-circle"></i></div><div class="error-format">please fill in password</div>');
            $('#error-password').css("display", "block");
            $("#GET-password").focus();
        } else {
            const userData = {
                username: $("#GET-username").val(),
                password: $("#GET-password").val()
            };
            const newUserUrl = '/api/auth/login/';
            const newUserSettings = {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json; charset=utf-8",
                },
                "body": JSON.stringify(userData)
            };
            genericFetch(newUserUrl, newUserSettings, (data)=>{
                if (data.hasOwnProperty("jwtToken")){
                    cbLogin(data);
                    console.log('user should be logged in');
                } else {
                    $('#error-username').css("display", "none");
                    $('#error-password').css("display", "none");
                    $('#error-failure').html('<div id="error-icon" class="error-format"><i class="fas fa-exclamation-circle"></i></div><div id="error-verbage" class="error-format">either your name/password are incorrect or you have not registered, yet.</div>');
                    $('#error-failure').css("display", "block");
                    $("#GET-username").focus();
                }   
            });

        }
    });
}

function cbLogin(data) {
    const userData = {
        jwtToken: data.jwtToken,
        id: data.user.id,
        name: data.user.name,
        username: data.user.username,
        email: data.user.email
    };
    saveAuthenticatedUserIntoCache(userData);
    STORE.authUser = localStorage.getItem("userid");
    STORE.authUserName = localStorage.getItem("username");
    STORE.failedFetch = false;
    renderNavLoggedIn();
    renderOptionsPage();
}


// logout
function watchLogout() {
    $(document).on('click', '#header-logout', function(event) {
        event.preventDefault();
        let userName = localStorage.getItem('username');
        if (userName === null) {
            $('.loggedin-container').html('');
            renderLoginForm();
        } else {
            deleteAuthenticatedUserFromCache();
            $('#header-greeting').html(`<p>Goodbye, ${userName}</p>`);
            renderLoginForm();
        }
    });
}

// click on logo at top of the page
function watchGoHome() {
    $(document).on('click', '#header-title', function(event) {
        event.preventDefault();
        $('.section-options').html('').css('display', 'block');
        $('.section-options').html('');
        $('.closet-container').html('');
        $('.addnewitem-container').html('');
        $('.menu-container').html('');
        renderNavLoggedIn();
        renderOptionsPage();
    });
}


// *****LISTENERS FOR CLOSET FUNCTIONS

// some closet functions update this item in STORE before connecting with db
function updateStoreItem(currentBtn) {
    STORE.currentEditItem = {
        id: $(currentBtn).attr('data-id'),
        season: $(currentBtn).attr('data-season'),
        color: $(currentBtn).attr('data-color'),
        appareltype: $(currentBtn).attr('data-appareltype'),
        shortdesc: $(currentBtn).attr('data-shortdesc'),
        longdesc: $(currentBtn).attr('data-longdesc'),
        size: $(currentBtn).attr('data-size')
    }
}

// view selected closet from options page
function watchViewCloset() {
    $('.section-options').on('click','.options-btns',(function(event) {
        event.preventDefault();
        let closetElement;
        closetElement = event.target.id;
        closetClick(closetElement);
}));
}

// view selected closet from nav menu
function watchViewClosetFromNavMenu() {
    $('.section-nav').on('click','.options-btns-min',(function(event) {
        event.preventDefault();
        let closetElement;
        closetElement=event.target.id;
        closetClick(closetElement);
}));
}

// determines which closet has been selected
function closetClick(closetElement) {
    STORE.subFeature = '';
    STORE.failedFetch = false;
    let selMenu = '';
    if (STORE.authUserName !== 'admin') {
        selMenu='users';
    } else {
        selMenu='admin';
    }
    //$('.section-options').html('').css('display', 'none');
    $('.section-options').html('');
    switch (closetElement) {
        case `ideal-closet-btn`:
        case `ideal-closet-btn-min`: 
                            STORE.functionChoice = 'closet';
                            STORE.selCloset = 'ideal';
                            renderNavMenu(selMenu);
                            getCloset(); 
                            break;
        case `my-closet-btn`:
        case `my-closet-btn-min`:
                            STORE.functionChoice = 'closet';
                            STORE.selCloset = 'my';
                            renderNavMenu(selMenu);
                            getCloset(); 
                            break;
        case `donation-closet-btn`:
        case `donation-closet-btn-min`:
                            STORE.functionChoice = 'closet';
                            STORE.selCloset = 'donation';
                            renderNavMenu(selMenu);
                            getCloset(); 
                            break;
        case `giveaway-closet-btn`:
        case `giveaway-closet-btn-min`:
                            STORE.functionChoice = 'closet';
                            STORE.selCloset = 'giveaway';
                            renderNavMenu(selMenu);
                            getCloset(); 
                            break;
        case `analyze-closet-btn`:
        case `analyze-closet-btn-min`:
                            STORE.functionChoice = 'analyze';
                            STORE.selCloset = 'analyze';
                            renderNavMenu(selMenu);
                            fetchAnalysis();
                            break;
    }
}

function cbGetCloset(data) {
    if (data.length !== 0) {
        organizeData(data);
    } else {
        if (STORE.selCloset === 'my') {
            renderAddItemForm("Add your first item here.");
        } else {
            renderInformationPage();
        }
    }
}

// request to dd a new item to a selected closet
function watchAddItem() {
    $('.closet-container').on('click', '#cl-add-btn', (function(event){
        event.preventDefault();
        STORE.failedFetch = false;
        let addMsg = "add your next item here"
        renderAddItemForm(addMsg);
    }));
}

// commit new item to db
function watchSaveItem() {
    $('.addnewitem-container').on('click', '#js-save-btn', function(event){
        event.preventDefault();
        STORE.failedFetch = false;
        STORE.subFeature = 'addnewitem';
        const jwtToken = localStorage.getItem("jwtToken");
        const authUser = localStorage.getItem("userid");
        STORE.currentEditItem = {
            season: $("input[name='season']:checked").val(),
            appareltype:$("input[name='appareltype']:checked").val(),
            color: $("input[name='color']:checked").val(),
            shortdesc:$('#js-additem-shortdesc').val(),
            longdesc: $('#js-additem-longdesc').val(),
            size: $("input[name='size']:checked").val()
        };

        STORE.selCloset = $(this).attr('data-closet');
        let addItemUrl = '';
        if (STORE.authUserName === 'admin') {
            addItemUrl = '/api/idealcloset/';
        } else {
            if (STORE.selCloset === 'giveaway') {
                addItemUrl = `/api/groupclosets/giveawaycloset`;
            } else {
                addItemUrl = `/api/userclosets/${STORE.selCloset}closet/${authUser}`;
            }
        };
        const addItemSettings = {
            "method": "POST",
            "headers": {
                'Accept': 'application/json, text/plain, *',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            body: JSON.stringify(STORE.currentEditItem)
        };
        genericFetch(addItemUrl, addItemSettings, (data) => {
            if (data.length !== 0) {
                console.log('getting closet');
                getCloset();
            }
            });
    });
}


// cancels update item request
function watchCancelUpdateItem() {
    $('.closet-container').on('click', '#cl-cancel-update-btn', (function(event) {
        event.preventDefault();
        if (STORE.authUserName == 'admin') {
            STORE.selCloset = 'ideal';
        } else {
            STORE.selCloset="my";
        }
        getCloset();
    }))
}

// cancels add item request
function watchCancelAddItem() {
    $('.addnewitem-container').on('click', '#cl-cancel-add-btn', (function(event) {
        event.preventDefault();
        STORE.selCloset="my";
        $('.addnewitem-container').html('');
        $('.closet-container').show();
    }))
}


// requests to update an existing item
function watchUpdateItem() {
    $('.section-closet').on('click', '#cl-edit-btn', (function(event) {
        $('.user-msg').html('');
        event.preventDefault();
        updateStoreItem(this);
        renderUpdateForm();
    }));
}

// commits the update to db
function watchSaveUpdatedItem() {
    $('.closet-container').on('click','#cl-updatebtn-final', function(event) {
        event.preventDefault();
        STORE.failedFetch = false;
        STORE.subFeature = 'updateditem';
        const jwtToken = localStorage.getItem("jwtToken");
        const authUser = localStorage.getItem("userid");
        STORE.currentEditItem = {
            id: $(this).attr('data-id'),
            season: $("#js-updateseason").val(),
            appareltype:$('#js-updateappareltype').val(),
            color: $('#js-updatecolor').val(),
            shortdesc:$('#js-updateshortdesc').val(),
            longdesc: $('#js-updatelongdesc').val(),
            size: $('#js-updatesize').val()
        };
        let selectedItemId = STORE.currentEditItem.id;
        let updateItemUrl = '';
        if (localStorage.getItem("name") === 'Admin ID' && STORE.selCloset === 'ideal') {
                    updateItemUrl = `/api/idealcloset/${selectedItemId}`;
        } else {
            if (STORE.selCloset === 'giveaway') {
                updateItemUrl = `/api/groupclosets/giveawaycloset`;
            } else {
                updateItemUrl = `/api/userclosets/${STORE.selCloset}closet/${authUser}/${STORE.currentEditItem.id}`;
            }
        };
        const updateItemSettings = {
            "method": "PUT",
            "headers": {
                'Accept': 'application/json, text/plain, *',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            body: JSON.stringify(STORE.currentEditItem)
        };
        if (genericFetch(updateItemUrl, updateItemSettings, (data) => {
            //if (data.hasOwnProperty("jwtToken")){
            if (data.message === '404') {
                    STORE.failedFetch = true;
                    getCloset();
            } else {
                    //if (data.length !== 0) {
                        if (STORE.authUserName === 'admin') {
                            STORE.selCloset = 'ideal';
                        } else {
                            STORE.selCloset = 'my';
                        }
                        STORE.subFeature = 'updateditem';
                        getCloset(data);
                    }
            //}
            }));
    });
}

// deletes selected item from closet
function watchDeleteItem() {
    $('.closet-container').on('click', '#cl-delete-btn', (function(event){
        event.preventDefault();
        STORE.failedFetch = false;
        updateStoreItem(this);
        const jwtToken = localStorage.getItem("jwtToken");
        let selectedItemId = STORE.currentEditItem.id;
        let deleteItemUrl = '';
        if (localStorage.getItem("name") === 'Admin ID') {
                if (STORE.selCloset === 'ideal') {
                    deleteItemUrl = `/api/idealcloset/${selectedItemId}`;
                } else {
                    deleteItemUrl = `/api/groupclosets/giveawaycloset/${STORE.currentEditItem.id}`;
                }
        } else {
            deleteItemUrl = `/api/userclosets/mycloset/${STORE.authUser}/${selectedItemId}`;
        };
        const deleteItemSettings = {
            "method": "DELETE",
            "headers": {
                'Accept': 'application/json, text/plain, *',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            }
        };

        STORE.subFeature='deleteitem';
        if (genericFetch(deleteItemUrl, deleteItemSettings, (data) => {
            if(data.length != 0) {
                if (data.message === '404') {
                        STORE.failedFetch = true;
                } else {
                getCloset(data);
                }
            } else {
                let msg = "You have deleted the last item in your closet.  Add a new item!";
                renderAddItemForm(msg);
            }

        }));
    }));
}

// moves item from my closet to either donation or giveaway closet
function watchMoveItem() {
    $('.section-closet').on('click', '.js-move', (function(event) {
        event.preventDefault();
        updateStoreItem(this);

        const jwtToken = localStorage.getItem("jwtToken");
        const authUser = localStorage.getItem('userid');
        let selectedItemId = STORE.currentEditItem.id;
        let currentId = $(this).attr("id");
        
        // deletes item from selected closet
        let deleteItemUrl = `/api/userclosets/mycloset/${STORE.authUser}/${selectedItemId}`;
        const deleteItemSettings = {
            "method": "DELETE",
            "headers": {
                'Accept': 'application/json, text/plain, *',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            }
        };
        genericFetch(deleteItemUrl, deleteItemSettings, (data) => {
            if(data.length != 0) {
                 let addItemUrl;
                 if(currentId === 'cl-donate-btn'){
                         STORE.selCloset='donation';
                         STORE.subFeature='donate';
                         addItemUrl = `/api/userclosets/${STORE.selCloset}closet/${authUser}`;
                     } else {
                         STORE.selCloset='giveaway';
                         STORE.subFeature='giveaway';
                         addItemUrl = `/api/groupclosets/giveawaycloset`;
                     }
                     const addItemSettings = {
                         "method": "POST",
                         "headers": {
                         'Accept': 'application/json, text/plain, *',
                         'Content-Type': 'application/json',
                         'Authorization': `Bearer ${jwtToken}`
                         },
                         "body": JSON.stringify(STORE.currentEditItem)
                     };
 
                     genericFetch(addItemUrl, addItemSettings, (data) => {
                             if (data.length !== 0){
                                 STORE.selCloset = 'my';
                                 getCloset(data);
                             } 
                         });
                        }
                    });
    }));
}


// returns item from donation closet to my closet
function watchReturnItem() {
    $('.section-closet').on('click', '#cl-return-btn', (function(event) {
        event.preventDefault();
        updateStoreItem(this);
        const jwtToken = localStorage.getItem("jwtToken");
        let selectedItemId = STORE.currentEditItem.id;

        // delete item from donation closet
        let deleteItemUrl = `/api/userclosets/donationcloset/${STORE.authUser}/${selectedItemId}`;
        const deleteItemSettings = {
            "method": "DELETE",
            "headers": {
                'Accept': 'application/json, text/plain, *',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            }
        };
        let fetchResponse = genericFetch(deleteItemUrl, deleteItemSettings);
        if (fetchResponse) {
            //  add item to my closet
            let addItemUrl = `/api/userclosets/mycloset/${STORE.authUser}`;
            const addItemSettings = {
                    "method": "POST",
                    "headers": {
                        'Accept': 'application/json, text/plain, *',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwtToken}`
                    },
                    "body": JSON.stringify(STORE.currentEditItem)
            };
            STORE.subFeature='returnitem';
            genericFetch(addItemUrl, addItemSettings, (data)=>{
                if (data.length !== 0) {
                    getCloset();
                }
            });
        }  
    }));
    
}

function getCloset() {
    const jwtToken = localStorage.getItem("jwtToken");
    const authUser = localStorage.getItem('userid');

    let getClosetUrl = '';
    if (STORE.authUserName === 'admin') {
        switch(STORE.selCloset) {
            case 'ideal':
                    getClosetUrl = '/api/idealcloset/';
                    break;
            case 'giveaway':
                    getClosetUrl = `/api/groupclosets/giveawaycloset/`;
                    break;
        }
    } else {
        switch(STORE.selCloset) {
            case 'ideal':
                    getClosetUrl = '/api/idealcloset/';
                    break;
            case 'my':
                    getClosetUrl = `/api/userclosets/mycloset/${authUser}`;
                    break;
            case 'giveaway':
                    getClosetUrl = `/api/groupclosets/giveawaycloset/`;
                    break;
            case 'donation':
                    getClosetUrl = `/api/userclosets/donationcloset/${authUser}`;
                    break;
            case 'analyze':
                    renderAnalysis();
                    break;
        }
    }
    
    let getClosetSettings = {
        "method": "GET",
        "headers": {
            'Accept': 'application/json, text/plain, *',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        }
    }
    genericFetch(getClosetUrl, getClosetSettings, cbGetCloset);
}






$(document).ready(function () {
    onPageLoad();
    watchSignupRequest();
    watchRegisterNewUser();
    watchSignin();
    watchLogout();
    watchGoHome();
    watchViewCloset();
    watchViewClosetFromNavMenu();
    watchAddItem();
    watchSaveItem();
    watchCancelAddItem();
    watchDeleteItem();
    watchUpdateItem();
    watchSaveUpdatedItem();
    watchReturnItem();
    watchMoveItem();
});


