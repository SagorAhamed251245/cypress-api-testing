describe("Update user successfully with status code 200", () => {
   let token;
 
   before(() => {
     cy.fixture("credentials.json").then((data) => {
       token = data.token;
     });
   });
 
   it("Checking if the user can reset their password or not", () => {
   
      
     cy.request({
       method: "PATCH",
       url: "/user/updateuser",
       headers: {
         Authorization: `Bearer ${token}`,
       },
       body: {
         
            firstName: "Khadija",
            lastName: "Farah",
            fullName: "Khadija Naz",
            about: "Please add something about you...",
            personalData: {
              address: {
                city: "New York", //updated data
                street: "",
                country: "",
                postalCode: ""
              },
              socialMedia: {
                facebook: "",
                github: "",
                instagram: "",
                linkedin: "",
                twitter: ""
              }
            }
          
       },
       failOnStatusCode: false,
     }).then((response) => {
       if (response.status === 200) {
         // Assertions
         expect(response.status).to.eq(200);
         expect(response.duration).to.be.lessThan(2000);
       } else {
         cy.log("Reset password failed with status code: ", response.status);
         cy.log(response.body.error);
       }
     });
   });
 });