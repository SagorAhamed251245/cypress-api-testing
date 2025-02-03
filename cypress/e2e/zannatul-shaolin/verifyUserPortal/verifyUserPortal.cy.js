describe("Verify user portal documents", () => {
  let token;

  before(() => {
    cy.readFile("cypress/fixtures/token.json").then((data) => {
      token = data.token;
    });
  });

  it("Verify that a user can successfully retrieve portal documents", () => {
    cy.request({
      method: "GET",
      url: " /docs/portal ",
      headers: {
        Authorization: `Bearer ${token}`
      },
    }).then((res)=> {
          expect(res.status).to.equal(200);
          expect(res.status).to.lessThan(2000);
    });
  });
});
