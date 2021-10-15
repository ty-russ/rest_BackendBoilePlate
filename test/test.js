"use strict";
const supertest = require("supertest");
const chai = require("chai");
const assert = chai.assert;
const should = chai.should();
const server = require("../app");
const Database = require("../db/db");
const ctrl = require("../controllers");
//const db = require()
//decribes the endpoint
describe("/addtest", () => {
  let request;
  //initiate DB
  let db = new Database("mongodb://localhost/tests");
  db.connect();

  let test_srv = {
    //add_test: () => Promise.resolve({ data: "foobar" }),
    //add_test: () => null,
    add_test: (req) => {
      return new Promise(async function (resolve, reject) {
        try {
          let newTest = await ctrl.test_ctrl.add_test(req);
          return resolve(newTest);
        } catch (err) {
          reject(err);
        }
      });
    },
  };
  let srv = () => {
    return Object.assign({}, test_srv);
  };

  //set up server
  before(() => {
    const app = server(srv);
    request = supertest.agent(app);
  });

  //test
  it("should return success", (done) => {
    //return request
    request
      .post("/api/addtest")
      .send({
        data: {
          test_name: "test name",
        },
      })
      .end(function (err, res) {
        if (err) done(err);
        console.log(res.body);
        assert.isString(res.body.test_id, "string");
      });
    done();
  });
});

// describe("/dogs", () => {
//   let request;
//   //define the attributes of the dependency
//   let axios = {
//     get: () => Promise.reject(new Error("Ooops!")),
//     //get: () => null,
//   };
//   //set up server
//   before(() => {
//     const app = server(axios);
//     request = supertest.agent(app);
//   });

//   //test
//   it("should return a 500 status", () => {
//     return request.get("/dogs").expect(500);
//   });
// });
