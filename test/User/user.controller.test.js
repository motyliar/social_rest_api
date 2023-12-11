require('dotenv').config();
// const fkill = require('fkill');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');

chai.use(chaiHttp);


const expect = chai.expect;
const USERROUTECODE = process.env.USERROUTECODE
describe('Testowanie endpointów', () => {
    let userIdToDelete;
   
    it(`Should return status 200`, async  () => {
        
      const res = await chai
        .request(app)
        .get(`${USERROUTECODE}/climbuser`);
        
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          
          
        });
    
  
    it(`Should return status 200 for get /1234`, async () => {
       const res = await chai
        .request(app)
        .get(`${USERROUTECODE}/climbuser/1234`);
        
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
          
    });
    it('Should create  new User, status 200:', async () => {
        const newUser = {
            "userAuthID" : "0000",
    "userName": "testName",
    "userEmail": "testEmail@test.com"
        };
        const createRes = await chai
        .request(app)
        .post(`${USERROUTECODE}/climbuser/`)
        .send(newUser);
        expect(createRes).to.have.status(200);    
        userIdToDelete = createRes.body.user._id;
    });
    it('Should update user, status 200', async () => {
        const updateUser = {
            "userAuthID": "1111"
        }
        const updateRes = await chai.request(app)
        .put(`${USERROUTECODE}/climbuser/${userIdToDelete}`)
        .send(updateUser);

        expect(updateRes).to.have.status(200);
    });
    it('Should delete user from DB, status 200', async () => {
        const deleteRes = await chai
        .request(app)
        .delete(`${USERROUTECODE}/climbuser/${userIdToDelete}`);

        expect(deleteRes).to.have.status(200);
    });
    
  });