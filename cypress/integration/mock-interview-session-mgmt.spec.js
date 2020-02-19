context('create a mock interview session', () => {
	it('shows the "No Session Started" warning when the most recent session is more than three hours ago', () => {
		cy.server();
		cy.route("/api/mockinterviewsession/mostrecent", {id: 1, timestamp: 1581089268000}) // indicate session started long ago

		cy.visit("/home");
		cy.get('[data-test="home-admin-warning"]').should("be.visible");
	})

	it('doesnt show the "No Session Started" warning when the most recent session is less than three hours ago', () => {
		cy.server();
		cy.route("/api/mockinterviewsession/mostrecent", {id: 1, timestamp: new Date().getTime() - 120000 }) // indicate session started two minutes ago

		cy.visit("/home");
		cy.get('[data-test="home-admin-warning"]').should("not.be.visible");
	})

	it('shows an empty list for who\'s attending, because no one has yet signed in', () => {
		
	})

	it('throws up an alert if you start a session and one is already in progress', () => {
		
	})
})