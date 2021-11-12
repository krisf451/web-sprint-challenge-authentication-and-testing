const server = require("./server");
const request = require("supertest");
const db = require("../data/dbConfig.js");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db.seed.run();
});
afterAll(async () => {
  await db.destroy();
});

test("sanity", () => {
  expect(true).toBe(true);
});

describe("[POST] /api/auth/register", () => {
  test("register user returns the correct shape of the newly created user", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({ username: "testUsername", password: "1234" });
    expect(res.body).toMatchObject({ id: 5, username: "testUsername" });
  });
  test("register user returns the correct status", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({ username: "testUsername", password: "1234" });
    expect(res.status).toBe(201);
  });
});
describe("[POST] /api/auth/login", () => {
  test("Login returns the correct response for a successful login", async () => {
    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "sam", password: "1234" });
    expect(res.body).toMatchObject({ message: "sam is back" });
    expect(res.body).toHaveProperty("token");
  });
  test("Login returns the correct status", async () => {
    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "sam", password: "1234" });
    expect(res.status).toBe(200);
  });
});
describe("[GET] /api/jokes", () => {
  test("can get all jokes with a valid token in the header", async () => {
    const res = await request(server).get("/api/jokes").set({
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InNhbSIsImlhdCI6MTYzNjc1MTU2OSwiZXhwIjoxNjM2ODM3OTY5fQ.kw75yGya_itcfbGFt8oYRVAZkeDgMkIhj-UOUB4rYRc",
    });
    expect(res.body).toMatchObject([
      {
        id: "0189hNRf2g",
        joke: "I'm tired of following my dreams. I'm just going to ask them where they are going and meet up with them later.",
      },
      {
        id: "08EQZ8EQukb",
        joke: "Did you hear about the guy whose whole left side was cut off? He's all right now.",
      },
      {
        id: "08xHQCdx5Ed",
        joke: "Why didn’t the skeleton cross the road? Because he had no guts.",
      },
    ]);
  });
  test("responds correct status on successful request", async () => {
    const res = await request(server).get("/api/jokes").set({
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InNhbSIsImlhdCI6MTYzNjc1MTU2OSwiZXhwIjoxNjM2ODM3OTY5fQ.kw75yGya_itcfbGFt8oYRVAZkeDgMkIhj-UOUB4rYRc",
    });
    expect(res.status).toBe(200);
  });
});
