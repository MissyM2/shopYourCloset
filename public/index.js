// this is mock data, but when we create our API
// we'll have it return data that looks like this


// create fetches..  fetch sends back an array..  loop through array and put it on the screen

//var moment = require('moment')
//pm.globals.set("timestamp", moment().format("MM/DD/YYYY"))

// this function's name and argument can stay the
// same after we have a live API, but its internal
// implementation will change. Instead of using a
// timeout function that returns mock data, it will
// use jQuery's AJAX functionality to make a call
// to the server and then run the callbackFn

//  GET fetch request for My Closet
const getMycloset = function getMyclosetData() {
    fetch('/mycloset', {
        method: 'get'
        })
        .then(function(response) {
        return response.json();
        })
        .then(data =>{
        //console.log(data);
        displayMycloset(data);
        })
        .catch(function(err) {
        // Error :(
        });
}

// POST fetch request for My Closet
const postMycloset = function postMyClosetData() {

    fetch('/mycloset', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "season": "Always in Season",
            "appareltype": "top",
            "color": "green",
            "shortdesc": "short-sleeved t-shirt"
            })
        })
        .then(res=>res.json())
        .then(res => console.log(res)
    );
}

const updateMycloset = function updateMyClosetData() {

    fetch('/mycloset', {
        method: 'put',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": "5c33c3465e0f5d71eee9dba5",
            "color": "purple"
            })
        })
        .then(res=>res.json())
        .then(res => console.log(res)
    );
}

function deleteMyClosetItemData(myclosetitemId) {
    console.log('/mycloset/' + myclosetitemId);
    fetch('/mycloset/' + myclosetitemId , {
        method: 'delete',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        };
        throw new Error(response.text);
    })
    .then(responseJson => {
        console.log('Success:', JSON.stringify(responseJson));
        $('.mycloset').empty();
        getMycloset();
    })
    .catch(error => {
        console.error('Error: ', error)
    });
}

/*
function getRecentMyclosetItems(callbackFn) {
    // we use a `setTimeout` to make this asynchronous
    // as it would be with a real AJAX call.
	setTimeout(function(){ callbackFn(MOCK_MYCLOSET_ITEMS)}, 1);
}
*/
// this function stays the same when we connect
// to real API later

const displayMycloset = function displayMyclosetData(data) {
    $('.mycloset').append(
        `<div class="mycl-title"><br><h3><p>My Closet Items</p></h2>` +
        `<div class="mycl-itemcount"></div>` +
        `<br><button class="mycl-addbutton">add new</button><hr><br></div>`);

    let myclosetHtml = '';
    let appareltype1 = '';
    let color1 = '';
    let season1 = '';
    let shortdesc1 = '';
    let itemCount = 0;

    myclosetHtml += `<div id="mycl-body">`;
    

    $.each(data.items, function(i, item) {
        itemCount +=1;
        id1 = data.items[i]._id;
        season1 = data.items[i].season;
        appareltype1 = data.items[i].appareltype;
        color1 = data.items[i].color;
        shortdesc1 = data.items[i].shortdesc;
        size1 = data.items[i].size;
        
        myclosetHtml += `<div class="mycl-resultcell"><div class="mycl-resultbody">` +
            `<p class="mycl-id">id: ${id1}</p>` +
            `<p>season: ${season1}</p>` +
            `<p>type of clothing: ${appareltype1}</p>` +
            `<p>color: ${color1}</p>` +
            `<p>short description :${shortdesc1}</p>` +
            `<p>size :${shortdesc1}</p></div><br><div class="mycl-editbuttons"><button class="mycl-updatebtn" data-id="${id1}">update</button>` +
            `<button class="mycl-deletebtn" data-id="${id1}">delete</button></div></div>`; 
    });
    myclosetHtml += `</div>`;
    console.log(itemCount);
    $('.mycl-itemcount').html(`There are ${itemCount} items in your closet.`);
	$('.mycloset').append(myclosetHtml);
}

// listeners
/*
// listener for add new
$(document).on('click','.mycl-addbutton', (function(event){
    event.preventDefault();
    newsNext(userSelectedSearchTerm);
}));
*/

// listener for delete
$(document).on('click', '.mycl-deletebtn', (function(e){
    console.log('.mycl-deletebtn has been clicked');
    let id = $(this).attr('data-id');
    console.log(id);
    e.preventDefault();
    deleteMyClosetItemData(id);

    //if the down-angle icon is visible, then go get the data and display
  }));

  // listener for update
$(document).on('click', '.mycl-updatebtn', (function(e){
    console.log('.mycl-updatebtn has been clicked');
    let id = $(this).attr('data-id');
    console.log(id);
    e.preventDefault();
    //if the down-angle icon is visible, then go get the data and display
  }));



//  on page load do this
$(function() {
    getMycloset();
    //postMycloset();
    //updateMycloset();
    //getAndDisplayIdealclosetItems();
})