describe("Get user documents successfully with status code 200", () => {
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
  
    it("Should successfully fetch user documents", () => {
      cy.request({
        method: "GET",
        url: "/document/userdocument/get",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Enrollment: enrollmentId,
        },
        failOnStatusCode: false,
      }).then((response) => {

        expect(response.status).to.eq(201);
        expect(response.duration).to.be.lessThan(2000);
        expect(response.body).to.have.property("success", true);
  
        cy.log("User documents fetched successfully");
        cy.log(JSON.stringify(response.body, null, 2));
      });
    });
  });
  