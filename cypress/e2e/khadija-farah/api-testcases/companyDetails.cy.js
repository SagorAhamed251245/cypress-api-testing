//Test Case: Verify that a user can successfully retrieve company details using the `/organization/details/{slug}` endpoint with a valid access token and slug, and receive a status code of 200. Ensure the response confirms success and the process completes within 2 seconds.
describe('Verify Company Details API', () => {
   
    let slug ='first-org-test'; 
    let accessToken;

    before(() => {
      cy.fixture("token.json").then((data) => {
        accessToken = data.token;
      });
    });
    it('should retrieve company details successfully', () => {
      cy.request({
        method: 'GET',
        url: `/organization/details/${slug}`, 
        headers: {
          Authorization: `Bearer ${accessToken}`, 
        },
        failOnStatusCode: false,
      }).then((response) => {
        // Check the response status code
        expect(response.status).to.eq(200);
        expect (response.duration).to.be.lessThan(2000);
        
      });
    });
  });
  