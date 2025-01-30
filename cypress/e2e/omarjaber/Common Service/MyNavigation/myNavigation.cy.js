describe("Get my navigation successfully with status code 200", () => {
  let accessToken;

  before(() => {
    cy.fixture("studentToken.json").then(({ studentLoginToken }) => {
      accessToken = studentLoginToken;
    });
  });

  it("Should successfully retrieve my navigation", () => {
    cy.request({
      method: "GET",
      url: "/navigation/mynavigations",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.duration).to.be.lessThan(2000);
      expect(response.body).to.have.property("success", true);

      cy.log("Navigation data retrieved successfully");
      cy.log(JSON.stringify(response.body, null, 2));
      console.log("Navigation data:", response.body);
    });
  });

  it("Should handle failures gracefully if navigation data cannot be retrieved", () => {
    cy.request({
      method: "GET",
      url: "/navigation/mynavigations",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      failOnStatusCode: false,
    }).then((response) => {

      if (response.status !== 200) {
        cy.log("Failed to retrieve navigation data");
        cy.log(`Status Code: ${response.status}`);
        cy.log(`Error: ${response.body.error || "Unknown error"}`);

        expect(response.status).to.eq(
          200,
          "Expected status code 200 but received a different code."
        );
      }
    });
  });
});
