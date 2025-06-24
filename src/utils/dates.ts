export const last7Days = [...Array(7)].map((_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - 6 + i);
  return date;
});
