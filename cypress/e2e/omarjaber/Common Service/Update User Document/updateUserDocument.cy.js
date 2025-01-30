// const { faker } = require("@faker-js/faker");


describe("Update user document successfully with status code 200", () => {
  let accessToken, enrollmentId, documentId;

  before(() => {
    cy.fixture("studentToken.json").then(({ studentLoginToken }) => {
      accessToken = studentLoginToken;
    });
    cy.fixture("studentLoginID.json").then(({ enrollmentId: id }) => {
      enrollmentId = id;
    });
    cy.fixture("documentId.json").then(({ documentId: id }) => {
      documentId = id;
    });
  });

  it("Should successfully update user document", () => {
    cy.request({
      method: "PATCH",
      url: `/document/userdocument/update/${documentId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Enrollment: enrollmentId,
      },
      body: {
        name: "Mahfuzur Rahman",
        // name: faker.person.fullName(),
        description: "Updated description by omar jafor chowdhury jaber",
        attachment: [],
      },
      failOnStatusCode: false,
    }).then((response) => {

      expect(response.status).to.eq(200);
      expect(response.duration).to.be.lessThan(2000);
      expect(response.body).to.have.property("success", true);

      cy.log("User document updated successfully");
      cy.log("Response Body:", JSON.stringify(response.body, null, 2));
    });
  });
});
