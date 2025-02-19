[TermPaper.pdf](https://github.com/user-attachments/files/18876089/TermPaper.pdf)
# Map-Interactive-Web-App
EduinfoFinder uses the MERN stack (MongoDB, Express.js, React, and Node.js) and other technologies like Tailwind CSS for styling and Leaflet.js for interactive maps. The web app allows users to register, login, and maintain their profiles while also providing detailed geospatial information about educational facilities.

Welcome to EduInfoFinder.
-------------------------
To initialize this Project Database follow below steps.
1.Create a Database name edudb from your MongoDb community edition.
2.Copy mongoDb connection string and paste it to server folder .env file.
3.Also paste the connection string \Server\dbfetch folder dbtest.js file where written "Connect To MongoDb".
4.Run dbtest.js file --cd \Server\dbfetch and then -- node dbtest.js // it will fetch data from all four APIs and save to mongodb.
5.Run server.js from Server folder --- node server.js.
6.Go to client browser and signup a user , it will create a collection users to mongodb.




To run this Project follow below steps.
---------------------------------------
Client----
--------------
1.Go To Client Folder - cd .\Client\

2.Client folder contains all the configuration file for Tailwind CSS , Vite and package-lock.json

3.Install all packages -- npm install 

4.Run front end from command line  -- npm run dev -- -- host


Server -----
---------------
1. Go to Server folder - cd .\Server\

2.Client folder contains all the configuration file for example package-lock.json

3.Install all node packages -- npm install 

4. Run server.js file -- node server.js


