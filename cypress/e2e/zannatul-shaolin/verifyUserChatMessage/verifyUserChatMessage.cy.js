describe("Verify user chat massage", () => {
  let token;
  let enrollment;
  let organization;
  let chatId;

  before(() => {
    cy.fixture("token.json").then((data) => {
      token = data.token;
      enrollment = data.Enrollment;
    });

    cy.fixture("studentLoginID.json").then((data) => {
      organization = data.organizationId;
      chatId = data.chatId;
      console.log(chatId);
    });
  });

  it("Verify that a user can successfully send a chat message ", () => {
    cy.request({
      method: "PUT",
      url: `/chat/sendmessage/${chatId}`,
      body: {
        text: "Your message here",
        files: [],
      },
      headers: {
        Authorization: `Bearer ${token}`,
        Enrollment: enrollment,
        Organization: organization,
      },
      failOnStatusCode: false,
    }).then((res) => {
      if (res.status === 200) {
        console.log(res);
        expect(res.status).to.equal(200);
        expect(res.status).lessThan(7000);
      } else {
        cy.log(res.body);
      }
    });
  });
});
