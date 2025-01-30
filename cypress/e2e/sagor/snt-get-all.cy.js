describe("Get All SNT", () => {
  let headers;
  before(() => {
    cy.readFile("cypress/fixtures/sagor/headers.json").then((data) => {
      headers = data;
    });
  });
  it("get all snt", () => {
    cy.request({
      method: "GET",
      url: "/show-tell/myshows",
      headers: headers,
      //   failOnStatusCode: false,
    }).then((res) => {
      console.log(res);
      expect(res.status).to.equal(200);
      expect(res.status).lessThan(2000);

      // Assert that the response body contains a success message (adjust based on actual response structure)
      //   expect(res.body).to.have.property("message", "Login succeed");
    });
  });
});
