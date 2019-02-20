'use strict';
let STATE = {
};


// all these modules are defined in /public/utilities
const HTTP = window.HTTP_MODULE;
const RENDER = window.RENDER_MODULE;
const CACHE = window.CACHE_MODULE;
const ETC = window.ETC_MODULE;

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
        if (genericFetch(newUserUrl, newUserSettings, renderLoginForm)){
            console.log('generic fetch worked!');
        } else {
            console.log('generic fetch failed.');
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
        //$('#error-msg').html();

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
            if (genericFetch(newUserUrl, newUserSettings, cbLogin)){
                console.log('generic fetch worked!');
            } else {
                console.log('generic fetch failed.');
                $('#error-username').css("display", "none");
                $('#error-password').css("display", "none");
                $('#error-failure').html('<div id="error-icon" class="error-format"><i class="fas fa-exclamation-circle"></i></div><div id="error-verbage" class="error-format">either your name/password are incorrect or you have not registered, yet.</div>');
                $('#error-failure').css("display", "block");
                $("#GET-username").focus();
            }
        }     
    });
}

// logout
function onLogoutClick() {
    $(document).on('click', '#header-logout', function(event) {
        event.preventDefault();
        let userName = localStorage.getItem('username');
        if (userName === null) {
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
        $('.options-container').css('display', 'block');
        $('.addnewitem-container').html('');
        $('.closet-container').html('');
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
    $('.options-container').on('click',(function(event) {
        event.preventDefault();
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
    switch (closetElement) {
        case `ideal-closet-btn`:
        case `ideal-closet-btn-min`:
                            STORE.selCloset = 'ideal';
                            break;
        case `my-closet-btn`:
        case `my-closet-btn-min`:
                            STORE.selCloset = 'my';
                            break;
        case `donation-closet-btn`:
        case `donation-closet-btn-min`:
                            STORE.selCloset = 'donation';
                            break;
        case `giveaway-closet-btn`:
        case `giveaway-closet-btn-min`:
                            STORE.selCloset = 'giveaway';
                            break;
        case `analyze-closet-btn`:
        case `analyze-closet-btn-min`:
                            STORE.selCloset = 'analyze';
                            break;
    }

    if (STORE.selCloset === 'analyze') {
        STORE.functionChoice = 'analysis';
        getAnalysis();
    } else {
        STORE.functionChoice = 'closet';
        getCloset(); 
    }
}

// request to dd a new item to a selected closet
function onAddItemToClosetClick() {
    $('.closet-container').on('click', '#cl-add-btn', (function(event){
        event.preventDefault();
        $('.options-container').html('');
        $('.closet-container').html('');
        let addMsg = "add your next item here"
        renderAddItemForm(addMsg);
    }));
}

// commit new item to db
function onSaveItemToClosetClick() {
    $('.section-closet').on('click', '#js-save-btn', function(event){
        event.preventDefault();
        console.log('made it to save item to closet');
      
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
        genericFetch(addItemUrl, addItemSettings, getCloset);
       
    });
}


// cancels update item request
function onCancelAddItemClick() {
    $('.closet-container').on('click', '#cl-cancel-btn', (function(event) {
        event.preventDefault();
        console.log('cancel add');
        STORE.selCloset="my";
        getCloset();
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

       // STORE.selCloset = $(this).attr('data-closet');
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
       genericFetch(updateItemUrl, updateItemSettings);
       getCloset();
    
    });
}

// deletes selected item from closet
function onDeleteItemInClosetClick() {
    $(document).on('click', '#cl-delete-btn', (function(event){
        event.preventDefault();
        updateStoreItem(this);
        const userSaidYes = confirm('Are you sure you want to delete this item?');
        if (userSaidYes) {
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
        genericFetch(deleteItemUrl, deleteItemSettings);
        getCloset();
    }
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
       genericFetch(deleteItemUrl, deleteItemSettings);

       // adds the item to chosen closet (donate or giveaway)
       let addItemUrl;
       if(currentId === 'cl-donate-btn'){
            STORE.selCloset='donation';
            addItemUrl = `/api/userclosets/${STORE.selCloset}closet/${authUser}`;
        } else {
            STORE.selCloset='giveaway';
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

        HTTP.genericFetch(addItemUrl, addItemSettings, getCloset);
        STORE.selCloset = 'my';
        getCloset();
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
        HTTP.genericFetch(deleteItemUrl, deleteItemSettings);

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

        HTTP.genericFetch(addItemUrl, addItemSettings);
        getCloset();
        
    }));
    
}


// analyzes closet data and produces report to screen
function getAnalysis() {
    const jwtToken = localStorage.getItem("jwtToken");
    const authUser = localStorage.getItem('userid');
    
    let getAnalysisUrl = '/api/idealcloset/';
    let getAnalysisSettings = {
        "method": "GET",
        "headers": {
            'Accept': 'application/json, text/plain, *',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        }
    };
   HTTP.genericFetch(getAnalysisUrl, getAnalysisSettings, organizeData);
   
   getAnalysisUrl = `/api/userclosets/mycloset/${authUser}`;
   getAnalysisSettings = {
        "method": "GET",
        "headers": {
            'Accept': 'application/json, text/plain, *',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        }
    };
    HTTP.genericFetch(getAnalysisUrl, getAnalysisSettings, organizeData);
}

function getCloset() {
    console.log('getcloset fired');
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
            default:
                    console.log('error coming from fetch module! ', STORE.selCloset);
                
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
                    fetchForAnalysis();
                    break;
            default:
                    console.log('error coming from fetch module ', STORE.selCloset);
                
        }
    }
    console.log('get closetURL is ', getClosetUrl);
    
    let getClosetSettings = {
        "method": "GET",
        "headers": {
            'Accept': 'application/json, text/plain, *',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        }
    }
    console.log('fetch is next');
    genericFetch(getClosetUrl, getClosetSettings, cbGetCloset);
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
    onSaveUpdatedItemToClosetClick()
    onCancelAddItemClick();
    onMoveItemClick();
    onReturnItemClick();
});


