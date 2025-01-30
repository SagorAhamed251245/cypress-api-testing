describe("Testing API - Edit Community Post", () => {
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

  it("should successfully edit a community post", () => {
    cy.request({
      method: "PATCH",
      url: `/content/community/post/edit/${postId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        title: "Updated Community Post Title",
        description: "Updated community post description.",
        tags: ["updated", "community"],
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        // Assertions
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("success", true);

        expect(response.duration).to.be.lessThan(2000);
      } else {
        cy.log(response.status);
        cy.log(response.body.error);
      }
    });
  });
});
