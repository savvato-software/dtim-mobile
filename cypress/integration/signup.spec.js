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
    cy.typeInField('email-input', '@') 
        cy.get('[data-cy=phone-input]') 
        .children('.native-input')
        .first()
        .clear()
        cy.get('[data-cy=email-error]')
          .should('contain', 'Please enter a valid email, OR a ten digit phone number.')
    cy.expectButtonInitiallyDisabled('submit')
    cy.typeInField('email-input', 'gma') 
        cy.get('[data-cy=phone-input]') 
        .children('.native-input')
        .first()
        .clear()
        cy.get('[data-cy=email-error]')
          .should('contain', 'Please enter a valid email, OR a ten digit phone number.')
    cy.expectButtonInitiallyDisabled('submit')
    cy.typeInField('email-input', 'il') 
        cy.get('[data-cy=phone-input]') 
        .children('.native-input')
        .first()
        .clear()
        cy.get('[data-cy=email-error]')
          .should('contain', 'Please enter a valid email, OR a ten digit phone number.')
    cy.expectButtonInitiallyDisabled('submit')
    cy.typeInField('email-input', '.') 
        cy.get('[data-cy=phone-input]') 
        .children('.native-input')
        .first()
        .clear()
        cy.get('[data-cy=email-error]')
          .should('contain', 'Please enter a valid email, OR a ten digit phone number.')
    cy.expectButtonInitiallyDisabled('submit')
    cy.typeInField('email-input', 'c') 
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

        //this test fails on first run, and passes on subsequent runs. The stub route is not being hit, and instead we are hitting our own API that is responding as it should on initial and secondary runs.
    it('should alert success upon sign in if user is not new', () => {
      cy.visit('localhost:8100/new-user')     

      cy.typeInField('name-input', 'Test6')
      cy.typeInField('phone-input', '3035551616') 
      cy.typeInField('email-input', 'test6@gmail.com')
        .blur() 
      cy.get('[data-cy=email-error]').should('not.exist')
      cy.get('[data-cy=phone-error]').should('not.exist')
      cy.expectButtonIsEnabled('submit')

      cy.server();
      cy.route({
        url: "/api/user/new",
        method: "POST",
        response: ''
        // {
          // id: 5,
          // name: "Test",
          // password: "$2a$10$4cEC/bye0MXuKnYD50dBOO50bYNiatT6T93lfUJnglU5FP5Y/IjZa",
          // phone: "7203741309",
          // email: "test@gmail.com",
          // enabled: 1,
          // roles: null,
        // }
      });
  
      cy.get("form").submit();
  
      cy.get('.alert-title')              
		  .should('contain', 'Found you!')

    })

})
