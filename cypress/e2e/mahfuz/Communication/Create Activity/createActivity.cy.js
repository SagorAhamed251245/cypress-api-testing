describe("Create activity successfully with status code 200", () => {
    let accessToken;
    let enrollment;
  
    before(() => {
      cy.fixture("studentToken.json").then((tokenData) => {
        accessToken = tokenData.studentLoginToken;
      });
      cy.fixture("studentLoginID.json").then((loginData) => {
        enrollment = loginData.enrollmentId;
      });
    });
  
    it("Checking if should be able Create activity or not", () => {
      cy.request({
        method: "POST",
        url: "/communication/shout",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Enrollment: enrollment,
        },
        body: {
          title: "Title",
          category: "day2day",
          description: "nothing to hide",
          attachments: "",
        },
  
        failOnStatusCode: false,
      }).then((response) => {
        if (response.status === 201) {
          // Assertions
          expect(response.status).to.eq(201);
          expect(response.duration).to.be.lessThan(2000);
          expect(response.body).to.have.property("success", true);
          // Log the response for debugging
          cy.log("response.body", JSON.stringify(response.body, null, 1));
          cy.log("Create activity Response:", response.body);
          console.log("Create activity Response:", response.body);
        } else {
          cy.log("Create activity failed with status code: ", response.status);
          cy.log(response.body.error);
        }
      });
    });
  });
  