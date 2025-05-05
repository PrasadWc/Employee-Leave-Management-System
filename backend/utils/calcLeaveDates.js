import Holidays from "../models/holidayModel.js";

export const calcLeaveDates = async (startDate, endDate) => {
  let count = 0;
  let currentDate = new Date(startDate);

   // Fetch all holiday dates in the given range
   const holidays = await Holidays.find({
    date: {
      $gte: startDate.toISOString().split('T')[0],
      $lte: endDate.toISOString().split('T')[0]
    }
  });

  const holidaySet = new Set(holidays.map(h => h.date)); // fast lookup

  while (currentDate <= endDate) {
    const day = currentDate.getDay(); // 0 = Sunday, 6 = Saturday
    const dateStr = currentDate.toISOString().split('T')[0];

    if (day !== 0 && day !== 6 && !holidaySet.has(dateStr)) {
      count++;
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return count;
}