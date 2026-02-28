import { projects } from '../../src/constants';

describe('Projects section', () => {
  beforeEach(() => {
    cy.waitForApp();
    cy.get('#projects', { timeout: 8000 }).scrollIntoView();
  });

  it('shows section heading', () => {
    cy.get('#projects').contains('h1', 'Projects').should('be.visible');
  });

  it('first project card shows title, Tech Stack label, and description', () => {
    const first = projects[0];
    cy.get('#projects').contains(first.title).should('be.visible');
    cy.get('#projects').contains('Tech Stack').should('be.visible');
    cy.get('#projects').contains(first.content).should('be.visible');
  });

  describe('Carousel', () => {
    it('initially prev button is disabled, next is enabled', () => {
      cy.get('#projects').within(() => {
        cy.get('button').contains('<').should('be.disabled');
        cy.get('button').contains('>').should('not.be.disabled');
      });
    });

    it('clicking next enables prev and moves carousel', () => {
      cy.get('#projects').within(() => {
        cy.get('button').contains('>').click();
      });
      cy.get('#projects').within(() => {
        cy.get('button').contains('<').should('not.be.disabled');
      });
      cy.get('#projects').contains(projects[1].title).should('be.visible');
    });

    it('at last project next is disabled', () => {
      for (let i = 0; i < projects.length - 1; i++) {
        cy.get('#projects').within(() => {
          cy.get('button').contains('>').click();
        });
      }
      cy.get('#projects').within(() => {
        cy.get('button').contains('>').should('be.disabled');
        cy.get('button').contains('<').should('not.be.disabled');
      });
    });

    it('clicking prev from last re-enables next', () => {
      for (let i = 0; i < projects.length - 1; i++) {
        cy.get('#projects').within(() => cy.get('button').contains('>').click());
      }
      cy.get('#projects').within(() => cy.get('button').contains('<').click());
      cy.get('#projects').within(() => {
        cy.get('button').contains('>').should('not.be.disabled');
      });
    });
  });

  describe('Responsiveness', () => {
    it('project cards have responsive width', () => {
      cy.viewport(375, 667);
      cy.get('#projects').scrollIntoView();
      cy.get('#projects').find('.project-card').first().invoke('css', 'width').then((w) => {
        expect(parseInt(w, 10)).to.be.lessThan(400);
      });
      cy.viewportPreset('desktop');
      cy.get('#projects').scrollIntoView();
      cy.get('#projects').find('.project-card').first().invoke('css', 'width').then((w) => {
        expect(parseInt(w, 10)).to.be.greaterThan(400);
      });
    });
  });
});
