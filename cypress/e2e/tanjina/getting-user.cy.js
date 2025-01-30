describe("testing api with jsonplaceholder", () => {
  let accessToken;
  let organizationId;

  before(() => {
    cy.fixture("authentication.json").then((data) => {
      accessToken = data.token;
      organizationId = data.organization_id;
    });
  });

  it("get data from jsonplaceholder", () => {
    cy.request({
      method: "POST",
      url: "/content/community/post/create",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Organization: organizationId,
      },
      body: {
        title: "Creating a new post into the community",
        description: "community posts are working here",
      },
    }).then((response) => {
      cy.log(response);
      console.log(response);
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("success", true);
      expect(response.duration).to.lessThan(2000);
      cy.writeFile("cypress/fixtures/post-details.json", {
        post_id: response.body.post._id,
      });
    });
  });
});
