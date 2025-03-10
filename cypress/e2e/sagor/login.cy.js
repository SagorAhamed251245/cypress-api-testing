/// <reference types="cypress" />

describe("User Registration API Test", () => {
  let userInfo;
  let headersData;
  before(() => {
    cy.readFile("cypress/fixtures/headers.json").then((data) => {
      headersData = data;
      //console.log(data);
    });
  });

  before(() => {
    cy.readFile("cypress/fixtures/userInfo.json").then((data) => {
      userInfo = data;
      //console.log(data);
    });
  });

  it("should successfully register a user with valid details", () => {
    // API request
    cy.request({
      method: "POST",
      url: "/user/login",
      body: userInfo,

      headers: {},
    }).then((response) => {
      console.log(response);
      // Validate status code
      expect(response.status).to.eq(200);

      // Validate response body
      expect(response.body).to.have.property("success", true);

      cy.writeFile("cypress/fixtures/headers.json", {
        ...headersData,
        Authorization: response.body.token,
      });

      //expect(response.body.message).to.include("Account created successfully");
    });
  });
});
