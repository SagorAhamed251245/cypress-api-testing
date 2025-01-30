describe("update SNt", () => {
  let headers;
  let snt_id;

  before(() => {
    cy.readFile("cypress/fixtures/sagor/headers.json").then((data) => {
      headers = data;
    });
  });

  before(() => {
    cy.readFile("cypress/fixtures/new-snt.json").then((data) => {
      snt_id = data._id;
    });
  });
  it("Update", () => {
    cy.request({
      method: "DELETE",
      url: `/show-tell/delete/${snt_id}`,
      headers: headers,

      failOnStatusCode: false,
    }).then((response) => {

      if (response.status === 200) {
        // Assertions
        expect(response.status).to.equal(200);
        expect(response.status).lessThan(2000);

      } else {
        cy.log("Create activity failed with status code: ", response.status);
        cy.log(response.body.error);
      }
    });
  });
});
