# Calculator Angular 2 Front End

Simple 4 function calculator written in Angular 2 - Developed for training purposes to get developers used to Git, GitHub Flow, Angular 2, and Angular Testing.

This front end is supposed to work alongside a Java Spring backend that will provide a REST API for math functions.

## Installation

1. Prereqs: Make sure `npm` is installed on your machine
2. Clone the repository
3. Run `npm install` to install the required frontend packages
4. Run `npm start`
5. Navigate to `localhost:4200` to see front end live

Note: This front end interface is supposed to run alongside a Java Spring backend. To make sure the front end calculator is working, make sure your running your Java Spring backend on port 8080 alongside this front end.

## How this calculator works

This calculator front end is supposed to be used for Git training purposes -- During the exercise, participants shouldn't have to modify any frontend code, this is used as a testing client to make sure participants backend APIs work as desired.

This calculator displays two text boxes, four buttons, and a results label. When a button is clicked, it makes the proper API call to the Math API (which participants build) and displays the results.

|Route|Method|
|:-|:-|
|/api/math/add|POST|
|/api/math/subtract|POST|
|/api/math/multiply|POST|
|/api/math/divide|POST|

The frontend expects a JSON object with the right mathematical results structured as: `{ "result": 5 }`
