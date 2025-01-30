describe("Report a community post", () => {
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

  it("reports a community post successfully", () => {
    cy.request({
      method: "POST",
      url: "/content/community/post/option/save",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        post: postId,
        action: "report",
        reason: "Inappropriate content",
        note: "This post contains offensive language.",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("success", true);
      expect(response.duration).to.lessThan(2000);
    });
  });
});
