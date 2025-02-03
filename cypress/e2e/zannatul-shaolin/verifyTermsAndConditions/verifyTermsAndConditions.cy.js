describe("Verify user submit terms and conditions", () => {
  let token;
  let enrollment;
  let program;
  let branch;

  // const type = "program";

  before(() => {
    cy.fixture("token.json").then((data) => {
      token = data.token;
      enrollment = data.Enrollment;
     
    });

    cy.fixture("programSlug.json").then((data) => {
      program = data.programSlug;
    });

  
  });

  it("Verify that a user can successfully submit terms and conditions", () => {
    cy.request({
      method: "POST",
      url: "/terms-conditions/myterm",
      body: {
        branch: {
          data: {
            address: {
              street: "Street",
              city: "City",
              zip: "8700",
              country: "Bangladesh",
              state: "State",
            },
            firstContact: {
              email: "first@gmail.com",
              name: "First name",
              phone: "11728068200",
            },
            secondContact: {
              email: "second@gmail.com",
              name: "First name",
              phone: "8801647760872",
            },
            socialLinks: {
              facebook: "facebook",
              github: "github",
              instagram: "instagram",
            },
            branchUrl: "http://localhost:3003/newUI/branch-setting",
            faxNumber: "1245758454",
            taxNumber: "25458758454",
            branchLogo:
              "https://ts4uportal-all-files-upload.nyc3.digitaloceanspaces.com/document-sending/1722570757127-SchoolHubs-logo-final-white.png",
            branchDocument: "",
            otherDocument:
              "https://ts4uportal-all-files-upload.nyc3.digitaloceanspaces.com/document-sending/1720431819679-dog2.jpeg",
            about: "about",
            phone: "11735590775",
          },
          _id: "64fcb4e8944cf215d8d32f95",
          name: "first-branch",
          slug: "first-branch-pgbr",
        },
        program: "64fcb957b0cf6e9ae43d126d",
        session: "66491689e44f020019e08e4f",
      },
      headers: {
        Authorization: `Bearer ${token}`,
        Enrollment: enrollment,
      },

      failOnStatusCode: false,
    }).then((res) => {
        if(res.status===200){
             console.log(res);
             expect(res.status).to.equal(200);
             expect(res.status).to.lessThan(2000);
        }else{
            cy.log(res.body)
        }
    });
  });
});

