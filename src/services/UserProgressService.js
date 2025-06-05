const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const UserProgressService = {
    async getAllUserProgressByCourse(userId, courseId) {
        return await prisma.user_progress.findMany({
            where: {
                user_id: userId,
                words: {
                    course_id: courseId,
                },
            },
            include: {
                words: true,
            },
        });
    },

    async createUserProgress({ user_id, word_id }) {
        return await prisma.user_progress.create({
            data: {
                user_id,
                word_id,
                level: 1,
                createdstudydate: new Date(),
                updatedstudydate: new Date(),
            },
        });
    },

    async updateUserProgress(user_id, word_id, { isCorrect, isRetry }) {
        const progress = await prisma.user_progress.findFirst({
            where: {
                user_id,
                word_id,
            },
        });

        if (!progress) return null;

        const newLevel = isCorrect && !isRetry ? (progress.level + 1) : progress.level;

        return await prisma.user_progress.updateMany({
            where: {
                user_id,
                word_id,
            },
            data: {
                level: newLevel,
                updatedstudydate: new Date,
            },
        });
    },

    async deleteUserProgress(id) {
        return await prisma.user_progress.delete({
            where: { id },
        });
    },

    async getUnlearnedWordsByCourse(userId, courseId) {
        const result = await prisma.user_progress.findMany({
            where: {
                user_id: userId,
                level: 1,
                words: {
                    course_id: courseId,
                },
            },
            include: {
                words: true,
            },
        });
        return result;
    },

    async getAllTodayRepeatWordsByCourse(userId, courseId) {
        const now = new Date();

        const repeatDelays = {
            1: 1,
            2: 3,
            3: 7,
            4: 14,
            5: 30,
        };

        const repeatWords = [];

        for (const level in repeatDelays) {
            const days = repeatDelays[level];
            const dateLimit = new Date();
            dateLimit.setDate(now.getDate() - days);

            const result = await prisma.user_progress.findMany({
                where: {
                    user_id: userId,
                    words: {
                        course_id: courseId,
                    },
                    level: parseInt(level),
                    updatedstudydate: {
                        lte: dateLimit,
                    },
                },
                include: {
                    words: true,
                },
            });

            repeatWords.push(...result);
        }

        return repeatWords;
    },

    async getCompletedWordsByCourse(userId, courseId) {
        const result = await prisma.user_progress.findMany({
            where: {
                user_id: userId,
                level: 6,
                words: {
                    course_id: courseId,
                },
            },
            include: {
                words: true,
            },
        });
        return result;
    }

};

module.exports = UserProgressService;
