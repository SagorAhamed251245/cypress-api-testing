describe("Verify user chats", () => {
  let token;
  let enrollment;
  let organization;

  before(() => {
    cy.fixture("token.json").then((data) => {
      token = data.token;
      enrollment= data.Enrollment
    });
      cy.fixture("authentication.json").then((data) => {
        organization = data.organizationId;
      });
  });

  it("Verify that a user can successfully retrieve all their chats", () => {
    cy.request({
      method: "GET",
      url: "/chat/mychats",
      headers: {
        Authorization: `Bearer ${token}`,
        Enrollment: enrollment,
        organizationId: organization,
      },
      failOnStatusCode: false,
    }).then((res) => {
        console.log(res);
      expect(res.status).to.equal(200);
      expect(res.status).lessThan(3000);
    });
  });
});
