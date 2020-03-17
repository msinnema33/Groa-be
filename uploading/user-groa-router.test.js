const request = require("supertest");
const server = require("../api/server.js");

const testHelpers = require("../utils/testingHelpers.js");

beforeEach(testHelpers.prepDBTest("users"));
afterEach(testHelpers.truncateTable("user_groa_ratings"));

describe("POST /users/:user_id/add-movie-rating", () => {
  it("adds a new movie rating and gives a success message", async () => {
    const res = await request(server)
      .post("/users/1/add-movie-rating")
      .send({
        name: "American Psycho",
        year: 2000,
        rating: 3
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Success");
  });
});
