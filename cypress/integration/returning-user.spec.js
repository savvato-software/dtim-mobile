import { createYield } from "typescript"

context('go back to home after opening return user', () => {
    it("will go back to the homepage", () => {
        cy.visit("localhost:8100/returning-user")
        
        cy.contains('Cancel').click()
        cy.url().should('be', 'localhost:8100/home')
    })
})

context('sign in for for returning users', ()=> {
    it("exsisting user is found", ()=> {
        cy.visit('localhost:8100/returning-user');
        cy.get('#phone')
            .type('7089900326')
            .should("have.value", "7089900326");

        cy.get('#email')
            .type('ethan@ethan.com')
            .should('have.value', 'ethan@ethan.com');

        cy.contains('Find Me').click()

        cy.get('.alert-wrapper').should("be.visible").contains("Found you")
    })
})

context("user not in the system", () =>{
    it("shows user not found would you like to sign up?", ()=> {
        cy.visit("localhost:8100/returning-user")

        cy.get("#phone")
            .type("78945645123")
            .should('have.value', '78945645123')

        cy.get("#email")
            .type("fake@fake.com")
            .should("have.value", "fake@fake.com")

        cy.contains("Find Me").click()

        cy.get('.alert-wrapper').should("be.visible").contains("couldn't find a profile")
    })
})
