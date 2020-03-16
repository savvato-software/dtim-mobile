context('logging in', () => {
	it('succeeds on the happy path', () => {
		cy.visit('localhost:8100/returning-user')     

		cy.get('[data-cy=phone-email]') 
			.children('.native-input')
  			.first()
		  	.type('test@test.com')   /
	
		cy.get('ion-button')
		  .contains('Find Me')     
		  .click()                
	
		cy.get('.alert-title')              
		  .should('contain', 'Found you!')
	})
})
