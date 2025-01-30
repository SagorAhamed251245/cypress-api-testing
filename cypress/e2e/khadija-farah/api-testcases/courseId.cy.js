//Test Case: Verify that a user can successfully retrieve content details by content ID using the `/content/getcontent/{courseId}` endpoint with a valid access token and enrollment ID, and receive a status code of 200. Ensure the response confirms success and the process completes within 2 seconds.
describe('Verify Get Content Details by Content ID API', () => {
    let courseId ='6501f8b21c01cf0019303d0b'; 
    let accessToken;
    let enrollmentId;
    before(() => {
        cy.fixture("token.json").then((data) => {
            accessToken = data.token; 
            enrollmentId = data.Enrollment; 
        });
    });

    it('should successfully retrieve content details by content ID', () => {
        cy.request({
            method: 'GET',
            url: `/content/getcontent/${courseId}`, 
            headers: {
                Authorization: `Bearer ${accessToken}`, 
                Enrollment: enrollmentId 
            },
            failOnStatusCode: false, // Prevent Cypress from failing the test on non-2xx responses
            timeout: 2000 // Ensure the request completes within 2 seconds
        }).then((response) => {
            // Log the response body (for debugging purposes)
            cy.log('Response Body:', JSON.stringify(response.body));

            // Check if the response status is 200
            expect(response.status).to.eq(200);

            // Ensure the request completes in less than 2 seconds
            expect(response.duration).to.be.lessThan(2000);

            // Ensure the response contains a 'success' property and its value is true
            expect(response.body).to.have.property('success').and.to.eq(true);

        });
    });
});
