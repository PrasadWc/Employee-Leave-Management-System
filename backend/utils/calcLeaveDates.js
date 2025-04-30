export const calcLeaveDates = (startDate, endDate) => {
    let count = 0;
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const day = currentDate.getDay(); // 0 = Sunday, 6 = Saturday
    if (day !== 0 && day !== 6) {
      count++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return count;
}