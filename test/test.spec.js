const request = require('request');
var expect = require('chai').expect;
// var should = require('chai').should();
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

describe('Checking all the post APIS ', () => {
  describe("Checking addPlayer status", () => {
    it('status', done => {
      const player = {
        "name": "name",
        "gender": 'M',
        "captain": "Yes"
      }
      chai.request('http://localhost:3000')
        .post("/addPlayer")
        .send(player)
        .end((err, responce) => {
          expect(responce.statusCode).to.equal(200);
          responce.body.should.be.a('array');
          // responce.body.should.have.property('name');
          done();
        })
    })
  })
})

describe("Checking the get apis ", () => {
  it("It should get all the players", (done) => {
    chai.request('http://localhost:3000')
      .get("/")
      .end((err, responce) => {
        expect(responce.statusCode).to.equal(200)
        done();
      })
  })

  describe("Checking add status", () => {
    it('status', done => {
      request('http://localhost:3000/', (_, response) => {
        expect(response.statusCode).to.equal(200);
        // expect(response.body).to.have.all.keys("PlayerId");
        // expect(response.body).to.be.a('array');
        done()
      })
    })
  })
})



// describe('#sum()', function () {

//   context('without arguments', function () {
//     it('should return 0', function () {
//       expect(0).to.equal(0)
//     })
//   })
// })

// describe('Status and content', () => {
//   describe("Checking delete status", () => {
//     it('status', done => {
//       request('http://localhost:3000/deletePlayer', (_, response) => {
//         expect(response.statusCode).to.equal(404)
//         done()
//       })
//     })
//   })
// })


// describe('Status and content', () => {
//   describe('Checking status', () => {
//     it('status', done => {
//       request('http://localhost:3000/', (_, response) => {
//         expect(response.statusCode).to.equal(200)
//         done()
//       })
//     })
//   })


//   describe('Post player gets', () => {
//     it('Checking the Input ', done => {
//       request.post('http://localhost:3000/addPlayer', {
//         json: {
//           gender: "M" ?? "F",
//           captain: "Yes" ?? "No"
//         }
//       }, (_, response) => {
//         expect(response.statusCode).to.equal(200)
//         done()
//       })
//     })
//   })
// })
