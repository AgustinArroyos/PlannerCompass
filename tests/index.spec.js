import app from "../app";
import request from "supertest";

describe("Tests -> USERS", () => {

    describe("POST /users", () => {

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
                "description": "Event test",
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
            console.log(auth.token);
            return done();
        }
    };
}