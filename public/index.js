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
        renderMycloset(data);
        })
        .catch(function(err) {
        // Error :(
        });
}

// POST fetch request for My Closet
const addItemToMycloset = function postMyClosetData() {

    fetch('/mycloset', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "season": "Always in Season",
            "appareltype": "bottom",
            "color": "BLACK",
            "shortdesc": "short-sleeved t-shirt"
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            };
            throw new Error(response.text);
            })
        .then(responseJson => {
            console.log('Success: ', JSON.stringify(responseJson));
            $('.mycloset').empty();
            getMycloset();
        })
        .catch(error => {
            console.error('Error: ', error)
        });
}

//  PUT fetch request for My Closet
function updateMyClosetItemData(myclosetitemId, data) {
    console.log(data);
    fetch('/mycloset/' + myclosetitemId, {
        method: 'put',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        .then(response =>  {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.text);
        })
        .then(responseJson => {
            console.log('Success: ', JSON.stringify(responseJson));
            $('.mycloset').empty();
            getMycloset();
        })
        .catch(error => {
            console.error('Error: ', error)
        });
}

// DELETE fetch request for My Closet
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


// 
const renderMycloset = function renderMyclosetData(data) {
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
        
        myclosetHtml += `<div class="mycl-resultcell ${id1}class"><div class="mycl-resultbody">` +
            `<div class="itemrow mycl-id"><div class="item itemlabel">id: </div><div class="item itembody">${id1}</div></div>` +
            `<div class="itemrow mycl-season"><div class="item itemlabel">season: </div><div class="item itembody">${season1}</div></div>` +
            `<div class="itemrow mycl-appareltype"><div class="item itemlabel">type of clothing: </div><div class="item itembody">${appareltype1}</div></div>` +
            `<div class="itemrow mycl-color"><div class="item itemlabel">color: </div><div class="item itembody">${color1}</div></div>` +
            `<div class="itemrow mycl-shortdesc"><div class="item itemlabel">short description: </div><div class="item itembody">${shortdesc1}</div></div>` +
            `<div class="itemrow mycl-size"><div class="item itemlabel">size: </div><div class="item itembody">${size1}</div></div></div><br>` +
            `<div class="mycl-editbuttons"><button class="mycl-updatebtn1" data-id="${id1}" data-season="${season1}" data-appareltype="${appareltype1}" data-color="${color1}" data-shortdesc="${shortdesc1}" data-size="${size1}">update</button>` +
            `<button class="mycl-deletebtn" data-id="${id1}">delete</button></div></div>`; 
    });
    myclosetHtml += `</div>`;
    console.log(itemCount);
    $('.mycl-itemcount').html(`There are ${itemCount} items in your closet.`);
	$('.mycloset').append(myclosetHtml);
}



// LISTENERS

// listener for add new
$(document).on('click','.mycl-addbutton', (function(event){
    event.preventDefault();
    addItemToMycloset();
}));

// listener for delete
$(document).on('click', '.mycl-deletebtn', (function(e){
    console.log('.mycl-deletebtn has been clicked');
    let id = $(this).attr('data-id');
    console.log(id);
    e.preventDefault();
    deleteMyClosetItemData(id);
}));

// listener for update
$(document).on('click', '.mycl-updatebtn1', (function(e){
    console.log('.mycl-updatebtn has been clicked');
    const id = $(this).attr('data-id');
    const season=$(this).attr('data-season');
    const appareltype=$(this).attr('data-appareltype');
    const color = $(this).attr('data-color');
    const shortdesc = $(this).attr('data-shortdesc');
    const size = $(this).attr('data-size');
    console.log(season);
    console.log(id);
    console.log('.' + id + 'class');
    e.preventDefault();

    // change mycloset cell to an updateable format
    
    const updateFormBody = 
        `<div class="mycl-resultcell ${id}class"><div class="mycl-resultbody"><form action="/action_page.php">` +
        `<div class="mycl-resultbody">`+
            `<div class="itemrow mycl-id"><div class="item itemlabel">id: </div><div class="item itembody"><div id="js-itemid" data-value="${id}">${id}</div></div></div>` +
            `<div class="itemrow mycl-season"><div class="item itemlabel">season: </div><div class="item itembody"><input id="js-searchseason" type="text" name="season" value="${season}"></div></div>` +
            `<div class="itemrow mycl-appareltype"><div class="item itemlabel">type of clothing: </div><div class="item itembody"><input id="js-searchappareltype" type="text" name="appareltype" value="${appareltype}"></div></div>` +
            `<div class="itemrow mycl-color"><div class="item itemlabel">color: </div><div class="item itembody"><input id="js-searchcolor" type="text" name="color" value="${color}"></div></div>` +
            `<div class="itemrow mycl-shortdesc"><div class="item itemlabel">short description: </div><div class="item itembody"><input id="js-searchshortdesc" type="text" name="shortdesc" value="${shortdesc}"></div></div>` +
            `<div class="itemrow mycl-size"><div class="item itemlabel">size: </div><div class="item itembody"><input id="js-searchsize" type="text" name="size" value="${size}"></div></div>`;
    
    const updateEditButtons = `<div class="mycl-editbuttons">` +
        `<button class="mycl-updatebtn2" data-id="${id}" data-season="${season}" data-appareltype="${appareltype}" data-color="${color}" data-shortdesc="${shortdesc}" data-size="${size}">update</button>` +
        `<button class="mycl-cancelbtn">cancel</button>` +
        `</div></div></form>`;

    $('.' + id + 'class').replaceWith(updateFormBody );
    $('.' + id + 'class').append(updateEditButtons);

  }));

  // listener for update
$(document).on('click', '.mycl-updatebtn2', (function(e){
    e.preventDefault();
    console.log('update is listening ');
    const updateId = $('#js-itemid').text();
    console.log('id is ' + updateId);
    const updateSeason = $('#js-searchseason').val();
    console.log('season is ' + updateSeason);
    const updateAppareltype = $('#js-searchappareltype').val();
    console.log('appareltype is ' + updateAppareltype);
    const updateColor = $('#js-searchcolor').val();
    console.log('color is ' + updateColor);
    const updateShortdesc = $('#js-searchshortdesc').val();
    console.log('shortdesc is ' + updateShortdesc);
    const updateSize = $('#js-searchsize').val();
    console.log('size is ' + updateSize);

    // create object and send to update function
    updatedMyClosetItem = {
        id: updateId,
        season: updateSeason,
        appareltype: updateAppareltype,
        color: updateColor,
        shortdesc: updateShortdesc,
        size: updateSize
    }
    console.log(updatedMyClosetItem);
    updateMyClosetItemData(updateId, updatedMyClosetItem);

}));



//  on page load do this
$(function() {
    getMycloset();
});