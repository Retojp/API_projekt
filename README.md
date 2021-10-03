# API_projekt

Basic API.
Database powered by mongoDB.
Required environment variables:
- DATABASE_URL - mongo database url address
- PORT
Can browse collection of games.
Can browse, dedlete, update specyfic game by id.

swagger documentation available at /api-docs

Demo available at heroku:
```
https://apiprojekt-piotr.herokuapp.com/
```

Swagger documentation
```
https://apiprojekt-piotr.herokuapp.com/api-docs
```

Installation:
In cloned directory type 
```
npm install
```

In main directory create ".env" file and fill with environment variables.
DATABASE_URL = mongo database url

Run application using one of the following commands.

development mode
```
npm run dev
```

production mode
``` 
npm run start
```