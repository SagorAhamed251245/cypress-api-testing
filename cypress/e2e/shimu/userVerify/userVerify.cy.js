describe("User Verification API Test", () => {
  let authToken;

  before(() => {
    cy.fixture("authInfo.json").then((data) => {
      authToken = data.token;
    });
  });
  it("should verify the user successfully with a valid token", () => {
    cy.request({
      method: "POST",
      url: "/user/verify",
      failOnStatusCode: false,
      headers: {
        Authorization: authToken,
      }, // Pass the valid token from login
      timeout: 3000,
    }).then((response) => {
      if (response.status === 200) {
        cy.log(JSON.stringify(response.body));
        console.log("Verification Response:", response.body);

        // Assertions
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("success", true);
        expect(response.duration).to.lessThan(3000);
      } else {
        cy.log(response.body.error);
        console.log(response);
      }
    });
  });
});
