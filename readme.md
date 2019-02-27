# shopYourCloset!
*  Live App:  https://serene-dawn-65763.herokuapp.com/

     +  demo user: tester/tester1
     +  admin demo user:  admin/admin1


#### Table of Contents

 -  [Summary](#Summary)
 -  [Screenshots](#screenshots)
 -  [Functions and Features](#functions-and-features)
 -  [Future Functions and Features](#functions-and-features)
 -  [Technologies Used](#technologies-used)
       -  [Tech Stack Overview](#tech-stack-overview)
       -  [Tech Stack Details](#tech-stack-details)
       -  [Code Base Overview](#code-base-overview)
       -  [Code Base Details](#code-base-details)
       
 
 
 
 
## Summary
 -  [Home](#shopYourCloset)

This app is a allows a user to log the items in their personal closet, compare it to an ideal closet as specified by Real Simple and make changes based on the analysis.  Most of the work is done in My Closet.  The user can add items to her MyCloset, edit or delete and item or move an item.  The user may move an item to her personal Donation Closet in preparation for donating items to charity.  Alternately, she may move an item to her Share Closet, where other users have access and may contact her by email to borrow an item.  Finally, she can see an analysis of her closet based on number of items in the closet, number of items by season and number of items by apparel type.  All persistent data are stored in MongoDB.






## Functions and Features
 -  [Home](#shopYourCloset)


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




## Future Functions and Features
 -  [Home](#shopYourCloset)

1.  Ability to take pictures of items in their private wardrobe and update her My Closet dynamically.
2.  Print closets and analysis.
3.  Expand the analysis section to include more specific comparisons between My Closet and the Ideal Closet.
4.  Make suggestions of outfits.
5.  Offer different options of "Ideal Closets" such as a "Kardashian Ideal Kloset" or a closet suggested by a sorority, University, favorite store (Target) or clothing designer.





## Screenshots
 -  [Home](#shopYourCloset)


     Mobile-Home page
     
![Mobile - Login/Home Page](/docimages/m1.png "Mobile-Login/Home Page")

     Mobile-Registration Page
    
![Mobile - Registration Page](/docimages/reg.png "Mobile-Registration Page")

    Mobile-Main Options Page
    
![Mobile - Main Options Page](/docimages/m2.png "Mobile-Main Options Page")

    Mobile-Ideal Closet
    
![Mobile - Ideal Closet](/docimages/m3.png "Mobile-Ideal Closet")

    Mobile-Ideal Closet - look at details
    
![Mobile - Ideal Closet: look at details](/docimages/m4.png "Mobile-Ideal Closet: look at details")

    Mobile-My Closet
    
![Mobile - My Closet](/docimages/m5.png "Mobile-My Closet")

    Mobile-My closet: Add New Item
    
![Mobile - My Closet:  Add Item](/docimages/m6.png "Mobile-My Closet:  Add Item")

    Mobile-My closet: Edit/Update Item
     
![Mobile - Edit/Update Item](/docimages/mEdit.png "Mobile-Edit/Update Item")

    Mobile-Donation Closet
    
![Mobile - Donation Closet](/docimages/m8.png "Mobile-Donation Closet")

     Mobile-Share Closet
    
![Mobile - Share Closet](/docimages/mShare.png "Mobile-Share Closet")

    Mobile-Analyze It!
    
![Mobile - Analyze It](/docimages/m7.png "Mobile-Analyze It")

    Logout
    
![Mobile - Logout](/docimages/m10.png "Mobile-Logout")

     Desktop-My Closet  
    
![Desktop - My Closet](/docimages/dMy.png "Desktop-My Closet")

     Desktop-Ideal Closet  
    
![Desktop - Ideal Closet](/docimages/dIdeal.png "Desktop-Ideal Closet")

     Desktop-Share Closet  
    
![Desktop - Share Closet](/docimages/dShare.png "Desktop-Share Closet")

     Desktop-Donation Closet  
    
![Desktop - Donation Closet](/docimages/dDonation.png "Desktop-Donation Closet")

     Desktop-Analyze It!  
    
![Desktop - Analyze It!](/docimages/dAnalyze.png "Desktop-Analyze It!")












## Technologies Used
 -  [Home](#shopYourCloset)
 




  ###  Tech Stack Overview
  -  [Home](#shopYourCloset)
  
The backend for this app uses NodeJS with express. Authentication is handled using JWTs with passport. BcryptJS is used to hash passwords. The database is a mongo database. It's hosted on mLab. The client uses HTML, CSS, Javascript and JQuery. The server and client are both hosted on Heroku.


  
 ###  Tech Stack: Details
 -  [Home](#shopYourCloset)
 
 
 
#####  Front-End Technologies
-  [Home](#shopYourCloset)



   1.  HTML: a standard markup language for the creation of web pages
   2.  CSS: used to describe the presentation of HTML pages
   3.  JavaScript: an interpreted language that can create and dynamically change web pages
   
       +  jQuery: a JS library developed simplify HTML DOM tree traversal and manipulation, event handling, CSS animation, and Ajax
  
  
  
#####  Server Technologies
-  [Home](#shopYourCloset)



   1.  Node.js:  enables use of Javascript on the server side
   
      *  bcryptjs: 2.4.3:  a password hashing function
      
      *  dotenv: 6.2.0: loads environment variable form an .env file
      
      *  joi: 14.3.1:  validates js objects from data schemes
      
      *  jsonwebtoken: 8.4.0:  securely transmis information between server and front-end in json format
      
      *  morgan: 1.9.1:  a request logger middleware
      
      *  passport: 0.4.0:  an authentication middleware
      
          +  passport-http: 0.3.0:  allows the authentication of HTTP requests
          +  passport-jwt: 4.0.0:  allows authentication of endpoints using a JSON web token.  Intended to be used to secure RESTful endpoints without sessions.
          +  passport-local: 1.0.0:  allows authentication using a username and password
   2.  Express:  the webserver - a framework that allows development of node-based web apps
   3.  MongoDB:  the database
   
   
       +  mongoose: 5.4.1:  manages the relationships between data, provides schema validation and translation between objects in code and representation of those objects in MongoDB.
       
   
   
   
   
#####  Testing Technologies
-  [Home](#shopYourCloset)


   1. mocha: 5.2.0:  javascript testing framework that runs on Node.js and in the browser.
   2. chai: 4.2.0:  an assertion library for node.js and can be used with a variety of javascript testing frameworks
   3. chai-http: 4.2.1: provides an interface for live integration testing.
   4. faker: 4.1.0: generates fake data in a variety of formats for use with testing
  
   
   
   
#####  Development/Deployment

-  [Home](#shopYourCloset)

   1.  Git & GitHub:  a development platform that allows storage and revision management
   2.  Heroku:  a cloud platform for deploying apps  
   3.  Travis CI: a host for continuous testing
   







###  Code Base Overview
  -  [Home](#shopYourCloset)
  
  
  
shopYourCloset app is a single page application (SPA) which includes as its primary static html file, index.html.  The file is dynamically changed throughout the user session by a number of .js files located under the /public folder as describe below.  The index.page.js is responsible for initiating the app and calls to other .js files as described below.   The primary CRUD operations occur on four different 'closets' as well as 'users' through a series of routers and data models under the /app folder.  Authentication and of users takes place through the use of JSON Web Tokens (JWT), obtained on login as well as a requirement to refresh.  Security of the password is maintained through the use of a hashing algorithm and encryption with bcrypt.





###  Code Base Details
 -  [Home](#shopYourCloset)




#####  Front End 
-  [Home](#shopYourCloset)



1.  All front-end files are located in the /public folder.
2.  The front end is controlled by the index.page.js.  The function that initiates the application is located here as well as all the event listeners for the app.  
3.  All other functions are located under the /public/utilities folder and are divided among the following files:

    a.  cache.module.js:  all functions dealing with authentication of the user reside here.
    
    b.  http.module.js:  all functions related to accessing the database are located here.
    
    c.  render.module.js:  all functions related to bringing the UI to screen are located here.
    
    d.  etc.module.js:  Several functions are located here that are integral to the program but do not fall under the other major categories are located here.
    
    e.  store.module.js:  A STORE object is located here that maintains a variety of information that is passed to different functions resides here.
    
    f.  The primary .html file is index.html
    
4.  There are 3 CSS files, all located in the /public/css folder.
  
  
  
  
#####  Back End
-  [Home](#shopYourCloset)


 
 1.  All front-end files are located in the /app folder
 2.  The model and router files for each closet item and user are located in their own folder /app/donationitem, /app/giveawayitem, /app/myitem, /app/idealitem and /app/user.
 3.  The model and strategies file for local authentication and obtaining a JWT are located in the /app/auth folder.
 4.  The model and router files 
    




