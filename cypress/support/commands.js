// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('expectButtonInitiallyDisabled', (data_cy_id) => {
	cy.get('[data-cy=' + data_cy_id + ']').should('have.attr', 'class', 'submit-btn md button button-solid button-disabled ion-activatable ion-focusable hydrated')     
})

Cypress.Commands.add('expectButtonCurrentlyDisabled', (data_cy_id) => {
	cy.get('[data-cy=' + data_cy_id + ']').should('have.attr', 'class', 'submit-btn md button button-solid ion-activatable ion-focusable hydrated button-disabled')     
})

Cypress.Commands.add('expectButtonIsEnabled', (data_cy_id) => {
	cy.get('[data-cy=' + data_cy_id + ']').should('have.attr', 'class', 'submit-btn md button button-solid ion-activatable ion-focusable hydrated')
})

Cypress.Commands.add('typeInField', (data_cy_id, text) => {
	cy.get('[data-cy=' + data_cy_id + ']') 
	.children('.native-input')
	.first()
  	.type(text)
})

