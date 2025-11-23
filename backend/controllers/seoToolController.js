export const base64Encode = (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });

    const encoded = Buffer.from(text).toString('base64');
    res.json({ encoded });
  } catch (err) {
    res.status(500).json({ error: "Encoding failed" });
  }
};

export const base64Decode = (req, res) => {
  try {
    const { text } = req.body;  // ← Changed from "encoded" to "text"
    if (!text) return res.status(400).json({ error: "Base64 string is required" });

    const decoded = Buffer.from(text, 'base64').toString('utf-8');
    res.json({ decoded });  // ← Return "decoded" like before
  } catch (err) {
    res.status(400).json({ error: "Invalid Base64 string" });
  }
};