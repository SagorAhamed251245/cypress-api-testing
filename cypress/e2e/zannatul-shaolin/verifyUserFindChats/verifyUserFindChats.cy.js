describe("Verify user create chats", () => {
  let token;
  let enrollment;
  let organization;
  let userId;

  before(() => {
    cy.fixture("token.json").then((data) => {
      token = data.token;
      enrollment = data.Enrollment;
    });

    cy.fixture("studentLoginID.json").then((data) => {
       organization = data.organizationId;
    });

     cy.fixture("studentLoginID.json").then((data) => {
       userId = data.userId;
     });
  });


  it("Verify that a user can successfully create or find their chats", () => {
    cy.request({
      method: "POST",
      url: `/chat/findorcreate/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        Enrollment: enrollment,
        Organization: organization,
      },
      body: {},
        failOnStatusCode: false,
    }).then((res) => {
      console.log(res);
        expect(res.status).to.equal(200);
        expect(res.status).lessThan(3000);
        expect(res.body).to.have.property("success", true);
    });
  });
});
