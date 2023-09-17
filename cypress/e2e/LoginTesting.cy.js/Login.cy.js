/// <reference types="cypress" />
describe('Testing in Demo Web Shop', () =>{
  beforeEach(() =>{
    cy.visit('/'),
    cy.visit(Cypress.env('Login_url'))
  })
    it('Visit in Demo Web Shop ', () =>{
      //cy.visit('/')
      cy.get('.ico-login').click()
    })
    //Sukses login dengan fixture
    it('Success Login with data already register use fixture', ( )=>{
      cy.fixture('user.json').then((user) => {
        const datauser = user[0];
        cy.login(datauser.Email,datauser.password)
        cy.get('[class="account"]').contains('Isna@gmail.com')
      })
   })
    it('Success Login with data already register', ( )=>{
       //cy.visit(Cypress.env('Login_url'))
       cy.get('h1').contains('Welcome, Please Sign In!')
       cy.get('#Email').type('Isna@gmail.com')
       cy.get('#Password').type('Isna234')
       //cy.get('#RememberMe').click()
       cy.klik('#RememberMe')
       cy.get('[class="button-1 login-button"]').click()
       cy.get('[class="account"]').contains('Isna@gmail.com')
    })
    it('Login with data already register but want resset password', ( )=>{
      //cy.visit(Cypress.env('Login_url'))
      cy.get('h1').contains('Welcome, Please Sign In!')
      cy.get('#Email').should('be.visible').type('Isna@gmail.com')
      cy.get('#Password').should('be.visible').type('Isna234')
      cy.get('[class="forgot-password"]').contains('Forgot password?').click() 
      cy.get('h1').contains('Password recovery')
      cy.get('#Email').should('be.visible').type('Isna@gmail.com')
      cy.get('[class="button-1 password-recovery-button"]').click() 
      cy.get('[class="result"]').contains('Email with instructions has been sent to you.') 
   })
    it('Login with data already register but password wrong', ( )=>{
      //cy.visit(Cypress.env('Login_url'))
      cy.get('h1').contains('Welcome, Please Sign In!')
      cy.get('#Email').type('Isna@gmail.com')
      cy.get('#Password').type('Isna')
      cy.get('#RememberMe').click()
      cy.get('[class="button-1 login-button"]').click()
      cy.get('[class="validation-summary-errors"]')
      .contains('Login was unsuccessful. Please correct the errors and try again. The credentials provided are incorrect')
   })
 it('Login with data already register using email wrong', ( )=>{
  //cy.visit(Cypress.env('Login_url'))
  cy.get('h1').contains('Welcome, Please Sign In!')
  cy.get('#Email').type('Irma@gmail.com')
  cy.get('#Password').type('Isna234')
  cy.get('#RememberMe').click()
  cy.get('[class="button-1 login-button"]').click()
  cy.get('[class="validation-summary-errors"]')
  .contains('Login was unsuccessful. Please correct the errors and try again. No customer account found')
})
    it ('Login with data not already register', () =>{
      //cy.visit(Cypress.env('Login_url'))
      cy.get('h1').contains('Welcome, Please Sign In!')
      cy.get('#Email').type('Irma12@gmail.com')
      cy.get('#Password').type('Irma333')
      cy.get('#RememberMe').click()
      cy.get('[class="button-1 login-button"]').click()
      cy.get('[class="validation-summary-errors"]')
      .contains('Login was unsuccessful. Please correct the errors and try again. No customer account found')
    })
    it ('Testing Registration via login feature', () =>{
      //cy.visit(Cypress.env('Login_url'))
      cy.get('h1').contains('Welcome, Please Sign In!')
      cy.get('[class="button-1 register-button"]').click()
      cy.url().should('include','/register')
      //cy.visit(Cypress.env('Register_url'))
      cy.get('h1').should('have.text', 'Register')
      cy.get('#gender-female').check()
      cy.get('#FirstName').type('Isnaeni')
      cy.get('#LastName').type('rachmawati')
      cy.get('#Email').type('isnaeni21@gmail.com')
      //cy.get('.page-body > :nth-child(3) > .title > strong')
      cy.get('#Password').type('Isna234')
      cy.get('#ConfirmPassword').type('Isna234')
      cy.get('#register-button').click()
      cy.get('h1').contains('Register')
      cy.get('.page-body > .buttons > .button-1').click()
      //cy.get('[class="ico-logout"]').contains('Log out') 
      cy.get('[class="account"]').contains('isnaeni21@gmail.com')
    })
})