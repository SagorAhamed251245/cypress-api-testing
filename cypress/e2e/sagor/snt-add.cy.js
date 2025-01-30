describe("Show and Tell", () => {
  let showNTell;
  let headers;
  before(() => {
    cy.readFile("cypress/fixtures/snt.json").then((data) => {
      showNTell = data;
    });
  });

  before(() => {
    cy.readFile("cypress/fixtures/sagor/headers.json").then((data) => {
      headers = data;
    });
  });
  it("Create a Show and Tell", () => {
    cy.request({
      method: "POST",
      url: "/show-tell/add",
      headers: headers,
      body: showNTell,

      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.equal(200);
      cy.writeFile("cypress/fixtures/new-snt.json", res.body.item);

      // Assert that the response body contains a success message (adjust based on actual response structure)
      //   expect(res.body).to.have.property("message", "Login succeed");
    });
  });
});
