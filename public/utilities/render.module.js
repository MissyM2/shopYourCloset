//  RENDER data to screen

window.RENDER_MODULE = {
    renderRegistrationForm,
    renderLoginForm,
    renderOptionsScreen,
    renderCloset,
    renderAddItemForm,
    renderTopNav,
    renderNavLoggedIn,
    renderNavMenu,
    renderNavAdmin,
    renderLogout,
    renderUpdateForm,
    renderLoginError,
    renderSignUpError,
    renderAnalysis,
    renderInformationPage
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
                            <button type="button" class="btn-register" id="btn-register" value="Sign me up!">Sign me up!</button>
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
                                            <input type="text" name="GET-username" id="GET-username" class="login-input" required>
                                        </div>
                                    </div>
                                    <div class="login-item">
                                        <div class="input-container">
                                            <i class="fas fa-key user-icon"></i>
                                            <input type="password" name="GET-password" id="GET-password" class="login-input" required>
                                            <i class="far fa-eye-slash password-icon"></i>
                                        </div>
                                    </div>
                                </div>
                                <div id="signin-btn">
                                    <h3>Sign In</h3>
                                </div>
                                <div class="container-signup-btn">
                                    <div id="signup-verbage">
                                        <h3>New user?</h3>
                                    </div>
                                    <div id="signup-btn">
                                        <h3>Sign Up</h3>
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

function renderOptionsScreen(userName) {
    //renderTopNav();
    $('.section-login').html('');

    if (userName == 'Admin ID') {
        $('.section-options').html(`
                <div class="options-container">
                    <div class="col-8 options-btns" id="ideal-closet-btn"><i class="fas fa-tshirt"></i>
                        <h4 class="closet-functions">view/add to the ideal closet</h4>
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

function renderNavLoggedIn(userName) {
    $('.section-nav').html('');
    $('.section-nav').append(`
        <div class="nav-loggedin" style="border-bottom: 1px solid lightgrey">
            <div id="header-greeting">
                <p>Welcome, ${userName}!</p>
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
    //$('.nav-admin').html('');
    $('.section-nav').append(`
            <div class="nav-admin" style="border-bottom: 1px solid lightgrey">
                <div class="options-btns-min" id="ideal-closet-btn-min">
                    <p>ideal</p>
                </div>
                <div class="options-btns-min" id="giveaway-closet-btn-min">
                    <p>giveaway</p>
                </div>
                <div class="options-btns-min" id="donation-closet-btn-min">
                    <p>donation</p>
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




function renderCloset(closetItems) {
    $('.section-options').html('');

    let closetHtml = '';
    let headerHtml = '';
    let itemCountHmtl = '';
    let editButtonHtml = '';
    let editBtnsHtml = '';
    

    const isAdmin = (localStorage.getItem("name") == 'Admin ID');
    
    //  Create Header for one of the User Selected Options

    //  if the user is other than the ADMIN and the selected closet is 'ideal', then do not render the add new item button.
    //  user may only view data
    if (STORE.selCloset === 'ideal' || STORE.selCloset === 'donation' || STORE.selCloset === 'donation' && (!isAdmin)) {
        editButtonHtml = ``;
    //  if the user is the ADMIN, and the closet selected is ideal, render the add new item button
    } else {
        editButtonHtml = `<div class="item" id="cl-add-btn"><i class="fas fa-plus"></i></div>`;
    }

        headerHtml = `<div class="item" id="closet-title"><h2>Analyze It!</h2></div>`
    
    // the custom header is created
    $('.closet-container').html(`
                <div class="closet-header">
                    ${headerHtml}
                    ${itemCountHtml}
                    ${editButtonHtml}  
                </div>`);
    
    
    // Create BODY for the User Selected Option

    //  first append a div for the body portion of the screen
    $('.closet-container').append(`
                <div class="closet-body"></div>`
                );
    
    // create the html from looping through the returned data from the selected closet
    let closetBodyHtml="";
    let closetEditBtnsHtml = "";
    for (let i=0; i < closetItems.length; i++) {

 // all 4 possible closets (ideal, my, donation and giveaway) there are the same items showing in the item-body div
        closetBodyHtml +=`
                    <div class="closet-item">
                        <div class="item-body">
                            <div class="cl-items" id="cl-season"><div class="item itemlabel"><label>season: </label></div><div class="item itembody"><p>${closetItems[i].season}</p></div></div>
                            <div class="cl-items-short">
                                <div class="cl-items cl-items-sh" id="cl-appareltype"><div class="item itembody"><p>${closetItems[i].appareltype}</p></div></div>
                                <div class="cl-items cl-items-sh" id="cl-color"><div class="item itembody"><p>${closetItems[i].color}</p></div></div>
                                <div class="cl-items cl-items-sh" id="cl-size"><div class="item itembody"><p>${closetItems[i].size}</p></div></div>
                            </div>
                            <div class="cl-items" id="cl-shortdesc"><div class="item itembody"><p>${closetItems[i].shortdesc}</p></div></div>
                            <div class="cl-items" id="cl-longdesc"><div class="item itembody"><p>${closetItems[i].longdesc}</p></div></div>
                        </div>`;

       
        //  depending on whether the user is a regular user or ADMIN, 
        //  then, depending on which closet is selected
        // the user will see a different set of edit options for each item
        if (!isAdmin) {
            if (STORE.selCloset === 'my') {
                closetBodyHtml += `
                            <div class="item-edit-btns">
                                <div class="editbuttons" id="clupdate-btn" data-id="${closetItems[i].id}" data-season="${closetItems[i].season}" data-appareltype="${closetItems[i].appareltype}" data-color="${closetItems[i].color}" data-shortdesc="${closetItems[i].shortdesc}" data-longdesc="${closetItems[i].longdesc}" data-size="${closetItems[i].size}"><i class="far fa-edit"></i></div>
                                <div class="editbuttons" id="cl-delete-btn" data-id="${closetItems[i].id}"><i class="far fa-trash-alt"></i></div>
                                <div class="editbuttons" id="cl-donate-btn" data-id="${closetItems[i].id}">donate</div>
                                <div class="editbuttons" id="cl-giveaway-btn" data-id="${closetItems[i].id}">giveaway</div>
                            </div>
                        </div>
                        `;
            } else {
                closetBodyHtml +=`</div>`;
            }
        } else  {
            if (STORE.selCloset === 'donation' || STORE.selCloset === 'giveaway' ) {
                closetBodyHtml += `
                            <div class="item-edit-btns">
                                <div class="editbuttons" id="clupdate-btn" data-id="${closetItems[i].id}" data-season="${closetItems[i].season}" data-appareltype="${closetItems[i].appareltype}" data-color="${closetItems[i].color}" data-shortdesc="${closetItems[i].shortdesc}" data-longdesc="${closetItems[i].longdesc}" data-size="${closetItems[i].size}"><i class="far fa-edit"></i></div>
                                <div class="editbuttons" id="cl-delete-btn" data-id="${closetItems[i].id}"><i class="far fa-trash-alt"></i></div>
                            </div>
                        </div>
                        `;
            } else {
                closetBodyHtml += `</div>`;
            }  
        } 

        
    }
    $('.closet-body').html(closetBodyHtml);
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
        <div class="closet-container">
            <div class="cl-header">` +
                `<h2>${STORE.selCloset} Closet</h2>` +
                `<h3>${msg}</h3>` +
            `</div>` +
           `<div class="cl-resultcell-new additem-class">` +
                `<div class="cl-resultbody-new">` +
                    `<form>` +
                            `<div class="additem-edit-btns">` +
                                `<div id="additem-save-btn" data-closet="${STORE.selCloset}" data-user="${STORE.authUser}"><i class="far fa-save"></i></div>` +
                                `<div id="additem-cancel-btn"><i class="fas fa-undo"></i></div>` +
                            `</div>` +
                            `<div class="itemrow cl-whichseason">` +
                                `<div class="newitem itemlabel"><label>which season <i class="fas fa-asterisk"></i></label></div>` +
                                `<div class="newitem itembody">` +
                                    `<div class="options-container" id="js-additem-season">` +
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
                                    `<div class="options-container" id="js-additem-appareltype">` +
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
                                    `<div class="options-container" id="js-additem-color">` +
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
                                            `<label for="color-icon-selector">your choice` +
                                            `<input type="radio" name="color" value="your choice"></label>` +
                                        `</div>` + 
                                    `</div>` +
                                `</div>` +
                            `</div>` +

                            `<div class="itemrow cl-size">` +
                                `<div class="newitem itemlabel"><label>size: </label></div>` + 
                                `<div class="newitem itembody">` +
                                    `<div class="options-container" id="js-additem-size">` +
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

function renderUpdateForm(updateObjForm) {

    // change closet cell to updateable form
    const updateFormBody = 
        `<div class="cl-resultbody">` +
            `<form id='form-update-closet'>` +
                `<div class="itemrow cl-season">` +
                    `<div class="newitem itemlabel"><label>which season <i class="fas fa-asterisk"></i></label></div>` +
                    `<div class="newitem itembody">` +
                        `<div class="options-container">` +
                            `<select class="updatefields" id="js-updateseason" type="text" name="season">` +
                                `<option value ="${updateObjForm.season}">${updateObjForm.season}</option>` +
                                `<option value = "Always in Season">Always in Season</option>` +
                                `<option value = "Fall Basics">Fall Basics</option>` +
                                `<option value = "Winter Basics">Winter Basics</option>` +
                                `<option value = "Spring Basics">Spring Basics</option>` +
                                `<option value = "Summer Basics">Summer Basics</option>` +
                            `</select>` +
                        `</div>` +
                    `</div>` +
                `</div>` +
                `<div class="itemrow cl-appareltype">` +
                    `<div class="newitem newitemlabel">type of clothing: <i class="fas fa-asterisk"></i></div>` +
                    `<div class="item itembody">` +
                        `<select class="updatefields" id="js-updateappareltype" type="text" name="appareltype">` +
                            `<option value ="${updateObjForm.appareltype}">${updateObjForm.appareltype}</option>` +
                            `<option value = "top">top</option>` +
                            `<option value = "bottom">bottom</option>` +
                            `<option value = "dress">dress</option>` +
                            `<option value = "coat">coat</option>` +
                            `<option value = "shoes">shoes</option>` +
                        `</select>` +
                    `</div>` +
                `</div>` +
                `<div class="itemrow cl-color">` +
                    `<div class="newitem itemlabel">color: </div>` +
                    `<div class="newitem itembody">` +
                        `<select class="updatefields" id="js-updatecolor" type="text" name="color" value="${updateObjForm.color}">` +
                            `<option value = "${updateObjForm.color}">${updateObjForm.color}</option>` +
                            `<option value = "black">black</option>` +
                            `<option value = "white">white</option>` +
                            `<option value = "neutral">neutral</option>` +
                            `<option value = "your choice">your choice</option>` +
                            `<option value = "n/a">n/a</option>` +
                        `</select>` +
                    `</div>` +
                `</div>` +
                `<div class="itemrow cl-shortdesc">` +
                    `<div class="newitem itemlabel">short description: <i class="fas fa-asterisk"></i></div>` +
                    `<div class="newitem itembody">` +
                        `<input class="updatefields" id="js-updateshortdesc" type="text" name="shortdesc" value="${updateObjForm.shortdesc}" />` +
                    `</div>` +
                `</div>` +
                `<div class="itemrow cl-longdesc">` +
                    `<div class="newitem itemlabel">long description: </div>` +
                    `<div class="newitem itembody">` +
                        `<textarea class="updatefields" id="js-updatelongdesc" type="text" name="longdesc" value="${updateObjForm.longdesc}" rows="3" cols="20">${updateObjForm.longdesc}</textarea>` +
                    `</div>` +
                `</div>` +
                `<div class="itemrow cl-size">` +
                    `<div class="newitem itemlabel">size: </div>` +
                    `<div class="newitem itembody">` +
                        `<select class="updatefields" id="js-updatesize" type="text" name="size">` +
                            `<option value = "${updateObjForm.size}">${updateObjForm.size}</option>` +
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
            `<div class="editbuttons" id="cl-savebtn" data-id="${updateObjForm.id}" data-season="${updateObjForm.season}" data-appareltype="${updateObjForm.appareltype}" data-color="${updateObjForm.color}" data-shortdesc="${updateObjForm.shortdesc}" data-longdesc="${updateObjForm.longdesc}" data-size="${updateObjForm.size}"><i class="far fa-save"></i>` +
            `</div>` +
            `<div class="editbuttons" id="cl-cancelbtn"><i class="fas fa-undo"></i></div>` +
        `</div>`; 

    $(`.${updateObjForm.id}class`).html(updateFormBody);
    $(`.${updateObjForm.id}class`).css("border", "5px solid #C98573");
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
                    <div class="subhead">here is your subhead!!!</div>
                </div>`);
    
    $('.closet-container').append(`
                <div class="analysis-header">
                    <p>Here is your analysis</p>
                </div>
                <div class="analysis-body">
                    <p>the ideal closet has ${STORE.idealClosetLength} items in its closet.</p>
                    <p>Your closet has ${STORE.myClosetLength} items in its closet.</p>
                </div>`);
}


// ** render errors

function renderLoginError() {
    //reset error messages
    $('error-msg').remove();
    $('#btn-signin').before('<p class="error-msg" id="error-msg" aria-live="assertive"><i class="fas fa-exclamation-circle"></i> Incorrect username and/or password</p>');
    $('#GET-username').addClass('error-field').attr('aria-invalid', false);
    $('#GET-password').addClass('error-field').attr('aria-invalid', false);
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
