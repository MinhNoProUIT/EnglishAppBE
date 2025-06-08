exports.parseMoneyToInt = (money) => {
  // PostgreSQL MONEY format: '$10,000.00' → remove $ and ,
  const cleaned = money.toString().replace(/[$,]/g, "");
  return Math.round(parseFloat(cleaned));
};
