export const last7Days = [...Array(7)].map((_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - 6 + i);
  return date;
});

// Formats a date to YYYY-MM-DD format
export const formatDate = (date: Date) => {
  return date.toISOString().slice(0, 10);
};
