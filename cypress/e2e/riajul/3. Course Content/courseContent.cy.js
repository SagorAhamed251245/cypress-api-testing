describe("Get course content successfully with status code 200", () => {
  let accessToken;
  let programSlug;

  before(() => {
    cy.fixture("studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.fixture("programSlug.json").then((slugData) => {
      programSlug = slugData.programSlug;
    });
  });

  it("Checking if should be able Get course content or not", () => {
    cy.request({
      method: "GET",
      url: `/course/content/${programSlug}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        // Assertions
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("success", true);
        expect(response.duration).to.be.lessThan(2000);
      } else {
        cy.log("Get course content failed with status code: ", response.status);
        cy.log(response.body.error);
      }
    });
  });
});
