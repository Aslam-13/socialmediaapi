process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should(); 

chai.use(chaiHttp);


describe('/GET user details',()=>{
  it('it should GET user details', (done)=>{
    const taskid = "636d36ad176d497bf5f5c47b"
    chai.request(server)
        .get(`/api/v1/user/${taskid}`)
        .end((err, response)=>{
          response.should.have.status(200)  
          done();
        });
  });
 });

 describe('/POST follow user', ()=>{
  it('it should POST to follow user',(done)=>{
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmQzNmFkMTc2ZDQ5N2JmNWY1YzQ3YiIsImlhdCI6MTY2ODEwMTgwNSwiZXhwIjoxNjcwNjkzODA1fQ.f56NwFloCRICcppJowqo-D6UwIoRYqjXvo_OSEJ2CGk";
    const user = "636d36d99e7a314ed0f0e694";
    chai.request(server)
        .post(`/api/v1/user/${user}/follow`)
        .set("Authorization", `Bearer ${token}`)
        .end((err, response)=>{
          response.should.have.status(200)
          done();
        });
  });
 });
 describe('/POST unfollow user', ()=>{
  it('it should POST to follow user',(done)=>{
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmQzNmFkMTc2ZDQ5N2JmNWY1YzQ3YiIsImlhdCI6MTY2ODEwMTgwNSwiZXhwIjoxNjcwNjkzODA1fQ.f56NwFloCRICcppJowqo-D6UwIoRYqjXvo_OSEJ2CGk";
    const user = "636d36d99e7a314ed0f0e694";
    chai.request(server)
        .post(`/api/v1/user/${user}/unfollow`)
        .set("Authorization", `Bearer ${token}`)
        .end((err, response)=>{
          response.should.have.status(200)
          done();
        });
  });
 });