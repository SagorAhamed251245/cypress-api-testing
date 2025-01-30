describe("Send OTP API Test", () => {
  const userId = "6792fd7aa3a7500019d84433";
  let authToken;

  before(() => {
    cy.fixture("authInfo.json").then((data) => {
      authToken = data.token;
    });
  });

  it("should send OTP to user's email successfully with a valid user ID", () => {
    cy.request({
      method: "POST",
      url: "/user/sendotp",
      body: {
        userId: userId,
        channel: "email",
        captchaToken: "",
      },
      failOnStatusCode: false,
      timeout: 3000,
      headers: {
        Authorization: authToken,
      },
    }).then((response) => {
      cy.log("Response Body: ", JSON.stringify(response.body));
      console.log("Send OTP Response:", response.body);

      if (response.body.success) {
        cy.log("OTP sent successfully.");
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("success", true);
        expect(response.duration).to.lessThan(3000);
      } else {
        cy.log(
          "Cooldown in progress. Please wait before generating another OTP.",
          response.body.error
        );
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property("success", false);
        expect(response.body).to.have.property("error");
      }
    });
  });
});
