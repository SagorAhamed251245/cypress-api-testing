describe("Verify user diagrams", () => {
  let token;
  let enrollmentId;

  before(() => {
    cy.readFile("cypress/fixtures/token.json").then((data) => {
      token = data.token;
      enrollmentId = data.Enrollment;
    });
  });

  it("verify user can sucessfully retrieve their diagram", () => {
    cy.request({
      method: "GET",
      url: "/diagram/mydiagrams?page=1&limit=8",
      headers: {
        Authorization: `Bearer ${token}`,
        Enrollment: enrollmentId,
      },
    }).then((res) => {
      // console.log(res);
     expect(res.status).to.equal(200);
     expect(res.status).to.lessThan(2000);
    });
  });
});
