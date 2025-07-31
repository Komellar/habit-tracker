import { defineConfig } from 'cypress';

import * as fixtures from './cypress/fixtures';
import { user } from './cypress/fixtures/login';
import { PrismaClient } from './generated/prisma';
import { hashPassword } from './src/utils/auth/hash-password';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, _config) {
      on('task', {
        async 'db:seedUser'() {
          const prisma = new PrismaClient();

          try {
            const salt = '6c17c8b86ff3864dcaf0717ae4d248ee';
            const password = user.password;
            const hashedPassword = await hashPassword(password, salt);

            await prisma.user.upsert({
              create: {
                email: user.email,
                name: 'E2E Test User',
                role: 'user',
                password: hashedPassword,
                salt: salt,
                id: user.id,
              },
              where: { email: 'e2e@test.com' },
              update: {},
            });

            await prisma.$disconnect();
            return { success: true, userId: user.id };
          } catch (error) {
            console.error('Error seeding test user:', error);
            await prisma.$disconnect();
            return { success: false, error: error };
          }
        },

        async 'db:cleanup'() {
          const prisma = new PrismaClient();

          try {
            await prisma.$transaction([
              prisma.habitCompletion.deleteMany({}),
              prisma.habit.deleteMany({}),
              prisma.user.deleteMany({}),
            ]);

            await prisma.$disconnect();
            return { success: true };
          } catch (error) {
            console.error('Error cleaning up database:', error);
            await prisma.$disconnect();
            return { success: false, error: error };
          }
        },

        async 'db:fixture'(fixtureName: string) {
          const fixture = (
            fixtures as unknown as Record<string, () => void | Promise<void>>
          )[fixtureName];

          if (typeof fixture !== 'function') {
            throw new Error(`Fixture "${fixtureName}" does not exist`);
          }

          return await fixture();
        },

        async 'fixture:habits'() {
          await fixtures.habits();
          return { success: true };
        },
      });
    },
  },
});
