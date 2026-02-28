import { defineConfig } from 'cypress';
import vitePreprocessor from 'cypress-vite';
import path from 'path';

// Run the dev server (npm run dev) before cypress:run. If Vite uses a different port, set CYPRESS_BASE_URL (e.g. http://localhost:5174).
export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:5173',
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on) {
      on(
        'file:preprocessor',
        vitePreprocessor({
          configFile: path.resolve('./vite.config.js'),
          mode: 'development',
        })
      );
    },
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.js',
  },
});
