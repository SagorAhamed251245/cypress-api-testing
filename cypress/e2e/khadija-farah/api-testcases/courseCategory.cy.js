//Test Case: Verify that a user can successfully retrieve course content by category using the `/content/getbycourse/{category}` endpoint with a valid access token and enrollment ID, and receive a status code of 200. Ensure the response confirms success and the process completes within 2 seconds.

describe('Verify Get Course Content by Category API', () => {
    let category ='64fcb60cce54960ad07b3948'; 
    let accessToken;
    let enrollmentId;

    before(() => {
        cy.fixture("token.json").then((data) => {
            accessToken = data.token;
            enrollmentId = data.Enrollment;
        });
    });

    it('should retrieve course content by category successfully', () => {
        cy.log('Access Token:', accessToken, 'Enrollment ID:', enrollmentId);
        cy.request({
            method: 'GET',
            url: `/content/getbycourse/${category}`, 
            
            headers: {
                Authorization: `Bearer ${accessToken}`, 
                Enrollment: enrollmentId 
            },

            failOnStatusCode: false, 
        }).then((response) => {
            // Log the response body to inspect the content
            cy.log('Response Body:', JSON.stringify(response.body));
            expect(response.status).to.eq(200);
            // Ensure the request completes in less than 2 seconds
            expect(response.duration).to.be.lessThan(2000);
            expect(response.body).to.have.property('success').and.to.eq(true);

            
        });
    });
});
