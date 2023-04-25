# Code-sos

Project 3 of Ironhack, Week 8 !

Tech : **MongoDB ExpressJS ReactJS NodeJs** 

Tools : **Postman**

### Technical requirements:

- Implementing all CRUD actions.
- Have a REST API backend built with ExpressJS, MongoDB and Mongoose, that your React app will communicate with.
- Have a REST API backend with routes that perform all CRUD actions for at least one model (excluding the user model).
- Have 3 database models or more. Having one model for users is the first step. The other two (or more) models should represent the main functionality of your app.
- Include sign-up, log-in and log-out functionality with encrypted passwords (or social login) and authorization (logged-in users can do additional things).
- Have two separate repos on GitHub. One repo is for your frontend React application and the other is for your backend REST API.


### Description

For the last project, we create a full stack application where coders can exchange advice with each other.

There is two type of user: 

When you sign-in you can choose to be a tutor or a student.

- The Student can ask or answer the questions in the forums, and if he don't find his answer he can make a help request to a Tutor
- The Tutor can also participate in the forum. He can see the students that are asking him for help in his profile.
- Everybody can comment a post that someone else made in the forum.


### Challenge

- Time management.
- The authentification part, Json Web Token.


## Possible Improvement


- Make the application more clear to read and more scalable using a lot of components

The choice of the model :
  - at first we want the tutor to have a specific model. Inside of witch he had technologies, yearsOfExperience, studentHelpCount, isAvailable... 
  - in his profile he could checked the I'm available checkbox and be display on the page where all tutor available are.
  - student can, once on that page sort or filter the tutors available by yearsOfExperience or technologies.

- Use a tool like Trello for keeping track of what needs to be done and what is not worth it.
- Make more comment for describe each step.
