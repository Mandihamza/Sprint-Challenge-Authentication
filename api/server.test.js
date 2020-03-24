const supertest = require("supertest")

const server = require("./server")

test("welcome route", async () => {
    const res = await supertest(server).get("/api/welcome")
    expect(res.statusCode).toBe(200)
    expect(res.type).toBe("application/json")
    expect(res.body.message).toBe("Welcome to the sprint-challenge-authentication api!")
})
