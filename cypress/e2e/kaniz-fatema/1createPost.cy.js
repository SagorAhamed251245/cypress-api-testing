//  <reference type="Cypress"/>

describe("API testing", () => {
  let headers;
  before(() => {
    cy.readFile("cypress/fixtures/kaniz/headers.json").then((data) => {
      headers = data;
    });
  });

  it("Create post in community", () => {
    cy.request({
      method: "POST",
      url: "/content/community/post/create",
      headers: headers,
      body: {
        title: "Creating a new post into the community",
        description: "Community posts are working here",
      },
    }).then((response) => {
      cy.log(response);
      console.log(response);
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("success", true);
      expect(response.duration).to.lessThan(2000);
      cy.writeFile("cypress/fixtures/kaniz/post-details.json", {
        post_id: response.body.post._id,
      });
    });
  });
});
