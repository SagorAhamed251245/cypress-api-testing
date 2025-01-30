//  <reference type="Cypress"/>

describe("Update Comment API Testing", () => {
  let contentId;
  let headers;
  let commentId;
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

  before(() => {
    cy.readFile("cypress/fixtures/kaniz/comments.json").then((data) => {
      commentId = data._id;
    });
  });

  it("should successfully update a comment on a community post", () => {
    cy.request({
      method: "PATCH",
      url: `/content/comment/update/${commentId}`,
      headers: headers,
      body: {
        comment: "This is a test comment in the community.",
        contentId: contentId,
      },
    }).then((response) => {
      cy.log(response);
      console.log(response);
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("success", true);

      expect(response.duration).to.lessThan(2000);
    });
  });
});
