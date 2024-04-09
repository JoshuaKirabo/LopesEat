// Today's date and semester end date
const semesterEndDate = new Date(2024, 5, 3); // Month is 0-indexed in JavaScript
const totalDiningDollars = 1650;
const today = new Date();
const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

// Calculate days left in the semester
const daysLeft = Math.round(Math.abs((semesterEndDate - today) / oneDay));
console.log(`Days left in the semester: ${daysLeft}`);
console.log(`Total dining dollars: $${totalDiningDollars.toFixed(2)}`);

let remainingBudget = totalDiningDollars;
let totalSpent = 0;

for (let day = 1; day <= daysLeft; day++) {
  // Calculate average spend per day with the remaining budget
  let averageDailySpend = remainingBudget / (daysLeft - day + 1);
  
  // Allow for some fluctuation around the average (-$5 to +$5)
  let fluctuation = Math.floor(Math.random() * 11) - 5; // Generates a number between -5 and 5
  let dailySpend = Math.round(averageDailySpend + fluctuation);

  // Adjust the last day's spend to match exactly the remaining budget
  if (day === daysLeft) {
    dailySpend = remainingBudget;
  }

  // Ensure daily spend does not exceed remaining budget
  dailySpend = Math.min(dailySpend, remainingBudget);
  
  // Update remaining budget
  remainingBudget -= dailySpend;
  totalSpent += dailySpend;
  
  console.log(`Day ${day}: Spend $${dailySpend}, Remaining budget: $${remainingBudget}`);
}

console.log(`Total spent: $${totalSpent}, Remaining budget: $${remainingBudget}`);
