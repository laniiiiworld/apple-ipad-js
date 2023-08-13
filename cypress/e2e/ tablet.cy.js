/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';

describe('Apple iPad detail page - desktop mode', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.viewport('ipad-2');
  });

  it('renders', () => {
    cy.findAllByText('iPad').should('exist');
  });

  describe('Search Area', () => {
    it('shows when the search button is clicked', () => {
      cy.findByText('검색').click();

      //show search area
      cy.findByTestId('search-area').should('be.visible');
      //hide the menu list
      cy.findAllByText('Apple').first().should('not.be.visible');
      cy.findAllByText('스토어').first().should('not.be.visible');
      cy.findAllByText('Mac').first().should('not.be.visible');
      cy.findAllByText('iPad').first().should('not.be.visible');
      cy.findAllByText('iPhone').first().should('not.be.visible');
      cy.findAllByText('Watch').first().should('not.be.visible');
      cy.findAllByText('AirPods').first().should('not.be.visible');
      cy.findAllByText('TV 및 홈').first().should('not.be.visible');
      cy.findAllByText('Apple 독점 제공').first().should('not.be.visible');
      cy.findAllByText('액세서리').first().should('not.be.visible');
      cy.findAllByText('고객지원').first().should('not.be.visible');
      cy.findAllByText('검색').first().should('not.be.visible');
      cy.findAllByText('장바구니').first().should('not.be.visible');
    });
    it('hides when the close button clicked', () => {
      cy.findByText('검색').click();
      cy.findByText('닫기').click();
      cy.wait(500);
      cy.findByTestId('search-area').should('not.be.visible');
    });
    it('hides by clicking outside the search area', () => {
      cy.findByText('검색').click();
      cy.findByTestId('shadow').click();
      cy.wait(500);
      cy.findByTestId('search-area').should('not.be.visible');
    });
  });

  describe('Cart', () => {
    it('shows when the basket button is clicked', () => {
      cy.findAllByText('장바구니').first().click();
      cy.wait(500);
      cy.findByText('장바구니가 비어 있습니다.').should('be.visible');
    });
    it('hides by clicking the basket button again', () => {
      cy.findAllByText('장바구니').first().click();
      cy.wait(500);
      cy.findAllByText('장바구니').first().click();
      cy.wait(500);
      cy.findByText('장바구니가 비어 있습니다.').should('not.be.visible');
    });
    it('hides by clicking outside the cart area', () => {
      cy.findAllByText('장바구니').first().click();
      cy.wait(500);
      cy.findAllByRole('img').first().click();
      cy.wait(500);
      cy.findByText('장바구니가 비어 있습니다.').should('not.be.visible');
    });
  });
});
