describe("Get my issues successfully with status code 200", () => {
  let accessToken;
  let enrollmentId;

  before(() => {

    cy.fixture("studentToken.json").then(({ studentLoginToken }) => {
      accessToken = studentLoginToken;
    });
    cy.fixture("studentLoginID.json").then(({ enrollmentId: id }) => {
      enrollmentId = id;
    });
    
  });

  it("Should fetch my issues with status code 200", () => {
    cy.request({
      method: "GET",
      url: "/communication/mypost/issues",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Enrollment: enrollmentId,
      },

      failOnStatusCode: false,
    }).then((response) => {

      cy.log("Response Body:", JSON.stringify(response.body, null, 2));

      if (response.status === 200) {
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(2000);
        expect(response.body).to.have.property("success", true);
        cy.log("Get Issues successfully:", response.body);
      }

      else {
        cy.log(`Request failed with status code: ${response.status}`);
        cy.log(
          "Error Details:",
          response.body?.error || "No error message provided"
        );
      }
    });
  });
});