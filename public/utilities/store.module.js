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
        share:0
    },
    closetAry: ['my', 'ideal', 'donation', 'share'],
    seasonAry:['Always in Season','Spring Basics', 'Summer Basics', 'Fall Basics', 'Winter Basics'],
    appareltypeAry: ['top', 'bottom', 'dress', 'coat', 'shoes'],
    sizeAry: ['x-small','small', 'medium', 'large', 'x-large','4','4.5','5','5.5','6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11','12','14'],
    colorAry: ['black','white', 'neutral', 'choice', 'n/a','denim','multi','brown', 'gray','blue', 'yellow'],

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
    shareSeasonLength: {
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

