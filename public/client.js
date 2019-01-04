// this is mock data, but when we create our API
// we'll have it return data that looks like this
var MOCK_MYCLOSET_ITEMS = {
	"myclosetItems": [
        {
            "id": "11111",
            "season": "YR - Year Round",
            "appareltype": "pants",
            "size": "6",
            "color": "dark blue",
            "shortdesc": "dark wash denim",
            "longdesc": "trouser or bootcut",
            "adddate": 1470009976609
        },
        {
            "id": "22222",
            "season": "YR - Year Round",
            "appareltype": "pants",
            "size": "6",
            "color": "dark blue",
            "shortdesc": "dark wash denim",
            "longdesc": "skinny or boyfriend",
            "adddate": 1470009976609
        },
        {
            "id": "33333",
            "season": "S/S - Spring/Summer",
            "appareltype": "pants",
            "size": "6",
            "color": "dark blue",
            "shortdesc": "dress pant",
            "longdesc": "neutral ankle pant",
            "adddate": 1470009976609
        },
        {
            "id": "444444",
            "season": "YR - Year Round",
            "appareltype": "pants",
            "size": "6",
            "color": "pink",
            "shortdesc": "colored pants/jeans",
            "longdesc": "color of your choice",
            "adddate": 1470009976609
        },
        {
            "id": "55555",
            "season": "F/W - Fall/Winter",
            "appareltype": "pants",
            "size": "6",
            "color": "dark blue",
            "shortdesc": "dress pant",
            "longdesc": "neutral wide leg trouser",
            "adddate": 1470009976609
        },
        {
            "id": "66666",
            "season": "YR - Year Round",
            "appareltype": "pants",
            "size": "6",
            "color": "black",
            "shortdesc": "white or black denim",
            "longdesc": "",
            "adddate": 1470009976609
        }
    ]
};

var MOCK_IDEALCLOSET_ITEMS = {
	"idealclosetItems": [
        {
            "id": "01111",
            "season": "YR - Year Round",
            "appareltype": "pants",
            "shortdesc": "dark wash denim",
            "longdesc": "skinny or boyfriend",
            "adddate": 1470009976609
        },
        {
            "id": "02222",
            "season": "YR - Year Round",
            "appareltype": "pants",
            "shortdesc": "dark wash denim",
            "longdesc": "trouser or bootcut",
            "adddate": 1470009976609
        },
        {
            "id": "03333",
            "season": "YR - Year Round",
            "appareltype": "pants",
            "shortdesc": "colored pants/jeans",
            "longdesc": "your choice of color",
            "adddate": 1470009976609
        },
        {
            "id": "044444",
            "season": "YR - Year Round",
            "appareltype": "pants",
            "shortdesc": "colored pants/jeans",
            "longdesc": "your choice of color",
            "adddate": 1470009976609
        },
        {
            "id": "05555",
            "season": "YR - Year Round",
            "appareltype": "pants",
            "shortdesc": "white or black denim",
            "longdesc": "",
            "adddate": 1470009976609
        },
        {
            "id": "06666",
            "season": "S/S - Spring/Summer",
            "appareltype": "pants",
            "shortdesc": "dress pant",
            "longdesc": "neutral ankle pant",
            "adddate": 1470009976609
        },
        {
            "id": "06666",
            "season": "F/W - Fall Winter",
            "appareltype": "pants",
            "shortdesc": "dress pant",
            "longdesc": "neutral wide leg trouser",
            "adddate": 1470009976609
        },
    ]
};



// this function's name and argument can stay the
// same after we have a live API, but its internal
// implementation will change. Instead of using a
// timeout function that returns mock data, it will
// use jQuery's AJAX functionality to make a call
// to the server and then run the callbackFn

//  Retrieve and disply details of myCloset

function getRecentMyclosetItems(callbackFn) {
    // we use a `setTimeout` to make this asynchronous
    // as it would be with a real AJAX call.
	setTimeout(function(){ callbackFn(MOCK_MYCLOSET_ITEMS)}, 1);
}

// this function stays the same when we connect
// to real API later

function displayMyclosetItems(data) {
    $('.mycloset').append(
        '<br><h3>My Closet Items</h2><br>' +
        '<hr><br>');
    
    for (index in data.myclosetItems) {
        
	   $('.mycloset').append(
        '<p>season: ' + data.myclosetItems[index].season + '</p>' +
        '<p>type of clothing: ' + data.myclosetItems[index].appareltype + '</p>' +
        '<p>short description :' + data.myclosetItems[index].shortdesc + '</p>' + 
        '<p>details :' + data.myclosetItems[index].longdesc + '</p>' + 
        '<br>');
    }
}


function getAndDisplayMyclosetItems() {
	getRecentMyclosetItems(displayMyclosetItems);
}



// Retrieve and display details of idealCloset
function getRecentIdealclosetItems(callbackFn) {
    // we use a `setTimeout` to make this asynchronous
    // as it would be with a real AJAX call.
	setTimeout(function(){ callbackFn(MOCK_IDEALCLOSET_ITEMS)}, 1);
}

// this function stays the same when we connect
// to real API later

function displayIdealclosetItems(data) {
    $('.idealcloset').append(
        '<br><h3>Ideal Wardrobe Items</h2><br>' +
        '<hr><br>');
    
    for (index in data.idealclosetItems) {
        
	   $('.idealcloset').append(
        '<p>season: ' + data.idealclosetItems[index].season + '</p>' +
        '<p>type of clothing: ' + data.idealclosetItems[index].appareltype + '</p>' +
        '<p>short description :' + data.idealclosetItems[index].shortdesc + '</p>' + 
        '<p>details :' + data.idealclosetItems[index].longdesc + '</p>' + 
        '<br>');
    }
}

// this function can stay the same even when we
// are connecting to real API
function getAndDisplayIdealclosetItems() {
	getRecentIdealclosetItems(displayIdealclosetItems);
}

//  on page load do this
$(function() {
    getAndDisplayMyclosetItems();
    getAndDisplayIdealclosetItems();
})