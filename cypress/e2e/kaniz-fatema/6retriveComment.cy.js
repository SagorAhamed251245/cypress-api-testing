//  <reference type="Cypress"/>

describe("Retrive Comment API Testing", () => {
  let contentId;
  let headers;

  before(() => {
    cy.fixture("post-details.json").then((data) => {
      contentId = data.post_id;
    });
  });

  before(() => {
    cy.readFile("cypress/fixtures/kaniz/headers.json").then((data) => {
      headers = data;
    });
  });

  it("retrieve comments on a community post using", () => {
    cy.request({
      method: "GET",
      url: `/content/comment/get/${contentId}`,
      headers: headers,
    }).then((response) => {
      cy.log(response);
      console.log(response);
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("success", true);

      expect(response.duration).to.lessThan(2000);

      cy.writeFile(
        "cypress/fixtures/kaniz/comments-details.json",
        response.body.comments
      );
    });
  });
});
