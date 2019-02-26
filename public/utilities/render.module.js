//  RENDER data to screen

window.RENDER_MODULE = {
    renderRegistrationForm,
    renderLoginForm,
    renderNavLoggedIn,
    renderOptionsPage,
    renderTopNav,
    renderNavMenu,
    renderCloset,
    renderClHeader,
    renderClBody,
    renderMoreDetailsForm,
    renderSeasonHeaders,
    renderClItemBody,
    renderClItemActionBtns,
    renderAddItemForm,
    renderUpdateForm,
    renderAnalysis,
    renderWholeClosetAnalysis,
    renderSeasonAnalysis,
    renderAppareltypeAnalysis,
    determineDifference,
    renderInformationPage,
    getColorRadios,
    getSizeRadios,
    getColorOptions,
    getSizeOptions
};

// *****  REGISTRATION AND LOGIN RENDER FUNCTIONS

function renderRegistrationForm() {
    $('.registration-container').html('');
    $('.login-container').html('').css('display','none');
    $('.closet-container').html('');
    //$('.options-container').html('');
    $('.registration-container').html(`
                <form id="registration-form" name="form-reg-login">
                    <div id="div-reg">
                        <div id="reg-title"><p>Register</p></div>
                        </div>
                        <div class="reg-item new-name">
                            <p class="reg-label">name</p><i class="fas fa-asterisk"></i><span class="error-msg" id="error-new-name" style="display:none;"></span>
                            <div class="input-container">
                                <input type="text" class="reg-input" name="new-name" id="new-name" class="js-new-name" tabindex="1" placeholder="First Last" required>
                            </div>
                        </div> 
                        <div class="reg-item new-email">
                            <p class="reg-label">email</p><i class="fas fa-asterisk"></i><span class="error-msg" id="error-new-email" style="display:none;"></span>
                            <div class="input-container">
                                <input type="email" class="reg-input" name="new-email" id="new-email" class="js-new-email" tabindex="2" placeholder="enter a valid email address" required>
                            </div>
                        </div> 
                        <div class="reg-item new-username">
                            <p class="reg-label">username</p><i class="fas fa-asterisk"></i><span class="error-msg" id="error-new-username" style="display:none;"></span>
                            <div class="input-container">
                                <input type="text" class="reg-input" name="new-username" id="new-username" class="js-new-username" tabindex="3" placeholder="tester1" required>
                            </div>
                            <div class="mini-instruction-verbage">
                                <p>minimum of 5 characters and 1 number</p>
                            </div>
                        </div>                      
                        <div class="reg-item">
                            <p class="reg-label">password</p><i class="fas fa-asterisk"></i><span class="error-msg" id="error-new-pass" style="display:none;"></span>
                            <div class="input-container">
                                <input type="password" class="reg-input" name="new-password" id="new-pass" class="js-new-password" tabindex="4" placeholder="password" required>
                            </div>
                            <div class="mini-instruction-verbage">
                                <p>minimum of 5 characters and 1 number</p>
                            </div>
                        </div>
                        <div class="reg-item">
                            <p class="reg-label">retype password</p><i class="fas fa-asterisk"></i><span class="error-msg" id="error-confirm-pass" style="display:none;"></span>
                            <div class="input-container">
                                <input type="password" class="reg-input" name="confirm-password" id="new-confirm" class="js-confirm-password" tabindex="5" placeholder="password" required>
                            </div>
                            <div class="mini-instruction-verbage">
                                <p>passwords must match</p>
                            </div>
                        </div>
                        <div class="error-msg" id="error-failure" style="display:none;"></div>
                        <div id="btn-sign-me-up" class="reg-editbuttons">
                            <button type="submit" class="action-btns med-btn" id="btn-register">Register me!</button>
                        </div>
                    </div>
                </form>
    `);
    $('#new-name').focus();

}

function renderLoginForm() {
    $('.section-options').html('');
    $('.menu-container').html('');
    $('.login-container').html('');
    $('.registration-container').html('');
    $('.addnewitem-container').html('');
    $('.closet-container').html('');
    $('.login-container').html(`
                    <div id="title-verbage">
                        <h2>love clothes and love to be organized?</h2>
                        <h4>keep track of your wardrobe</h4>
                        <div id="msgs-reg"></div>
                    </div>
                    <div class="reg-login">
                        <form id="form-login" class="form-reg-login">
                            <div id="div-login">
                                <div id="login-field-container">
                                    <div class="login-item">
                                        <div class="input-container">
                                            <i class="fas fa-user user-icon"></i>
                                            <input type="text" name="GET-username" id="GET-username" class="login-input" tabindex="1" autocomplete="on" required>
                                        </div>
                                        <div class="error-msg" id="error-username" style="display:none;"></div>
                                    </div>
                                    <div class="login-item">
                                        <div class="input-container">
                                            <i class="fas fa-key user-icon"></i>
                                            <input type="password" name="GET-password" id="GET-password" class="login-input" tabindex="2" autocomplete="off" required>
                                        </div>
                                        <div class="error-msg" id="error-password" style="display:none;"></div>
                                    </div>
                                </div>
                                <div class="error-msg" id="error-failure" style="display:none;"></div>
                                <div id="signin-btn">
                                    <button class="action-btns med-btn" tabindex="3">Sign In</button>
                                </div>
                                <div class="container-signup-btn">
                                    <div id="signup-verbage">
                                        <h3>New user?</h3>
                                    </div>
                                    <div id="signup-btn">
                                        <button class="action-btns med-btn" tabindex="4">Sign Up</button>
                                    </div>
                                </div>
                                <div class="demo-item">
                                    <div id="demo-existing-user"><p>Demo:  userid: testuser1/ password: testuser1</p></div>
                            </div>
                        </form>
                    </div> 
                </div>
    `).css('display', 'block');
    $('#GET-username').focus();

}

// *****  RENDER NAVIGATION FUNCTIONS
function renderTopNav() {
    $('.topnav').html(`
            <div class="col-2"></div>
            <div class="col-8 header-container">
                <div class="header-items" id="header-title">
                    <div id="logo-img">
                        <img id="hanger-img" src="images/clothes-hanger1.png" />
                    </div>
                    <div id="logo-verbage">
                        <p>shopYourCloset</p>
                    </div>
                </div>
            </div> 
            <div class="col-2"></div>`);
}

function renderOptionsPage() {
    $('.registration-container').html('');
    $('.login-container').html('');
    if (STORE.authUserName == 'admin') {
        $('.section-options').html(`
            <div class="options-container">
                <div class="user-instruction">
                        <div class="instruction-verbage">
                            <p>Which closet would you like to work with, ${STORE.authUserName}?</p>
                        </div>
                </div>
                <div class="options-btns" >
                        <i class="fas fa-door-open" id="ideal-closet-btn" data-closet="ideal"></i>
                        <h4 class="closet-functions">ideal closet</h4>
                        <div class="comments">view/add to/delete from/edit</div>
                </div>
                <div class="options-btns">
                        <i class="fas fa-tshirt" id="share-closet-btn" data-closet="share"></i>
                        <h4 class="closet-functions">share closet</h4>
                        <div class="comments">view/add to/delete from/edit</div>
                </div>
            </div>
     `);
    } else {
        $('.section-options').html(`
            <div class="options-container">
                <div class="user-instruction">
                        <div class="instruction-verbage">
                            <p>Which closet would you like to work with?</p>
                        </div>
                </div>
                <div class="options-btns" >
                    <i class="fas fa-door-open" id="ideal-closet-btn" data-closet="ideal"></i>
                    <h4 class="closet-functions">the ideal</h4>
                </div>
                    <div class="options-btns">
                        <i class="fas fa-tshirt" id="my-closet-btn" data-closet="my"></i>
                        <h4 class="closet-functions">your own</h4>
                    </div>
                    <div class="options-btns">
                        <i class="fas fa-tshirt" id="share-closet-btn" data-closet="share"></i>
                        <h4 class="closet-functions">share</h4>
                    </div>
                    <div class="options-btns">
                        <i class="fas fa-tshirt" id="donation-closet-btn" data-closet="donation"></i>
                        <h4 class="closet-functions">donation</h4>
                    </div>
                <div class="user-instruction">
                        <div class="instruction-verbage">
                            <p>Would you like some recommendations?</p>
                        </div>
                </div>
                <div class="options-btns">
                    <i class="fas fa-atom" id="analyze-closet-btn" data-closet="analyze"></i>
                    <h4 class="closet-functions">Analyze!</h4>
                <div>
            </div>
        `);
    };
}

function renderNavLoggedIn() {
    $('.loggedin-container').html('').css('display','block');
    $('.loggedin-container').html(`
            <div class="nav-admin">
                <div id="header-greeting">
                    <p>Welcome, ${STORE.authUserName}!</p>
                </div>
                <div id="header-logout">
                    <p>Logout</p>
                </div>
            </div>`);
    $('.loggedin-container').css('border-bottom','1px solid lightgrey');
}
function renderNavMenu(menu) {
    $('.menu-container').html('');
    if (menu === 'admin') {
        $('.menu-container').html(`
        <div class="nav-menu" style="border-bottom: 1px solid lightgrey">
                <div class="options-btns-min">
                    <p id="ideal-closet-btn-min">ideal</p>
                </div>
                <div class="options-btns-min">
                    <p id="share-closet-btn-min">share</p>
                </div>
            </div>`);
    } else {
        $('.menu-container').html(`
                <div class="nav-menu" style="border-bottom: 1px solid lightgrey">
                    <div class="options-btns-min" >
                        <p id="ideal-closet-btn-min">ideal</p>
                    </div>
                    <div class="options-btns-min" >
                        <p id="my-closet-btn-min">my</p>
                    </div>
                    <div class="options-btns-min" >
                        <p id="share-closet-btn-min">share</p>
                    </div>
                    <div class="options-btns-min" >
                        <p id="donation-closet-btn-min">donation</p>
                    </div>
                    <div class="options-btns-min">
                        <p id="analyze-closet-btn-min">analyze</p>
                    <div>
                </div>`);
    }

     switch(STORE.selCloset) {
        case 'ideal':
          $('#ideal-closet-btn-min').css('background-color', '#A8D2CB');
          break;
        case 'my':
          $('#my-closet-btn-min').css('background-color', '#A8D2CB');
          break;
        case 'share':
            $('#share-closet-btn-min').css('background-color', '#A8D2CB');
          break;
        case 'donation':
            $('#donation-closet-btn-min').css('background-color', '#A8D2CB');
          break;
        case 'analyze':
            $('#analyze-closet-btn-min').css('background-color', '#A8D2CB');
          break;
        default:
            console.log('there is a problem with highlighting the background color of the menu item on selection.  It should be blue when clicked.');
    }
}


//  ***** RENDER CLOSETS (my, ideal, donation and share) (analyze selection is below this block)

function renderCloset(closetItems) {
    $('.section-options').html('');
    $('.addnewitem-container').html('');
    $('.closet-container').html('').css('display', 'block');
    $('.closet-container').append(`<div class="closet-header"></div>`); 
    $('.closet-container').append(`<div class="closet-body"><div id="always-in-season"></div><div id="other-seasons"></div></div>`);
    
    // render the header
    renderClHeader(closetItems);

    //  organize items into seasons and render season headers
    let result = [];
    for (let i=0; i < STORE.seasonAry.length; i++) {
        let season = STORE.seasonAry[i];
        for(let i = 0; i < closetItems.length; i++) {
            if (closetItems[i].season === season) {
                result.push(closetItems[i]);
            } 
        } 
    }
    renderSeasonHeaders();

    //  with data now in its proper categories, render the data
    renderClBody(result);
    if (STORE.authUserName === 'admin') {
        if (STORE.failedFetch == true && STORE.subFeature === 'updateditem') {
                        $('.user-msg').html(`<div class="user-info-icon"><i class="fas fa-comment user-info-icon"></i></div><div class="user-info-verbage" >You were not able up update your item.  See the ADMINISTRATOR.</div>`); 
        } else {
                switch (STORE.subFeature) {
                    case ('updateditem'):
                                $('.user-msg').html(`<div class="user-info-icon"><i class="fas fa-comment user-info-icon"></i></div><div class="user-info-verbage" >You have just updated an item in the IDEAL CLOSET.</div>`); 
                                break;
                    case ('other'):
                                $('.user-msg').html(`<div class="user-info-icon"><i class="fas fa-comment user-info-icon"></i></div><div class="user-info-verbage" >You have just updated an item in the SHARE CLOSET.</div>`); 
                                break;
                }
        }
    } else {
        if (STORE.failedFetch == true) {
            $('.user-msg').html(`<div class="user-info-icon"><i class="fas fa-comment user-info-icon"></i></div><div class="user-info-verbage" >You were not able up update your item.  See the ADMINISTRATOR.</div>`); 
        } else {

                switch (STORE.subFeature) {
                    case ('share'):
                                    $('.user-msg').html(`<div class="user-info-icon"><i class="fas fa-comment user-info-icon"></i></div><div class="user-info-verbage">You have just moved one item to the public Share Closet.</div>`);
                                    break;
                    case ('donate'):
                                    $('.user-msg').html(`<div class="user-info-icon"><i class="fas fa-comment user-info-icon"></i></div><div class="user-info-verbage" >You have just moved one item to your personal Donation Closet.</div>`); 
                                    break;
                    case ('deleteitem'):
                                    $('.user-msg').html(`<div class="user-info-icon"><i class="fas fa-comment user-info-icon"></i></div><div class="user-info-verbage" >You have just deleted one item from your personal My Closet.</div>`); 
                                    break;
                    case ('returnitem'):
                                    $('.user-msg').html(`<div class="user-info-icon"><i class="fas fa-comment user-info-icon"></i></div><div class="user-info-verbage" >You have just returned an item to your personal My Closet.</div>`); 
                                    break;
                    case ('updateditem'):
                                    $('.user-msg').html(`<div class="user-info-icon"><i class="fas fa-comment user-info-icon"></i></div><div class="user-info-verbage" >You have just updated an item in your personal My Closet.</div>`); 
                                    break;
                    case ('addnewitem'):
                                    $('.user-msg').html(`<div class="user-info-icon"><i class="fas fa-comment user-info-icon"></i></div><div class="user-info-verbage" >You have just added an item in your personal My Closet.</div>`); 
                                    break;
                    default:
                                    $('.user-msg').html('');
                                    break;
                }
        }
    }
}


function renderClHeader(closetItems) { 
    let closetHtml = '';
    let headerHtml = '';
    let itemCountHmtl = '';
    let editButtonHtml = '';
    let editBtnsHtml = '';
    $('.user-msg').html('');
    
    //  Create Header for one of the User Selected Options
    // header title:  For all 'closets', use the stored closet name and the appropriate icon should display in  for the header. 

    headerHtml = `<div class="title-container"><div class="title-icon"><i class="fas fa-tshirt"></i></div><div class="cl-title"><h2>${STORE.selCloset} Closet</h2></div>`;
    
    switch (STORE.selCloset) {
        case 'my':
            headerHtml += `<div class="cl-subhead2"><p>This is your personal closet.  Add, review and make decisions on items here.</p></div>`;
            break;
        case 'ideal':
            headerHtml += `<div class="cl-subhead2"><p>The items included in this list are from a list published by <a href="https://www.realsimple.com/">Real Simple Magazine</a></p></div>`;
            break;
        case 'donation':
            headerHtml += `<div class="cl-subhead2"><p>Take the physical item out of your wardrobe and place it in a donation bag until you are ready to make the donation.</p></div>`;
            break;
        case 'share':
            headerHtml += `<div class="cl-subhead2"><p>Here is a description and contact information for items that users have shared.  You may borrow them by emailing the 'sharer'.</p></div>`;
            break;
        default:
            headerHtml += ``;
            break;
    }

    //  add new button: if the user is other than the ADMIN and the selected closet is 'ideal', 'donation or 'share, then do not render the add new item button.
    //  user may only view data
    if (STORE.authUserName !== 'admin') {
        if (STORE.selCloset === 'ideal' || STORE.selCloset === 'donation' || STORE.selCloset === 'share') {
            editButtonHtml = ``;
        } else {
            editButtonHtml = `<div id="cl-add-btn" data-btntype="add" data-closet="${STORE.selCloset}"><i class="fas fa-plus"></i></div>`;



        }

            //  if the user is the ADMIN, and the closet selected is ideal, render the add new item button
    } else {
        editButtonHtml = `<div class="item" id="cl-add-btn" data-btntype="add"><i class="fas fa-plus"></i></div>`;
    }
    //  itemcount:  Itemcount is only needed on closet pages.  It is not needed on 'analyze' page.
    itemCountHtml = `<div class="cl-subhead1">There are ${STORE.closetLength[STORE.selCloset]} items in this closet.</div>`;

    // the custom header is rendered here
    $('.closet-header').html(`
                    ${headerHtml}
                    <div class="my-closet-subhead">
                    ${itemCountHtml}
                    ${editButtonHtml}
                    </div>
                    <div class="user-msg"></div>`);
}

function renderSeasonHeaders() {
    //let seasonHeadersHtml="";
        let closetSeasonLength = STORE[`${STORE.selCloset}SeasonLength`];
        for (let i=0; i < STORE.seasonAry.length; i++) {
            switch (STORE.seasonAry[i]) {
                case 'Always in Season':  
                    $('#always-in-season').append(`<div class="season-container" id="season-Always-in-Season">
                                                        <div class="cl-subhead">${STORE.seasonAry[i]} ${closetSeasonLength[STORE.seasonAry[i]]} items
                                                    </div>`);
                    break;
                case ('Spring Basics'):
                    $('#other-seasons').append(`<div class="season-container" id="season-Spring-Basics">
                                                    <div class="cl-subhead">${STORE.seasonAry[i]} ${closetSeasonLength[STORE.seasonAry[i]]} items
                                                </div>`);
                    break;
                case ('Summer Basics'):
                    $('#other-seasons').append(`<div class="season-container" id="season-Summer-Basics">
                                                    <div class="cl-subhead">${STORE.seasonAry[i]} ${closetSeasonLength[STORE.seasonAry[i]]} items
                                                </div>`);
                    break;
                case ('Fall Basics'):
                    $('#other-seasons').append(`<div class="season-container" id="season-Fall-Basics">
                                                    <div class="cl-subhead">${STORE.seasonAry[i]} ${closetSeasonLength[STORE.seasonAry[i]]} items
                                                </div>`);
                    break;
                case ('Winter Basics'):
                    $('#other-seasons').append(`<div class="season-container" id="season-Winter-Basics">
                                                    <div class="cl-subhead">${STORE.seasonAry[i]} ${closetSeasonLength[STORE.seasonAry[i]]} items
                                                </div>`);
                    break;
                default:
                    console.log('there are no more seasons');
                    break;
            }
    }
}

function renderClItemBody(data) {
    let item = '';
    item =`<div class="closet-item ${data.id}-class">`;

    if (STORE.selCloset === 'share') {
        item +=`<div class="item-body">
                    <div class="share-person">
                            <div class="an-section-header">
                                <div class="an-items-label an-items-label-long" id="sharer-label"><p class="an-items-label-left">sharer</p></div>
                                <div class="an-items-label an-items-label-long" id="sharer-email-label"><p class="an-items-label-right">email</p></div>
                            </div>
                            <div class="an-section-body">
                                <div class="cl-items itembody-left an-items-body-long"><p id="sharer">${data.user.username}</p></div>
                                <div class="cl-items itembody-middle an-items-body-long"><p id="sharer-email">${data.user.email}</p></div>
                           </div>
                    </div>`;
    }
    item +=`       <div class="item-body">
                            <div class="an-section-header">
                                <div class="an-items-label an-items-label-med" id="cl-appareltype"><p class="an-items-label-left">item</p></div>
                                <div class="an-items-label an-items-label-med" id="cl-color"><p class="an-items-label-middle">color</p></div>
                                <div class="an-items-label an-items-label-med" id="cl-size"><p class="an-items-label-middle">size</p></div>
                                <div class="an-items-label an-items-label-med-plus" id="cl-click"><p class="an-items-label-right">click</p></div>
                            </div>
                            <div class="an-section-body">
                                <div class="cl-items itembody-left an-items-body-med"><p id="appareltype">${data.appareltype}</p></div>
                                <div class="cl-items itembody-middle an-items-body-med"><p id="color">${data.color}</p></div>
                                <div class="cl-items itembody-middle an-items-body-med"><p id="size">${data.size}</p></div>
                                <div class="cl-items itembody-right an-items-body-med-plus"><button class="action-btns small-btn" id="cl-more-btn" data-id="${data.id}" data-shortdesc="${data.shortdesc}" data-longdesc="${data.longdesc}" data-size="${data.size}">details</button></div>
                            </div>
                        </div>`;
    let body = renderClItemActionBtns(item, data);
    body +=`</div>`;
    switch (data.season) {
        case 'Always in Season':
            $(`#season-Always-in-Season`).append(body);
            break;
        case ('Spring Basics'):
            $(`#season-Spring-Basics`).append(body);
            break;
        case ('Summer Basics'):
            $(`#season-Summer-Basics`).append(body);
            break;
        case ('Fall Basics'):
            $(`#season-Fall-Basics`).append(body);
            break;
        case ('Winter Basics'):
            $(`#season-Winter-Basics`).append(body);
            break;
        default:
            console.log('there are no more seasons');
            break;
    };
  
}

function renderClItemActionBtns(bodyHtml, data) {
    // if someone other than the ADMIN is logged in, get these buttons
    if (STORE.authUserName !== 'admin') {
        if (STORE.selCloset === 'my') {
            // edit buttons for edit, delete, donate or share if NOT admin and closet it MY
            bodyHtml += `<div class="item-edit-btns">
                            <button class="action-btns small-btn" id="cl-edit-btn" data-id="${data.id}" data-season="${data.season}" data-appareltype="${data.appareltype}" data-color="${data.color}" data-shortdesc="${data.shortdesc}" data-longdesc="${data.longdesc}" data-size="${data.size}">edit</button>
                            <button class="action-btns small-btn" id="cl-delete-btn" data-id="${data.id}">delete</button>
                            <button class="js-move action-btns small-btn" id="cl-donation-btn" data-id="${data.id}" data-season="${data.season}" data-appareltype="${data.appareltype}" data-color="${data.color}" data-shortdesc="${data.shortdesc}" data-longdesc="${data.longdesc}" data-size="${data.size}">donation</button>
                            <button class="js-move action-btns small-btn" id="cl-share-btn" data-id="${data.id}" data-season="${data.season}" data-appareltype="${data.appareltype}" data-color="${data.color}" data-shortdesc="${data.shortdesc}" data-longdesc="${data.longdesc}" data-size="${data.size}">share</button>
                        </div>`;
        } else if (STORE.selCloset === 'donation') {
            bodyHtml += `<div class="item-edit-btns">
                            <button class="js-move action-btns lg-btn" id="cl-return-btn" data-id="${data.id}" data-season="${data.season}" data-appareltype="${data.appareltype}" data-color="${data.color}" data-shortdesc="${data.shortdesc}" data-longdesc="${data.longdesc}" data-size="${data.size}">return to your closet</button>
                        </div>`;
        }

     // if the ADMIN is logged in, get these buttons   
    } else  {
        if (STORE.selCloset === 'ideal') {
            // if isAdmin and the closet is one of the above, then the user may edit or delete
            bodyHtml += `
                        <div class="item-edit-btns">
                        <button class="action-btns small-btn" id="cl-edit-btn" data-id="${data.id}" data-season="${data.season}" data-appareltype="${data.appareltype}" data-color="${data.color}" data-shortdesc="${data.shortdesc}" data-longdesc="${data.longdesc}" data-size="${data.size}">edit</button>
                        <button class="action-btns small-btn" id="cl-delete-btn" data-id="${data.id}">delete</button>
                        </div>`;
        } else {
            bodyHtml += `
                        <div class="item-edit-btns">
                        <button class="action-btns small-btn" id="cl-delete-btn" data-id="${data.id}">delete</button>
                        </div>`;
        }       
    } 
return bodyHtml;
}

//  render the selected closet
function renderClBody(closetItems) {
    let item;
    for (let i=0; i < closetItems.length; i++) {
        item = closetItems[i];
        renderClItemBody(item);     
    } 
}

//  this page is rendered before there are items in a closet
function renderInformationPage() {  
    $('.closet-container').append(`
                        <div class="closet-header>
                            <div class="item title-container"><div class="title-icon"><i class="fas fa-tshirt"></i></div><div class="cl-title"><h2>${STORE.selCloset} Closet</h2></div>
                        </div>
                        <div class="closet-body"></div>`);
    
    let infoPageMsg;
    
    switch (STORE.selCloset) {
        case 'donation':
                infoPageMsg = `<div class="user-instruction">
                                    <div class="first-page">
                                        <p>You have not marked any items for DONATION, yet.  </p>
                                        <p>Follow these instructions.</p>
                                    </div>
                                </div>
                                <div class="instruction-list">
                                        <ul>
                                            <li class="instruction-items">Click into your own closet.</li>
                                            <li class="instruction-items">Find the item you wish to share.</li>
                                            <li class="instruction-items">Click the 'donation' button.  </li>
                                            <li class="instruction-items">Your item will be deleted from your personal closet and added to your personal donation closet.</li>
                                            <li class="instruction-items">Take the physical item out of your wardrobe and place it in a donation bag until you are ready to make the donation.</li>
                                        </ul>
                                </div>`;
                break;
    case 'share':
        infoPageMsg = `<div class="user-instruction">
                                <div class="first-page">
                                    <p>You have not marked any items to SHARE, yet.</p>
                                    <p>Follow these instructions to SHARE an item from your MY CLOSET.</p>
                                </div>
                            </div>
                            <br>
                                <ul class="instruction-list">
                                    <li class="instruction-items">Click into your own closet.</li>
                                    <li class="instruction-items">Find the item you wish to share.</li>
                                    <li class="instruction-items">Click the 'share' button.  </li>
                                    <li class="instruction-items">Your item will be deleted from your personal closet and added to the group share closet.</li>
                                    <li class="instruction-items">If someone would like to use your item, they will email you to make the connection.</li>
                                </ul>
                            </div>
                        </div>`;
        break;
    }
    $('.closet-body').html(infoPageMsg);
}


// ***** RENDER ANALYSIS SCREEN FUNCTIONS

function renderAnalysis() {
    $('.registration-container').html('');
    $('.login-container').html('');
    $('.closet-container').html('');
    // the custom header is created
    $('.closet-container').append(`
                <div class="closet-header">
                    <div class="item title-container"><div class="title-icon"><i class="fas fa-atom"></i></div><div class="cl-title"><h2>Analyze It!</h2></div>
                </div>`);
    
    $('.closet-container').append(`
                <div class="cl-subhead2">
                    You may be missing a few basic items that keep you from using your wardrobe to its fullest potential.  
                    You may have some items that are not “ideal”, but which help you to express your personal style.  
                    You may want to think about whether you still wear those items.  If not, share them!
                </div>
                <div class="analyze-body"></div>`);

    if (STORE.closetLength.my !== 0) {
        renderWholeClosetAnalysis();
        renderSeasonAnalysis();
        renderAppareltypeAnalysis();
    } else {
        $('.closet-container').append(`
            <div class="user-instruction">
                <div class="first-page"><p>Once you add an item to your MY closet, you will see an analysis here.</p></div>
            </div>`);
    }
}
 
function determineDifference(diff) {

    let note;
    if (diff < 0) {
        note = `<p class="final-thought">Consider purchasing.</p>`;
    } else if (diff > 0) {
        note = `<p class="final-thought">Do you still wear these items?</p>`;
    } else if (diff = 0){
        note = `<div class="final-thought-correct">
                            <div id="correct-icon"><i class="fas fa-atom highlight"></i></div>
                            <div class="correct-verbage"><p>Success!</p></div>
                        </div>`;
    } else {
        note = `there is something wrong with the season analysis section`;
    }
    return note;


}

function renderWholeClosetAnalysis() {
    // append whole closet analysis
    $('.analyze-body').append(`<div class="an-subsection-whole"></div>`);

    $('.an-subsection-whole').append(`
            <div class="cl-subhead">
                    Whole Closet
            </div>
            <div class="an-section-header">
                    <div class="an-items-label an-items-body-med"><p class=" an-items-label-left">closet</p></div>
                    <div class="an-items-label an-items-body-short"><p class=" an-items-label-middle">ideal</p></div>
                    <div class="an-items-label an-items-body-short"><p class=" an-items-label-middle">my</p></div>
                    <div class="an-items-label an-items-body-long"><p class=" an-items-label-right">comment</p></div>
            </div>`);

    // find the difference between the number of items in the IDEAL closet vs. the number of items in MY closet
    const clDiff = STORE.closetLength.ideal - STORE.closetLength.my;
    let analyzeNote = determineDifference(clDiff);

    $('.an-subsection-whole').append(`
            <div class="an-section-body">
                    <div class="an-items itembody-left an-items-body-med"><p class="season">whole closet</p></div>
                    <div class="an-items itembody-middle an-items-body-short"><p class="ideal-length">${STORE.closetLength.ideal}</p></div>
                    <div class="an-items itembody-middle an-items-body-short"><p class="my-length">${STORE.closetLength.my}</p></div>
                    <div class="an-items itembody-right an-items-body-long">${analyzeNote}</div>
            </div>`);
    
}






function renderSeasonAnalysis() {
    $('.analyze-body').append(`<div class="an-subsection-se"></div>`);

    $('.an-subsection-se').append(`
     <div class="cl-subhead">
         By Season
     </div>
     <div class="an-section-header">
                    <div class="an-items-label an-items-label-med"><p class="an-items-label-left">season</p></div>
                    <div class="an-items-label an-items-label-short"><p class="an-items-label-middle">ideal</p></div>
                    <div class="an-items-label an-items-label-short"><p class="an-items-label-middle">my</p></div>
                    <div class="an-items-label an-items-label-long"><p class="an-items-label-right">comment</p></div>
    </div>`);


     //  find text equivalent of document number
    for (let i = 0; i < STORE.seasonAry.length; i++) {
    let seasonText = '';
    switch(i) {
        case 0:
            seasonText = 'Always in Season';
            break;
        case 1:
            seasonText = 'Spring Basics';
            break;
        case 2:
            seasonText = 'Summer Basics';
            break;
        case 3:
            seasonText = 'Fall Basics';
            break;
        case 4:
            seasonText = 'Winter Basics';
            break;
        default:
            console.log('there is a problem with the season text');
    }

    // create html for analysis note 
    const clDiff = STORE.mySeasonLength[seasonText] - STORE.idealSeasonLength[seasonText];

    let analyzeNote = determineDifference(clDiff);
    console.log('seasons ', analyzeNote);
    
    $('.an-subsection-se').append(`
            <div class="an-section-body">
                    <div class="an-items itembody-left an-items-body-med"><p class="season">${STORE.seasonAry[i]}</p></div>
                    <div class="an-items itembody-middle an-items-body-short"><p class="ideal-length">${STORE.idealSeasonLength[seasonText]}</p></div>
                    <div class="an-items itembody-middle an-items-body-short"><p class="my-length">${STORE.mySeasonLength[seasonText]}</p></div>
                    <div class="an-items itembody-right an-items-body-long">${analyzeNote}</div>
            </div>
            </div>`);

    }
}

function renderAppareltypeAnalysis() {
    // append header for appareltype analyze
    $('.analyze-body').append(`<div class="an-subsection-at"></div>`);
    $('.an-subsection-at').append(`
    <div class="cl-subhead">
        By Apparel Type
    </div>
    <div class="an-section-header">
                        <div class="an-items-label an-items-label-med"><p class="an-items-label-left">season</p></div>
                        <div class="an-items-label an-items-label-short"><p class="an-items-label-middle">ideal</p></div>
                        <div class="an-items-label an-items-label-short"><p class="an-items-label-middle">my</p></div>
                        <div class="an-items-label an-items-label-long"><p class="an-items-label-right">comment</p></div>
    </div>`);

    //  find text equivalent of document number
   for (let i = 0; i < STORE.appareltypeAry.length; i++) {
   let appareltypeText = '';
    switch(i) {
        case 0:
            appareltypeText = 'top';
            break;
        case 1:
            appareltypeText = 'bottom';
            break;
        case 2:
            appareltypeText = 'dress';
            break;
        case 3:
            appareltypeText = 'coat';
            break;
        case 4:
            appareltypeText = 'shoes';
            break;
        default:
            console.log('there is a problem with the appareltype text');
    }

   // create html for analyze note 
   const clDiff = STORE.myAppareltypeLength[appareltypeText] - STORE.idealAppareltypeLength[appareltypeText];
   let analyzeNote = determineDifference(clDiff);
   console.log('from appareltype', analyzeNote);

   // append season analyze to analyze-body
   $('.an-subsection-at').append(`
            <div class="an-section-body">
                        <div class="an-items itembody-left an-items-body-med"><p class="season">${STORE.appareltypeAry[i]}</p></div>
                        <div class="an-items itembody-middle an-items-body-short"><p class="ideal-length">${STORE.idealAppareltypeLength[appareltypeText]}</p></div>
                        <div class="an-items itembody-middle an-items-body-short"><p class="my-length">${STORE.myAppareltypeLength[appareltypeText]}</p></div>
                        <div class="an-items itembody-right an-items-body-long">${analyzeNote}</div>
            </div>
            </div>`);
   }
}

//  *****  RENDER ADD AND UPDATE FORMS

function renderAddItemForm(msg) {
    $('.closet-container').hide();
    $('.addnewitem-container').html('').css('display', 'none');

    let sizeRadiosHtml = getSizeRadios();
    let colorRadiosHtml = getColorRadios();

    let addItemFormBody = '';
    addItemFormBody += `
            <div class="cl-header">
                <h2>Add New Item</h2>
                <span class="error-msg" id="error-add-new-item">${msg}</span>
            </div>
           <div class="cl-resultcell-new additem-class">
                <div class="cl-resultbody-new">
                <form id="additem-form" name="additem-form">
                            <div class="additem-edit-btns">
                                <button class="action-btns small-btn" id="js-save-btn" data-closet="${STORE.selCloset}" data-user="${STORE.authUser}">save</button>
                                <button class="action-btns small-btn" id="cl-cancel-add-btn">cancel</button>
                            </div>
                            <div class="itemrow cl-whichseason">
                                <div class="newitem itemlabel"><label>which season</label></div>
                                <div class="newitem itembody">
                                    <div class="additems-container" id="js-additem-season">
                                        <div class="radiogroup">
                                            <label class="season-selector-label" for="season-icon-selector">All Seasons
                                            <input type="radio" name="season" id="season-all" value="Always in Season" checked /></label>
                                        </div>
                                        <div class="radiogroup">
                                            <label class="season-selector-label" for="season-icon-selector">Spring Basics
                                            <input type="radio" name="season" id="season-spring" value="Spring Basics" /></label>
                                        </div>
                                        <div class="radiogroup">
                                            <label class="season-selector-label" for="season-icon-selector">Summer Basics
                                            <input type="radio" name="season" id="season-summer" value="Summer Basics" /></label>
                                        </div>
                                        <div class="radiogroup">
                                            <label class="season-selector-label" for="season-icon-selector">Fall Basics
                                            <input type="radio" name="season" id="season-fall" value="Fall Basics" /></label>
                                        </div>
                                        <div class="radiogroup">
                                            <label class="season-selector-label" for="season-icon-selector">Winter Basics
                                            <input type="radio" name="season" id="season-winter" value="Winter Basics" /></label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="itemrow cl-appareltype">
                                <div class="newitem itemlabel"><label>type of clothing</label></div>
                                <div class="newitem itembody">
                                    <div class="additems-container" id="js-additem-appareltype">
                                        <div class="radiogroup">
                                            <label for="season-icon-selector">top
                                            <input type="radio" name="appareltype" value="top" checked></label>
                                        </div>
                                        <div class="radiogroup">
                                            <label for="season-icon-selector">bottom
                                            <input type="radio" name="appareltype" value="bottom"></label>
                                        </div> 
                                        <div class="radiogroup">
                                            <label for="season-icon-selector">dress
                                            <input type="radio" name="appareltype" value="dress"></label>
                                        </div> 
                                        <div class="radiogroup">
                                            <label for="season-icon-selector">coat
                                            <input type="radio" name="appareltype" value="coat"></label>
                                        </div> 
                                        <div class="radiogroup">
                                            <label for="season-icon-selector">shoes
                                            <input type="radio" name="appareltype" value="shoes"></label>
                                        </div> 
                                    </div>
                                </div>
                            </div>


                            <div class="itemrow cl-color">
                                <div class="newitem itemlabel"><label>color </label></div>
                                <div class="newitem itembody">
                                    <div class="additems-container" id="js-additem-color">`;
    addItemFormBody += colorRadiosHtml;
    addItemFormBody +=`
                                    </div>
                                </div>
                            </div>

                            <div class="itemrow cl-size">
                                <div class="newitem itemlabel"><label>size: </label></div> 
                                <div class="newitem itembody">
                                    <div class="additems-container" id="js-additem-size">`;
    addItemFormBody += sizeRadiosHtml;
    addItemFormBody +=`
                                    </div>
                                </div>
                            </div>

                            <div class="itemrow cl-shortdesc">
                                <div class="newitem itemlabel"><label>short description</label></div>
                                <div class="newitem itembody">
                                    <input class="updatefields" id="js-additem-shortdesc" type="text" name="shortdesc" value=" " placeholder="short description" />
                                </div>
                            </div>

                            <div class="itemrow cl-longdesc">
                                <div class="newitem itemlabel"><label>long description </label></div>
                                <div class="newitem itembody">
                                    <input class="updatefields" id="js-additem-longdesc" type="text" name="longdesc" value=" " placeholder="additional description" />
                                </div>
                            </div>
                    </form>
                </div>
            </div>`;
    $('.addnewitem-container').html(addItemFormBody).css('display', 'block');
}

function renderUpdateForm() {
    // change closet cell to updateable form
    let sizeOptionsHtml = getSizeOptions();
    let colorOptionsHtml = getColorOptions();

    let updateFormBody = '';
    updateFormBody += `<div class="cl-resultbody">
            <form id='form-update-closet'>
                <div class="itemrow update-season">
                    <div class="newitem itemlabel"><label>which season</label></div>
                    <div class="item itembody">
                            <select class="updatefields" id="js-updateseason" type="text" name="season">
                                <option value ="${STORE.currentEditItem.season}">${STORE.currentEditItem.season}</option>
                                <option value = "Always in Season">Always in Season</option>
                                <option value = "Fall Basics">Fall Basics</option>
                                <option value = "Winter Basics">Winter Basics</option>
                                <option value = "Spring Basics">Spring Basics</option>
                                <option value = "Summer Basics">Summer Basics</option>
                            </select>
                    </div>
                </div>
                <div class="itemrow update-appareltype">
                    <div class="newitem newitemlabel">type of clothing:</div>
                    <div class="item itembody">
                        <select class="updatefields" id="js-updateappareltype" type="text" name="appareltype">
                            <option value ="${STORE.currentEditItem.appareltype}">${STORE.currentEditItem.appareltype}</option>
                            <option value = "top">top</option>
                            <option value = "bottom">bottom</option>
                            <option value = "dress">dress</option>
                            <option value = "coat">coat</option>
                            <option value = "shoes">shoes</option>
                        </select>
                    </div>
                </div>
                <div class="itemrow update-color">
                    <div class="newitem itemlabel">color: </div>
                    <div class="newitem itembody">
                        <select class="updatefields" id="js-updatecolor" type="text" name="color" value="${STORE.currentEditItem.color}">
                            <option value = "${STORE.currentEditItem.color}">${STORE.currentEditItem.color}</option>`;
    updateFormBody += colorOptionsHtml;
    updateFormBody +=`
                        </select>
                    </div>
                </div>
                <div class="itemrow update-shortdesc">
                    <div class="newitem itemlabel">short description</div>
                    <div class="newitem itembody">
                        <input class="updatefields" id="js-updateshortdesc" type="text" name="shortdesc" value="${STORE.currentEditItem.shortdesc}" />
                    </div>
                </div>
                <div class="itemrow update-longdesc">
                    <div class="newitem itemlabel">long description</div>
                    <div class="newitem itembody">
                        <textarea class="updatefields" id="js-updatelongdesc" type="text" name="longdesc" value="${STORE.currentEditItem.longdesc}" rows="3" cols="20">${STORE.currentEditItem.longdesc}</textarea>
                    </div>
                </div>
                <div class="itemrow update-size">
                    <div class="newitem itemlabel">size </div>
                    <div class="newitem itembody">
                        <select class="updatefields" id="js-updatesize" type="text" name="size">`;
    updateFormBody += sizeOptionsHtml;
    updateFormBody +=`
                        </select>
                    </div>
                </div>
            </form>
        </div> 
        <div class="update-edit-btns">
            <button class="action-btns small-btn" id="cl-updatebtn-final"data-id="${STORE.currentEditItem.id}">save</i>
            </button>
            <button class="action-btns small-btn" id="cl-cancel-update-btn">cancel</button>
        </div>`; 

    $(`.${STORE.currentEditItem.id}-class`).html(updateFormBody);
    $(`.${STORE.currentEditItem.id}-class`).css("border", "5px solid #C98573");
}

function renderMoreDetailsForm() {

        // change closet cell to updateable form
        const updateFormBody = `<div class="cl-resultbody">
                <div class="more-details">
                    <div>
                        <div class="viewitem-label" id="view-label-shortdesc">
                            <p>short description</p>
                        </div>
                        <div class="viewitem-body" id="view-shortdesc">
                            <p>${STORE.currentEditItem.shortdesc}</p>
                        </div>
                    </div>
                    <div>
                        <div class="viewitem-label" id="view-label-longdesc">
                            <p>long description</p>
                        </div>
                        <div class="viewitem-body" id="view-longdesc">
                            <p>${STORE.currentEditItem.longdesc}</p>
                        </div>
                    </div>
                </div> 
            <div class="more-return-btn">
                <button class="action-btns med-btn" id="cl-more-return-btn">return to overview</button>
            </div>`; 
    
        $(`.${STORE.currentEditItem.id}-class`).html(updateFormBody);
        $(`.${STORE.currentEditItem.id}-class`).css("border", "5px solid #C98573");
}

function getColorRadios () {
    let colorRadios = '';
    for (let i=0; i < STORE.colorAry.length; i++) {
        colorRadios += `<div class="radiogroup">
                            <label for="color-icon-selector">${STORE.colorAry[i]}
                            <input type="radio" name="color" value="${STORE.colorAry[i]}"></label>
                        </div>`;
    }
    return colorRadios;
}

function getSizeRadios() {
    let sizeRadios='';
    for (let i=0; i < STORE.colorAry.length; i++) {
        sizeRadios +=`<div class="radiogroup">
                        <label for="size-selector">${STORE.sizeAry[i]}
                        <input type="radio" name="size" value="${STORE.sizeAry[i]}"></label>
                      </div>`;
    }
    return sizeRadios;
}

function getColorOptions() {
    let colorOptions = '';
    for (let i=0; i < STORE.colorAry.length; i++) {
        colorOptions += `<option value = "${STORE.colorAry[i]}">${STORE.colorAry[i]}</option>`;
    }
    return colorOptions;

}

function getSizeOptions() {
    let sizeOptions = '';
    for (let i=0; i < STORE.colorAry.length; i++) {
        sizeOptions += `<option value = "${STORE.sizeAry[i]}">${STORE.sizeAry[i]}</option>`;
    }
    return sizeOptions;
}


