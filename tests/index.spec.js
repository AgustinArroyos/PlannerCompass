import app from "../app";
import { createEvent, showEvent, showEventbyday, } from "../Controllers/eventController.js";
import { createUser, signIn } from "../Controllers/userController.js";
import jest from "jest-mock";
import request from "supertest";

//Unit Testing for Controllers
describe("Unit Testing Controllers", function () {
    describe("Test -> createEvent", function () {
        it("should create a new event", async function () {

            const req = {
                body: {
                    description: "Event unit Test",
                    dayOfWeek: "Monday",
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            };

            const returnedEvent = await createEvent(req, res);

            expect(returnedEvent).toHaveProperty("description");
            expect(returnedEvent).toHaveProperty("dayOfWeek");
            expect(returnedEvent.description).toBe("Event unit Test");
            expect(returnedEvent.dayOfWeek).toBe("Monday");



        });

    })
    describe("Test -> showEvent", function () {
        it("should show all events", async function () {


            const req = {

            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            };
            const returnedEvents = await showEvent(req, res);

            expect(returnedEvents).toBeInstanceOf(Array);
            expect(returnedEvents[0]).toHaveProperty("description");
            expect(returnedEvents[0]).toHaveProperty("dayOfWeek");
            expect(returnedEvents[0].description).toBe("Event unit Test");
            expect(returnedEvents[0].dayOfWeek).toBe("Monday");

        });

    })

    describe("Test -> showEventbyday", function () {
        it("should show event by day", async function () {


            const req = {
                params: { weekDay: "Monday" }

            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            };
            const returnedEventsbyday = await showEventbyday(req, res);

            expect(returnedEventsbyday).toBeInstanceOf(Array);
            expect(returnedEventsbyday[0].description).toBe("Event unit Test");
            expect(returnedEventsbyday[0].dayOfWeek).toBe("Monday");

        });

    })

    describe("Test -> createUser", function () {
        it("should create User", async function () {

            // If you want to test the user creation, you need to delete the user from the database or change the email and dni of the user (same in the signIn test)
            //otherwise it will not be created again
            const req = {
                body: {
                    "firstName": "testname",
                    "lastName": "testlastname",
                    "birthDate": "1999-8-19",
                    "city": "testcity",
                    "country": "testcountry",
                    "email": "test@gmail.com",
                    "dni": "300000",
                    "password": "testpassword",
                    "confirmPassword": "testpassword",

                }
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            };
            const returneduser = await createUser(req, res);

            expect(returneduser.firstName).toBe("testname");
            expect(returneduser.lastName).toBe("testlastname");
            expect(returneduser.city).toBe("testcity");
            expect(returneduser.country).toBe("testcountry");
            expect(returneduser.email).toBe("test@gmail.com");
            expect(returneduser.dni).toBe("300000");

        });
    })
    describe("Test -> signIn", function () {
        it("should Login User", async function () {

            // If you change the email and dni in the createUser test, you must change it here too
            const req = {
                body: {
                    "email": "test@gmail.com",
                    "password": "testpassword"
                }
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            };
            const returneduser = await signIn(req, res);


            expect(returneduser.firstName).toBe("testname");
            expect(returneduser.email).toBe("test@gmail.com");
            expect(returneduser.dni).toBe("300000");
            expect(returneduser.city).toBe("testcity");
            expect(returneduser.country).toBe("testcountry");



        });
    })

})




// Integration Testing for endpoints
describe("Integration Testing endpoints", () => {
    describe(" Tests -> USERS", () => {

        describe("POST Login user /users", () => {

            let response;
            beforeAll(async () => {
                response = await request(app).post("/api/v1/users/signin").send({
                    "email": "Anibal@gmail.com",
                    "password": "12345678"
                })
            });

            it("should respond with code 200", async () => {
                expect(response.status).toBe(200);
                expect(response.headers["content-type"]).toContain("application/json");
            });

            it("should respond with JSON array", async () => {
                expect(response.body).toHaveProperty("email");
                expect(response.body).toHaveProperty("firstName");
                expect(response.body).toHaveProperty("token");
                expect(response.body).toHaveProperty("_id");
            });
        });

    });


    describe("Tests -> Events", () => {

        describe("GET show all /events", () => {


            it('should require authorization', function (done) {
                request(app)
                    .get('/api/v1/events')
                    .expect(401)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

            let response;
            var auth = {};
            beforeAll(loginUser(auth));
            beforeAll(async () => {
                response = await request(app).get("/api/v1/events").auth(auth.token, { type: 'bearer' }).send();
            });

            it('should respond with code 200', function (done) {
                expect(response.status).toBe(200);
                expect(response.headers["content-type"]).toContain("application/json");
                done();
            })

            it('should respond with JSON array', function (done) {
                expect(Array.isArray(response.body)).toBe(true)
                done();
            })
            it('should JSON array have eventos dentro', function (done) {
                response.body.forEach(event => {
                    expect(event).toHaveProperty('_id');
                    expect(event).toHaveProperty('description');
                    expect(event).toHaveProperty('dayOfWeek');
                    expect(event).toHaveProperty('createdAt');
                    expect(event).toHaveProperty('updatedAt');

                });
                done();
            })

        });

        describe('POST register events/events', () => {


            it('should require authorization', function (done) {
                request(app)
                    .get('/api/v1/events')
                    .expect(401)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

            let response;
            var auth = {};
            beforeAll(loginUser(auth));
            beforeAll(async () => {
                response = await request(app).post("/api/v1/events").auth(auth.token, { type: 'bearer' }).send({
                    "description": "Event test integration",
                    "dayOfWeek": "Monday"
                });
            });

            it('should respond with code 200', function (done) {
                expect(response.status).toBe(200);
                expect(response.headers["content-type"]).toContain("application/json");
                done();
            })

            it('should respond with JSON array', function (done) {
                expect(response.body).toHaveProperty('_id');
                expect(response.body).toHaveProperty('description');
                expect(response.body).toHaveProperty('dayOfWeek');
                expect(response.body).toHaveProperty('createdAt');
                expect(response.body).toHaveProperty('updatedAt');
                done();
            })

        }

        )

    });

});

function loginUser(auth) {

    return function (done) {
        request(app)
            .post('/api/v1/users/signin')
            .send({
                email: 'Anibal@gmail.com',
                password: '12345678'
            })
            .expect(200)
            .end(onResponse);

        function onResponse(err, res) {
            auth.token = res.body.token;
            return done();
        }
    };
}
