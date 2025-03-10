/// <reference types="cypress" />

describe("Get all Commonity", () => {
  let headers;
  before(() => {
    cy.readFile("cypress/fixtures/headers.json").then((data) => {
      headers = data;
    });
  });
  console.log(headers);
  it("community", () => {
    cy.request({
      method: "POST",
      url: "/content/community/post/getall",
      headers: headers,
    }).then((res) => {
      if (res.status === 200) {
        console.log(res);
        expect(res.status).to.equal(200);
        expect(res.status).lessThan(2000);
      } else {
        cy.log("Something was wrong", res.status);
      }
    });
  });
});
