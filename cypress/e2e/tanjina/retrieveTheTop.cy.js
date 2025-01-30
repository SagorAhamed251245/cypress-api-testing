describe("Retrieve top contributors in the community", () => {
  let accessToken;
  let organizationId;

  before(() => {
    cy.fixture("authentication.json").then((data) => {
      accessToken = data.token;
      organizationId = data.organization_id;
    });
  });

  it("retrieves top contributors successfully", () => {
    cy.request({
      method: "GET",
      url: "/content/community/top-users",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Organization: organizationId,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("success", true);
      expect(response.duration).to.lessThan(2000);
    });
  });
});
