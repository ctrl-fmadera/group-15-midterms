const LessonsAccess = require('../models/lessonsaccessModel');

// Get all lesson accesses
exports.getAllLessonsAccess = async (req, res) => {
    try {
        const accesses = await LessonsAccess.find();
        res.status(200).json(accesses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single lesson access by ID
exports.getLessonAccessById = async (req, res) => {
    try {
        const access = await LessonsAccess.findById(req.params.id);
        if (!access) {
            return res.status(404).json({ message: 'Lesson access not found' });
        }
        res.status(200).json(access);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new lesson access
exports.createLessonAccess = async (req, res) => {
    try {
        const newAccess = new LessonsAccess(req.body);
        const savedAccess = await newAccess.save();
        res.status(201).json(savedAccess);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update a lesson access
exports.updateLessonAccess = async (req, res) => {
    try {
        const updatedAccess = await LessonsAccess.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedAccess) {
            return res.status(404).json({ message: 'Lesson access not found' });
        }
        res.status(200).json(updatedAccess);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a lesson access
exports.deleteLessonAccess = async (req, res) => {
    try {
        const deletedAccess = await LessonsAccess.findByIdAndDelete(req.params.id);
        if (!deletedAccess) {
            return res.status(404).json({ message: 'Lesson access not found' });
        }
        res.status(200).json({ message: 'Lesson access deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};