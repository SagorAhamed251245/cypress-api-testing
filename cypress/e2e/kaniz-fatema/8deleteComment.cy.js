//  <reference type="Cypress"/>

describe("Delete Comment API Testing", () => {
  let commentId;
  let headers;

  // before(() => {
  //   cy.fixture("post-details.json").then((data) => {
  //     contentId = data.post_id;
  //   });
  // });

  before(() => {
    cy.readFile("cypress/fixtures/kaniz/headers.json").then((data) => {
      headers = data;
    });
  });

  before(() => {
    cy.readFile("cypress/fixtures/kaniz/comments.json").then((data) => {
      commentId = data._id;
    });
  });

  it("delete comments on a community post using", () => {
    cy.request({
      method: "DELETE",
      url: `/content/comment/delete/${commentId}`,
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
