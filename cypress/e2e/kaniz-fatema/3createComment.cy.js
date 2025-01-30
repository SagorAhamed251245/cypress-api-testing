//  <reference type="Cypress"/>

describe("Create Comment API Testing", () => {
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

  it("should successfully create a comment on a community post", () => {
    cy.request({
      method: "POST",
      url: "/content/comment/create",
      headers: headers,
      body: {
        comment: "This is a test comment.",
        contentId: contentId,
      },
    }).then((response) => {
      cy.log(response);
      console.log(response);
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("success", true);

      expect(response.duration).to.lessThan(2000);
      cy.writeFile(
        "cypress/fixtures/kaniz/comments.json",
        response.body.comment
      );
    });
  });
});
