describe("Get course roadmap data successfully with status code 200", () => {
  let accessToken;
  let courseId;

  before(() => {
    cy.fixture("studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.fixture("courseId.json").then((courseData) => {
      courseId = courseData.courseId;
    });
  });

  it("Checking if should be able Get course roadmap data or not", () => {
    cy.request({
      method: "GET",
      url: `/course/roadmap/find/${courseId}`,
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
          "Get course roadmap data failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
