const Enrollment = require('../models/Enrollment');
const Student = require('../models/student');
const Course = require('../models/course');

// Get all enrollments
exports.getAllEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find().populate('student').populate('course');
        res.json(enrollments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get enrollment by ID
exports.getEnrollmentById = async (req, res) => {
    try {
        const enrollment = await Enrollment.findById(req.params.id).populate('student').populate('course');
        if (!enrollment) return res.status(404).json({ error: 'Enrollment not found' });
        res.json(enrollment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create new enrollment
exports.createEnrollment = async (req, res) => {
    try {
        const { studentId, courseId } = req.body;
        const student = await Student.findById(studentId);
        const course = await Course.findById(courseId);
        if (!student || !course) {
            return res.status(400).json({ error: 'Invalid student or course ID' });
        }
        const enrollment = new Enrollment({ student: studentId, course: courseId });
        await enrollment.save();
        res.status(201).json(enrollment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update enrollment
exports.updateEnrollment = async (req, res) => {
    try {
        const { studentId, courseId } = req.body;
        const enrollment = await Enrollment.findById(req.params.id);
        if (!enrollment) return res.status(404).json({ error: 'Enrollment not found' });

        if (studentId) enrollment.student = studentId;
        if (courseId) enrollment.course = courseId;

        await enrollment.save();
        res.json(enrollment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete enrollment
exports.deleteEnrollment = async (req, res) => {
    try {
        const enrollment = await Enrollment.findByIdAndDelete(req.params.id);
        if (!enrollment) return res.status(404).json({ error: 'Enrollment not found' });
        res.json({ message: 'Enrollment deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};