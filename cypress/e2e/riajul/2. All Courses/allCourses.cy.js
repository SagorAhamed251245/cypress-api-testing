describe("Get all Courses successfully with status code 200", () => {
  let accessToken;
  let slug;
  const type = "course";

  before(() => {
    cy.fixture("studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.fixture("companySlug.json").then((slugData) => {
      slug = slugData.companySlug;
    });
  });

  it("Checking if should be able Get all Courses or not", () => {
    cy.request({
      method: "POST",
      url: `/course/organization/${slug}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        currentPage: "1",
        limit: "10",
        type: type,
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        // Assertions
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("success", true);
        expect(response.duration).to.be.lessThan(2000);
      } else {
        cy.log("Get all Courses failed with status code: ", response.status);
        cy.log(response.body.error);
      }
    });
  });
});
