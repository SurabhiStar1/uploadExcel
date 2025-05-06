const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const User = require('../models/User');
const fs = require('fs');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    const errors = [];
    const insertCount = { inserted: 0, updated: 0 };

    for (let i = 0; i < jsonData.length; i++) {
      const row = jsonData[i];
      const rowNumber = i + 2; // Considering header is row 1

      const usercode = String(row.usercode || '').trim();
      const name = String(row.name || '').trim();
      const phone_number = String(row.phone_number || '').trim();

      if (!usercode || !name || !phone_number) {
        errors.push(`Row ${rowNumber}: Missing required fields`);
        continue;
      }

      if (usercode.length < 4) {
        errors.push(`Row ${rowNumber}: usercode must be at least 4 characters`);
      }

      if (!/^\d{10,}$/.test(phone_number)) {
        errors.push(`Row ${rowNumber}: phone_number must be at least 10 digits`);
      }
    }

    if (errors.length > 0) {
      fs.unlinkSync(filePath); // cleanup
      return res.status(400).json({ success: false, errors });
    }

    // All data valid, proceed with upsert
    for (let row of jsonData) {
      const usercode = String(row.usercode).trim();
      const name = String(row.name).trim();
      const phone_number = String(row.phone_number).trim();

      const existingUser = await User.findOne({ usercode });

      if (existingUser) {
        await User.updateOne({ usercode }, { name, phone_number });
        insertCount.updated++;
      } else {
        await User.create({ usercode, name, phone_number });
        insertCount.inserted++;
      }
    }

    fs.unlinkSync(filePath); // delete file after processing
    res.json({ success: true, ...insertCount });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
