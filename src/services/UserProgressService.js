const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const UserProgressService = {
    async getAllWordsWithProgressByCourse(userId, courseId) {
        const words = await prisma.words.findMany({
            where: { course_id: courseId },
            include: {
                user_progress: {
                    where: { user_id: userId },
                    select: { level: true }
                }
            }
        });

        // Gắn level mặc định = 0 nếu chưa có progress
        const result = words.map(word => ({
            ...word,
            level: word.user_progress[0]?.level ?? 0
        }));

        return result;
    },

    async createUserProgress(user_id, word_id) {
        return await prisma.user_progress.create({
            data: {
                user_id,
                word_id,
            },
        });
    },

    async updateUserProgress(user_id, word_id, { isCorrect, isRetry }) {
        const progress = await prisma.user_progress.findFirst({
            where: { user_id, word_id },
        });

        if (!progress) return null;
        let newLevel = isCorrect && !isRetry ? (progress.level + 1) : progress.level;
        if (newLevel > 6) newLevel = 6;

        return await prisma.user_progress.update({
            where: { id: progress.id },
            data: {
                level: newLevel,
                updatedstudydate: new Date(),
            },
        });
    },

    async deleteUserProgress(id) {
        return await prisma.user_progress.delete({
            where: { id },
        });
    },

    async getUnlearnedWordsByCourse(userId, courseId) {
        const result = await prisma.words.findMany({
            where: {
                course_id: courseId,
                user_progress: {
                    none: {
                        user_id: userId
                    },
                },
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

    async getNumberTodayRepeatWordsByCourse(userId, courseId) {
        const now = new Date();

        const repeatDelays = {
            1: 1,
            2: 3,
            3: 7,
            4: 14,
            5: 30,
        };

        let repeatWordsNumber = 0;

        for (const level in repeatDelays) {
            const days = repeatDelays[level];
            const dateLimit = new Date();
            dateLimit.setDate(now.getDate() - days);

            const result = await prisma.user_progress.count({
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
            });

            repeatWordsNumber += result;
        }

        return repeatWordsNumber;
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
