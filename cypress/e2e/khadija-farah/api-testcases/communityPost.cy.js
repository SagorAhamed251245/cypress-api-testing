//Test Case: Verify that a user can successfully retrieve all community posts using the `/content/community/post/getall` endpoint with a valid access token and organization ID, and receive a status code of 200. Ensure the response confirms success and the process completes within 2 seconds.
describe('Verify Retrieve All Community Posts API', () => {
    let accessToken;
    let organizationId;

    before(() => {
        cy.fixture("token.json").then((data) => {
            accessToken = data.token;
            organizationId = data.organization;
        });
    });

    it('should retrieve all community posts successfully', () => {
        cy.request({
            method: 'POST',
            url: '/content/community/post/getall',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                organization: organizationId,
            },
            failOnStatusCode: false,

        }).then((response) => {

            cy.log('Response Status:', response.status);
            cy.log('Response Body:', JSON.stringify(response.body));

            expect(response.status).to.eq(200);
            expect(response.duration).to.be.lessThan(2000);

            // Ensure the response body contains a success confirmation
            expect(response.body).to.have.property('success').and.to.eq(true);

        
        });
    });
});
