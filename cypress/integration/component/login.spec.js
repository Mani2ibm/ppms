/// <reference types="cypress" />

context('Login Page Test', () => {
    beforeEach(() => {
        cy.visit('/login')
      })
    it('Login with wrong credintial', () => {
        const user = 'admin'
        const pass = 'admi'
        cy.get('.log')
            .type(user)
            .should('have.value',user)

        cy.get('.pass')
            .type(pass)
            .should('have.value',pass)
        
        cy.get('.login100-form-btn')
            .click()

        cy.window().its('store').invoke('getState').its('errors').should('eq','Password is wrong')

        cy.url().should('include', '/login')
        
    })

    it('Login with correct credintial', () => {
        const user = 'admin'
        const pass = 'admin'
        cy.get('.log')
            .type(user)
            .should('have.value',user)

        cy.get('.pass')
            .type(pass)
            .should('have.value',pass)
        
        cy.get('.login100-form-btn')
            .click()

        cy.window().its('store').invoke('getState').its('auth.isAuthenticated').should('eq',true)

        cy.window().its('store').invoke('getState').its('auth.user.username').should('eq','admin')

        cy.window().its('store').invoke('getState').its('auth.user.password').should('eq','admin')

        cy.url().should('include', '/home')

        
    })
  })

  