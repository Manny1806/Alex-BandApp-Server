# Thinkful Backend Template

A template for developing and deploying Node.js apps.

## Getting started

### Setting up a project

* Move into your projects directory: `cd ~/YOUR_PROJECTS_DIRECTORY`
* Clone this repository: `git clone https://github.com/Thinkful-Ed/backend-template YOUR_PROJECT_NAME`
* Move into the project directory: `cd YOUR_PROJECT_NAME`
* Install the dependencies: `npm install`
* Create a new repo on GitHub: https://github.com/new
    * Make sure the "Initialize this repository with a README" option is left unchecked
* Update the remote to point to your GitHub repository: `git remote set-url origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME`

### Working on the project

* Move into the project directory: `cd ~/YOUR_PROJECTS_DIRECTORY/YOUR_PROJECT_NAME`
* Run the development task: `npm start`
    * Starts a server running at http://localhost:8080
    * Automatically restarts when any of your files change

## Databases

By default, the template is configured to connect to a MongoDB database using Mongoose.  It can be changed to connect to a PostgreSQL database using Knex by replacing any imports of `db-mongoose.js` with imports of `db-knex.js`, and uncommenting the Postgres `DATABASE_URL` lines in `config.js`.

## Deployment

Requires the [Heroku CLI client](https://devcenter.heroku.com/articles/heroku-command-line).

### Setting up the project on Heroku

* Move into the project directory: `cd ~/YOUR_PROJECTS_DIRECTORY/YOUR_PROJECT_NAME`
* Create the Heroku app: `heroku create PROJECT_NAME`

* If your backend connects to a database, you need to configure the database URL:
    * For a MongoDB database: `heroku config:set DATABASE_URL=mongodb://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME`
    * For a PostgreSQL database: `heroku config:set DATABASE_URL=postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME`

* If you are creating a full-stack app, you need to configure the client origin: `heroku config:set CLIENT_ORIGIN=https://www.YOUR_DEPLOYED_CLIENT.com`

### Deploying to Heroku

* Push your code to Heroku: `git push heroku master`

### API endspoints
-----------------
All requests and responses are in JSON format.

|Action|Path|
|------|----|
|Users|https://music-server-sioux-city.herokuapp.com/api/users|
|Authentication|https://music-server-sioux-city.herokuapp.com/api/auth|
|Bands|https://music-server-sioux-city.herokuapp.com/api/bands|
|Events|https://music-server-sioux-city.herokuapp.com/api/events|
|Posts|https://music-server-sioux-city.herokuapp.com/api/posts|

## Users
`POST` request to endpoint `/` is for creating user documents. It accepts the following request body,
```
{
  username,
  password,
  band,
  firstName, --optional
  lastName, --optional
  
}
```
username will be rejected if it is not a unique username or band name. Once a user document is successfully created, this will be the server's response.
```
{
  id,
  username,
  band,
  firstName, --optional
  lastName, --optional
}
```
profilePic is an object for storing a user's profile picture on Cloudinary's server.

`POST` request to endpoint `/userData` settings will modify some of a user's info. It accepts the following request body,
```
{
  id,
  bio,
  phone,
  state,
  city
}
```

## Authentication
`POST` to `/login` endpoint for creation of JWT. It accepts the following request body,
```
{
  username,
  password
}
```
This endpoint takes in the username and verifies the password. When validated, the server will respond with a token,
```
{
  authToken
}
```
`POST` to `/refresh` will send back another token with a newer expiriation. No request body is necessary as an existing and valid JWT must be provided to access this endpoint.

## Bands
`POST` request to endpoint `/` is for creating bands. It accepts the following request body,
```
{
  username, 
  bandName, 
  bandUrl, 
  bannerUrl --optional
}
```
Once a band document is successfully created, this will be the server's response.
```
{
  id,
  bandName, 
  bandUrl, 
  bannerUrl
}
```
## Posts

`POST` request to endpoint '/' is for creating band posts. It accepts the following request query,
```
{
  message, 
  mediaUrl, --optional
  band
}
```
Once a band post is successfully created, this will be the server's response.
```
{
  id,
  message, 
  mediaUrl,
  band,
  createdAt,
  uploadedAt
}
```
`PUT` request to endpoint '/:id' is for updating band posts. It accepts the following request query,
```
{
  message, 
  mediaUrl, --optional
}
```
Once a band post is successfully updated, this will be the server's response.
```
{
  id,
  message, 
  mediaUrl,
  band,
  createdAt,
  uploadedAt
}
```
`DELETE` request to `/:id` will delete a post document. 
The server will respond with status 204 whether or not the account exists.

## Events

`POST` request to endpoint '/' is for creating band events. It accepts the following request query,
```
{
  title, 
  location, 
  description, --optional
  picUrl, --optional
  band 
}
```
Once a band post is successfully created, this will be the server's response.
```
{
  id,
  title, 
  location, 
  description,
  picUrl,
  band,
  createdAt,
  uploadedAt
}
```
`PUT` request to endpoint '/:id' is for updating band events. It accepts the following request query,
```
{
  title, 
  location, 
  description, --optional
  picUrl, --optional
}
```
Once a band event is successfully updated, this will be the server's response.
```
{
  id,
  title, 
  location, 
  description,
  picUrl,
  band,
  createdAt,
  uploadedAt
}
```
`DELETE` request to `/:id` will delete a event document. 
The server will respond with status 204 whether or not the account exists.
