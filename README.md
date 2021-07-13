# es-poker

This api implements the poker planning system.
## Technologies

- [NodeJS](https://github.com/nodejs/node) - A JavaScript runtime environment
- [Express](https://github.com/expressjs/express) - A web application framework for NodeJS
- [Mongodb](https://github.com/mongodb/mongo) - A Document-based database management system
- [Mongoose](https://github.com/Automattic/mongoose) - A promise-based ODM for NodeJS

## What was done
- Implement a route to create a chat room using socketio.
- A meeting room link is generated where other users can also vote.
- relevant information is cached in the database for future use.
- User cannot vote more than once but their vote can be edited.

## Getting started

```sh
# Clone the project
git clone https://github.com/edogbosunny/es-poker-api
cd es-poker-api

# Install dependencies
npm install

```

Set Environment Variables
```sh
PORT=3001
MONGOCONN=mongodb+srv://xxxxxxxxxx.mongodb.net/test
PREFIX=staging
BASEURL=http://localhost:3001

```

Start the application:

```sh
npm start
```

### Documentation
This api endpoint creates a room

- API Endpoint

```sh
  <BASE_URL>/api/v1/home
```

- Request Payload
```sh
  POST {
    "room": "churcioij",
    "room_id": "1231s231sj2",
    "meta": {}
  }
```javascript
This returns a link to the meeting room.
{
    "data": {
        "code": "00",
        "message": "success hell yeah room has been created.",
        "url": "http://localhost:3001/api/v1/join?room_id=1231sw231sj2&room=churci2oij"
    }
}
```

Join room Api endpoint.
GET - REQUEST
http://localhost:3001/api/v1/join?room_id=1231sw231sj2&room=churci2oij

votes are emited via socketio using the 'vote' emitter and are recived via the vote-response emmiter.
