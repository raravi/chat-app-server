# chat-app-server

A chat app server written in Javascript!

![license](https://img.shields.io/github/license/raravi/chat-app-server)&nbsp;&nbsp;![version](https://img.shields.io/github/package-json/v/raravi/chat-app-server)&nbsp;&nbsp;![coverage](https://img.shields.io/codecov/c/gh/raravi/chat-app-server)&nbsp;&nbsp;![dependencies](https://img.shields.io/depfu/raravi/chat-app-server)&nbsp;&nbsp;![last-commit](https://img.shields.io/github/last-commit/raravi/chat-app-server)

The server runs in **node.js** using [Express](https://expressjs.com/) to setup a server to listen to requests to API endpoints and `/resetpassword` route. It uses [socket.io](https://socket.io/) to setup realtime communication for chat messaging.

## Server Features

1. Sets up middleware for Rate Limiting & Body Parser (used for JSON).
2. Connects to the MongoDB using [Mongoose](https://mongoosejs.com/docs/guide.html) for CRUD operations.
3. **Express** server to serve API endpoints & `/resetpassword` webpage
4. Connects **socket.io** to **Express** server to enable realtime bidirectional communication for chat messaging functionality.

I've created a Free tier MongoDB account using [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

## API Endpoints

The below endpoints are moved to the repo [chat-server-lambda](https://github.com/raravi/chat-server-lambda) as I've split it into AWS Lambda function!
1. `/login`: For login of users.
2. `/register`: To register new users.
3. `/forgotpassword`: To send a reset mail to the registered email address of the user.
4. `/resetpassword`: To handle reset password functionality.

## RESET POST Request

The `/resetpassword` POST Request is handled by sending the `/resetpassword/index.html` webpage back to the user, where they can enter relevant details to reset the password.

## Mailing Feature

A mail is triggered to the user with the [nodemailer](https://nodemailer.com/usage/) package, you will need to setup your existing email Id for this. Or you can create a new one. You have to create a 'app password' (Gmail/Yahoo/etc.. each have their own way of generating app passwords, please consult the relevant documentation as per your requirements) and use it to send mails!

Have fun with the code!

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/Y8Y21VCIL)