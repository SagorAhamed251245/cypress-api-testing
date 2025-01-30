describe("Upload user document file with status code 200", () => {
    let accessToken;
  
    before(() => {
      cy.fixture("studentToken.json").then(({ studentLoginToken }) => {
        accessToken = studentLoginToken;
      });
    });
  
    it("Should successfully upload user document file", () => {
      const filePath = "image1.png";
  
      cy.fixture(filePath, "binary")
        .then(Cypress.Blob.binaryStringToBlob)
        .then((blob) => {
          const formData = new FormData();
          formData.append("file", blob, filePath);
  
          cy.request({
            method: "POST",
            url: "/document/userdocumentfile",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
            failOnStatusCode: false,
            encoding: "binary",
          }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log("User document file uploaded successfully");
          });
        });
    });
  });  