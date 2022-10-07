# Storefront Backend

## Description

_Storefront Backend_ is project that has users and product, providing endpoints for users to make orders on products. 

## How to run it

- Open CMD, prefered to run it as adminstrator
- - Run command 'git clone https://github.com/amralaaeledin/Storefront-Backend.git'
- - Run command 'cd Storefront-Backend'
- - Run command 'npm install'
- Go to your postgres sql admin:
- - Create db named 'ecommerce_app'
- - Create db named 'ecommerce_app_test'
- - Create user named 'amro' with password '1234'
- - Make user 'amro' as owner of 'ecommerce_app' and 'ecommerce_app_test' databases
- - Fill these values in .env.example: 
- - - POSTGRES_HOST=<db host>
- - - POSTGRES_USER=<username of db owner>
- - - POSTGRES_PASSWORD=<password>
- - - ENV=<mode> <br />
`note` if you will run test command, mode = test
`note` if you will run build or start command, mode = dev   
- Change name of .env.example to .env 
- Return to CMD
- - Run command 'db-migrate up'
- - Run command 'npm run build'
- - Run command 'node ./build'
- Visit 'localhost:7000/' in browser

## Commands

- 'npm run clean' : to run prettier and linting the project
- 'npm run test' : to run tests
- 'npm run start' : to run ts version of the project
- 'npm run build' : to build js version of the project

## Technologies Used

- nodejs
- typescript
- postgres sql
- express
- jasmine
- supertest
- jsonwebtoken
- bcrypt
- bodyparser
