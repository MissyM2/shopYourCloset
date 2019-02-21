'use strict';
let STATE = {
};


// all these modules are defined in /public/utilities
const RENDER = window.RENDER_MODULE;
const CACHE = window.CACHE_MODULE;
const ETC = window.ETC_MODULE;
const HTTP = window.HTTP_MODULE;

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
            console.log('about to fetch');

           // let fetchReturn = genericFetch(newUserUrl, newUserSettings);

            fetchForData(newUserUrl, newUserSettings, (data)=>{
                if (data.hasOwnProperty("jwtToken")){
                    console.log('login worked!');
                    cbLogin(data);
            } else {
                console.log('login failed.');
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
        /*
        STORE.idealAppareltypeLength.bottom = 0;
        STORE.idealAppareltypeLength.coat= 0;
        STORE.idealAppareltypeLength.dress = 0;
        STORE.idealAppareltypeLength.shoes = 0;
        STORE.idealAppareltypeLength.top = 0;
            
        STORE.myAppareltypeLength.bottom = 0;
        STORE.myAppareltypeLength.coat= 0;
        STORE.myAppareltypeLength.dress = 0;
        STORE.myAppareltypeLength.shoes = 0;
        STORE.myAppareltypeLength.top = 0;

        STORE.idealSeasonLength["Always in Season"] = 0;
        STORE.idealSeasonLength["Fall Basics"] = 0;
        STORE.idealSeasonLength["Always in Season"] = 0;
        STORE.idealSeasonLength["Spring Basics"] = 0;
        STORE.idealSeasonLength["Summer Basics"] = 0;
        STORE.idealSeasonLength["Winter Basics"] = 0;
    
        STORE.mySeasonLength["Always in Season"] = 0;
        STORE.mySeasonLength["Fall Basics"] = 0;
        STORE.mySeasonLength["Always in Season"] = 0;
        STORE.mySeasonLength["Spring Basics"] = 0;
        STORE.mySeasonLength["Summer Basics"] = 0;
        STORE.mySeasonLength["Winter Basics"] = 0;
*/
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
                            STORE.functionChoice = 'closet';
                            STORE.selCloset = 'ideal';
                            getCloset(); 
                            break;
        case `my-closet-btn`:
        case `my-closet-btn-min`:
                            STORE.functionChoice = 'closet';
                            STORE.selCloset = 'my';
                            getCloset(); 
                            break;
        case `donation-closet-btn`:
        case `donation-closet-btn-min`:
                            STORE.functionChoice = 'closet';
                            STORE.selCloset = 'donation';
                            getCloset(); 
                            break;
        case `giveaway-closet-btn`:
        case `giveaway-closet-btn-min`:
                            STORE.functionChoice = 'closet';
                            STORE.selCloset = 'giveaway';
                            getCloset(); 
                            break;
        case `analyze-closet-btn`:
        case `analyze-closet-btn-min`:
                           $('.options-container').html('').css('display','none');
                            $('.addnewitem-container').html('');
                            $('.closet-container').css('display','block');
                            $('.closet-container').html('');
                            fetchAnalysis();
                            break;
    }
}

function cbGetCloset(data) {
    let selMenu = '';
    if (data.length !== 0) {
        if (STORE.authUserName !== 'admin') {
            selMenu='users'
        } else {
            selMenu='admin';
        }
        renderNavMenu(selMenu);
        organizeData(data);
    } else {
        if (STORE.authUserName !== 'admin') {
            selMenu='users'
        } else {
            selMenu='admin';
        }
        renderNavMenu(selMenu);

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
        let fetchResponse = fetchForResponse(addItemUrl, addItemSettings);
        if (fetchResponse) {
            getCloset();
        }
       
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
       let fetchResponse = fetchForResponse(updateItemUrl, updateItemSettings);
       if (fetchResponse) {
            getCloset();
       } else {
           console.log('problem with fetchResponse ', fetchResponse);
       }
       
    
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
        let fetchResponse = fetchForResponse(deleteItemUrl, deleteItemSettings);
        if (fetchResponse) {
            getCloset();
       } else {
           console.log('problem with fetchResponse ', fetchResponse);
       }
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
       let fetchResponse = fetchForResponse(deleteItemUrl, deleteItemSettings);
       if (fetchResponse) {
                // adds the item to chosen closet (donate or giveaway)
                let addItemUrl;
                if(currentId === 'cl-donate-btn'){
                        STORE.selCloset='donation';
                        STORE.giveawayOrDonate='donate';
                        addItemUrl = `/api/userclosets/${STORE.selCloset}closet/${authUser}`;
                    } else {
                        STORE.selCloset='giveaway';
                        STORE.giveawayOrDonate='giveaway';
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
                                console.log('fetch worked');
                                STORE.selCloset = 'my';
                                getCloset();
                                if (STORE.giveawayOrDonate ==='giveaway') {
                                    $('#user-info').html(`You have just given away one item.  You may see it in the public Giveaway Closet.`);
                                } else {
                                    $('#user-info').html(`You have just donated one item.  You may see it in the your personal Donation Closet.`);
                                }
                            } else {
                                console.log('dta length is 0 check things out.');
                            }
                        });
        } else {
            console.log('problem with fetch response in delete portion of move ', fetchResponse);
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

            fetchForData(addItemUrl, addItemSettings, (data)=>{
                if (data.length !== 0) {
                    console.log('return to closet worked!');
                    getCloset();
                }
            });
        } else {
            console.log('fetch response failed.  here is the fetchResponse', fetchResponse);
        } 
        
    }));
    
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
                    console.log('did not get Closet! ', STORE.selCloset);
                
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
            default:
                    console.log('problem obtaining url ', STORE.selCloset);
                
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
    onSaveUpdatedItemToClosetClick()
    onCancelAddItemClick();
    onMoveItemClick();
    onReturnItemClick();
});


