window.ETC_MODULE = {
    organizeData
};

function organizeData(data) {

    seasonSpring = "";
    seasonSummer = "";
    seasonFall = "";
    seasonWinter = "";
    seasonAllSeasons = "";
    console.log('got to organize data');
    console.log(data);

    let itemsAllSeasons = $(data).filter(function(i) {
        seasonAllSeasons = "All Seasons";
        return data[i].season === "All Seasons";
    });

    let itemsSpring = $(data).filter(function(i) {
        seasonSpring = "Spring Basics";
        return data[i].season === "Spring";
    });

    let itemsSummer = $(data).filter(function(i) {
        seasonSummer = "Summer Basics";
        return data[i].season === "Summer";
    });
    let itemsFall = $(data).filter(function(i) {
        seasonFall = "Fall Basics";
        return data[i].season === "Fall";
    });
    let itemsWinter = $(data).filter(function(i) {
        seasonWinter = "Winter Basics";
        return data[i].season === "Winter";
    });

STORE.dataLength= itemsFall.length;
console.log(STORE.datalength);
$('.closet-container').html('');
$('.closet-container').append(`<div class="closet-header"></div>`);
$('.closet-container').append(`<div class="closet-body"></div>`);
renderClosetHeader();
//renderClosetBody(itemsSpring);
renderClosetBody(seasonAllSeasons, itemsAllSeasons);
renderClosetBody(seasonSummer, itemsSummer);
renderClosetBody(seasonFall, itemsFall);
renderClosetBody(seasonWinter, itemsWinter);
renderClosetBody(seasonSpring, itemsSpring);

}
