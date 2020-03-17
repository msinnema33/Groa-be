# API Documentation

#### Backend delpoyed at [AWS Elastic Beanstalk](https://api.groa.us) <br>

## Getting started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- **npm run server** to start the local server
- **npm test** to start server using testing environment

### Express

Express

-    RESTful API
-    Straightforward sever construction
-    Stable and widely used
-    Can be built upon

## Endpoints

#### User Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| POST    | `/api/users/register` |  | Creates a new user. |
| POST   | `/api/users/login` |  | Logs in an existing user. |
| POST   | `/api/users/:id/uploading` |  | Uploads zip file from Letterboxd, unzips, parses and cleans each file and adds them to their respective tables in the database. If a movie with the same letterboxd_uri exists on the users account it will update variable information in place. |
| GET   | `/api/users/:id/recommendations` |  | POSTs the user_id to the data science recommendation endpoint and then returns the newly added recommendations from the database or a prompt to add more reviews.|
| GET   | `/api/users/:id/recommended` |  | Returns the latest recommendation from the database.|
| GET   | `/api/users/:id/recommendation-history` |  | Returns an array of all recommendations found in the database.|



# Data Model

#### USERS

---

```
{
  id: INTEGER, INCREMENTS
  user_name: STRING, UNIQUE
  password: STRING,
  has_letterboxd: BOOLEAN,
  has_imdb: BOOLEAN,
  last_login: DATE,
  email: STRING
}
```
#####  USER RATINGS

---
##### IMDB
```
{
  date: DATE
  name: STRING
  year: DATE
  rating: INTEGER
  user_id: INTEGER
  id: INTEGER
}
```

---
##### LETTERBOXD
```
{
  date: DATE
  name: STRING
  year: DATE
  letterboxd_uri: STRING
  rating: INTEGER
  user_id: INTEGER
  id: INTEGER
}
```

#### MOVIES

---
##### IMDB/LETTERBOXD

```
{
  movie_id: INTEGER
  title_type: MOVIE
  primary_title: STRING
  original_title: STRING
  is_adult: BOOLEAN
  start_year: DATE: YYYY
  end_year: DATE: YYYY
  runtime_minutes: INTEGER
  genres: STRING
}
```

####  RATINGS

---
##### IMDB/LETTERBOXD
```
{
  movie_id: INTEGER
  average_rating: INTEGER
  num_votes: INTEGER
  id: INTEGER
}
```


#### REVIEWS

---
##### IMDB

```
{
  movie_id: INTEGER
  review_date: DATE
  user_rating: INTEGER
  helpful_num: INTEGER
  helpful_denom: INTEGER
  user_name: STRING
  review_text: STRING
  review_title: STRING
  review_id: INTEGER
  id: INTEGER
}
```
---
##### LETTERBOXD

```
{
  movie_id: INTEGER
  review_date: DATE
  user_rating: INTEGER
  review_text: STRING
  review_title: STRING
  review_id: INTEGER
  user_name: STRING
}
```

## Actions

`add()` -> Creates and returns a new user.

`findBy(username)` -> Returns a single user by user_name.

`getUserById(id)` -> Returns a single user by ID.

`findUsers()` -> Return all users and their corresponding ID.

`findRatings()` -> Returns the user_letterboxd_ratings for the logged in user.

`addRating()` -> Takes ratings.csv file from zip upload and adds to user_letterboxd_ratings.

`addReview()` -> Takes reviews.csv file from zip upload and adds to user_letterboxd_reviews.

`addToWatchList()` -> Takes watchlist.csv file from zip upload and adds to user_letterboxd_watchlist.

`addToWatched()` -> Takes watched.csv file from zip upload and adds to user_letterboxd_watched.

`getLatestRecommendations(id)` -> Returns the latest recommendations found in the database.

`getAllRecommendations(id)` -> Returns all recommendatios associated with the users account.


## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:
    
    *  DATABASE_URL=postgres://postgres:lambdaschoolgroa@groadb-dev.cbayt2opbptw.us-east-1.rds.amazonaws.com:5432/postgres
    *  TESTING_DB_URL=postgres://@localhost:5432/postgres
    *  RECOMMENDATION_URL=http://a13327d835de211ea92c80a488b922f7-342789911.us-east-1.elb.amazonaws.com/movie-recommender
    *  JWT_SECRET - l4mbd4$ch00lGr04L4mbd4$ch00lGr04l4mbd4$ch00lGr04
    *  TOKEN_EXP=8h
    
## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](🚫link to your frontend readme here) for details on the fronend of our project.
🚫 Add DS iOS and/or Andriod links here if applicable.