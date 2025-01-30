//  <reference type="Cypress"/>

describe("Reply Comment API Testing", () => {
  let contentId;
  let headers;
  let parentId;
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
      parentId = data._id;
    });
  });

  it("should successfully reply a comment on a community post", () => {
    cy.request({
      method: "POST",
      url: "/content/comment/create",
      headers: headers,
      body: {
        comment: "This is a The reply of the comment.",
        contentId: contentId,
        parentId: parentId,
      },
    }).then((response) => {
      cy.log(response);
      console.log(response);
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("success", true);

      expect(response.duration).to.lessThan(2000);
      cy.writeFile(
        "cypress/fixtures/kaniz/comments-reply.json",
        response.body.comment
      );
    });
  });
});
