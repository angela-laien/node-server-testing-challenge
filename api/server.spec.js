const request = require("supertest");

const server = require("./server.js");
const db = require("../data/dbConfig.js");

describe("server", function () {

    describe("GET /", function () {
        it("should return 200 OK", function () {
          // make a GET request to / endpoint on the server
          return request(server) // return the async call to let jest know it should wait
            .get("/")
            .then(res => {
              // assert that the HTTP status code is 200
              expect(res.status).toBe(200);
            });
        });
      });
    
      describe("POST /recipes", function () {
        beforeEach(async () => {
          await db("recipes").truncate(); // empty the table and reset the id back to 1
        });
    
        it("return 201 on success", function () {
          return request(server)
            .post("/recipes")
            .send({ name: "Garden Salad" })
            .then(res => {
              expect(res.status).toBe(201);
            });
        });
    
        it('should return a message saying "Recipe created successfully"', function () {
          return request(server)
            .post("/recipes")
            .send({ name: "Garden Salad" })
            .then(res => {
              expect(res.body.message).toBe("Recipe created successfully");
            });
        });
    
        it("add the recipe to the db", async function () {
          const recipeName = "Tuna Salad";
    
          const existing = await db("recipes").where({ name: recipeName });
          expect(existing).toHaveLength(0);
    
          await request(server)
            .post("/recipes")
            .send({ name: recipeName })
            .then(res => {
              expect(res.body.message).toBe("Recipe created successfully");
            });
          await request(server)
            .post("/recipes")
            .send({ name: "Tuna Salad" })
            .then(res => {
              expect(res.body.message).toBe("Recipe created successfully");
            });
    
          const inserted = await db("recipes");
          expect(inserted).toHaveLength(2);
        });
      });
  
});
