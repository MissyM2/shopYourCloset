window.ETC_MODULE = {
    organizeData
};

function organizeData(data) {

     // First, collect data length for the selected closet
     switch(STORE.selCloset) {
         case 'ideal':
            STORE.closetLength.ideal = data.length;
            for (let i = 0; i < STORE.seasonAry.length; i++) {
                getSeasonCount(STORE.seasonAry[i], data);
            }
            for (let i=0; i < STORE.appareltypeAry.length; i++) {
                getApparelTypeCount(STORE.appareltypeAry[i], data);
            }
            break;
        case 'my':
            STORE.closetLength.my = data.length;
            for (let i = 0; i < STORE.seasonAry.length; i++) {
                getSeasonCount(STORE.seasonAry[i], data);
            }
            for (let i=0; i < STORE.appareltypeAry.length; i++) {
                getApparelTypeCount(STORE.appareltypeAry[i], data);
            }
            break;
        case 'giveaway':
            STORE.closetLength.giveaway = data.length;
            for (let i = 0; i < STORE.seasonAry.length; i++) {
                getSeasonCount(STORE.seasonAry[i], data);
            }
            for (let i=0; i < STORE.appareltypeAry.length; i++) {
                getApparelTypeCount(STORE.appareltypeAry[i], data);
            }
            break;
        case 'donation':
            STORE.closetLength.donation = data.length;
            for (let i = 0; i < STORE.seasonAry.length; i++) {
                getSeasonCount(STORE.seasonAry[i], data);
            }
            for (let i=0; i < STORE.appareltypeAry.length; i++) {
                getApparelTypeCount(STORE.appareltypeAry[i], data);
            }
            break;
        default:
            console.log('there is an issue:  etc. module case statemtn');

     }
    // if the user has selected the ANALYZE option, render the menu and call renderAnalysis
    if (STORE.functionChoice === 'analysis') { 
            RENDER.renderNavMenu();
            RENDER.renderAnalysis();
    
    // for all other options selected (which are closets), append the proper header and render the closet 
    } else if (STORE.functionChoice === 'closet') {
        const len = 0;;
        switch(STORE.selCloset) {
            case 'my':
                STORE.closetLength.my = data.length;
                break;
            case 'ideal':
                STORE.closetLength.ideal = data.length;
                break;
            case 'giveaway':
                STORE.closetLength.giveaway = data.length;
                break;
            case 'donation':
                STORE.closetLength.donation = data.length;
        }


        $('.closet-container').html('');
        $('.options-container').html('');
        $('.closet-container').append(`<div class="closet-header"></div>`);
        $('.closet-container').append(`<div class="closet-body"><div id="always-in-season"></div><div id="other-seasons"></div></div>`);
       

        let result = [];
        RENDER.renderClosetHeader(data);
        for (let i=0; i < STORE.seasonAry.length; i++) {
            let season = STORE.seasonAry[i];
            for(let i = 0; i < data.length; i++) {
                if (data[i].season === season) {
                    result.push(data[i]);
                } 
            } 
        }
        RENDER.renderSeasonHeaders();
        RENDER.renderClosetBody(result);
        
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
            if (result.length > 0) seasonCountCollector['Spring Basics'] = result.length;
            break;
        case 'Summer Basics':
        if (result.length > 0) seasonCountCollector['Summer Basics'] = result.length;
            break;
        case 'Fall Basics':
        if (result.length > 0) seasonCountCollector['Fall Basics'] = result.length;
            break;
        case 'Winter Basics':
        if (result.length > 0) seasonCountCollector['Winter Basics'] = result.length;
            break;
        case 'Always in Season':
        if (result.length > 0) seasonCountCollector['Always in Season'] = result.length;
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
