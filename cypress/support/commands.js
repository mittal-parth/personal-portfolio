// ***********************************************
// Custom commands for Cypress E2E tests
// ***********************************************

/**
 * Visits the app and waits for the loading screen (1200ms) to finish.
 * Waits for the main content: nav (navbar) must be visible within 15s.
 * Use this when the dev server is already running (e.g. npm run dev in another terminal).
 */
Cypress.Commands.add('waitForApp', () => {
  cy.visit('/');
  cy.get('nav', { timeout: 15000 }).should('be.visible');
});

/**
 * Asserts that the given element is within the viewport.
 * Uses getBoundingClientRect() and viewport dimensions.
 */
Cypress.Commands.add('isInViewport', { prevSubject: 'element' }, (subject) => {
  // Use `.should()` so Cypress can automatically retry until the element settles
  // (e.g. smooth scroll + framer-motion layout changes).
  cy.wrap(subject).should(($el) => {
    const rect = $el[0].getBoundingClientRect();
    const vw = Cypress.config('viewportWidth');
    const vh = Cypress.config('viewportHeight');
    expect(rect.top).to.be.within(-rect.height, vh + 1);
    expect(rect.bottom).to.be.within(-1, vh + rect.height + 1);
    expect(rect.left).to.be.within(-rect.width, vw + 1);
    expect(rect.right).to.be.within(-1, vw + rect.width + 1);
  });
});

/**
 * Viewport presets for responsive tests.
 * Usage: cy.viewportPreset('mobile') etc.
 */
const VIEWPORT_PRESETS = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 720 },
};

Cypress.Commands.add('viewportPreset', (name) => {
  const preset = VIEWPORT_PRESETS[name];
  if (preset) {
    cy.viewport(preset.width, preset.height);
  }
});
