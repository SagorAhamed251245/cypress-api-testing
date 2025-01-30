describe("Online User Status API", () => {
  it("All Online User Status", () => {
    cy.request({
      method: "GET", // HTTPS Method should be 'GET'
      url: "/user/online/user/online", //API end points

      failOnStatusCode: false, // Don't fail the test on non-2xx status codes
    }).then((response) => {
      // Check if the status is 200 or 401 based on the API response
      if(response.status === 200) {
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(2000);
        expect(response.body).to.have.property("message", "Server is runnung"); // message is displayed wrong at backend
      } else {
        expect(response.status).to.eq(400);
      }
    });
  });
});
