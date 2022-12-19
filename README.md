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

https://plannercompass.onrender.com/api/v1/users/signup // deployment endpoint
```javascript
{
	"firstName": "Agustin",
	"lastName": "Arroyos",
	"birthDate": "1999-8-19",
	"city": "Posadas",
	"country": "Jardin",
	"email": "Anibal@gmail.com",
	"dni": "700000",
	"password": "12345678",
	"confirmPassword": "12345678"
}


```

#### Login(POST)
http://localhost:4000/api/v1/users/signin // local endpoint

https://plannercompass.onrender.com/api/v1/users/signin // deployment endpoint
```javascript
{
    "email":"Anibal@gmail.com",
    "password":"12345678"
}
```

***We need authorization of type bear token to manipulate events*
**

>Token example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTA2N2JjYTg0MWFjNGZkZjQ3NTZkNCIsImlhdCI6MTY3MTQ1Njc1MCwiZXhwIjoxNjc0MDQ4NzUwfQ.woTyB0taivIFogRsuohoLhQmJKf-0IvrCHmOfQZ1_8Q 

#### Create event(POST)
http://localhost:4000/api/v1/events/ // local endpoint

https://plannercompass.onrender.com/api/v1/events // deployment endpoint

```javascript
{
"description": "event 3",
"dayOfWeek": "wednesday"
}

```

#### Show all event(GET)
http://localhost:4000/api/v1/events/  //local endpoint

https://plannercompass.onrender.com/api/v1/events/ // deployment endpoint


#### Find and show an event by its id(GET)
http://localhost:4000/api/v1/events/id/{ID} // local endpoint

https://plannercompass.onrender.com/api/v1/events/id/{ID} // deployment endpoint
> ID example: 63a074bad5377d69ae4349c9 



#### Find and show an event by day(GET)
http://localhost:4000/api/v1/events/day/{dayweek} // local endpoint

https://plannercompass.onrender.com/api/v1/events/day/{dayweek} // deployment endpoint
> dayweek example: saturday



#### Find and Delete an event by id(DELETE)
http://localhost:4000/api/v1/events/{ID} // local endpoint

https://plannercompass.onrender.com/api/v1/events/{ID} // deployment endpoint

#### Find and Delete an event by date(DELETE)
http://localhost:4000/api/v1/event/{dayweek} // local endpoint
> dayweek example: monday
https://plannercompass.onrender.com/api/v1/event/{dayweek} // deployment endpoint

