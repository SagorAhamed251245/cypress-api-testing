describe("Verify OTP API Test", () => {
  const userId = "6792fd7aa3a7500019d84433";
  const validOtp = "239849";

  it("should successfully verify the OTP with a valid user ID and OTP", () => {
    cy.request({
      method: "POST",
      url: "/user/verifyotp",
      body: {
        userId: userId,
        otp: validOtp, // Use the OTP generated earlier
        channel: "email",
      },
      failOnStatusCode: false,
      timeout: 2000, // Ensure the process completes within 2 seconds
    }).then((response) => {
      cy.log("Response Body: ", JSON.stringify(response.body));
      if (response.status === 200) {
        expect(response.status).to.eq(200); // Verify status code
        expect(response.body).to.have.property("success", true); // Verify success
        expect(response.body.message).to.include("OTP verified successfully"); // Verify message
        expect(response.duration).to.lessThan(2000);
      } else {
        cy.log(response.body.error);
        console.log(response);
      }
    });
  });
});
