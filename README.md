Angular2 with TypeScript and Gulp
=================================

Billing System application with Gulp as build system.

#### 1. Prerequisites

*nodejs* must be installed on your system and the below global node packages must be installed:

- gulp

> npm i -g gulp

- gulp-cli

> npm i -g gulp-cli

- typings

> npm i -g typings@1.3.3

- typescript

> npm i -g typescript@2.0.2

- ts-node

> npm i -g ts-node@1.3.0

#### 2. Cloning the repository

Clone the repository:

> git clone https://github.com/kolorobot/angular2-typescript-gulp.git

Navigate to `angular2-typescript-gulp` directory:

> cd angular2-typescript-gulp

#### 3. Installing dependencies

Install dependencies by running the following command:

> npm install

`node_modules` and `typings` directories will be created during the install.

> cd server

change directory to install server side

> npm install

`node_modules`  directories will be created during the install in server side.

#### 4. Building the project

Build the project by running the following command:

> npm run clean & npm run build

`build` directory will be created during the build

#### 5. Starting the application

Start the application by running the following command:

> npm start

The application will be displayed in the browser.

Resources
---------

#### 6. Information about app

1. Login as admin

note: default admin is already added

credentials are:
username: admin@gmail.com
password: abc

2. Add Uer and biller after logged in as a an admin

3. login as an user whatever you have created and select biller and do the payment

4. App will show next month pending bill in pending bill section
