//  RENDER data to screen

window.RENDER_MODULE = {
    renderRegistrationForm,
    renderLoginForm,
    renderOptionsPage,
    renderClosetHeader,
    renderClosetBody,
    renderAddItemForm,
    renderTopNav,
    renderNavLoggedIn,
    renderNavMenu,
    renderNavAdmin,
    renderLogout,
    renderUpdateForm,
    renderErrorMessage,
    renderSignUpError,
    renderAnalysis,
    renderWholeClosetAnalysis,
    renderSeasonAnalysis,
    renderAppareltypeAnalysis,
    renderInformationPage,
    renderSeasonHeaders,
    renderClosetItemBody,
    renderClosetItemActionBtns
};

function renderRegistrationForm() {
    $('.reg-login').html(`
        <div class="reg-container">
                <form class="form-reg-login">
                    <div id="div-reg">
                        <h3>Register</h3>
                        <div class="reg-item">
                            <p>name</p>
                            <div class="reg-input-container">
                                <input type="text" class="reg-input" name="new-name" id="new-name" class="js-new-name" placeholder="First Last" required>
                            </div>
                        </div> 
                        <div class="reg-item">
                            <p>email</p>
                            <div class="reg-input-container">
                                <input type="text" class="reg-input" name="new-email" id="new-email" class="js-new-email" placeholder="myname@gmail.com" required>
                            </div>
                        </div> 
                        <div class="reg-item">
                            <p>username</p>
                            <div class="reg-input-container">
                                <input type="text" class="reg-input" name="new-username" id="new-username" class="js-new-username" placeholder="chuckles" required>
                            </div>
                        </div>                      
                        <div class="reg-item">
                            <p>password:</p>
                            <div class="input-container">
                                <input type="password" class="reg-input" name="new-password" id="new-password" class="js-new-password" value="password" required>
                                <i class="far fa-eye-slash password-icon"></i>
                            </div>
                        </div>
                        <div class="reg-item">
                            <p>retype password:</p>
                            <div class="input-container">
                                <input type="password" class="reg-input" name="confirm-password" id="confirm-password" class="js-confirm-password" value="password" required>
                                <i class="far fa-eye-slash password-confirm-icon"></i>
                            </div>
                        </div>
                        <div id="btn-sign-me-up" class="reg-editbuttons">
                            <button type="button" class="btn-register action-btns small-btn" id="btn-register" value="Sign me up!">Sign me up!</button>
                        </div>
                        
                    </div>
                </form>
        </div>
    `);

}

function renderLoginForm() {

    $('.section-login').html('');
    $('.section-login').append(`
        <div class="login-container">
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
                                    </div>
                                    <div class="login-item">
                                        <div class="input-container">
                                            <i class="fas fa-key user-icon"></i>
                                            <input type="password" name="GET-password" id="GET-password" class="login-input" tabindex="2" autocomplete="off"required>
                                            <i class="far fa-eye-slash password-icon"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="error-msg" style="visibility:hidden"></div>
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
                                    <p class="demo"><p>For demo:  </p><p>username: cathm94 </p><p>password: cathm94</p>
                            </div>
                        </form>
                    </div> 
                </div>
        </div> 
        
    `).show();
    $('#GET-username').focus();

}

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
    //renderTopNav();
    $('.section-login').html('');

    if (STORE.authUserName == 'admin') {
        $('.section-options').html(`
                <div class="options-container">
                <div class="options-header">
                    <h3>The ADMIN functions include the following:
                    <div class="instruction-list">
                                    <p>1.  VIEW, ADD TO, DELETE FROM and EDIT the Ideal Closet.</p>
                                    <p>2.  DELETE FROM the GIVEAWAY CLOSET.</p>
                                </div>
                </div>
                    <div class="options-btns" id="ideal-closet-btn" data-option="ideal"><i class="fas fa-tshirt"></i>
                        <h4 class="closet-functions">view/add to/delete from/edit the ideal closet</h4>
                    </div>
                    <div class="options-btns" id="giveaway-closet-btn" data-option="giveaway">
                        <i class="fas fa-tshirt"></i>
                        <h4 class="closet-functions">view/add to/delete from/edit the giveaway closet</h4>
                    </div>
                </div>
     `).show();

    } else {
        $('.section-options').html(`
            <div class="options-container">
                <div class="options-header">
                    <h3>Which closet would you like to work with?</h3>
                </div>
                <div class="options-btns" id="ideal-closet-btn" data-option="ideal">
                    <i class="fas fa-door-open"></i>
                    <h4 class="closet-functions">the ideal</h4>
                </div>
                <div class="options-btns">
                    <div class="options-btns" id="my-closet-btn" data-option="my">
                        <i class="fas fa-tshirt"></i>
                        <h4 class="closet-functions">your own</h4>
                    </div>
                    <div class="options-btns" id="giveaway-closet-btn" data-option="giveaway">
                        <i class="fas fa-tshirt"></i>
                        <h4 class="closet-functions">giveaway</h4>
                    </div>
                    <div class="options-btns" id="donation-closet-btn" data-option="donation">
                        <i class="fas fa-tshirt"></i>
                        <h4 class="closet-functions">donation</h4>
                    </div>
                </div>
                <div class="options-header">
                    <h3>Would you like some recommendations?</h3>
                </div>
                <div class="options-btns" id="analyze-closet-btn" data-option="analyze">
                    <i class="fas fa-atom"></i>
                    <h4 class="closet-functions">Analyze!</h4>
                <div>
            </div>
        `);
    };
    
}

function renderNavLoggedIn() {
    $('.section-nav').html('');
    $('.section-nav').append(`
        <div class="nav-loggedin" style="border-bottom: 1px solid lightgrey">
            <div id="header-greeting">
                <p>Welcome, ${STORE.authUserName}!</p>
            </div>
            <div id="header-logout">
                <p>Logout</p>
            </div>
        </div>`);
}

function renderNavMenu() {
    //$('.section-nav').html('');
    $('.nav-menu').remove();
    $('.section-nav').append(`
            <div class="nav-menu" style="border-bottom: 1px solid lightgrey">
                <div class="options-btns-min" >
                    <p id="ideal-closet-btn-min">ideal</p>
                </div>
                <div class="options-btns-min" >
                    <p id="my-closet-btn-min">yours</p>
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
            </div>
     `);

     switch(STORE.selCloset) {
        case 'ideal':
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

function renderNavAdmin() {
    $('.section-options').html('');
    $('.section-login').html('');
    $('.closet-container').html('');
    $('.nav-admin').remove('');
    $('.section-nav').append(`
            <div class="nav-admin" style="border-bottom: 1px solid lightgrey">
                <div class="options-btns-min">
                    <p id="ideal-closet-btn-min">ideal</p>
                </div>
                <div class="options-btns-min">
                    <p id="giveaway-closet-btn-min">giveaway</p>
                </div>
            </div>
     `);
}

function renderLogout(user) {
    userName = localStorage.getItem('username');
    $('.section-options').html('');
    $('.section-login').html('');
    $('.closet-container').html('');
    $('.section-nav').html('');
    $('.section-nav').append(`
        <div class="nav-logout" style="border-bottom: 1px solid lightgrey">
            <div id="header-greeting">
                <p>Goodbye, ${user}!</p>
            </div>`);
}    


function renderClosetHeader(closetItems) {
    
    let closetHtml = '';
    let headerHtml = '';
    let itemCountHmtl = '';
    let editButtonHtml = '';
    let editBtnsHtml = '';

    
    //  Create Header for one of the User Selected Options
    // header title:  For all 'closets', use the stored closet name for the header. 
    if (STORE.selCloset === 'analyze') {
        headerHtml = `<div class="item" id="closet-title"><h2>Analyze It!</h2></div>`;
    } else {
        headerHtml = `<div class="item" id="closet-title"><h2>${STORE.selCloset} Closet</h2></div>`;
    }
    
    //  add new button: if the user is other than the ADMIN and the selected closet is 'ideal', 'donation or 'giveaway, then do not render the add new item button.
    //  user may only view data
    if (STORE.authUserName !== 'admin') {
        if (STORE.selCloset === 'ideal' || STORE.selCloset === 'donation' || STORE.selCloset === 'giveaway') {
            editButtonHtml = ``;
        } else {
            editButtonHtml = `<div class="item" id="cl-add-btn" data-btntype="add"><i class="fas fa-plus"></i></div>`;
        }

            //  if the user is the ADMIN, and the closet selected is ideal, render the add new item button
    } else {
        editButtonHtml = `<div class="item" id="cl-add-btn" data-btntype="add"><i class="fas fa-plus"></i></div>`;
    }
    //  itemcount:  Itemcount is only needed on closet pages.  It is not needed on 'analyze' page.
    switch(STORE.selCloset) {
        case 'my':
            itemCountHtml = `<div class="item" id="cl-itemcount">There are ${STORE.closetLength.my} items in this closet.</div>`;
            break;
        case 'ideal':
            itemCountHtml = `<div class="item" id="cl-itemcount">There are ${STORE.closetLength.ideal} items in this closet.</div>`;
            break;
        case 'giveaway':
            itemCountHtml = `<div class="item" id="cl-itemcount">There are ${STORE.closetLength.giveaway} items in this closet.</div>`;
            break;
        case 'donation':
            itemCountHtml = `<div class="item" id="cl-itemcount">There are ${STORE.closetLength.donation} items in this closet.</div>`;
            break;
        default:
            itemCountHtml =``;
    }

    // the custom header is rendered here
    $('.closet-header').html(`
                    ${headerHtml}
                    ${itemCountHtml}
                    ${editButtonHtml} `);
    

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

function renderClosetItemBody(data) {
    let item = '';
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
    const body = renderClosetItemActionBtns(item, data);
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

function renderClosetItemActionBtns(bodyHtml, data) {

    // if someone other than the ADMIN is logged in, get these buttons
    if (STORE.authUserName !== 'admin') {
        if (STORE.selCloset === 'my') {
            // edit buttons for edit, delete, donate or giveaway if NOT admin and closet it MY
            bodyHtml += `<div class="item-edit-btns">
                            <button class="action-btns small-btn" id="cl-edit-btn" data-id="${data.id}" data-season="${data.season}" data-appareltype="${data.appareltype}" data-color="${data.color}" data-shortdesc="${data.shortdesc}" data-longdesc="${data.longdesc}" data-size="${data.size}">edit</button>
                            <button class="action-btns small-btn" id="cl-delete-btn" data-id="${data.id}">delete</div>
                            <button class="action-btns small-btn" id="cl-donate-btn" data-id="${data.id}" data-season="${data.season}" data-appareltype="${data.appareltype}" data-color="${data.color}" data-shortdesc="${data.shortdesc}" data-longdesc="${data.longdesc}" data-size="${data.size}">donate</button>
                            <button class="action-btns small-btn" id="cl-giveaway-btn" data-id="${data.id}" data-season="${data.season}" data-appareltype="${data.appareltype}" data-color="${data.color}" data-shortdesc="${data.shortdesc}" data-longdesc="${data.longdesc}" data-size="${data.size}">giveaway</button>
                        </div>`;
        } else if (STORE.selCloset === 'donation') {
            bodyHtml += `<div class="item-edit-btns">
                            <button class="action-btns small-btn" id="cl-return-btn" data-id="${data.id}" data-season="${data.season}" data-appareltype="${data.appareltype}" data-color="${data.color}" data-shortdesc="${data.shortdesc}" data-longdesc="${data.longdesc}" data-size="${data.size}">return to your closet</button>
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
                                <button class="action-btns small-btn" data-id="${data.id}" data-season="${data.season}" data-appareltype="${data.appareltype}" data-color="${data.color}" data-shortdesc="${data.shortdesc}" data-longdesc="${data.longdesc}" data-size="${data.size}"><i id="cl-edit-btn" class="far fa-edit"></i></button>
                                <button class="action-btns small-btn" data-id="${data.id}"><i id="cl-delete-btn" class="far fa-trash-alt"></i></button>
                            </div>`;
            
            } else {
                alert('there is a problem with the closet format!');
               
            }       
    } 
return bodyHtml;
}

//  render the selected closet
function renderClosetBody(closetItems) {
    let item;
    for (let i=0; i < closetItems.length; i++) {
        item = closetItems[i];
        renderClosetItemBody(item);     
    } 
}


function renderInformationPage() {
    $('.section-options').html('');
    
    $('.closet-container').html(`
                <div class="cl-header">
                    <div class="item" id="closet-title"><h2>${STORE.selCloset} Closet</h2></div>
                </div>`);

    $('.closet-container').append(`
                <div class="closet-body">closet body</div>`
                );
    
    let infoPageMsg;
    if(STORE.selCloset === 'donation') {
        infoPageMsg = `<div class="info-msg">
                            <h3>You have not agreed to donate any of your items.</h3>
                            <h3>If you would like to make a donation, here are the instructions:</h3>
                                <div class="instruction-list">
                                    <p>1.  Click into your own closet.</p>
                                    <p>2.  Find the item you wish to donate.</p>
                                    <p>3.  Click the 'donate' button.  Your item will be deleted from your personal closet and added to your personal donation closet.</p>
                                    <p>4.  Take the physical item out of your wardrobe and place it in a donation bag until you are ready to drop it off.</p>
                                </div>
                      </div>`;
    } else if (STORE.selCloset === 'giveaway') {
        infoPageMsg = `<div class="info-msg">
                            <h3>You have not agreed to add any of your items to the 'group giveaway' closet.</h3>
                            <h3>If you would like to offer an item for giveaway, here are the instructions:</h3>
                                <div class="instruction-list">
                                    <p>1.  Click into your own closet.</p>
                                    <p>2.  Find the item you wish to giveaway.</p>
                                    <p>3.  Click the 'giveaway' button.  Your item will be deleted from your personal closet and added to the group donation closet.</p>
                                    <p>4.  Take the physical item out of your wardrobe and place it in a giveaway bag until someone wishes to claim it.</p>
                                </div>
                       </div>`;

    }
    $('.closet-body').html(infoPageMsg);
}

function renderAddItemForm(msg) {
    $('.closet-container').html('');
    $('.section-options').html('');
    const addItemFormBody = `
        <div class="addnewitem-container">
            <div class="cl-header">` +
                `<h2>Add New Item</h2>` +
            `</div>` +
           `<div class="cl-resultcell-new additem-class">` +
                `<div class="cl-resultbody-new">` +
                    `<form>` +
                            `<div class="additem-edit-btns">` +
                                `<div class="action-btns small-btn" id="cl-save-btn" data-closet="${STORE.selCloset}" data-user="${STORE.authUser}">save</div>` +
                                `<div class="action-btns small-btn" id="cl-cancel-btn">cancel</div>` +
                            `</div>` +
                            `<div class="itemrow cl-whichseason">` +
                                `<div class="newitem itemlabel"><label>which season <i class="fas fa-asterisk"></i></label></div>` +
                                `<div class="newitem itembody">` +
                                    `<div class="additems-container" id="js-additem-season">` +
                                        `<div class="radiogroup">` +
                                            `<label class="season-selector-label" for="season-icon-selector">All Seasons` +
                                            `<input type="radio" name="season" id="season-all" value="Always in Season" checked /></label>` +
                                        `</div>` +
                                        `<div class="radiogroup">` +
                                            `<label class="season-selector-label" for="season-icon-selector">Spring Basics` +
                                            `<input type="radio" name="season" id="season-spring" value="Spring Basics" /></label>` +
                                        `</div>` +
                                        `<div class="radiogroup">` +
                                            `<label class="season-selector-label" for="season-icon-selector">Summer Basics` +
                                            `<input type="radio" name="season" id="season-summer" value="Summer Basics" /></label>` +
                                        `</div>` +
                                        `<div class="radiogroup">` +
                                            `<label class="season-selector-label" for="season-icon-selector">Fall Basics` +
                                            `<input type="radio" name="season" id="season-fall" value="Fall Basics" /></label>` +
                                        `</div>` +
                                        `<div class="radiogroup">` +
                                            `<label class="season-selector-label" for="season-icon-selector">Winter Basics` +
                                            `<input type="radio" name="season" id="season-winter" value="Winter Basics" /></label>` +
                                        `</div>` +
                                    `</div>` +
                                `</div>` +
                            `</div>` +

                            `<div class="itemrow cl-appareltype">` +
                                `<div class="newitem itemlabel"><label>type of clothing <i class="fas fa-asterisk"></i></label></div>` +
                                `<div class="newitem itembody">` +
                                    `<div class="additems-container" id="js-additem-appareltype">` +
                                        `<div class="radiogroup">` +
                                            `<label for="season-icon-selector">top` +
                                            `<input type="radio" name="appareltype" value="top" checked></label>` +
                                        `</div>` +
                                        `<div class="radiogroup">` +
                                            `<label for="season-icon-selector">bottom` +
                                            `<input type="radio" name="appareltype" value="bottom"></label>` +
                                        `</div>` + 
                                        `<div class="radiogroup">` +
                                            `<label for="season-icon-selector">dress` +
                                            `<input type="radio" name="appareltype" value="dress"></label>` +
                                        `</div>` + 
                                        `<div class="radiogroup">` +
                                            `<label for="season-icon-selector">coat` +
                                            `<input type="radio" name="appareltype" value="coat"></label>` +
                                        `</div>` + 
                                        `<div class="radiogroup">` +
                                            `<label for="season-icon-selector">shoes` +
                                            `<input type="radio" name="appareltype" value="shoes"></label>` +
                                        `</div>` + 
                                    `</div>` +
                                `</div>` +
                            `</div>` +


                            `<div class="itemrow cl-color">` +
                                `<div class="newitem itemlabel"><label>color </label></div>` +
                                `<div class="newitem itembody">` +
                                    `<div class="additems-container" id="js-additem-color">` +
                                        `<div class="radiogroup">` +
                                            `<label for="color-icon-selector">black` +
                                            `<input type="radio" name="color" value="black"></label>` +
                                        `</div>` +
                                        `<div class="radiogroup">` +
                                            `<label for="color-icon-selector">white` +
                                            `<input type="radio" name="color" value="white"></label>` +
                                        `</div>` + 
                                        `<div class="radiogroup">` +
                                            `<label for="color-icon-selector">neutral` +
                                            `<input type="radio" name="color" value="neutral" checked></label>` +
                                        `</div>` + 
                                        `<div class="radiogroup">` +
                                            `<label for="color-icon-selector">choice` +
                                            `<input type="radio" name="color" value="choice"></label>` +
                                        `</div>` + 
                                    `</div>` +
                                `</div>` +
                            `</div>` +

                            `<div class="itemrow cl-size">` +
                                `<div class="newitem itemlabel"><label>size: </label></div>` + 
                                `<div class="newitem itembody">` +
                                    `<div class="additems-container" id="js-additem-size">` +
                                            `<div class="radiogroup">` +
                                                `<label for="size-selector">x-small` +
                                                `<input type="radio" name="size" value="x-small"></label>` +
                                            `</div>` +
                                            `<div class="radiogroup">` +
                                                `<label for="size-selector">small` +
                                                `<input type="radio" name="size" value="small"></label>` +
                                            `</div>` + 
                                            `<div class="radiogroup">` +
                                                `<label for="size-selector">medium` +
                                                `<input type="radio" name="size" value="medium"></label>` +
                                            `</div>` + 
                                            `<div class="radiogroup">` +
                                                `<label for="size-selector">large` +
                                                `<input type="radio" name="size" value="dress"></label>` +
                                            `</div>` + 
                                            `<div class="radiogroup">` +
                                                `<label for="size-selector">x-large` +
                                                `<input type="radio" name="size" value="x-large"></label>` +
                                            `</div>` + 
                                            `<div class="radiogroup">` +
                                                `<label for="size-selector">n/a` +
                                                `<input type="radio" name="size" value="n/a" checked></label>` +
                                            `</div>` + 
                                    `</div>` +
                                `</div>` +
                            `</div>` +

                            `<div class="itemrow cl-shortdesc">` +
                                `<div class="newitem itemlabel"><label>short description <i class="fas fa-asterisk"></i></label></div>` +
                                `<div class="newitem itembody">` +
                                    `<input class="updatefields" id="js-additem-shortdesc" type="text" name="shortdesc" value="short-sleeved t-shirt" placeholder="short description" />` +
                                `</div>` +
                            `</div>` +

                            `<div class="itemrow cl-longdesc">` +
                                `<div class="newitem itemlabel"><label>long description </label></div>` +
                                `<div class="newitem itembody">` +
                                    `<input class="updatefields" id="js-additem-longdesc" type="text" name="longdesc" value="The best short-sleeve length is about 1/2 to 1 inch longer than a typical cap sleeve-` +
                                    `it shows just eh right amount of arm" placeholder="long description" />` +
                                `</div>` +
                            `</div>` +
                    `</form>` +
                `</div>` +
            `</div>` +
        `</div>`;
    $(`.closet-container`).append(addItemFormBody);
}

function renderUpdateForm() {

    // change closet cell to updateable form
    const updateFormBody = 
        `<div class="cl-resultbody">` +
            `<form id='form-update-closet'>` +
                `<div class="itemrow update-season">` +
                    `<div class="newitem itemlabel"><label>which season <i class="fas fa-asterisk"></i></label></div>` +
                    `<div class="item itembody">` +
                            `<select class="updatefields" id="js-updateseason" type="text" name="season">` +
                                `<option value ="${STORE.currentEditItem.season}">${STORE.currentEditItem.season}</option>` +
                                `<option value = "Always in Season">Always in Season</option>` +
                                `<option value = "Fall Basics">Fall Basics</option>` +
                                `<option value = "Winter Basics">Winter Basics</option>` +
                                `<option value = "Spring Basics">Spring Basics</option>` +
                                `<option value = "Summer Basics">Summer Basics</option>` +
                            `</select>` +
                    `</div>` +
                `</div>` +
                `<div class="itemrow update-appareltype">` +
                    `<div class="newitem newitemlabel">type of clothing: <i class="fas fa-asterisk"></i></div>` +
                    `<div class="item itembody">` +
                        `<select class="updatefields" id="js-updateappareltype" type="text" name="appareltype">` +
                            `<option value ="${STORE.currentEditItem.appareltype}">${STORE.currentEditItem.appareltype}</option>` +
                            `<option value = "top">top</option>` +
                            `<option value = "bottom">bottom</option>` +
                            `<option value = "dress">dress</option>` +
                            `<option value = "coat">coat</option>` +
                            `<option value = "shoes">shoes</option>` +
                        `</select>` +
                    `</div>` +
                `</div>` +
                `<div class="itemrow update-color">` +
                    `<div class="newitem itemlabel">color: </div>` +
                    `<div class="newitem itembody">` +
                        `<select class="updatefields" id="js-updatecolor" type="text" name="color" value="${STORE.currentEditItem.color}">` +
                            `<option value = "${STORE.currentEditItem.color}">${STORE.currentEditItem.color}</option>` +
                            `<option value = "black">black</option>` +
                            `<option value = "white">white</option>` +
                            `<option value = "neutral">neutral</option>` +
                            `<option value = "your choice">your choice</option>` +
                            `<option value = "n/a">n/a</option>` +
                        `</select>` +
                    `</div>` +
                `</div>` +
                `<div class="itemrow update-shortdesc">` +
                    `<div class="newitem itemlabel">short description: <i class="fas fa-asterisk"></i></div>` +
                    `<div class="newitem itembody">` +
                        `<input class="updatefields" id="js-updateshortdesc" type="text" name="shortdesc" value="${STORE.currentEditItem.shortdesc}" />` +
                    `</div>` +
                `</div>` +
                `<div class="itemrow update-longdesc">` +
                    `<div class="newitem itemlabel">long description: </div>` +
                    `<div class="newitem itembody">` +
                        `<textarea class="updatefields" id="js-updatelongdesc" type="text" name="longdesc" value="${STORE.currentEditItem.longdesc}" rows="3" cols="20">${STORE.currentEditItem.longdesc}</textarea>` +
                    `</div>` +
                `</div>` +
                `<div class="itemrow update-size">` +
                    `<div class="newitem itemlabel">size: </div>` +
                    `<div class="newitem itembody">` +
                        `<select class="updatefields" id="js-updatesize" type="text" name="size">` +
                            `<option value = "${STORE.currentEditItem.size}">${STORE.currentEditItem.size}</option>` +
                            `<option value = "X-Small">X-Small</option>` +
                            `<option value = "Small">Small</option>` +
                            `<option value = "Medium">Medium</option>` +
                            `<option value = "Large">Large</option>` +
                            `<option value = "X-Large">X-Large</option>` +
                        `</select>` +
                    `</div>` +
                `</div>` +
            `</form>` +
        `</div> ` +
        `<div class="update-edit-btns">` +
            `<div class="action-btns small-btn" id="cl-updatebtn-final"data-id="${STORE.currentEditItem.id}">save</i>` +
            `</div>` +
            `<div class="action-btns small-btn" id="cl-cancel-btn">cancel</div>` +
        `</div>`; 

    $(`.${STORE.currentEditItem.id}-class`).html(updateFormBody);
    $(`.${STORE.currentEditItem.id}-class`).css("border", "5px solid #C98573");
}

function renderAnalysis() {
    $('.section-options').html('');
    $('.section-login').html('');
    $('.closet-container').html('');
     headerHtml = `<div class="item" id="closet-title"><h2>Analyze It!</h2></div>`
    
    // the custom header is created
    $('.closet-container').append(`
                <div class="closet-header">
                    <div class="item" id="closet-title"><h2>Analyze It!</h2></div>
                </div>`);
    
    $('.closet-container').append(`
                <div class="analysis-header">
                    <p>Here is your analysis</p>
                </div>
                <div class="analysis-body"></div>`);

    renderWholeClosetAnalysis();
    renderSeasonAnalysis();
    renderAppareltypeAnalysis();
}
               

function renderWholeClosetAnalysis() {
    // append whole closet analysis
    $('.analysis-body').append(`
    <div class="analysis-subhead">
        <h3>Here is some notes of the whole closet</h3>
        This item compares the total number of items in your closet to the number of items in the ideal closet.</p>
    </div>
    <div class="analysis-whole-ds">
        <p>the ideal closet has ${STORE.closetLength.ideal} items in its closet.</p>
        <p>Your closet has ${STORE.closetLength.my} items in its closet.</p>
        </div>`);
    const closetDiff = STORE.closetLength.ideal - STORE.closetLength.my;
    if (Math.sign(closetDiff) === 1) {
    console.log(Math.sign(closetDiff));
    $('.analysis-whole-ds').append(`
    <p class="final-thought">The ideal closet has ${closetDiff} more items in its closet than you do in yours.  Acquire the proper number of items.</p>
    </div>`);
    } else if (Math.sign(closetDiff) === -1) {
    console.log(Math.sign(closetDiff));
    $('.analysis-whole-ds').append(`
    <p class="final-thought">The ideal closet has ${closetDiff} LESS items in its closet than you do in yours.  Take a look at what your can get rid of.</p>
    </div>`);
    } else {
    $('analysis-whole-ds').append(`
    <p class="final-thought">You have the exact right number of items in your closet.</p>
    </div>`);
    }
}

function renderSeasonAnalysis() {
     
    // append header for season analysis
     $('.analysis-body').append(`
     <div class="analysis-subhead">
         <h3>Seasons dataset item</h3>
         Each item in this section compares the total number of items in your closet for the each season to the number of items in the ideal closet.
     </div>`);

     //  find text equivalent of document number
    for (let i = 0; i < STORE.seasonAry.length; i++) {
    console.log[i];
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
        analysisNote = `<p class="final-thought">You have the exact right number of items in your closet.</p>`;
    } else {
        console.log('what is the situation?');
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
       analysisNote = `<p class="final-thought">You have the exact right number of items in your closet.</p>`;
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

// ** render errors

function renderErrorMessage() {
    //reset error messages
    renderLoginForm();
    
   $('.error-msg').html('Make sure you fill out both username and password correctly.  Try again.');
        
    //window.location.href = "/";
    
    //$('#btn-signin').before('<p class="error-msg" id="error-msg" aria-live="assertive"><i class="fas fa-exclamation-circle"></i> Incorrect username and/or password</p>');
    //$('#GET-username').addClass('error-field').attr('aria-invalid', false);
    //$('#GET-password').addClass('error-field').attr('aria-invalid', false);
}

function renderSignUpError(errMessage) {
    //reset previous errors
    $('.error-msg').remove();
    if (errLocation === 'username'){
        $('.new-username').addClass('error-field').attr('aria-invalid', false);
    } else {
        $('.new-password').val('').addClass('error-field').attr('aria-invalid', false);
        $('.confirm-password').val('').addClass('error-field').attr('aria-invalid', false);
    };
    $('#btn-register').before(`<p class="error-msg" aria-live="assertive"><i class="fas fa-exclamation-circle"></i>${errMessage}</p>`);
    
}

