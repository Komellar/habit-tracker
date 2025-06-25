import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { formatDate } from '@/utils/dates';

describe('utils/dates', () => {
  describe('last7Days', () => {
    const RealDate = global.Date;

    beforeEach(() => {
      const mockDate = new Date(2023, 4, 15);
      vi.useFakeTimers();
      vi.setSystemTime(mockDate);

      vi.resetModules();
    });

    afterEach(() => {
      vi.useRealTimers();
      global.Date = RealDate;
    });

    it('should return dates in ascending order, starting 6 days ago', async () => {
      const { last7Days } = await import('@/utils/dates');

      expect(last7Days[0].getFullYear()).toBe(2023);
      expect(last7Days[0].getMonth()).toBe(4);
      expect(last7Days[0].getDate()).toBe(9);

      expect(last7Days[6].getFullYear()).toBe(2023);
      expect(last7Days[6].getMonth()).toBe(4);
      expect(last7Days[6].getDate()).toBe(15);
    });

    it('should have consecutive dates', async () => {
      const { last7Days } = await import('@/utils/dates');

      for (let i = 1; i < last7Days.length; i++) {
        const prevDate = last7Days[i - 1].getDate();
        const currDate = last7Days[i].getDate();

        // Each date should be one day after the previous
        expect(currDate - prevDate).toBe(1);
      }
    });

    it('should handle month boundaries correctly', async () => {
      const mockDate = new Date(2023, 5, 2);
      vi.setSystemTime(mockDate);

      const { last7Days } = await import('@/utils/dates');

      expect(last7Days[0].getFullYear()).toBe(2023);
      expect(last7Days[0].getMonth()).toBe(4);
      expect(last7Days[0].getDate()).toBe(27);

      expect(last7Days[6].getFullYear()).toBe(2023);
      expect(last7Days[6].getMonth()).toBe(5);
      expect(last7Days[6].getDate()).toBe(2);
    });
  });

  describe('formatDate', () => {
    it('should format date in British English format (day month year)', async () => {
      const testDate = new Date(2023, 4, 15);
      const formattedDate = formatDate(testDate);

      expect(formattedDate).toBe('15 May 2023');
    });

    it('should format different months correctly', async () => {
      const januaryDate = new Date(2023, 0, 10);
      const juneDate = new Date(2023, 5, 20);
      const decemberDate = new Date(2023, 11, 31);

      expect(formatDate(januaryDate)).toBe('10 Jan 2023');
      expect(formatDate(juneDate)).toBe('20 Jun 2023');
      expect(formatDate(decemberDate)).toBe('31 Dec 2023');
    });

    it('should handle different years correctly', async () => {
      const past = new Date(1999, 11, 31);
      const future = new Date(2030, 0, 1);

      expect(formatDate(past)).toBe('31 Dec 1999');
      expect(formatDate(future)).toBe('1 Jan 2030');
    });
  });
});
