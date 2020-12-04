// Dette er mine forsøg på testing indtil videre. 

/*
// forsøg på at benytte samme fremgangsmåde til at teste, som vi fik gennemgået i undervisningen. 
var expect = require('chai').expect;
var potens = require('../pow')
 
describe('/GET matches?', () => {
    it('Burde hente alle brugere oprettet i systemet', (done) => {
      chai.request(server)
          .get('/book')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
            done();
          })
        })
    })
*/

/*
// Kilde: https://medium.com/@osahonoboite/testing-restful-apis-using-mocha-chai-and-chai-http-plugin-4b9feb45d50
// virker ikke

import chai from 'chai';
import chaiHttp from 'chai-http'
import app from '../Server/API'

const {expect} = chai;

chai.use(chaiHttp);

describe('matches'() => {
    describe('GET /matches', () => {
        it('Burde returnere et array af alle brugere', (done)=> {
            chai.request(app)
            .get('/matches')
        });
    });
});
*/

/*
// Kilde: https://kishanchaitanya.medium.com/api-testing-using-mocha-chai-and-supertest-a7c7edc96c24 
// Virker ikke: sh: mocha: command not found

const superTest = require('supertest');
const chai = require('chai');
const expect = chai.expect;

const getrequest = 'https://localhost:2500/matches';
const GR = superTest(getrequest);

describe('My API', () => {
    
    it('Verify Response',  async () => {
        let response = await GR
                            .get('/storage.json')
                            .then(response => {
                                return response;
                            });
        expect(response.status, 'Status Successful').to.equal(200);
        expect(response.body.url, 'Url Contains').to.contains('https://localhost:2500/matches');
        
    });
});
*/
