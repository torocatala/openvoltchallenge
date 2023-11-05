# OpenVolt technical challenge

This is my take at the openvolt technical challenge, the challengue reads like this:

## The challlenge
A commercial building in the UK (Stark Industries UK HQ) consumes electricity from the National Grid. Write a programme in a language of your choice that calculates 

The monthly energy consumed by the building (kWh)
The monthly amount of CO2 (kgs) emitted by the electricity generated for the building. Use half hourly readings from data sources to calculate this
The monthly % of fuel mix (wind/solar/nuclear/coal/etc) used to generate the electricity. Again, use half hourly readings to calculate weighted average

The timeframe is for the month of January 2023
‍
Resources

The Openvolt API (docs.openvolt.com). The building has one electricity meter with a meter_id of "6514167223e3d1424bf82742" Use x-api-key "test-Z9EB05N-07FMA5B-PYFEE46-X4ECYAR" for API calls
Official Carbon Intensity API from the National Grid  (https://carbon-intensity.github.io/api-definitions/#carbon-intensity-api-v2-0-0)

Source: https://www.openvolt.com/careers

# What I did:

This repo is a monorepo that includes a system with two applications and its orchestration.
The apps are:

- Backend: NodeJS API using expressJS
- Frontend: An SPA made using Vue.js

Both projects are dockerized and orchestrated using docker-compose.

The project is completely functional and self-contained (excluding npm dependencies).

# Run the project

## Requeriments
- A machine that can run bash scripts
- Docker
- An internet connection for the npm dependencies

## How to run the proejct
- Execute: `start.sh`

# Nice things

- Actually works
- Uses similar technologies to the openvolt stack
- The start.sh script is idempotent
- Everythings is dockerized making it easy to run anywhere
- There is a very small attempt at DDD in the backend

# Not so nice things that could have been included

- Frontend has no separation of anything, everything is inside the same component
- Frontend is fugly
- Lack of testing
- Lack of validation
- Lack of error handling
- If a better DDD had been created, some models could been shared between the frontend and the backend, which is a nice thing especially having a fullstack using the same langauge in the front and the back and is specially easy when using monorepo as creating the artifacts is quite trivial with this setup.

# Possible next tasks if this was a real project
There are a ton of things that can be done, but 
- MongoDB for users and stuff
- TimescaleDB for usage metrics, probably having two "collections",, one for the carbon data and another for the meters and the calculated usage data.
- Redis/Memcached to save plain queries results and sessions.

# Conclusions
I hope all of the work here plus the written in this file where I analize what I did and what is missing can showcase a little my knowledge and ability to create fullstack applications.
Thank your reading trough this and taking a look at the code.
I hope you can run the application and see it working, the functionality may be simple but I believe the decisions made on how to implement the functionality are what should actually be valued.