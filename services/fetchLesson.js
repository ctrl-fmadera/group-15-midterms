const Lesson = require('../models/Lesson');

const fetchLesson = {
	getLessonById: async (lessonId) => {
		try {
			if (!lessonId) {
				throw new Error('Lesson ID is required');
			}

			const lesson = await Lesson.findOne({ id: lessonId });
			if (!lesson) {
				throw new Error('Lesson not found');
			}

			return lesson;
		} catch (error) {
			throw new Error('Error fetching lesson: ' + error.message);
		}
	},

	getLessonsByCourseId: async (courseId) => {
		try {
			if (!courseId) {
				throw new Error('Course ID is required');
			}

			const lessons = await Lesson.find({ courseId: courseId });
			return lessons;
		} catch (error) {
			throw new Error('Error fetching lessons by course ID: ' + error.message);
		}
	}
,
	getLessonByCourseAndId: async (courseId, lessonId) => {
		try {
			if (!courseId) {
				throw new Error('Course ID is required');
			}
			if (!lessonId) {
				throw new Error('Lesson ID is required');
			}

			const lesson = await Lesson.findOne({ courseId: courseId, id: lessonId });
			if (!lesson) {
				throw new Error('Lesson not found for the given course');
			}

			return lesson;
		} catch (error) {
			throw new Error('Error fetching lesson by course and id: ' + error.message);
		}
	}
};

module.exports = fetchLesson;
