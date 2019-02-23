let STORE = {
    functionChoice:'',
    selCloset:'',
    authUser:'',
    authUserName:'',
    subFeature:'',
    failedFetch:false,
    closetLength: {
        ideal:0,
        my:0,
        donation:0,
        giveaway:0
    },
    closetAry: ['my', 'ideal', 'donation', 'giveaway'],
    seasonAry:['Always in Season','Spring Basics', 'Summer Basics', 'Fall Basics', 'Winter Basics'],
    appareltypeAry: ['top', 'bottom', 'dress', 'coat', 'shoes'],
    idealSeasonLength: {
        "Always in Season":0,
        "Spring Basics":0,
        "Summer Basics":0,
        "Fall Basics":0,
        "Winter Basics":0
    },
    mySeasonLength: {
        "Always in Season":0,
        "Spring Basics":0,
        "Summer Basics":0,
        "Fall Basics":0,
        "Winter Basics":0
    },
    giveawaySeasonLength: {
        "Always in Season":0,
        "Spring Basics":0,
        "Summer Basics":0,
        "Fall Basics":0,
        "Winter Basics":0
    },
    donationSeasonLength: {
        "Always in Season":0,
        "Spring Basics":0,
        "Summer Basics":0,
        "Fall Basics":0,
        "Winter Basics":0
    },
    idealAppareltypeLength: {
        top:0,
        bottom:0,
        dress:0,
        coat: 0,
        shoes:0
    },
    myAppareltypeLength: {
        top:0,
        bottom:0,
        dress:0,
        coat: 0,
        shoes:0
    },
    currentEditItem: {
        id:'',
        season:'',
        appareltype:'',
        color:'',
        shortdesc:'',
        longdesc:'',
        size:''
    }

}

