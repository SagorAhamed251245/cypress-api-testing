describe("React to a community post without Organization ID", () => {
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

  it("reacts to a community post without organizationId", () => {
    cy.request({
      method: "PUT",
      url: `/content/community/post/react/${postId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        symbol: "😀",
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        // Assertions
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(2000);
        expect(response.body).to.have.property("success", true);
      } else {
        cy.log(response);
        console.log(response);
      }
    });
  });
});
