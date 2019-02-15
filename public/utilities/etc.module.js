window.ETC_MODULE = {
    organizeData
};

function organizeData(data) {

    // if the user has selected the ANALYZE option, collect the data and send to the renderAnalysis
    if (STORE.functionChoice === 'analysis') {
     // First, collect data length for the selected closet
            if (STORE.selCloset ==='ideal') {
                STORE.closetLength.ideal = data.length;
                //console.log(`Total ${STORE.selCloset} count is ${STORE.closetLength.ideal}`);
                for (let i = 0; i < STORE.seasonAry.length; i++) {
                    getSeasonCount(STORE.seasonAry[i], data);
                }
                for (let i=0; i < STORE.appareltypeAry.length; i++) {
                    getApparelTypeCount(STORE.appareltypeAry[i], data);
                }
            } else if (STORE.selCloset === 'my') {
                STORE.closetLength.my = data.length;
                //console.log(`Total ${STORE.selCloset} count is ${STORE.closetLength.ideal}`);
                for (let i = 0; i < STORE.seasonAry.length; i++) {
                    getSeasonCount(STORE.seasonAry[i], data);
                }
                for (let i=0; i < STORE.appareltypeAry.length; i++) {
                    getApparelTypeCount(STORE.appareltypeAry[i], data);
                }
            }
            
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
        renderClosetHeader(data);
        for (let i=0; i < STORE.seasonAry.length; i++) {
            let season = STORE.seasonAry[i];
            let result = [];
            for(let i = 0; i < data.length; i++) {
                if (data[i].season === season) {
                    result.push(data[i]);
                } 
            }
            renderClosetBody(season,result);
        }
    }
}

function getSeasonCount(season, items) {
    //console.log('season is ', season);
    let result = [];
    for(let i = 0; i < items.length; i++) {
        if (items[i].season === season) {
            result.push(items[i]);
        }
    }
    if (STORE.selCloset === 'ideal') {
      //console.log( 'result set is for ideal closet/seasons is  ', result);
      switch(season) {
        case "Spring Basics":
            if (result.length > 0) STORE.idealSeasonLength['Spring Basics'] = result.length;
            break;
        case 'Summer Basics':
        if (result.length > 0) STORE.idealSeasonLength['Summer Basics'] = result.length;
            break;
        case 'Fall Basics':
        if (result.length > 0) STORE.idealSeasonLength['Fall Basics'] = result.length;
            break;
        case 'Winter Basics':
        if (result.length > 0) STORE.idealSeasonLength['Winter Basics'] = result.length;
            break;
        case 'Always in Season':
        if (result.length > 0) STORE.idealSeasonLength['Always in Season'] = result.length;
            break;
        default:
            console.log('there is a problem with this switch statement');
        
      }
    } else {
        //console.log( 'result set for my closet/seasons is ', result);
        switch(season) {
          case "Spring Basics":
              if (result.length > 0) STORE.mySeasonLength['Spring Basics'] = result.length;
              break;
          case 'Summer Basics':
          if (result.length > 0) STORE.mySeasonLength['Summer Basics'] = result.length;
              break;
          case 'Fall Basics':
          if (result.length > 0) STORE.mySeasonLength['Fall Basics'] = result.length;
              break;
          case 'Winter Basics':
          if (result.length > 0) STORE.mySeasonLength['Winter Basics'] = result.length;
              break;
          case 'Always in Season':
          if (result.length > 0) STORE.mySeasonLength['Always in Season'] = result.length;
              break;
          default:
              console.log('there is a problem with this switch statement');
          
        }
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
