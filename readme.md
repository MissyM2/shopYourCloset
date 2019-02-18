## shopYourCloset
*  Demo Link https://missym2.github.io/shopYourCloset/
*  Live App:  https://serene-dawn-65763.herokuapp.com/


### Table of Contents

 -  [Summary](#Summary)
 -  [Screenshots](#screenshots)
 -  [Functions and Features](#functions-and-features)

 -  [Technologies Used](#technologies-used)
 
 
 
 
#### Summary
 -  [Home](#shopYourCloset)

This app is a allows a user to log the items in their personal closet, compare it to an ideal closet as specified by Real Simple and make changes based on the analysis.  All persistent data are stored in MongoDB, and users can view or edit data based upon whether they are a normal user or admin.



#### Functions and Features
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




#### Screenshots
 -  [Home](#shopYourCloset)


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







#### Technologies Used
 -  [Home](#shopYourCloset)
 


  #####  Tech Stack: Overview
The backend for this app uses NodeJS with express. Authentication is handled using JWTs with passport. BcryptJS is used to hash passwords. The database is a mongo database. It's hosted on mLab. The client uses HTML, CSS, Javascript and JQuery. The server and client are both hosted on Heroku.


  #####  Code Base

######  Front End 

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
   
######  Back End
 
 1.  All front-end files are located in the /app folder
 2.  The model and router files for each closet item and user are located in their own folder /app/donationitem, /app/giveawayitem, /app/myitem, /app/idealitem and /app/user.
 3.  The model and strategies file for local authentication and obtaining a JWT are located in the /app/auth folder.
 4.  The model and router files 
    
    
   All components are located in src/components. Other than logging in and registering, dashboard.js is responsible for dispatching all actions. All actions are located in src/users. auth.js handles logging in and JWTs. users.js handles registration. words.js is where the main functionality of the app is. This is responsible for fetching words and progress and also submitting answers from and to the server. On the backend, index.js is the main file. The rest is divided into directories containing their own index.js file that imports from other files in the directory and simply exports everything in one place. Auth contains the local and jwt strategies as well as a router with login and refresh endpoints. Users contains our user model, which has methods to hash and validate passwords using bcrypt. Registration is handled in the users router. Words just has a router. This is where the get word, get progress, and answer question endpoints are. The answer question endpoint has our spaced repetition algorithm.


 #####  Tech Stack: Details
 
######  Front-End Technologies

   1.  HTML: a standard markup language for the creation of web pages
   2.  CSS: used to describe the presentation of HTML pages
   3.  JavaScript: an interpreted language that can create and dynamically change web pages
   
       *  jQuery: a JS library developed simplify HTML DOM tree traversal and manipulation, event handling, CSS animation, and Ajax
        
######  Server Technologies

   1.  Node.js:  enables use of Javascript on the server side
   2.  Express:  the webserver - a framework that allows development of node-based web apps
   3.  MongoDB:  the database
   
       *  Mongoose
       
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
   
######  Testing Technologies
   > chai: 4.2.0
   > chai-http: 4.2.1
   > faker: 4.1.0
   > mocha: 5.2.0
   
######  Development/Deployment

   1.  Git & GitHub:  a development platform that allows storage and revision management
   2.  Heroku:  a cloud platform for deploying apps  
   3.  Travis CI: a host for continuous testing
