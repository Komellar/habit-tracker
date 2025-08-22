import { defineConfig } from 'cypress';

import { dbTasks } from 'cypress/plugins/dbTasks';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, _config) {
      on('task', dbTasks);
    },
  },
});
