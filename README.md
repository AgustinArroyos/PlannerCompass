# PlannerCompass

# Challenge #03


## Requirements

- Node.js
- npm (comes with Node.js)

## Installation Local

1. Clone this repository
2. Install dependencies with `npm install`
3. Start the server with `npm run start` or `npm run dev` for development
4. You can use the endpoints with postman

### Postman endpoints


#### Register(POST)
http://localhost:4000/api/v1/users/signup // local endpoint

https://planner-compass.herokuapp.com/api/v1/users/signup // missing update
```javascript
{
	"firstName": "Agustin",
	"lastName": "Arroyos",
	"birthDate": "1999-8-19",
	"city": "Posadas",
	"country": "Jardin",
	"email": "agustin@gmail.com",
	"dni": "700000",
	"password": "12345678",
	"confirmPassword": "12345678"
}

```

#### Login(POST)
http://localhost:4000/api/v1/users/signin // local endpoint

https://planner-compass.herokuapp.com/api/v1/users/signin // missing update
```javascript
{
    "email":"agustin@gmail.com",
    "password":"123456"
}
```

***We need authorization of type bear token to manipulate events*
**

>Token example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzN2JhMDFjMDQ5YzAxZGMxZWFjZTdiYSIsImlhdCI6MTY2OTA0NjM1MCwiZXhwIjoxNjcxNjM4MzUwfQ.D8PvocYXLS-O8mYtbT1oOPDDKy1k-A-r_03ZRaDWBKs 

#### Create event(POST)
http://localhost:4000/api/v1/events/ // local endpoint

https://planner-compass.herokuapp.com/api/v1/events/ // missing update

```javascript
{ 
"description": "evento 4",
"dateTime": "2022-10-12T14:47:32.962Z",
"createdAt": "2022-10-12T14:47:32.962Z"
}
```

#### Show all event(GET)
http://localhost:4000/api/v1/events/  //localendpoint

https://planner-compass.herokuapp.com/api/v1/events/ // missing update


#### Find and show an event by its id(GET)
http://localhost:4000/api/v1/events/{ID} // local endpoint

https://planner-compass.herokuapp.com/api/v1/events/{ID} // missing update
> ID example: 6378e8dd9abdd0ae560e01fa // missing update



#### Find and show an event by day(GET)
http://localhost:4000/api/v1/events/{dayweek} // local endpoint

https://planner-compass.herokuapp.com/api/v1/events/{2022-11-12} //missing update
> dayweek example: monday



#### Find and Delete an event by id(DELETE)
http://localhost:4000/api/v1/events/{ID} // local endpoint

https://planner-compass.herokuapp.com/api/v1/events/6378e8d09abdd0ae560e01f7 //missing update

#### Find and Delete an event by date(DELETE)
http://localhost:4000/api/v1/event/{dayweek} // local endpoint
> dayweek example: monday
https://planner-compass.herokuapp.com/api/v1/event/2022-11-11 //missing update

