describe("Create my issue post successfully with status code 200", () => {
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
  
    it("Should successfully create an issue post", () => {
      const requestBody = {
        title: "Test by omar",
        date: "2024-12-20T18:00:00.000Z",
        description: "Omar jafor chowdhury jaber test issue",
        category: "issues",
      };
  
      cy.request({
        method: "POST",
        url: "/communication/create",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Enrollment: enrollmentId,
        },
        body: requestBody,
        failOnStatusCode: false,
      }).then((response) => {

        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(2000);
        expect(response.body).to.have.property("success", true);
  
        cy.log("Issue post created successfully");
        cy.log(JSON.stringify(response.body, null, 2));
        console.log("Issue post created successfully:", response.body);
      });
    });
  });