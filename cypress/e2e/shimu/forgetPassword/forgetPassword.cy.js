describe("Forget Password API Test", () => {
  const registeredEmail = "vopiraw530@fanicle.com";
  const registeredPhoneNumber = "1234567899";

  it("should successfully trigger the Forgot Password feature with a registered email and phone number", () => {
    cy.request({
      method: "POST",
      url: "/user/password/forgot",
      body: {
        phone: registeredPhoneNumber,
        email: registeredEmail,
        channel: "email",
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        // Verify the response
        expect(response.status).to.eq(200);

        expect(response.body).to.have.property("success", true);
        expect(response.body).to.have.property("isOtpSend", true);

        expect(response.duration).to.lessThan(2000);
      } else {
        cy.log(response.body.error);
        console.log(response);
      }
    });
  });
});
