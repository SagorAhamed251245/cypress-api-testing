describe("Testing API - Retrieve Single Community Post", () => {
  let accessToken;
  let postId;

  before(() => {
    cy.fixture("authentication.json").then((data) => {
      accessToken = data.token;
    });

    cy.fixture("post-details.json").then((data) => {
      postId = data.post_id;
    });
  });

  it("should retrieve a single community post successfully", function () {
    cy.request({
      method: "GET",
      url: `/content/community/post/${postId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("success", true);
      expect(response.duration).to.be.lessThan(2000);
    });
  });
});
