//  <reference type="Cypress"/>

describe("Delete Community Post API", () => {
  let communityPostId;
  let headers;

  before(() => {
    cy.readFile("cypress/fixtures/kaniz/post-details.json").then((data) => {
      communityPostId = data.post_id;
    });
  });

  before(() => {
    cy.readFile("cypress/fixtures/kaniz/headers.json").then((data) => {
      headers = data;
    });
  });

  it("should successfully delete a community post", () => {
    //     expect(accessToken, "Access token should be available").to.exist;
    //     expect(communityPostId, "Community post ID should be available").to.exist;

    cy.request({
      method: "DELETE",
      url: `/content/community/post/delete/${communityPostId}`,
      headers: headers,
      failOnStatusCode: false,
    }).then((response) => {
      console.log("Response Body:", response.body);
      console.log("Response Status:", response.status);
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("success");
      expect(response.duration).to.lessThan(2000);
    });
  });
});
