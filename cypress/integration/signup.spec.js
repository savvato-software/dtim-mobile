context('signing up', () => {

    it('does not allow you to submit new acct info if the email is invalid', () => {

		cy.visit('localhost:8100/new-user')     

		cy.typeInField('name-input', 'Test') 
		cy.typeInField('email-input', 'test') 
		cy.expectButtonInitiallyDisabled('submit')

		cy.typeInField('email-input', '@') 
		cy.expectButtonInitiallyDisabled('submit')

		cy.typeInField('email-input', 'gmail') 
		cy.expectButtonInitiallyDisabled('submit')
		
		cy.typeInField('email-input', '.') 
		cy.expectButtonInitiallyDisabled('submit')
		
		cy.typeInField('email-input', 'com') 
		cy.expectButtonIsEnabled('submit')

	})

	it('does not allow you to submit new acct info if the phone is invalid', () => {
		cy.visit('localhost:8100/new-user')
		
		cy.typeInField('name-input', 'Test') 
		cy.typeInField('phone-input', '720') 
		cy.expectButtonInitiallyDisabled('submit')

		cy.typeInField('phone-input', '37') 
		cy.expectButtonInitiallyDisabled('submit')

		cy.typeInField('phone-input', '5') 
		cy.expectButtonInitiallyDisabled('submit')
		
		cy.typeInField('phone-input', '13') 
		cy.expectButtonInitiallyDisabled('submit')
		
		cy.typeInField('phone-input', '09') 
		cy.expectButtonIsEnabled('submit')

    })
    
    it('does not allow you to submit, and displays the proper error if email is invalid and no phone number', () => {
		cy.visit('localhost:8100/new-user')     

		cy.typeInField('name-input', 'Test') 
		cy.typeInField('email-input', 'test') 
        cy.get('[data-cy=phone-input]') 
        .children('.native-input')
        .first()
        .clear()
        cy.get('[data-cy=email-error]')
          .should('contain', 'Please enter a valid email, OR a ten digit phone number.')
		cy.expectButtonInitiallyDisabled('submit')

    })

    it('does not allow you to submit, and displays the proper error if phone number is invalid and no email', () => {
		cy.visit('localhost:8100/new-user')     

		cy.typeInField('name-input', 'Test') 
		cy.typeInField('phone-input', '720') 
        cy.get('[data-cy=email-input]') 
        .children('.native-input')
        .first()
        .clear()
        cy.get('[data-cy=phone-error]')
          .should('contain', 'Please enter a ten digit phone number, OR a valid email.')
		cy.expectButtonInitiallyDisabled('submit')

    })

    it('does not allow you to submit, and displays the proper error if email is invalid and there is a valid phone number', () => {
		cy.visit('localhost:8100/new-user')     

        cy.typeInField('name-input', 'Test')
        cy.typeInField('phone-input', '7203741309') 
        cy.typeInField('email-input', 'test') 
          .blur()
        cy.get('[data-cy=email-error]')
          .should('contain', 'You have entered a valid phone number. Please clear this field OR provide a valid email.')
		cy.expectButtonCurrentlyDisabled('submit')

    })   
    
    it('does not allow you to submit, and displays the proper error if phone number is invalid and there is a valid email', () => {
		cy.visit('localhost:8100/new-user')     

        cy.typeInField('name-input', 'Test')
        cy.typeInField('email-input', 'test@gmail.com') 
        cy.typeInField('phone-input', '720') 
          .blur()
        cy.get('[data-cy=phone-error]')
          .should('contain', 'You have entered a valid email address. Please clear this field OR provide a 10 digit phone number.')
		cy.expectButtonCurrentlyDisabled('submit')

    }) 

    it('does not allow you to submit, and displays no error if there is a valid email and phone number is active but incomplete', () => {
		cy.visit('localhost:8100/new-user')     

        cy.typeInField('name-input', 'Test')
        cy.typeInField('email-input', 'test@gmail.com') 
        cy.typeInField('phone-input', '720') 
        cy.get('[data-cy=phone-error]').should('not.exist')
		cy.expectButtonCurrentlyDisabled('submit')

    }) 

    it('does not allow you to submit, and displays no error if there is a valid phone number and email is active but incomplete', () => {
		cy.visit('localhost:8100/new-user')     

        cy.typeInField('name-input', 'Test')
        cy.typeInField('phone-input', '7203741309') 
        cy.typeInField('email-input', 'test') 
        cy.get('[data-cy=email-error]').should('not.exist')
		cy.expectButtonCurrentlyDisabled('submit')

    }) 

    it('allows you to submit, and displays no error if there is a valid phone number and email.', () => {
		cy.visit('localhost:8100/new-user')     

        cy.typeInField('name-input', 'Test')
        cy.typeInField('phone-input', '7203741309') 
        cy.typeInField('email-input', 'test@gmail.com')
          .blur() 
        cy.get('[data-cy=email-error]').should('not.exist')
        cy.get('[data-cy=phone-error]').should('not.exist')
		cy.expectButtonIsEnabled('submit')

    }) 

})

