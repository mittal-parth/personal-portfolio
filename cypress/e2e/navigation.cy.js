import { navLinks } from '../../src/constants';

describe('Navigation', () => {
  beforeEach(() => {
    cy.waitForApp();
  });

  describe('Desktop', () => {
    beforeEach(() => {
      cy.viewportPreset('desktop');
    });

    it('shows all navbar links', () => {
      navLinks.forEach((nav) => {
        cy.get('nav').contains(nav.title).should('be.visible');
      });
    });

    it('clicking each nav link scrolls to the correct section with heading in viewport', () => {
      navLinks.forEach((nav) => {
        cy.scrollTo(0, 0);
        cy.get('nav').should('be.visible');
        cy.get('nav').contains(nav.title).click({ force: true });
        cy.get(`#${nav.id}`, { timeout: 5000 }).should('be.visible');
        cy.get(`#${nav.id}`).find('h1, h2').first().scrollIntoView();
        cy.get(`#${nav.id}`).find('h1, h2').first().isInViewport();
      });
    });

    it('logo click scrolls to #home', () => {
      cy.get('nav a[href="#home"]').click();
      cy.get('#home', { timeout: 3000 }).should('be.visible');
      cy.get('#home').find('h1').first().isInViewport();
    });
  });

  describe('Mobile', () => {
    beforeEach(() => {
      cy.viewport(375, 667);
    });

    it('hides nav links and shows hamburger icon', () => {
      cy.get('ul.list-none.sm\\:flex').should('not.be.visible');
      cy.get('img[alt="menu"]').should('exist');
    });

    it('tapping hamburger reveals sidebar menu with links', () => {
      cy.get('img[alt="menu"]').click();
      cy.get('.sidebar').should('be.visible');
      navLinks.forEach((nav) => {
        cy.get('.sidebar').contains('a', nav.title).should('be.visible');
      });
    });

    it('tapping a sidebar link navigates to section', () => {
      cy.get('img[alt="menu"]').click();
      cy.get('.sidebar').contains('a', 'Projects').click();
      cy.get('#projects', { timeout: 3000 }).should('be.visible');
    });
  });
});
