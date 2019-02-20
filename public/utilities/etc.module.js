window.ETC_MODULE = {
    organizeData,
    validateForm
};

function organizeData(data) {

     // First, collect data length for the selected closet
     console.log(' i made it to organize data ' + STORE.selCloset);
     console.log('function choice is ' + STORE.functionChoice);

     if (STORE.functionChoice === 'closet') {
            switch(STORE.selCloset) {
                case 'ideal':
                    STORE.closetLength.ideal = data.length;
                    for (let i = 0; i < STORE.seasonAry.length; i++) {
                        getSeasonCount(STORE.seasonAry[i], data);
                    }
                    for (let i=0; i < STORE.appareltypeAry.length; i++) {
                        getApparelTypeCount(STORE.appareltypeAry[i], data);
                    }
                    renderCloset(data);
                    break;
                case 'my':
                    STORE.closetLength.my = data.length;
                    for (let i = 0; i < STORE.seasonAry.length; i++) {
                        getSeasonCount(STORE.seasonAry[i], data);
                    }
                    for (let i=0; i < STORE.appareltypeAry.length; i++) {
                        getApparelTypeCount(STORE.appareltypeAry[i], data);
                    }
                    renderCloset(data);
                    break;
                case 'giveaway':
                    STORE.closetLength.giveaway = data.length;
                    for (let i = 0; i < STORE.seasonAry.length; i++) {
                        getSeasonCount(STORE.seasonAry[i], data);
                    }
                    for (let i=0; i < STORE.appareltypeAry.length; i++) {
                        getApparelTypeCount(STORE.appareltypeAry[i], data);
                    }
                    renderCloset(data);
                    break;
                case 'donation':
                    STORE.closetLength.donation = data.length;
                    for (let i = 0; i < STORE.seasonAry.length; i++) {
                        getSeasonCount(STORE.seasonAry[i], data);
                    }
                    for (let i=0; i < STORE.appareltypeAry.length; i++) {
                        getApparelTypeCount(STORE.appareltypeAry[i], data);
                    }
                    renderCloset(data);
                    break;
                default:
                    console.log('there is an issue:  etc. module case statemtn');
                    break;
            }
        } else {
            console.log('functin choice is ' + STORE.functionChoice + ' closet choice is ' + STORE.selCloset);
            console.log(data);
            STORE.closetLength.my = data.length;
            for (let i = 0; i < STORE.seasonAry.length; i++) {
                getSeasonCount(STORE.seasonAry[i], data);
            }
            for (let i=0; i < STORE.appareltypeAry.length; i++) {
                getApparelTypeCount(STORE.appareltypeAry[i], data);
            }
            STORE.closetLength.ideal = data.length;
            for (let i = 0; i < STORE.seasonAry.length; i++) {
                getSeasonCount(STORE.seasonAry[i], data);
            }
            for (let i=0; i < STORE.appareltypeAry.length; i++) {
                getApparelTypeCount(STORE.appareltypeAry[i], data);
            }

            renderNavMenu();
            //RENDER.renderAnalysis();
            console.log('this is the analyze closet.  Not ready to render findings, yet.');
        }
}

function getSeasonCount(season, items) {
    let result = [];
    let seasonCountCollector = STORE[`${STORE.selCloset}SeasonLength`];
    
    for(let i = 0; i < items.length; i++) {
        if (items[i].season === season) {
            result.push(items[i]);
        }
    } 
      switch(season) {
        case "Spring Basics":
            if (result.length > 0) {
                seasonCountCollector['Spring Basics'] = result.length;
            } else {
                seasonCountCollector['Spring Basics'] = result.length;
            }
            break;
        case 'Summer Basics':
        if (result.length > 0) {
            seasonCountCollector['Summer Basics'] = result.length;
        } else {
            seasonCountCollector['Summer Basics'] = 0;
        }
            break;
        case 'Fall Basics':
        if (result.length > 0) {
            seasonCountCollector['Fall Basics'] = result.length;
        } else {
            seasonCountCollector['Fall Basics'] = 0;
        }
            break;
        case 'Winter Basics':
        if (result.length > 0) {
            seasonCountCollector['Winter Basics'] = result.length;
        } else {
            seasonCountCollector['Winter Basics'] = 0;
        }
            break;
        case 'Always in Season':
            if (result.length > 0) {
                seasonCountCollector['Always in Season'] = result.length;
            } else {
                seasonCountCollector['Always in Season'] = 0;
            }
            break;
        default:
            console.log('there is a problem with this switch statement'); 
      }
}

function getApparelTypeCount(appareltype, items) {
    //console.log('appareltype is ', appareltype);
    let result = [];
    for(let i = 0; i < items.length; i++) {
        if (items[i].appareltype === appareltype) {
            result.push(items[i]);
        }
    }
    if (STORE.selCloset === 'ideal') {
      //console.log( 'result set is for ideal closet/appareltypes is  ', result);
      switch(appareltype) {
        case "top":
            if (result.length > 0) STORE.idealAppareltypeLength.top = result.length;
            break;
        case 'bottom':
        if (result.length > 0) STORE.idealAppareltypeLength.bottom = result.length;
            break;
        case 'dress':
        if (result.length > 0) STORE.idealAppareltypeLength.dress = result.length;
            break;
        case 'coat':
        if (result.length > 0) STORE.idealAppareltypeLength.coat = result.length;
            break;
        case 'shoes':
        if (result.length > 0) STORE.idealAppareltypeLength.shoes = result.length;
            break;
        default:
            console.log('there is a problem with this switch statement');
        
      }
    } else {
        //console.log( 'result set for my closet/appareltypes is ', result);
        switch(appareltype) {
          case "top":
              if (result.length > 0) STORE.myAppareltypeLength.top = result.length;
              break;
          case 'bottom':
          if (result.length > 0) STORE.myAppareltypeLength.bottom = result.length;
              break;
          case 'dress':
          if (result.length > 0) STORE.myAppareltypeLength.dress = result.length;
              break;
          case 'coat':
          if (result.length > 0) STORE.myAppareltypeLength.coat = result.length;
              break;
          case 'shoes':
          if (result.length > 0) STORE.myAppareltypeLength.shoes = result.length;
              break;
          default:
              console.log('there is a problem with this switch statement');
          
        }
    }

}


function validateForm(item) {
    console.log(item);

    // clear out all previous error messages
    $('#error-new-name').html('');
    $('#error-new-email').html('');
    $('#error-new-username').html('');
    $('#error-new-pass').html('');
    $('#error-confirmpass').html('');


    console.log('made it to validateForm');
    let re = /[0-9]/;
    console.log(re);
    if (item.newName.value === "") {
        $('#error-new-name').html(`<i class="fas fa-exclamation"></i>username cannot be blank.`)
        $('#new-name').focus();
        return false;

    } else if (item.newEmail.value === "") {
        $('#error-new-email').html(`<i class="fas fa-exclamation"></i>email cannot be blank.`)
        $('#new-email').focus();
        return false;
    } else if (item.newUsername.value === "" || item.newUsername.value.length < 5) {
        $('#error-new-username').html(`<i class="fas fa-exclamation"></i>username cannot be blank and must be at least 5 characters.`)
        $('#new-username').focus();
        return false;
   // } else if (checkPass.value == "" || checkPass.value.length < 5 || !re.test(checkPass)) {
    } else if (item.newPass.value === "" || item.newPass.value.length < 5) {
        $('#error-new-pass').html(`<i class="fas fa-exclamation"></i>password required with at least 5 characters and 1 number`);
        $('#new-pass').focus();
        return false;
    } else if (item.newConfirm.value === "" || item.newConfirm.value !== checkPass.value) {
        $('#error-confirmpass').html(`<i class="fas fa-exclamation"></i>confirmation password must match password.`)
        $('#new-confirm').focus();
        return false;
    } else {
        alert("You entered a valid password: ");
        return true;
    }
}
