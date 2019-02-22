//  RENDER data to screen

window.RENDER_MODULE = {
    renderRegistrationForm,
    renderLoginForm,
    renderNavLoggedIn,
    renderLogout,
    renderOptionsPage,
    renderTopNav,
    renderNavMenu,
    renderCloset,
    renderClHeader,
    renderClBody,
    renderSeasonHeaders,
    renderClItemBody,
    renderClItemActionBtns,
    renderAddItemForm,
    renderUpdateForm,
    renderAnalysis,
    renderWholeClosetAnalysis,
    renderSeasonAnalysis,
    renderAppareltypeAnalysis,
    renderInformationPage
};

// *****  REGISTRATION AND LOGIN RENDER FUNCTIONS

function renderRegistrationForm() {
    $('.registration-container').html('');
    $('.login-container').html('').css('display','none');
    $('.closet-container').html('');
    $('.options-container').html('').css('display', 'none');
    $('.registration-container').html(`
                <form id="registration-form" name="form-reg-login">
                    <div id="div-reg">
                        <div id="reg-title"><p>Register</p></div>
                        <div class="user-instruction">
                            <div id="instruction-icon"><i class="fas fa-atom instr-atom instruction"></i></div>
                            <div class="helper-verbage">
                                <p>*  all inputs are required.</p>
                            </div>
                        </div>
                        <div class="reg-item new-name">
                            <p>name</p><span class="error-msg" id="error-new-name" style="display:none;"></span>
                            <div class="input-container">
                                <input type="text" class="reg-input" name="new-name" id="new-name" class="js-new-name" tabindex="1" placeholder="First Last" required>
                            </div>
                        </div> 
                        <div class="reg-item new-email">
                            <p>email</p><span class="error-msg" id="error-new-email" style="display:none;"></span>
                            <div class="input-container">
                                <input type="email" class="reg-input" name="new-email" id="new-email" class="js-new-email" tabindex="2" placeholder="enter a valid email address" required>
                            </div>
                        </div> 
                        <div class="reg-item new-username">
                            <p>username</p><span class="error-msg" id="error-new-username" style="display:none;"></span>
                            <div class="input-container">
                                <input type="text" class="reg-input" name="new-username" id="new-username" class="js-new-username" tabindex="3" placeholder="tester1" required>
                            </div>
                            <div class="helper-verbage">
                                <p>minimum of 5 characters and 1 number</p>
                            </div>
                        </div>                      
                        <div class="reg-item">
                            <p>password:</p><span class="error-msg" id="error-new-pass" style="display:none;"></span>
                            <div class="input-container">
                                <input type="password" class="reg-input" name="new-password" id="new-pass" class="js-new-password" tabindex="4" placeholder="password" required>
                            </div>
                            <div class="helper-verbage">
                                <p>minimum of 5 characters and 1 number</p>
                            </div>
                        </div>
                        <div class="reg-item">
                            <p>retype password:</p><span class="error-msg" id="error-confirm-pass" style="display:none;"></span>
                            <div class="input-container">
                                <input type="password" class="reg-input" name="confirm-password" id="new-confirm" class="js-confirm-password" tabindex="5" placeholder="password" required>
                            </div>
                            <div class="helper-verbage">
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

}

function renderLoginForm() {
    $('.registration-container').html('');
    $('section-nav').html('').css('display','none');
    $('.login-container').html('');
    $('.login-container').css('display', 'block');
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
                                    <div id="demo-existing-user"><p>Demo User:  tester1/tester1</p></div>
                                    <div id="demo-admin"><p>Demo Admin:  admin/admin1</p></div>
 
                            </div>
                        </form>
                    </div> 
                </div>
    `);
    $('#GET-username').focus();

}

function renderLogout(user) {
    $('.options-container').html('').css('display','none');
    $('.closet-container').html('').css('display', 'none');
    $('.menu-container').html('');
    $('.registration-container').html('');
    $('.login-container').html('');
    $('#header-greeting').html(`<p>Goodbye, ${user}</p>`);
    renderLoginForm();
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
    $('.closet-container').html('');
    $('.options-container').html('').css('display','none');
    $('.options-container').html('').css('display', 'block');
    if (STORE.authUserName == 'admin') {
        $('.options-container').html(`
                <div class="user-instruction">
                    <div id="instruction-icon"><i class="fas fa-atom instr-atom instruction"></i></div>
                    <div class="helper-verbage">
                        <p>Which closet would you like to work with, Admin?</p>
                    </div>
                </div>
                <div class="options-btns" >
                        <i class="fas fa-door-open" id="ideal-closet-btn" data-closet="ideal"></i>
                        <h4 class="closet-functions">ideal closet</h4>
                        <div class="comments">view/add to/delete from/edit</div>
                </div>
                <div class="options-btns">
                        <i class="fas fa-tshirt" id="giveaway-closet-btn" data-closet="giveaway"></i>
                        <h4 class="closet-functions">giveaway closet</h4>
                        <div class="comments">view/add to/delete from/edit</div>
                </div>
     `);
    } else {
        $('.options-container').html(`
                <div class="options-header">
                    <h3>Which closet would you like to work with?</h3>
                </div>
                <div class="options-btns" >
                    <i class="fas fa-door-open" id="ideal-closet-btn" data-closet="ideal"></i>
                    <h4 class="closet-functions">the ideal</h4>
                </div>
                <div class="options-btns-container">
                    <div class="options-btns">
                        <i class="fas fa-tshirt" id="my-closet-btn" data-closet="my"></i>
                        <h4 class="closet-functions">your own</h4>
                    </div>
                    <div class="options-btns">
                        <i class="fas fa-tshirt" id="giveaway-closet-btn" data-closet="giveaway"></i>
                        <h4 class="closet-functions">giveaway</h4>
                    </div>
                    <div class="options-btns">
                        <i class="fas fa-tshirt" id="donation-closet-btn" data-closet="donation"></i>
                        <h4 class="closet-functions">donation</h4>
                    </div>
                </div>
                <div class="options-header">
                    <h3>Would you like some recommendations?</h3>
                </div>
                <div class="options-btns">
                    <i class="fas fa-atom" id="analyze-closet-btn" data-closet="analyze"></i>
                    <h4 class="closet-functions">Analyze!</h4>
                <div>
        `);
    };
}

function renderNavLoggedIn() {
    $('.loggedin-container').html('').css('display','block');
    $('.loggedin-container').html(`
            <div id="header-greeting">
                <p>Welcome, ${STORE.authUserName}!</p>
            </div>
            <div id="header-logout">
                <p>Logout</p>
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
                    <p id="giveaway-closet-btn-min">giveaway</p>
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
                        <p id="giveaway-closet-btn-min">giveaway</p>
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
          $('#ideal-closet-btn-min').css('background-color', '#A8D2CB');
          break;
        case 'giveaway':
            $('#giveaway-closet-btn-min').css('background-color', '#A8D2CB');
          break;
        case 'donation':
            $('#donation-closet-btn-min').css('background-color', '#A8D2CB');
          break;
        case 'analyze':
            $('#analyze-closet-btn-min').css('background-color', '#A8D2CB');
          break;
        default:
            $('#my-closet-btn-min').css('background-color', '#A8D2CB');
    }
}


//  ***** RENDER CLOSETS (my, ideal, donate and giveaway) (analysis selection is below this block)

function renderCloset(closetItems) {
    $('.options-container').html('').css('display','none');
    $('.addnewitem-container').html('');
    $('.closet-container').css('display','block');
    $('.closet-container').html('');

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

    switch (STORE.subFeature) {
        case ('giveaway'):
            $('.user-msg').html(`<div class="user-info-icon"><i class="fas fa-comment user-info-icon"></i></div><div class="user-info-verbage">You have just moved one item to the public Giveaway Closet.</div>`);
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
        case (''):
            $('.user-msg').html('');
            break;
        default:
            console.log('ugh, problems');
            break;
        }

    }


function renderClHeader(closetItems) { 
    let closetHtml = '';
    let headerHtml = '';
    let itemCountHmtl = '';
    let editButtonHtml = '';
    let editBtnsHtml = '';
    
    //  Create Header for one of the User Selected Options
    // header title:  For all 'closets', use the stored closet name for the header. 
    if (STORE.selCloset === 'analyze') {
        headerHtml = `<div class="item title-container"><div class="title-icon"><i class="fas fa-atom"></i></div><div class="cl-title"><h2>Analyze It!</h2></div>`;
    } else if (STORE.selCloset === 'my' || STORE.selCloset === 'donation' || STORE.selCloset === 'giveaway'){
        headerHtml = `<div class="item title-container"><div class="title-icon"><i class="fas fa-tshirt"></i></div><div class="cl-title"><h2>${STORE.selCloset} Closet</h2></div>`;
    } else if (STORE.selCloset === 'ideal'){
        headerHtml = `<div class="item title-container"><div class="title-icon"><i class="fas fa-door-open"></i></div><div class="cl-title"><h2>${STORE.selCloset} Closet</h2></div>`;
    }
    
    //  add new button: if the user is other than the ADMIN and the selected closet is 'ideal', 'donation or 'giveaway, then do not render the add new item button.
    //  user may only view data
    if (STORE.authUserName !== 'admin') {
        if (STORE.selCloset === 'ideal' || STORE.selCloset === 'donation' || STORE.selCloset === 'giveaway') {
            editButtonHtml = ``;
        } else {
            editButtonHtml = `<div class="item" id="cl-add-btn" data-btntype="add" data-closet="${STORE.selCloset}"><i class="fas fa-plus"></i></div>`;
        }

            //  if the user is the ADMIN, and the closet selected is ideal, render the add new item button
    } else {
        editButtonHtml = `<div class="item" id="cl-add-btn" data-btntype="add"><i class="fas fa-plus"></i></div>`;
    }
    //  itemcount:  Itemcount is only needed on closet pages.  It is not needed on 'analyze' page.
    itemCountHtml = `<div class="cl-subhead">There are ${STORE.closetLength[STORE.selCloset]} items in this closet.</div>`;

    // the custom header is rendered here
    $('.closet-header').html(`
                    ${headerHtml}
                    ${itemCountHtml}
                    ${editButtonHtml}
                    <div class="user-msg"></div>`);
}

function renderSeasonHeaders() {
    //let seasonHeadersHtml="";
        let closetSeasonLength = STORE[`${STORE.selCloset}SeasonLength`];
        for (let i=0; i < STORE.seasonAry.length; i++) {
            switch (STORE.seasonAry[i]) {
                case 'Always in Season':  
                    $('#always-in-season').append(`<div class="season-container" id="season-Always-in-Season">
                                                        <div class="season-header">${STORE.seasonAry[i]} ${closetSeasonLength[STORE.seasonAry[i]]} items
                                                    </div>`);
                    break;
                case ('Spring Basics'):
                    $('#other-seasons').append(`<div class="season-container" id="season-Spring-Basics">
                                                    <div class="season-header">${STORE.seasonAry[i]} ${closetSeasonLength[STORE.seasonAry[i]]} items
                                                </div>`);
                    break;
                case ('Summer Basics'):
                    $('#other-seasons').append(`<div class="season-container" id="season-Summer-Basics">
                                                    <div class="season-header">${STORE.seasonAry[i]} ${closetSeasonLength[STORE.seasonAry[i]]} items
                                                </div>`);
                    break;
                case ('Fall Basics'):
                    $('#other-seasons').append(`<div class="season-container" id="season-Fall-Basics">
                                                    <div class="season-header">${STORE.seasonAry[i]} ${closetSeasonLength[STORE.seasonAry[i]]} items
                                                </div>`);
                    break;
                case ('Winter Basics'):
                    $('#other-seasons').append(`<div class="season-container" id="season-Winter-Basics">
                                                    <div class="season-header">${STORE.seasonAry[i]} ${closetSeasonLength[STORE.seasonAry[i]]} items
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

    if (STORE.selCloset === 'giveaway') {
        item =`<div class="closet-item ${data.id}-class">
                            <div class="item-body">
                                <div class="giveaway-person">
                                    <div class="cl-items cl-username" id="cl-username"><div class="item itemlabel"><label>Who gave it away: </label></div><div class="item itembody"><p id="username">${data.user.username}</p></div></div>
                                    <div class="cl-items cl-useremail" id="cl-useremail"><div class="item itemlabel"><label>Email: </label></div><div class="item itembody"><p id="useremail">${data.user.email}</p></div></div>
                                </div>
                                <div class="cl-items cl-season" id="cl-season"><div class="item itemlabel"><label>season: </label></div><div class="item itembody"><p id="season">${data.season}</p></div></div>
                                <div class="cl-items-short">
                                    <div class="cl-items cl-appareltype cl-items-sh" id="cl-appareltype"><p class="cl-items-label">item</p><div class="item itembody"><p id="appareltype">${data.appareltype}</p></div></div>
                                    <div class="cl-items cl-color cl-items-sh" id="cl-color"><p class="cl-items-label">color</p><div class="item itembody"><p id="color">${data.color}</p></div></div>
                                    <div class="cl-items cl-size cl-items-sh" id="cl-size"><p class="cl-items-label">size</p><div class="item itembody"><p id="size">${data.size}</p></div></div>
                                </div>
                                <div class="cl-items cl-shortdesc" id="cl-shortdesc"><div class="item itembody"><p id="shortdesc">${data.shortdesc}</p></div></div>
                                <div class="cl-items cl-longdesc" id="cl-longdesc"><div class="item itembody"><p id="longdesc">${data.longdesc}</p></div></div>
                            </div>`;

    } else {
        item =`<div class="closet-item ${data.id}-class">
                            <div class="item-body">
                                <div class="cl-items cl-season" id="cl-season"><div class="item itemlabel"><label>season: </label></div><div class="item itembody"><p id="season">${data.season}</p></div></div>
                                <div class="cl-items-short">
                                    <div class="cl-items cl-appareltype cl-items-sh" id="cl-appareltype"><p class="cl-items-label">item</p><div class="item itembody"><p id="appareltype">${data.appareltype}</p></div></div>
                                    <div class="cl-items cl-color cl-items-sh" id="cl-color"><p class="cl-items-label">color</p><div class="item itembody"><p id="color">${data.color}</p></div></div>
                                    <div class="cl-items cl-size cl-items-sh" id="cl-size"><p class="cl-items-label">size</p><div class="item itembody"><p id="size">${data.size}</p></div></div>
                                </div>
                                <div class="cl-items cl-shortdesc" id="cl-shortdesc"><div class="item itembody"><p id="shortdesc">${data.shortdesc}</p></div></div>
                                <div class="cl-items cl-longdesc" id="cl-longdesc"><div class="item itembody"><p id="longdesc">${data.longdesc}</p></div></div>
                            </div>`;
    }
    const body = renderClItemActionBtns(item, data);
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
            // edit buttons for edit, delete, donate or giveaway if NOT admin and closet it MY
            bodyHtml += `<div class="item-edit-btns">
                            <button class="action-btns small-btn" id="cl-edit-btn" data-id="${data.id}" data-season="${data.season}" data-appareltype="${data.appareltype}" data-color="${data.color}" data-shortdesc="${data.shortdesc}" data-longdesc="${data.longdesc}" data-size="${data.size}">edit</button>
                            <button class="action-btns small-btn" id="cl-delete-btn" data-id="${data.id}">delete</button>
                            <button class="js-move action-btns small-btn" id="cl-donate-btn" data-id="${data.id}" data-season="${data.season}" data-appareltype="${data.appareltype}" data-color="${data.color}" data-shortdesc="${data.shortdesc}" data-longdesc="${data.longdesc}" data-size="${data.size}">donate</button>
                            <button class="js-move action-btns small-btn" id="cl-giveaway-btn" data-id="${data.id}" data-season="${data.season}" data-appareltype="${data.appareltype}" data-color="${data.color}" data-shortdesc="${data.shortdesc}" data-longdesc="${data.longdesc}" data-size="${data.size}">giveaway</button>
                        </div>`;
        } else if (STORE.selCloset === 'donation') {
            bodyHtml += `<div class="item-edit-btns">
                            <button class="action-btns med-btn" id="cl-return-btn" data-id="${data.id}" data-season="${data.season}" data-appareltype="${data.appareltype}" data-color="${data.color}" data-shortdesc="${data.shortdesc}" data-longdesc="${data.longdesc}" data-size="${data.size}">return to your closet</button>
                        </div>`;
        }

     // if the ADMIN is logged in, get these buttons   
    } else  {
            if (STORE.selCloset === 'my') {
                bodyHtml += `<div> no buttons here
                                    </div>`;
            } else if (STORE.selCloset === 'donation' || STORE.selCloset === 'giveaway'  || STORE.selCloset === 'ideal') {
                // if isAdmin and the closet is one of the above, then the user may edit or delete
                bodyHtml += `
                            <div class="item-edit-btns">
                            <button class="action-btns small-btn" id="cl-edit-btn" data-id="${data.id}" data-season="${data.season}" data-appareltype="${data.appareltype}" data-color="${data.color}" data-shortdesc="${data.shortdesc}" data-longdesc="${data.longdesc}" data-size="${data.size}">edit</button>
                            <button class="action-btns small-btn" id="cl-delete-btn" data-id="${data.id}">delete</button>
                            </div>`;
            
            } else {
                alert('there is a problem with the closet format!');
               
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

//  this page is rendered if before there are items in a closet
function renderInformationPage() { 
    $('.closet-container').html(`
                <div class="cl-header">
                    <div class="item" id="closet-title"><h2>${STORE.selCloset} Closet</h2></div>
                </div>`);

    $('.closet-container').append(`
                <div class="closet-body">closet body</div>`
                );
    
    let infoPageMsg;
    if(STORE.selCloset === 'donation') {
        infoPageMsg = `<div class="user-instruction">
                            <div id="instruction-icon"><i class="fas fa-atom instruction"></i></div>
                            <div class="helper-verbage">
                            <p>To offer an item for donation:</p>
                            <br>
                                <ul class="instruction-list">
                                    <li class="instruction-items">Click into your own closet.</li>
                                    <li class="instruction-items">Find the item you wish to giveaway.</li>
                                    <li class="instruction-items">Click the 'donate' button.  </li>
                                    <li class="instruction-items">Your item will be deleted from your personal closet and added to your personal donation closet.</li>
                                    <li class="instruction-items">Take the physical item out of your wardrobe and place it in a donation bag until you are ready to make the donation.</li>
                                </ul>
                            </div>
                        </div>`;
    } else if (STORE.selCloset === 'giveaway') {
        infoPageMsg = `<div class="user-instruction">
                            <div id="instruction-icon"><i class="fas fa-atom instruction"></i></div>
                            <div class="helper-verbage">
                            <p>To offer an item for giveaway:</p>
                            <br>
                                <ul class="instruction-list">
                                    <li class="instruction-items">Click into your own closet.</li>
                                    <li class="instruction-items">Find the item you wish to giveaway.</li>
                                    <li class="instruction-items">Click the 'giveaway' button.  </li>
                                    <li class="instruction-items">Your item will be deleted from your personal closet and added to the group giveaway closet.</li>
                                    <li class="instruction-items">Take the physical item out of your wardrobe and place it in a giveaway bag until someone wishes to claim it.</li>
                                </ul>
                            </div>
                        </div>`;

    }
    $('.closet-body').html(infoPageMsg);
}


// ***** RENDER ANALYSIS SCREEN FUNCTIONS

function renderAnalysis() {
    $('.registration-container').html('');
    $('.login-container').html('');
    $('.closet-container').html('');
     headerHtml = `<div class="item" id="closet-title"><h2>Analyze It!</h2></div>`
    
    // the custom header is created
    $('.closet-container').append(`
                <div class="closet-header">
                    <div class="item" id="closet-title"><h2>Analyze It!</h2></div>
                </div>`);
    
    $('.closet-container').append(`
                <div class="cl-subhead">
                    <p>Here is your analysis</p>
                </div>
                <div class="analysis-body"></div>`);

    if (STORE.closetLength.my !== 0) {
        renderWholeClosetAnalysis();
        renderSeasonAnalysis();
        renderAppareltypeAnalysis();
    } else {
        $('.closet-container').append(`
            <div class="user-instruction">
                <div id="instruction-icon"><i class="fas fa-atom instruction"></i></div>
                <div class="instruction-verbage"><p>Add some items to your closet and we can analyze it!</p></div>
            </div>`);
    }
}
               

function renderWholeClosetAnalysis() {
    // append whole closet analysis
    $('.analysis-body').append(`
    <div class="analysis-subhead">
        <h3>Here is some notes of the whole closet</h3>
        <div class="comments">This item compares the total number of items in your closet to the number of items in the ideal closet.</div>
    </div>
    <div class="analysis-whole-ds">
        <p>the ideal closet has ${STORE.closetLength.ideal} items in its closet.</p>
        <p>Your closet has ${STORE.closetLength.my} items in its closet.</p>
        </div>`);
    
    const closetDiff = STORE.closetLength.ideal - STORE.closetLength.my;
    if (Math.sign(closetDiff) === 1) {
            $('.analysis-whole-ds').append(`
            <p class="final-thought">The ideal closet has ${closetDiff} more items in its closet than you do in yours.  Acquire the proper number of items.</p>
            </div>`);
    } else if (Math.sign(closetDiff) === -1) {
            $('.analysis-whole-ds').append(`
            <p class="final-thought">The ideal closet has ${closetDiff} LESS items in its closet than you do in yours.  Take a look at what your can get rid of.</p>
            </div>`);
    } else if (Math.sign(seasonDiff) === 0){
            $('analysis-whole-ds').append(`
                    <div class="final-thought-correct">
                        <div id="correct-icon"><i class="fas fa-atom highlight"></i></div>
                        <div class="correct-verbage"><p>Success!  You have the exact right number of items in your closet!</p></div>
                    </div>`);
    } else {
        alert('ummm, there is something wrong with the whole closet analysis. ');
    }
}

function renderSeasonAnalysis() {
     
    // append header for season analysis
     $('.analysis-body').append(`
     <div class="analysis-subhead">
         <h3>Seasons dataset item</h3>
         <div class="comments">Each item in this section compares the total number of items in your closet for the each season to the number of items in the ideal closet.</div>
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
    const seasonDiff = STORE.mySeasonLength[seasonText] - STORE.idealSeasonLength[seasonText];
    let analysisNote = '';
    if (Math.sign(seasonDiff) === 1) {
        analysisNote = `<p class="final-thought">The ideal closet has ${seasonDiff} more items in its closet than you do in yours.  Acquire the proper number of items.</p>`;
    } else if (Math.sign(seasonDiff) === -1) {
        analysisNote = `<p class="final-thought">The ideal closet has ${seasonDiff} LESS items in its closet than you do in yours.  Take a look at what your can get rid of.</p>`;
    } else if (Math.sign(seasonDiff) === 0){
        analysisNote = `<div class="final-thought-correct">
                            <div id="correct-icon"><i class="fas fa-atom highlight"></i></div>
                            <div class="correct-verbage"><p>Success!  You have the exact right number of items in your closet!</p></div>
                        </div>`;
    } else {
        console.log('there is something wrong with the season analysis section');
    }

    // append season analysis to analysis-body
    $('.analysis-body').append(`
            <div class="analysis-season-ds">
                <p class="subhead">${STORE.seasonAry[i]}</p>
                <div class="analysis-subset">
                    <p>You have ${STORE.mySeasonLength[seasonText]} ${STORE.seasonAry[i]} items in your closet.</p>
                    <p>There are ${STORE.idealSeasonLength[seasonText]} ${STORE.seasonAry[i]} items the ideal closet.</p>
                    ${analysisNote}
                </div>
            </div>`);
    }
}

function renderAppareltypeAnalysis() {
    // append header for appareltype analysis
    $('.analysis-body').append(`
    <div class="analysis-subhead">
        <h3>Appareltype dataset item</h3>
        Each item in this section compares the total number of items in your closet for the each season to the number of items in the ideal closet.
    </div>`);

    //  find text equivalent of document number
   for (let i = 0; i < STORE.appareltypeAry.length; i++) {
   console.log[i];
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

   // create html for analysis note 
   const appareltypeDiff = STORE.myAppareltypeLength[appareltypeText] - STORE.idealAppareltypeLength[appareltypeText];
   let analysisNote = '';
   if (Math.sign(appareltypeDiff) === 1) {
       analysisNote = `<p class="final-thought">The ideal closet has ${appareltypeDiff} more items in its closet than you do in yours.  Acquire the proper number of items.</p>`;
   } else if (Math.sign(appareltypeDiff) === -1) {
       analysisNote = `<p class="final-thought">The ideal closet has ${appareltypeDiff} LESS items in its closet than you do in yours.  Take a look at what your can get rid of.</p>`;
   } else if (Math.sign(appareltypeDiff) === 0){
       analysisNote = `<div class="final-thought-correct">
                            <div id="correct-icon"><i class="fas fa-atom highlight"></i></div>
                            <div class="correct-verbage"><p>Success!  You have the exact right number of items in your closet!</p></div>
                    </div>`;
   } else {
       console.log('what is the situation?');
   }

   // append season analysis to analysis-body
   $('.analysis-body').append(`
           <div class="analysis-appareltype-ds">
                <p class="subhead">${STORE.appareltypeAry[i]}</p>
                <div class="analysis-subset">
                    <p>You have ${STORE.myAppareltypeLength[appareltypeText]} ${STORE.appareltypeAry[i]} items in your closet.</p>
                    <p>There are ${STORE.idealAppareltypeLength[appareltypeText]} ${STORE.appareltypeAry[i]} items the ideal closet.</p>
                    ${analysisNote}
                </div>
            </div>`);
   }



}

//  *****  RENDER ADD AND UPDATE FORMS

function renderAddItemForm(msg) {
    $('.registration-container').html('');
    $('.login-container').html('');
    $('.closet-container').html('');
    $('.options-container').html('').css('display', 'none');
    $('.addnewitem-container').html('').css('display', 'none');
    const addItemFormBody = `
            <div class="cl-header">
                <h2>Add New Item</h2>
                <span class="error-msg" id="error-add-new-item">${msg}</span>
            </div>
           <div class="cl-resultcell-new additem-class">
                <div class="cl-resultbody-new">
                <form id="additem-form" name="additem-form">
                            <div class="additem-edit-btns">
                                <button class="action-btns small-btn" id="js-save-btn" data-closet="${STORE.selCloset}" data-user="${STORE.authUser}">save</button>
                                <button class="action-btns small-btn" id="cl-cancel-btn">cancel</button>
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
                                    <div class="additems-container" id="js-additem-color">
                                        <div class="radiogroup">
                                            <label for="color-icon-selector">black
                                            <input type="radio" name="color" value="black"></label>
                                        </div>
                                        <div class="radiogroup">
                                            <label for="color-icon-selector">white
                                            <input type="radio" name="color" value="white"></label>
                                        </div> 
                                        <div class="radiogroup">
                                            <label for="color-icon-selector">neutral
                                            <input type="radio" name="color" value="neutral" checked></label>
                                        </div> 
                                        <div class="radiogroup">
                                            <label for="color-icon-selector">choice
                                            <input type="radio" name="color" value="choice"></label>
                                        </div> 
                                    </div>
                                </div>
                            </div>

                            <div class="itemrow cl-size">
                                <div class="newitem itemlabel"><label>size: </label></div> 
                                <div class="newitem itembody">
                                    <div class="additems-container" id="js-additem-size">
                                            <div class="radiogroup">
                                                <label for="size-selector">x-small
                                                <input type="radio" name="size" value="x-small"></label>
                                            </div>
                                            <div class="radiogroup">
                                                <label for="size-selector">small
                                                <input type="radio" name="size" value="small"></label>
                                            </div> 
                                            <div class="radiogroup">
                                                <label for="size-selector">medium
                                                <input type="radio" name="size" value="medium"></label>
                                            </div> 
                                            <div class="radiogroup">
                                                <label for="size-selector">large
                                                <input type="radio" name="size" value="dress"></label>
                                            </div> 
                                            <div class="radiogroup">
                                                <label for="size-selector">x-large
                                                <input type="radio" name="size" value="x-large"></label>
                                            </div> 
                                            <div class="radiogroup">
                                                <label for="size-selector">n/a
                                                <input type="radio" name="size" value="n/a" checked></label>
                                            </div> 
                                    </div>
                                </div>
                            </div>

                            <div class="itemrow cl-shortdesc">
                                <div class="newitem itemlabel"><label>short description</label></div>
                                <div class="newitem itembody">
                                    <input class="updatefields" id="js-additem-shortdesc" type="text" name="shortdesc" value="short-sleeved t-shirt" placeholder="short description" />
                                </div>
                            </div>

                            <div class="itemrow cl-longdesc">
                                <div class="newitem itemlabel"><label>long description </label></div>
                                <div class="newitem itembody">
                                    <input class="updatefields" id="js-additem-longdesc" type="text" name="longdesc" value="The best short-sleeve length is about 1/2 to 1 inch longer than a typical cap sleeve-
                                    it shows just eh right amount of arm" placeholder="long description" />
                                </div>
                            </div>
                    </form>
                </div>
            </div>`;
    $('.addnewitem-container').html(addItemFormBody).css('display', 'block');
}

function renderUpdateForm() {
    // change closet cell to updateable form
    const updateFormBody = `<div class="cl-resultbody">
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
                            <option value = "${STORE.currentEditItem.color}">${STORE.currentEditItem.color}</option>
                            <option value = "black">black</option>
                            <option value = "white">white</option>
                            <option value = "neutral">neutral</option>
                            <option value = "choice">choice</option>
                            <option value = "n/a">n/a</option>
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
                        <select class="updatefields" id="js-updatesize" type="text" name="size">
                            <option value = "${STORE.currentEditItem.size}">${STORE.currentEditItem.size}</option>
                            <option value = "X-Small">X-Small</option>
                            <option value = "Small">Small</option>
                            <option value = "Medium">Medium</option>
                            <option value = "Large">Large</option>
                            <option value = "X-Large">X-Large</option>
                        </select>
                    </div>
                </div>
            </form>
        </div> 
        <div class="update-edit-btns">
            <button class="action-btns small-btn" id="cl-updatebtn-final"data-id="${STORE.currentEditItem.id}">save</i>
            </button>
            <button class="action-btns small-btn" id="cl-cancel-btn">cancel</button>
        </div>`; 

    $(`.${STORE.currentEditItem.id}-class`).html(updateFormBody);
    $(`.${STORE.currentEditItem.id}-class`).css("border", "5px solid #C98573");
}


