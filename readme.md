## shopYourCloset
*  Demo Link https://missym2.github.io/shopYourCloset/
*  Live App:  https://serene-dawn-65763.herokuapp.com/


### Table of Contents

 -  [Screenshots](#screenshots)
 -  [User Stories](#user-stories)
 -  [Summary](#Summary)
 -  [Technologies Used](#technologies-used)

#### Screenshots


    Home page
![Mobile - login/home page](/docimages/m1.png "Mobile-Login/Home Page")

    Registration Page
![Mobile - registration page](/docimages/m2.png "Mobile-Registration Page")

    Options Page
![Mobile - options page](/docimages/m3.png "Mobile-Options Page")

    Ideal Closet
![Mobile - ideal closet](/docimages/m4.png "Mobile-Ideal Closet")

    My Closet:   add new item screen
![Mobile - my closet (add new item)](/docimages/m5.png "Mobile-My Closet: add an item")

    My closet: viewing items (by season)
![Mobile - my closet (viewing items)](/docimages/m6.png "Mobile-My Closet")

    My closet: editing an existing item
![Mobile - my closet](/docimages/m11.png "Mobile-My Closet: edit an item")

    My closet: viewing My Closetitems on the desktop
![Desktop - my closet](/docimages/m6-desktop.png "Desktop-My Closet")

    Donation closet
![Mobile - donation closet](/docimages/m7.png "Mobile-Donation Closet")

    Giveaway closet
![Mobile Version Pic 8](/docimages/m8.png "Mobile-Giveaway Closet")

    Analyze It
![Mobile - analysis of my closet](/docimages/m9.png "Mobile-Analyze It")

    Analyze It: desktop version
![Desktop - analysis of my closet](/docimages/m9-desktop.png "Desktop-Analyze It")

    Logout
![Mobile - logout](/docimages/m10.png "Mobile-Logout")




#### Summary


This app is a allows a user to log the items in their personal closet, compare it to an ideal closet as specified by Real Simple and make changes based on the analysis.  All persistent data are stored in MongoDB, and users can view or edit data based upon whether they are a normal user or admin.



#### User Stories


1.  Regular user may view their entire closet organized by season.
2.  Regular User may add, edit or delete a particular item in their personal closet.
3.  Regular User may view items in the ideal closet.
4.  Regular User may move one of their personal items to their personal donation closet.
5.  Regular User may move one of their personal items to the public giveaway closet.
6.  Regular User may return an item from their donation closet to their personal closet.
7.  Regular User may view a comparison between their personal closet with the ideal closet and obtain recommendations based on the following:
     a.  total count comparison between the two closets
     b.  count of items in each season
     c.  count of items in each apparel category.




#### Technologies Used


*  Front-End Development:
      HTML
      CSS
      JavaScript
      jQuery
*  Node.js:  enables use of Javascript on the server side
   Express:  a framework that allows development of node-based web apps
   > bcryptjs: 2.4.3
   > dotenv: 6.2.0
   > express: 4.16.4
   > joi: 14.3.1
   > jsonwebtoken: 8.4.0
   > mongoose: 5.4.1
   > morgan: 1.9.1
   > passport: 0.4.0
   > passport-http: 0.3.0
   > passport-jwt: 4.0.0
   > passport-local: 1.0.0
   
*  MongoDB
   Mongoose
*  Testing Technologies
   > chai: 4.2.0
   > chai-http: 4.2.1
   > faker: 4.1.0
   > mocha: 5.2.0
   > Travis CI 
