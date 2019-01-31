//  RENDER data to screen

window.RENDER_MODULE = {
    renderRegistrationForm,
    renderLoginForm,
    renderOptionsScreen,
    renderCloset,
    renderAddItemForm,
    renderSignUpError
};

function renderRegistrationForm() {
    console.log('renderRegistrationForm fired');
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
                <div class="form-elements form-elements-button">
                    <p>Already registered?</p>
                    <button type="button" id="btn-login" class="form-input-button">Log In</button>
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
                <div class="btn-signin">
                    <button type="click" id="btn-signin">Sign In</button>
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
    $('.topnav').html(`<div class="col-4">` +
                            `<p class="nav nav-title">shopYourCloset</p>` +
                        `</div>` +
                        `<div class="col-4">` +
                            `<p class="nav nav-greeting">Welcome, ${userName}!</p>` +
                        `</div>` +
                        `<div class="col-4 col-logout">` +
                            `<p class="nav nav-logout">Logout</p>` +
                        `</div>` +
                    `</div>`);
    $('.section-options').show();
    $('.section-options').html(`
                <div class="col-4 buttons-options" id="btn-view-mycloset"><i class="fas fa-door-open"></i>
                <h5 class="closet-functions">view/add to your closet</h5></div>
                <div class="col-4 buttons-options" id="btn-view-idealcloset"><i class="fas fa-tshirt"></i>
                <h5 class="closet-functions">view/add to the ideal closet</h5></div>
                <div class="col-4 buttons-options" id="btn-view-recommendations"><i class="fas fa-atom"></i>
                <h5 class="closet-functions">Analyze your wardrobe</h5><div>
     `);
    
}

function renderCloset(closetItems) {
    console.log('renderCloset fired');
    $('.col-closet').html(`
        <br>
        <div class="cl-header"><h3>${closetChoice} Closet Items</h2>
            <div class="cl-itemcount"></div>
            <div class="nav cl-editbuttons ${closetChoice}cl-addbutton">add new item</div>
            <hr>
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

    for (let i=0; i < closetItems.items.length; i++) {
        itemCount +=1;

        id1 = closetItems.items[i]._id;
        season1 = closetItems.items[i].season;
        appareltype1 = closetItems.items[i].appareltype;
        color1 = closetItems.items[i].color;
        shortdesc1 = closetItems.items[i].shortdesc;
        longdesc1 = closetItems.items[i].longdesc;
        size1 = closetItems.items[i].size;



        closetHtml += `<div class="cl-resultcell ${id1}class">` +
                `<div class="cl-editbutton-row">` +
                    `<div class="nav cl-editbuttons cl-updatebtn1" data-id="${id1}" data-season="${season1}" data-appareltype="${appareltype1}" data-color="${color1}" data-shortdesc="${shortdesc1}" data-longdesc="${longdesc1}" data-size="${size1}">update</div>` +
                    `<div class="nav cl-editbuttons cl-deletebtn" data-id="${id1}">delete</div>` +
                `</div>` +
                `<div class="cl-resultbody">` +
                        `<div class="itemrow cl-season"><div class="item itemlabel"><p>season: </p></div><div class="item itembody"><p>${season1}</p></div></div>` +
                        `<div class="itemrow cl-appareltype"><div class="item itemlabel"><p>type: </p></div><div class="item itembody"><p>${appareltype1}</p></div></div>` +
                        `<div class="itemrow cl-color"><div class="item itemlabel"><p>color: </p></div><div class="item itembody"><p>${color1}</p></div></div>` +
                        `<div class="itemrow cl-shortdesc"><div class="item itemlabel"><p>short: </p></div><div class="item itembody"><p>${shortdesc1}</p></div></div>` +
                        `<div class="itemrow cl-longdesc"><div class="item itemlabel"><p>long: </p></div><div class="item itembody"><p>${longdesc1}</p></div></div>` +
                        `<div class="itemrow cl-size"><div class="item itemlabel"><p>size: </p></div><div class="item itembody"><p>${size1}</p></div></div>` +
                `</div>` +
                `<br>` +
            `</div>`; 
         `<br>`;
    };

    closetHtml+='</div>';
    $('.section-options').html(`
        <div class="col-4 buttons-options-mini" id="btn-view-mycloset">
            <p class="closet-functions">Your Closet</p></div>
        <div class="col-4 buttons-options-mini" id="btn-view-idealcloset">
            <p class="closet-functions">Ideal Closet</p></div>
        <div class="col-4 buttons-options-mini" id="btn-view-recommendations">
            <p class="closet-functions">Analyze</p><div>`);
    $('.cl-itemcount').append(`There are ${itemCount} items in your closet.`);
    $('.col-closet').append(closetHtml);

}
function renderAddItemForm() {
    // change closet cell to updateable form
    const updateFormBody = `<div class="cl-header"><h5>Add new item to ${closetChoice} Closet</h5></div>` +
        `<div class="cl-resultcell additem-class"><div class="cl-resultbody"><form action="/action_page.php">` +
        `<div class="itemrow cl-season"><div class="item itemlabel"><p>season: </p></div><div class="item itembody"><input class="js-additems js-additem-season" type="text" name="season"></div></div>` +
        `<div class="itemrow cl-appareltype"><div class="item itemlabel"><p>type of clothing: </p></div><div class="item itembody"><input id="js-additem-appareltype" type="text" name="appareltype"></div></div>` +
        `<div class="itemrow cl-color"><div class="item itemlabel"><p>color: </p></div><div class="item itembody"><input id="js-additem-color" type="text" name="color"></div></div>` +
        `<div class="itemrow cl-shortdesc"><div class="item itemlabel"><p>short description: </p></div><div class="item itembody"><input id="js-additem-shortdesc" type="text" name="shortdesc"></div></div>` +
        `<div class="itemrow cl-longdesc"><div class="item itemlabel"><p>long description: </p></div><div class="item itembody"><input id="js-additem-longdesc" type="text" name="longdesc"></div></div>` +
        `<div class="itemrow cl-size"><div class="item itemlabel"><p>size: </p></div><div class="item itembody"><input id="js-additem-size" type="text" name="size"></div></div>`;

       

    const updateEditButtons = `<div class="cl-editbuttons">` +
    `<button class="${closetChoice}cl-addbtn2">add</button>` +
    `<button class="cl-cancel-additem-btn">cancel</button>` +
    `</div></div></form>`;
    $(`.col-closet`).html(updateFormBody);
    $(`.col-closet`).append(updateEditButtons);
}

// ** render errors

function renderSignUpError(errLocation, errMessage) {
    console.log('made it to signup error');
    //reset previous errors
    $('.new-password').removeClass('error-field');
    $('.confirm-password').removeClass('error-field');
    $('.error-msg').remove();
    if (errLocation === 'username'){
        $('.new-username').addClass('error-field').attr('aria-invalid', false);
    } else {
        $('.new-password').val('').addClass('error-field').attr('aria-invalid', false);
        $('.confirm-password').val('').addClass('error-field').attr('aria-invalid', false);
    };
    $('.btn-register').before(`<p class="error-msg" aria-live="assertive">
    <i class="fas fa-exclamation-circle"></i> ${errLocation}: ${errMessage}</p>`);
    }

     //$('#msgs-reg').empty().append(`<p class="alert">Shouldn't I get this info from the backend?there was an validation error</p>`)
