# chat-app-server

A chat app server written in Javascript!

The server runs in node.js using [Express](https://expressjs.com/) to setup a server to listen to requests to API endpoints and `/resetpassword` route. It uses [socket.io](https://socket.io/) to setup realtime communication for chat messaging.

The server does the following:
1. Sets up middleware for Rate Limiting, [Passport](http://www.passportjs.org/) (used for authentication), Body Parser (used for JSON).
2. Connects to the MongoDB using [Mongoose](https://mongoosejs.com/docs/guide.html) for CRUD operations.
3. Express server to serve API endpoints & `/resetpassword` webpage
4. Connects socket.io to Express server to enable realtime bidirectional communication for chat messaging functionality.

I've created a Free tier MongoDB account using [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

The API endpoints are:
1. `/login`: For login of users.
2. `/register`: To register new users.
3. `/forgotpassword`: To send a reset mail to the registered email address of the user.
4. `/resetpassword`: To handle reset password functionality.

The `/resetpassword` POST Request is handled by sending the `/resetpassword/index.html` webpage back to the user, where they can enter relevant details to reset the password.

A mail is triggered to the user with the [nodemailer](https://nodemailer.com/usage/) package, you will need to setup your existing email Id for this. Or you can create a new one. You have to create a 'app password' (Gmail/Yahoo/etc.. each have their own way of generating app passwords, please consult the relevant documentation as per your requirements) and use it to send mails!

Have fun with the code!
