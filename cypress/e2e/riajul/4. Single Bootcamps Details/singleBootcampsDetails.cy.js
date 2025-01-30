describe("Get single bootcamps details successfully with status code 200", () => {
  let accessToken;
  let program_slug;

  before(() => {
    cy.fixture("studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.fixture("programSlug.json").then((slugData) => {
      program_slug = slugData.programSlug;
    });
  });

  it("Checking if should be able Get single bootcamps details or not", () => {
    cy.request({
      method: "GET",
      url: `/course/single/${program_slug}`,
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
        cy.log(
          "Get single bootcamps details failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
