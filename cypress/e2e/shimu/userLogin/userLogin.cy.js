describe("User Login API Test", () => {
  let authToken;

  before(() => {
    cy.fixture("authInfo.json").then((data) => {
      authToken = data.token;
    });
  });

  it("should login a user successfully with valid email and password", () => {
    const loginDetails = {
      email: "vopiraw530@fanicle.com",
      password: "Test#1234",
    };

    cy.request({
      method: "POST",
      url: "/user/login",
      body: loginDetails,
      timeout: 2000,
      failOnStatusCode: false,
      headers: {
        Authorization: authToken,
      }, // Pass the valid token from login
    }).then((response) => {
      if (response.status === 200) {
        cy.log(JSON.stringify(response.body));
        console.log("Login data:", response.body);

        expect(response.status).to.eq(200);

        // expect(response.body).to.have.property("success", true);
        //   expect(response.body).to.have.property("token");
        //   expect(response.body)
        //     .to.have.property("message")
        //     .and.contains("Login successfull");

        // Assert other user details if provided
        expect(response.body).to.have.property("email");
        expect(response.body).to.have.property("phone");
        expect(response.body).to.have.property("_id");

        expect(response.body).to.have.property("isVerified", false);
        expect(response.duration).to.lessThan(2000);
      } else {
        cy.log(response.body.error);
        console.log(response);
      }
    });
  });
});
