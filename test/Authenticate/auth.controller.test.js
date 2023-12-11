require('dotenv').config();

const chai = require('chai');
const chaiHttp  = require('chai-http');
const app = require('../../server');

chai.use(chaiHttp);

const expect = chai.expect;
const KEY = process.env.KEY;
describe('Authorization tests', () => {
it('Register new user in DB, status 200', async () =>  {
    const newUser = {
        'userAuthID': 'testPassword',
        'userName': 'user test',
        'userEmail': 'user@email.test',
    }
    const res = await chai
    .request(app)
    .post('/register')
    .send(newUser);

    expect(res).to.have.status(200);
});


});