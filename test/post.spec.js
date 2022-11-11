process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should(); 

chai.use(chaiHttp);

describe('/GET  home', () => {
  it('it should send home message', (done) => {
     
    chai.request(server)
        .get('/') 
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');  
              res.body.should.have.property('message').eql('API service running 🚀')
          done();
        });
  });
});
describe('/GET post details',()=>{
  it('it should GET post details', (done)=>{
    const taskid = "636d3b15dbdc29aebc62d0af"
    chai.request(server)
        .get(`/api/v1/post/${taskid}`)
        .end((err, response)=>{
          response.should.have.status(200)   
          done();
        });
  });
 });  
 describe('/POST create post', ()=>{
  it('it should POST to create post',(done)=>{
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmQzNmFkMTc2ZDQ5N2JmNWY1YzQ3YiIsImlhdCI6MTY2ODEwMTgwNSwiZXhwIjoxNjcwNjkzODA1fQ.f56NwFloCRICcppJowqo-D6UwIoRYqjXvo_OSEJ2CGk";
     chai.request(server)
        .post('/api/v1/post')
        .set("Authorization", `Bearer ${token}`)
        .send({
          "title": "second",
          "description": "second new " 
      })
        .end((err, response)=>{
          response.should.have.status(200)
          done();
        })
  });
 });
 describe('/Delete delete post', ()=>{
  it('it should POST to follow user',(done)=>{
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmQzNmFkMTc2ZDQ5N2JmNWY1YzQ3YiIsImlhdCI6MTY2ODEwMTgwNSwiZXhwIjoxNjcwNjkzODA1fQ.f56NwFloCRICcppJowqo-D6UwIoRYqjXvo_OSEJ2CGk";
    const id = "636d3efc91aa30017560af64";
     chai.request(server)
        .delete(`/api/v1/post/${id}`)
        .set("Authorization", `Bearer ${token}`) 
        .end((err, response)=>{
          response.should.have.status(200)
          done();
        });
  });
 });