const enrrollService = require('../models/Enrollment');

const enrollService = {
    createEnrollment: async (enrollmentData) => {
        try {
            const existingEnrollment = await enrrollService.findOne({ userId: enrollmentData.userId, courseId: enrollmentData.courseId });
            if (existingEnrollment) {
                throw new Error('User is already enrolled in this course.');
            }
            
            const enrollment = new enrrollService(enrollmentData);
            return await enrollment.save();

        } catch (error) {
            throw new Error('Error creating enrollment: ' + error.message);
        }
    },
}