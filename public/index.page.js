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
function onSignupRequestClick() {
    $(document).on('click', '#signup-btn', function(event) {
        event.preventDefault();
        $('#error-msg').remove();
        RENDER.renderRegistrationForm();
    });
}

// commit to register a new user
function onRegisterNewUserClick() {
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
        if (fetchForData(newUserUrl, newUserSettings, renderLoginForm)){
            console.log('got new user data!');
        } else {
            console.log('did not get new user data.');
            $('#error-failure').html('<div id="error-icon" class="error-format"><i class="fas fa-exclamation-circle"></i></div><div id="error-verbage" class="error-format">Try again. Either your passwords didn"t match or you have already been registered.</div>');
            $('#error-failure').css("display", "block");
            $("#new-pass").focus();
        }   
    });
}

// login for existing user
function onSigninClick() {
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

            fetchForData(newUserUrl, newUserSettings, (data)=>{
                if (data.hasOwnProperty("jwtToken")){
                    cbLogin(data);
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
    renderNavLoggedIn();
    renderOptionsPage();
}


// logout
function onLogoutClick() {
    $(document).on('click', '#header-logout', function(event) {
        event.preventDefault();
        let userName = localStorage.getItem('username');
        if (userName === null) {
            $('.loggedin-container').html('');
            renderLoginForm();
        } else {
            deleteAuthenticatedUserFromCache();
            renderLogout(userName);
            renderLoginForm();
        }
    });
}

// click on logo at top of the page
function onGoHome() {
    $(document).on('click', '#header-title', function(event) {
        event.preventDefault();
        $('.section-options').html('').css('display', 'block');
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
function onViewClosetClick() {
    $('.section-options').on('click','.options-btns',(function(event) {
        event.preventDefault();

    console.log('target id ' + event.target.id);
        let closetElement;
        closetElement = event.target.id;
        closetClick(closetElement);
}));
}

// view selected closet from nav menu
function onViewClosetFromNavMenuClick() {
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
    let selMenu = '';
    if (STORE.authUserName !== 'admin') {
        selMenu='users';
    } else {
        selMenu='admin';
    }
    $('.section-options').html('').css('display', 'none');
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
function onAddItemToClosetClick() {
    $('.closet-container').on('click', '#cl-add-btn', (function(event){
        event.preventDefault();
        let addMsg = "add your next item here"
        renderAddItemForm(addMsg);
    }));
}

// commit new item to db
function onSaveItemToClosetClick() {
    $('.addnewitem-container').on('click', '#js-save-btn', function(event){
        event.preventDefault();
        console.log('target it for save item is ' + event.target.it);
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
        let fetchResponse = fetchForResponse(addItemUrl, addItemSettings);
        if (fetchResponse) {
            getCloset();
        }
       
    });
}


// cancels update item request
function onCancelUpdateItemClick() {
    $('.closet-container').on('click', '#cl-cancel-update-btn', (function(event) {
        event.preventDefault();
        STORE.selCloset="my";
        getCloset();
    }))
}

// cancels add item request
function onCancelAddItemClick() {
    $('.addnewitem-container').on('click', '#cl-cancel-add-btn', (function(event) {
        event.preventDefault();
        STORE.selCloset="my";
        $('.addnewitem-container').html('');
        $('.closet-container').show();
    }))
}


// requests to update an existing item
function onUpdateItemInClosetClick() {
    $('.section-closet').on('click', '#cl-edit-btn', (function(event) {
        event.preventDefault();
        updateStoreItem(this);
        renderUpdateForm();
    }));
}

// commits the update to db
function onSaveUpdatedItemToClosetClick() {
    $('.closet-container').on('click','#cl-updatebtn-final', function(event) {
        event.preventDefault();
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
        let updateItemUrl = '';
        if (STORE.authUserName === 'admin') {
            updateItemUrl = '/api/idealcloset/';
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
       let fetchResponse = fetchForResponse(updateItemUrl, updateItemSettings);
       if (fetchResponse) getCloset();
    });
}

// deletes selected item from closet
function onDeleteItemInClosetClick() {
    $(document).on('click', '#cl-delete-btn', (function(event){
        event.preventDefault();
        updateStoreItem(this);
        const jwtToken = localStorage.getItem("jwtToken");
        let selectedItemId = STORE.currentEditItem.id;
        let deleteItemUrl = '';
        if (localStorage.getItem("name") === 'Admin ID') {
            deleteItemUrl = `/api/idealcloset/${selectedId}`;
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
        let fetchResponse = fetchForResponse(deleteItemUrl, deleteItemSettings);
        if (fetchResponse) getCloset();
    }));
}

// moves item from my closet to either donation or giveaway closet
function onMoveItemClick() {
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
       let fetchResponse = fetchForResponse(deleteItemUrl, deleteItemSettings);
       if (fetchResponse) {
                // adds the item to chosen closet (donate or giveaway)
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

                    fetchForData(addItemUrl, addItemSettings, (data) => {
                            if (data.length !== 0){
                                STORE.selCloset = 'my';
                                getCloset();
                            } 
                        });
        }     
    }));
}


// returns item from donation closet to my closet
function onReturnItemClick() {
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
        let fetchResponse = fetchForResponse(deleteItemUrl, deleteItemSettings);
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
            fetchForData(addItemUrl, addItemSettings, (data)=>{
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
        switch(closet) {
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
    fetchForData(getClosetUrl, getClosetSettings, cbGetCloset);
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
    onSaveItemToClosetClick();
    onDeleteItemInClosetClick();
    onUpdateItemInClosetClick();
    onSaveUpdatedItemToClosetClick();
    onCancelUpdateItemClick();
    onCancelAddItemClick();
    onMoveItemClick();
    onReturnItemClick();
});


