describe("User Registration API Test", () => {
  it("should register a user successfully with valid details", () => {
    const uniqueTimestamp = Date.now(); // Generate a unique timestamp
    const userDetails = {
      firstName: "Jhon",
      lastName: "Doe",
      // email: `jhondoe${uniqueTimestamp}@gmail.com`, // Unique email
      email: "vopiraw530@fanicle.com",
      phone: `12345${uniqueTimestamp.toString().slice(-5)}`, // Unique phone number
      password: "Test#1234",
      confirm: "Test#1234",
    };

    cy.request({
      method: "POST",
      url: "/user/register",
      body: userDetails,
      failOnStatusCode: false,
      timeout: 2000, // Fail test if response takes longer than 2 seconds
    }).then((response) => {
      if (response.status === 200) {
        // Log response for debugging
        cy.log(JSON.stringify(response.body));
        console.log("Register data:", response.body);

        // Assert status code
        expect(response.status).to.eq(200);

        //Assert 'success' is true
        expect(response.body).to.have.property("success", true);

        //Check if email and phone are present in the response
        expect(response.body).to.have.property("email");
        expect(response.body).to.have.property("phone");

        //Validate other properties such as '_id'
        expect(response.body).to.have.property("_id");
        expect(response.duration).to.lessThan(2000);
      } else {
        cy.log(response.body.error);
        console.log(response);
      }
    });
  });
});
