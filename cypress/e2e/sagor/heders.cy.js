export const headers = () =>
  before(() => {
    cy.readFile("cypress/fixtures/headers.json").then((data) => {
      return data;

      //console.log(data);
    });
  });
