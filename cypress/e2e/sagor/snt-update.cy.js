describe("update SNt", () => {
  let showNTell;
  let headers;
  let snt_id;
  before(() => {
    cy.readFile("cypress/fixtures/snt-update.json").then((data) => {
      showNTell = data;
    });
  });

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
      method: "PATCH",
      url: `/show-tell/update/${snt_id}`,
      headers: headers,
      body: showNTell,
    }).then((res) => {
      expect(res.status).to.equal(200);
      expect(res.status).lessThan(2000);
    });
  });
});
