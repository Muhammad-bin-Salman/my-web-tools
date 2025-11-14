export const base64Encode = (req, res) => {
const { text } = req.body;
const encoded = Buffer.from(text).toString('base64');
res.json({ encoded });
};


export const base64Decode = (req, res) => {
const { encoded } = req.body;
const decoded = Buffer.from(encoded, 'base64').toString('utf-8');
res.json({ decoded });
};