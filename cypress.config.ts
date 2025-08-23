import { defineConfig } from 'cypress';

import { dbTasks } from 'cypress/plugins/dbTasks';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    pageLoadTimeout: 30000,
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, _config) {
      on('task', dbTasks);
    },
    // Add error handling for uncaught exceptions
    supportFile: 'cypress/support/e2e.ts',
  },
});
