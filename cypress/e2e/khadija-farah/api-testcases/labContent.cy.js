describe('Verify Retrieve Lab Content API', () => {
    let accessToken;
    let enrollmentId;
  
    before(() => {
      // Fetch the token and enrollmentId from a fixture or environment
      cy.fixture("token.json").then((data) => {
        accessToken = data.token; 
        enrollmentId = data.Enrollment; 
      });
    });
  
    it('should retrieve lab content successfully', () => {
      cy.request({
        method: 'GET',
        url: '/content/labcontent', // Endpoint to retrieve lab content
        headers: {
          Authorization: `Bearer ${accessToken}`, // Authorization header with Bearer token
          Enrollment: enrollmentId, // Include the enrollment ID header
        },
        failOnStatusCode: false, // Prevent Cypress from failing the test on non-2xx status codes
  
      }).then((response) => {
        // Log the response body to inspect it if needed
        cy.log('Response Status:', response.status);
        cy.log('Response Body:', JSON.stringify(response.body));
  
        // Check that the status code is 200
        expect(response.status).to.eq(200);
  
        // Ensure the request completes in less than 2 seconds
        expect(response.duration).to.be.lessThan(2000);
  
        // Ensure the response body contains a success confirmation
        expect(response.body).to.have.property('success').and.to.eq(true);
  
      
      });
    });
  });
  