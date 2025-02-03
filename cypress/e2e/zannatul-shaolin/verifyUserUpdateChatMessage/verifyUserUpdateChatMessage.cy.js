describe("Verify user update chat message", () => {
  let token;
  let messageId;

  before(() => {
    cy.fixture("studentToken.json").then((data) => {
      token = data.studentLoginToken;
  
    });
    
    cy.fixture("messageId.json").then((data) => {
      messageId  = data.messageId;
      cy.log(data.messageId)
    });

  });

  it("Verify that a user can successfully update a chat message", () => {
    cy.request({
      method: "PATCH",
      url: "/chat/update/message/676a91a8eee7d0001a0a4797",
      body: {
        text: "Your message here",
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // failOnStatusCode: false,
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
