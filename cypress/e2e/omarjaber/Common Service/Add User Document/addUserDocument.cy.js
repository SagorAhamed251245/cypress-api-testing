// const { faker } = require("@faker-js/faker");

describe("Add user document successfully with status code 200", () => {
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

  it("Should successfully add a user document and save its ID", () => {
    cy.request({
      method: "POST",
      url: "/document/userdocument/add",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Enrollment: enrollmentId,
      },
      body: {
        // name: faker.person.fullName(),
        name: "Mahfuzur Rahman",
        description: "Random description text by omar jafor chowdhury jaber",
        attachment: [],
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("success", true);

      // Write the document ID to a file inside the test block
    //   cy.writeFile("cypress/fixtures/documentId.json", {
    //     documentId: response.body.document._id,
    //   });

      cy.log("Document ID written to file successfully.");
    });
  });
});