/// <reference types="cypress" />

context('Rule Creation Test', () => {
    beforeEach(() => {
        cy.visit('/login')
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
            
        cy.get('.primary-btn')
            .click()
      })

    it('Create rule detail', () => {
        const rulename = 'rule1'
        const ruleDesc = 'rule description test'
        const citycode = '1234'
        const queueNo = "3214"    

        cy.get("input[placeholder='Enter Rule name']")
            .type(rulename)
            .should('have.value',rulename)

        cy.get("textarea[placeholder='Enter Rule description']")
            .type(ruleDesc)
            .should('have.value',ruleDesc)

        cy.get("input[placeholder='Enter Pseudo city code']")
            .type(citycode)
            .should('have.value',citycode) 

        cy.get("input[placeholder='Enter Queue Number']")
            .type(queueNo)
            .should('have.value',queueNo)  

        cy.get('[type="checkbox"]').first().check()

        cy.get('.btn-primary')
            .click()

        cy.window().its('store').invoke('getState').its('ruleCreation.creation.rulename').should('eq', 'rule1')

        cy.window().its('store').invoke('getState').its('ruleCreation.creation.ruledesc').should('eq', 'rule description test')

        cy.window().its('store').invoke('getState').its('ruleCreation.creation.citycode').should('eq','1234')

        cy.window().its('store').invoke('getState').its('ruleCreation.creation.queueno').should('eq','3214')

        cy.window().its('store').invoke('getState').its('ruleCreation.creation.airSegmnet').should('eq','on')
        
    })

  })

  