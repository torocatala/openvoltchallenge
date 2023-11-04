# Components
- A Vue.JS frontend
- A Node backend

## Optional
- MongoDB for users and stuff
- TimescaleDB
- Redis/Memcached

# Tasks
- Create a dockerized NodeJS backend using express or koa
- Create a docker compose
- Create a start script
- Create an endpoint that receives a meter ID and a date range
- Make it return something
- Have a test for it
- Make the endpoint query the openvolt api
- Encapsulate the openvolt api in a client creating a test for it with a mocked response
- Add external data validation
- Add the intensity data fromt eh carbon api
- Extract it and encapsualte it
- Add the fuel type

- Create a frontend with vue.js and docker
- Add it to docker compose
- Make the vue be able to retreive data from the backend
- Show the data in basic format
- Show it fancy
- Add field so we can query different meters and timeframes

## Optional tasks
- Add fake meter so the selector has more than one meter


# Frontend
- Select a meter
- Select a timeframe
- Display data

## Optional:
- Display fancy data
- Login
- Display user personal data
- Query meter data using AI

# Backend
- Tests
- Gets meter information from OpenVolt API
- Gets intensity data from carbon intensity API
- Gets fuel type data from carbon intensity API
- Serves the joint data trough an endpoint. The endpoint must receive a meter id(get it from the sesion?) and a date range
- Some kind of authentication, JWT?
- Frontend needs to be able to query backend (CORS)

## Optional:
- Auth for the frontend login
- Endpoint for the user data
- Endpoint to query user data using AI
- Create user
- Edit user
- Save data in TimeScaleDB
- Cache using redis
- Sesion cache using redis/memcached


# Insights
- The queries consist of user+meterid+timeframe
- Search for the full joint data in the cache
- Search for the full joint data in the TimeScaleDB
- Search only for the environmental data in the TimeScaleDB
- Fetch the data from the APIs

# Use cases:
- As I user I want to know the monthly energy consumed by my building
- As I user I want to know the amount of CO2 emmited by the building energy consumption
- As I user I want to know the sources used to generate the electricity consumed by the building