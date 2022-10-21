# Teacher's Aid

Teacher's Aid is a web-application that allows teachers to create questions using natural language processing and recieve anonymous feedback from students. The application uses modern frontend and backed development tools. The application handles user authentication and uses nlp to create the questions.


## Built With 🛠


- [Express JS](https://expressjs.com) - Express JS Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. 

- [NodeJS](https://nodejs.org/en/) - Node.js is an open-source, cross-platform, back-end JavaScript runtime environment.

- [Cohere AI](https://cohere.ai/) - Cohere provides access to advanced Large Language Models and NLP tools through one easy-to-use API. 


## How to run the project?

To run the project make sure to create an empty firebase project and get all the keys. After getting all the config keys add them in the firebase.js file.

Next go to `cohere.ai` and get an api key and put it inside the `server/index.js` file


1. To Clone
 ```git clone https://github.com/HenokB/Teacher-Aid.git```
2. Install all the dependencies using `yarn` or `npm`
3. Run `npm start` or `yarn start` in the root dir to start the server
- Make sure to add your Cohere AI Key, in the `server/index.js` file
4. Run `npm start` or `yarn start` in the client dir and it will host the app on `localhost:3000`


## 📸 Screenshots

![Screenshot 2022-10-21 160321](https://user-images.githubusercontent.com/46082799/197202383-d385b9d9-b01d-4b91-8f84-165e32a98f02.jpg)
![Screenshot 2022-10-21 153317](https://user-images.githubusercontent.com/46082799/197202393-ad8d2ee4-fb21-462e-a10d-069bf4b31f75.jpg)
![Screenshot 2022-10-21 160157](https://user-images.githubusercontent.com/46082799/197202407-d2a0f9ba-7067-4284-9b1d-110f156c204f.jpg)
![Screenshot 2022-10-21 160240](https://user-images.githubusercontent.com/46082799/197202418-d344183d-37f7-4d94-a2bf-6bf33f5971ec.jpg)

![Screenshot 2022-09-27 184505](https://user-images.githubusercontent.com/46082799/192576120-6c82e5f9-452d-4f9f-9fde-f6882010ca82.jpg)

© 2022 Henok Ademtew
