describe("Template retrival API", () => {
  let token;
  let enrollment;

  //  token is stored in the fixture before using it in requests
  before(() => {
    // Retrieve the token from a fixture file before the test starts
    cy.fixture("credentials.json").then((data) => {
      token = data.token
      enrollment= data.Enrollment
    
      
    });
  });

  it("Template retrival Status", () => {
    console.log(token, enrollment);
    cy.request({
      method: "GET", // HTTP Method should be 'GET'
      url: "slide/myslides", //API end points
      headers: {
        Authorization: `Bearer ${token}`,
        Enrollment: enrollment,
      },

      failOnStatusCode: false, // Don't fail the test on non-2xx status codes
   }).then((response) => {
     // Check if the status is 200 or 401 based on the API response
     if(response.status === 200) {
       expect(response.status).to.eq(200);
       expect(response.duration).to.be.lessThan(2000);
       expect(response.body).to.have.property("success", true);
     } else {
       expect(response.status).to.eq(400);
     }
   });
    });
});
