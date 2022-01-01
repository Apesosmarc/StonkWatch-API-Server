# Stonkwatch API Server
Node Express API server

[Front End](https://github.com/Apesosmarc/StonkWatch)

## Overview
This server communicates between the Stonkwatch client and mongoDB. It routes requests to handler functions that can manipulate users, watchlists & stocks within MongoDB and delivered requested data to the frontend. 
I use custom middlewares such as error handlers classes to interject custom error message and status codes to specify error outcomes to the client.

An asyncWrapper middleware accepts async request handlers as an argument to minimize async bindings in controller functions. I use Mongoose to create MongoDB schemas that expresses expected properties of my models to MongoDB, as well as nested schemas to store more complex
info. This app logs responses and requests and is deployed on Heroku.

## Technologies
- NodeJS
- Express
- Mongoose
- MongoDB
- Heroku

## Features
- Handles requests for Stonkwatch client.
- Employs practical API server file structure (routers, controllers, middlewares)
- Custom API errors
- Uses Mongoose to create & manipulate nested data
- Deployed to Heroku


