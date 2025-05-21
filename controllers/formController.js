import Registration from '../models/formModel.js';
import Papa from 'papaparse';
import fs from 'fs';
export const createRegistration = async (req, res) => {
  try {
    const newRegistration = new Registration(req.body);
    const saved = await newRegistration.save();
    res.status(201).json({ message: 'Registration successful', data: saved });
  } catch (err) {
    res
      .status(400)
      .json({ error: 'Registration failed', details: err.message });
  }
};

export const getRegistrations = async (req, res) => {
  try {
    const { search, sortKey = 'createdAt', sortOrder = 'desc' } = req.query;

    const query = search
      ? {
          $or: [
            { name: new RegExp(search, 'i') },
            { email: new RegExp(search, 'i') },
            { phone: new RegExp(search, 'i') },
            { state: new RegExp(search, 'i') },
            { district: new RegExp(search, 'i') },
          ],
        }
      : {};

    const users = await Registration.find(query).sort({
      [sortKey]: sortOrder === 'asc' ? 1 : -1,
    });
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Error fetching users', details: err.message });
  }
};

// Update existing registration
export const updateRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedUser = await Registration.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'Registration updated successfully',
      data: updatedUser,
    });
  } catch (err) {
    res
      .status(400)
      .json({ error: 'Failed to update registration', details: err.message });
  }
};

export const deleteRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    await Registration.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res
      .status(400)
      .json({ error: 'Failed to delete user', details: err.message });
  }
};

export const exportCSV = async (req, res) => {
  try {
    const users = await Registration.find({});
    const csv = Papa.unparse(users.map((user) => user.toObject()));

    res.setHeader(
      'Content-Disposition',
      'attachment; filename=registrations.csv'
    );
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csv);
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Failed to export CSV', details: err.message });
  }
};

export const importCSV = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'CSV file is required' });
    }

    const csvText = fs.readFileSync(file.path, 'utf8');
    const result = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim(),
    });

    const cleanedData = result.data.filter(
      (row) =>
        row.fullName &&
        row.phoneNumber &&
        row.emailAddress &&
        row.jobType &&
        row.businessType &&
        row.state &&
        row.district &&
        row.taluk
    );

    if (cleanedData.length === 0) {
      fs.unlinkSync(file.path);
      return res.status(400).json({ error: 'No valid rows found in CSV' });
    }

    const inserted = await Registration.insertMany(cleanedData);
    fs.unlinkSync(file.path);

    res.json({
      message: 'CSV imported successfully',
      insertedCount: inserted.length,
    });
  } catch (err) {
    console.error('CSV Import Error:', err);
    res.status(500).json({ error: 'CSV import failed', details: err.message });
  }
};
