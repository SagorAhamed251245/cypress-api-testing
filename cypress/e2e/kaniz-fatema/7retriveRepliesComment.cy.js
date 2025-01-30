//  <reference type="Cypress"/>

describe("Retrive Replies Comment API Testing", () => {
  let contentId;
  let headers;
  let parentId;

  before(() => {
    cy.readFile("cypress/fixtures/kaniz/headers.json").then((data) => {
      headers = data;
    });
  });

  before(() => {
    cy.readFile("cypress/fixtures/kaniz/comments.json").then((data) => {
      parentId = data._id;
      contentId = data.contentId;
    });
  });

  it("retrieve replies comments on a community post using", () => {
    expect(contentId, "Access token should be available").to.exist;
    expect(parentId, "Community post ID should be available").to.exist;

    cy.request({
      method: "GET",
      url: `/content/comment/get/${contentId}?parentId=${parentId}`,
      headers: headers,
      failOnStatusCode: false,
    }).then((response) => {
      cy.log(response);
      console.log(response);
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("success", true);

      expect(response.duration).to.lessThan(2000);
    });
  });
});
