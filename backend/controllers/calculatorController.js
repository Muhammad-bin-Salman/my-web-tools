export const calculateEMI = (req, res) => {
const { amount, rate, months } = req.body;
const r = rate / 12 / 100;
const emi = (amount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
res.json({ emi: emi.toFixed(2) });
};


export const calculateBMI = (req, res) => {
const { weight, height } = req.body;
const bmi = weight / Math.pow(height / 100, 2);
res.json({ bmi: bmi.toFixed(2) });
};

export const calculateAge = (req, res) => {
const { birthYear } = req.body;
const age = new Date().getFullYear() - birthYear;
res.json({ age: age });
};

export const calculateProfitMargin = (req, res) => {
const { cost, revenue } = req.body;
const profit = revenue - cost;
const profitMargin = Number(((profit / revenue) * 100).toFixed(2));
res.json({ profitMargin: profitMargin });
};