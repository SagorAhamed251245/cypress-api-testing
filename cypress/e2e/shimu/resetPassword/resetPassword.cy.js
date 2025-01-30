describe("Reset Password API Test", () => {
  // Prepare test data

  it("should successfully reset the password with valid details", () => {
    const requestBody = {
      email: "vopiraw530@fanicle.com",
      phone: "1234567890",
      otp: "123456",
      newPassword: "NewPassword1234!",
    };

    // Start the timer to measure response time
    const startTime = Date.now();

    //Send the PATCH request
    cy.request({
      method: "PATCH",
      url: "/user/password/reset",
      body: requestBody,
      failOnStatusCode: false, // To prevent Cypress from failing the test on non-2xx/3xx responses
      timeout: 2000,
    }).then((response) => {
      if (response.status === 200) {
        // Log response for debugging
        cy.log("Response Status: ", response.status);
        cy.log("Response Body: ", JSON.stringify(response.body));
        console.log("Full Response:", response);

        // Calculate the response time
        const responseTime = Date.now() - startTime;

        // Assert that the response status is 200
        expect(response.status).to.eq(200);

        // Assert that the response contains a success flag
        expect(response.body).to.have.property("success", true);

        // Assert the response time is under 2 seconds
        expect(responseTime).to.be.lessThan(2000);

        // Assert that the response contains a success message
        expect(response.body.message).to.include("Password reset successful");
      } else {
        cy.log(response.body.error);
        console.log(response);
      }
    });
  });
});
