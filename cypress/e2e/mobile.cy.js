/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';

describe('Apple iPad detail page - desktop mode', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.viewport('iphone-8');
  });

  it('renders', () => {
    cy.findAllByText('iPad').should('exist');
  });

  describe('Header Menu List', () => {
    it('shows when the menu list icon is clicked', () => {
      cy.findByTitle('메뉴').click();
      cy.wait(500);
      //show search area
      cy.findByTestId('search-area').should('be.visible');
      cy.findByPlaceholderText('apple.com 검색').should('be.visible');
      //show the menu list
      cy.findByTestId('mobile-menu').should('be.visible');
    });
    it('hides when the close button clicked', () => {
      cy.findByTitle('메뉴').click(); //rotated 45deg
      cy.wait(500);
      cy.findByTitle('메뉴').click(); //close button
      cy.wait(500);
      cy.findByTestId('search-area').should('not.be.visible');
    });
  });

  describe('Search Area', () => {
    it('shows autocomplets when an input is focused', () => {
      cy.findByTitle('메뉴').click();
      cy.wait(500);
      cy.findByPlaceholderText('apple.com 검색').click();
      cy.wait(500);
      cy.findByTestId('mobile-menu').should('not.be.visible');
      cy.findByText('취소').should('be.visible');
      cy.findByText('빠른 링크').should('be.visible');
    });
    it('shows the menu list again when you click the cancel button', () => {
      cy.findByTitle('메뉴').click();
      cy.wait(500);
      cy.findByPlaceholderText('apple.com 검색').click();
      cy.wait(500);
      cy.findByText('취소').click();
      cy.wait(500);
      cy.findByTestId('mobile-menu').should('be.visible');
      cy.findByText('빠른 링크').should('not.be.visible');
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

  describe('Navbar', () => {
    it('shows menu list when the dropdown clicked', () => {
      cy.findByTitle('navbar 메뉴').click();
      cy.wait(500);
      cy.findByText('개요').should('be.visible');
      cy.findAllByText('iPad를 선택하는 이유').first().should('be.visible');
      cy.findByText('제품 사양').should('be.visible');
    });
    it('hides menu list when the dropdown clicked again', () => {
      cy.findByTitle('navbar 메뉴').click();
      cy.wait(500);
      cy.findByTitle('navbar 메뉴').click();
      cy.wait(500);
      cy.findByText('개요').should('not.be.visible');
      cy.findAllByText('iPad를 선택하는 이유').first().should('not.be.visible');
      cy.findByText('제품 사양').should('not.be.visible');
    });
  });

  describe('Footer', () => {
    it('shows the navigation map as an accordion menu', () => {
      cy.findByText('쇼핑 및 알아보기').click();
      cy.wait(500);
      cy.findAllByText('스토어').last().should('be.visible');
    });
    it('hides the submenus when the parent menu clicked again', () => {
      cy.findByText('쇼핑 및 알아보기').click();
      cy.wait(500);
      cy.findByText('쇼핑 및 알아보기').click();
      cy.wait(500);
      cy.findAllByText('스토어').last().should('not.be.visible');
    });
  });
});
