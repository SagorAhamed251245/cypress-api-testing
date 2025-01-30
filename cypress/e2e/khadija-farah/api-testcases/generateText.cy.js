describe('Verify Generate Text API', () => {

    const prompt = 'What is the capital of France?';
    let accessToken;
    let organizationId;
    let enrollmentId;;

    before(() => {
        cy.fixture("token.json").then((data) => {
            accessToken = data.token;
            organizationId = data.organization;
            enrollmentId = data.Enrollment;

        });
    });

    it('should generate text successfully', () => {


        cy.request({
            method: 'POST',
            url:'/organization/integration/generate-text',
            headers: {
                organization: organizationId
                ,
                Enrollment: enrollmentId,
                Authorization: `Bearer ${accessToken}`,
            },
            body: {
               
                prompt: prompt       // The prompt for text generation
            },
           failOnStatusCode: false,
        }).then((response) => {
            // Check the response status code
            expect(response.status).to.eq(200);
            // expect (response.duration).to.be.lessThan(2000);
            // Ensure the response body contains the success confirmation and generated text
            expect(response.body).to.have.property('success').and.to.eq(true);
            // expect(response.body).to.have.property('generated_text'); // The field containing the generated text
            expect(response.body).to.have.property('text'); // Adjust this based on actual API response
            cy.log('Generated Text: ', response.body.text);
          
            
        });
    });
});
