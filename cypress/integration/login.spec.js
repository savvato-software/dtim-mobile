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

	it('does not allow you to submit new acct info if the email is invalid', () => {

		cy.visit('localhost:8100/new-user')     

		cy.get('[data-cy=name-input]') 
			.children('.native-input')
  			.first()
		  	.type('Test')   /
	
		cy.get('[data-cy=email-input]')  
			.children('.native-input')
			.first()
		  	.type('test')   
	
		cy.get('ion-button')
			.contains('Sign Me Up!')
			.should('have.attr', 'class', 'submit-btn md button button-solid button-disabled ion-activatable ion-focusable hydrated')     
		  
		cy.get('[data-cy=email-input]')  
			.children('.native-input')
			.first()
			.type('@')
		
		cy.get('ion-button')
			.contains('Sign Me Up!')
			.should('have.attr', 'class', 'submit-btn md button button-solid button-disabled ion-activatable ion-focusable hydrated') 

		cy.get('[data-cy=email-input]')  
			.children('.native-input')
			.first()
			.type('gmail')
		
		cy.get('ion-button')
			.contains('Sign Me Up!')
			.should('have.attr', 'class', 'submit-btn md button button-solid button-disabled ion-activatable ion-focusable hydrated')
		
			cy.get('[data-cy=email-input]')  
			.children('.native-input')
			.first()
			.type('.')
		
		cy.get('ion-button')
			.contains('Sign Me Up!')
			.should('have.attr', 'class', 'submit-btn md button button-solid button-disabled ion-activatable ion-focusable hydrated') 
		
			cy.get('[data-cy=email-input]')  
			.children('.native-input')
			.first()
			.type('com')
		
		cy.get('ion-button')
			.contains('Sign Me Up!')
			.should('have.attr', 'class', 'submit-btn md button button-solid ion-activatable ion-focusable hydrated') 

	})

	it('does not allow you to submit new acct info if the phone is invalid', () => {
		cy.visit('localhost:8100/new-user')     

		cy.get('[data-cy=name-input]') 
			.children('.native-input')
  			.first()
		  	.type('Test')   /
	
		cy.get('[data-cy=phone-input]')  
			.children('.native-input')
			.first()
		  	.type('720')   
	
		cy.get('ion-button')
			.contains('Sign Me Up!')
			.should('have.attr', 'class', 'submit-btn md button button-solid button-disabled ion-activatable ion-focusable hydrated')     
		  
		cy.get('[data-cy=phone-input]')  
			.children('.native-input')
			.first()
			.type('37')
		
		cy.get('ion-button')
			.contains('Sign Me Up!')
			.should('have.attr', 'class', 'submit-btn md button button-solid button-disabled ion-activatable ion-focusable hydrated') 

		cy.get('[data-cy=phone-input]')  
			.children('.native-input')
			.first()
			.type('5')
		
		cy.get('ion-button')
			.contains('Sign Me Up!')
			.should('have.attr', 'class', 'submit-btn md button button-solid button-disabled ion-activatable ion-focusable hydrated')
		
			cy.get('[data-cy=phone-input]')  
			.children('.native-input')
			.first()
			.type('13')
		
		cy.get('ion-button')
			.contains('Sign Me Up!')
			.should('have.attr', 'class', 'submit-btn md button button-solid button-disabled ion-activatable ion-focusable hydrated') 
		
			cy.get('[data-cy=phone-input]')  
			.children('.native-input')
			.first()
			.type('09')
		
		cy.get('ion-button')
			.contains('Sign Me Up!')
			.should('have.attr', 'class', 'submit-btn md button button-solid ion-activatable ion-focusable hydrated') 
	})
})