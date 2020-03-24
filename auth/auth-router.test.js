const supertest = require("supertest")

const server = require("../api/server")

test("register user route", async () => {
    const res = await supertest(server)
    .post("/api/auth/register")
    .send({ username: "fakeUser", password: "fakePassword", role: "admin"} )
    expect(res.statusCode).toBe(201)
    expect(res.type).toBe("application/json")
    expect(res.body.username).toBe("fakeUser")
    console.log(res)

})

test("register user with undefined role", async () => {
    const res = await supertest(server)
    .post("/api/auth/register")
    .send({ username: "newUser", password: "newPassword" } )
    expect(res.statusCode).toBe(201)
    expect(res.type).toBe("application/json")
    expect(res.body.username).toBe("newUser")
    console.log(res)

}) 

test("login user", async () => {
    const res = await supertest(server)
    .post("/api/auth/login")
    .send({ username: "fakeUser", password: "fakePassword" } )
    expect(res.statusCode).toBe(200)
    expect(res.type).toBe("application/json")
}) 

test("deny login due to wrong password", async () => {
    const res = await supertest(server)
    .post("/api/auth/login")
    .send({ username: "newUser", password: "wrongPassword" } )
    expect(res.statusCode).toBe(401)
    expect(res.type).toBe("application/json")
}) 

