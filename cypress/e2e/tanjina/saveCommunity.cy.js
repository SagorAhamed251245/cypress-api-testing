describe("Community Post Save Test", () => {
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

  it("Verify that a user can successfully save a community post", () => {
    cy.request({
      method: "POST",
      url: "/content/community/post/option/save",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        post: postId,
        action: "save",
      },
    }).then((response) => {
      cy.log(response);
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("success", true);
      expect(response.duration).to.lessThan(2000);
    });
  });
});
