//  RENDER data to screen

window.RENDER_MODULE = {
    renderRegistrationForm,
    renderLoginForm,
    renderOptionsScreen,
    renderCloset,
    renderAddItemForm,
    renderNavOne,
    renderNavTwo,
    renderNavAdmin,
    renderUpdateForm,
    renderLoginError,
    renderSignUpError,
};

function renderRegistrationForm() {
    $('.reg-login').html(`
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
    `);

}

function renderLoginForm() {
    console.log('renderLoginForm fired');
    $('.reg-login').html(`
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
                    <p class="demo"><p>For demo:  </p><p>username: chuckles </p><p>password: chuck</p>
            </div>
        </form>
    `);
}



function renderOptionsScreen(userName) {
    $('#div-login').hide();
    $('.section-login').hide();
    $('.topnav').html(`<div class="col-2"></div>` +
                      `<div class="col-8 header-container">
                            <div class="header-items" id="header-title">` +
                                `<div id="logo-img">` +
                                    `<img id="hanger-img" src="images/clothes-hanger.png" />` +
                                `</div>` +
                                `<div id="logo-verbage">` +
                                    `<p>shopYourCloset</p>` +
                                `</div>` +
                            `</div>` +
                      `</div>` + 
                      `<div class="col-2"></div>`);

    $('.section-options').show();
    if (userName == 'Admin ID') {
        $('.section-options').html(`
                <div class="col-2"></div>
                <div class="col-8 options-btns" id="ideal-closet-btn"><i class="fas fa-tshirt"></i>
                    <h4 class="closet-functions">view/add to the ideal closet</h4>
                </div>
                <div class="col-2"></div>
     `);

    } else {
    $('.section-options').html(`
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
     `);
    };
    
}

function renderNavOne(userName) {
    $('.nav-one').show().html(
        `<div id="header-greeting">` +
            `<p>Welcome, ${userName}!</p>` +
        `</div>` +
        `<div id="header-logout">` +
            `<p>Logout</p>` +
        `</div>`);
}

function renderNavTwo(selCloset) {
    console.log(selCloset);
    
    $('#div-login').hide();
    $('.section-login').hide();
    $('.nav-two').show().html(`
                <div class="options-btns-min" id="ideal-closet-btn-min">
                    ideal
                </div>
                <div class="options-btns-min" id="my-closet-btn-min">
                    yours
                </div>
                <div class="options-btns-min" id="giveaway-closet-btn-min">
                    giveaway
                </div>
                <div class="options-btns-min" id="donation-closet-btn-min">
                    donation
                </div>
                <div class="options-btns-min" id="analyze-closet-btn-min">
                    analyze
                <div>
     `);

     switch(selCloset) {
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

function renderNavAdmin(selCloset) {
    $('#div-login').hide();
    $('.section-login').hide();
    $('.admin-nav').show().html(`
                <div class="options-btns-min" id="ideal-closet-btn-min">
                    ideal
                </div>
                <div class="options-btns-min" id="giveaway-closet-btn-min">
                    giveaway
                </div>
                <div class="options-btns-min" id="donation-closet-btn-min">
                    donation
                </div>
     `).css('border-bottom', '1px solid black');
}

function renderCloset(closetItems, closetChoice, loggedinUser) {
    console.log(closetChoice);
        $('.section-options').hide();
        $('.closet-display').html(`
            <br>
            <div class="cl-header">
                <div class="item" id="closet-title"><h2>${closetChoice} Closet</h2></div>
                <div class="item" id="cl-itemcount"></div>
                <div class="item" id="cl-addbutton" data-closet="${closetChoice}" data-user="${loggedinUser}"><i class="fas fa-plus"></i></div>
            </div>`);

        let closetHtml = '';
        let id1 = '';
        let appareltype1 = '';
        let color1 = '';
        let size1 = '';
        let season1 = '';
        let shortdesc1 = '';
        let longdesc1 = '';
        let itemCount = 0;

        closetHtml= '<div id="cl-body">';
        

        for (let i=0; i < closetItems.length; i++) {
            itemCount +=1;

            id1 = closetItems[i].id;
            season1 = closetItems[i].season;
            appareltype1 = closetItems[i].appareltype;
            color1 = closetItems[i].color;
            shortdesc1 = closetItems[i].shortdesc;
            longdesc1 = closetItems[i].longdesc;
            size1 = closetItems[i].size;



            closetHtml += `<div class="cl-resultcell ${id1}class">` +
                    `<div class="cl-resultbody">` +
                            `<div class="cl-items" id="cl-season"><div class="item itemlabel"><label>season: </label></div><div class="item itembody"><p>${season1}</p></div></div>` +
                            `<div class="cl-items-short">` +
                                `<div class="cl-items cl-items-sh" id="cl-appareltype"><div class="item itembody"><p>${appareltype1}</p></div></div>` +
                                `<div class="cl-items cl-items-sh" id="cl-color"><div class="item itembody"><p>${color1}</p></div></div>` +
                                `<div class="cl-items cl-items-sh" id="cl-size"><div class="item itembody"><p>${size1}</p></div></div>` +
                            `</div>` +
                            `<div class="cl-items" id="cl-shortdesc"><div class="item itembody"><p>${shortdesc1}</p></div></div>` +
                            `<div class="cl-items" id="cl-longdesc"><div class="item itembody"><p>${longdesc1}</p></div></div>` +
                    `</div>` +
                    `<div class="update-edit-btns">` +
                        `<div class="editbuttons" id="clupdate-btn" data-id="${id1}" data-season="${season1}" data-appareltype="${appareltype1}" data-color="${color1}" data-shortdesc="${shortdesc1}" data-longdesc="${longdesc1}" data-size="${size1}"><i class="far fa-edit"></i></div>` +
                        `<div class="editbuttons" id="cl-deletebtn" data-id="${id1}" data-closet="${closetChoice}"><i class="far fa-trash-alt"></i></div>` +
                    `</div>` +
                    `<br>` +
                `</div>`; 
            `<br>`;
        };

        closetHtml+='</div>';
        $('#cl-itemcount').append(`<h3>There are ${itemCount} items in the closet.</h3>`);
        $('.closet-display').append(closetHtml);

}

function renderFake(closetChoice, User) {
    $('.section-options').hide();
    $('.closet-display').html(`<div>THIS IS A PLACEHOLDER PAGE</div>`);
}

function renderAddItemForm(msg, closetChoice, loggedinUser) {
    $('.section-options').hide();
    const updateFormBody = `<div class="cl-header"><h4>${msg}Add new item to ${closetChoice} Closet</h4></div>` +
        `<div class="cl-resultcell-new additem-class"><div class="cl-resultbody-new"><form >` +
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
        `<div class="editbuttons">` +
            `<div id="cl-savebtn" data-closet="${closetChoice}" data="${loggedinUser}"><i class="far fa-save"></i></div>` +
            `<div id="cl-cancelbtn"><i class="fas fa-undo"></i></div>` +
        `</div>` +
        `</form>`;
        
    $(`.closet-display`).html(updateFormBody);
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
            `</form>`
        `</div> ` +
        `<div class="update-edit-btns">` +
            `<div class="editbuttons" id="cl-savebtn" data-id="${updateObjForm.id}" data-season="${updateObjForm.season}" data-appareltype="${updateObjForm.appareltype}" data-color="${updateObjForm.color}" data-shortdesc="${updateObjForm.shortdesc}" data-longdesc="${updateObjForm.longdesc}" data-size="${updateObjForm.size}"><i class="far fa-save"></i>` +
            `</div>` +
            `<div class="editbuttons" id="cl-cancelbtn"><i class="fas fa-undo"></i></div>` +
        `</div>`; 

    $(`.${updateObjForm.id}class`).html(updateFormBody);
    $(`.${updateObjForm.id}class`).css("border", "5px solid #C98573");
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
    console.log('made it to signup error');
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
