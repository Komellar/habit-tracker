import { PrismaClient } from '../../generated/prisma';
import { hashPassword } from '../../src/utils/auth/hash-password';
import * as fixtures from '../fixtures';
import { user } from '../fixtures/login';

export const dbTasks = {
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
      return { success: true, userId: user.id };
    } catch (error) {
      console.error('Error seeding test user:', error);
      return { success: false, error };
    } finally {
      await prisma.$disconnect();
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
      return { success: true };
    } catch (error) {
      console.error('Error cleaning up database:', error);
      return { success: false, error };
    } finally {
      await prisma.$disconnect();
    }
  },

  async 'fixture:habits'() {
    await fixtures.habits();
    return { success: true };
  },
};
