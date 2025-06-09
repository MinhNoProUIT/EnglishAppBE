const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
//import { checkIsPremiumUser } from "../utils/checkIsPremiumUser";
//const checkIsPremiumUser = require("../utils/checkIsPremiumUser");

async function checkIsPremiumUser(user_id) {
  const user = await prisma.users.findFirst({
    where: {
      id: user_id,
    },
    select: {
      isPremium: true,
    },
  });

  if (!user) {
    return false;
  }

  return user.isPremium;
}

const UserCourseService = {
  async getUserCourses(user_id) {
    const isPremium = await checkIsPremiumUser(user_id);

    let courses;

    // Truy vấn tất cả các khóa học của user
    courses = await prisma.courses.findMany({
      include: {
        topics: {
          // Bao gồm thông tin từ bảng topic
          select: {
            name: true, // Chỉ chọn trường name từ bảng topic
          },
        },
      },
    });

    // Thêm giá trị isBuy vào mỗi khóa học
    courses = await Promise.all(
      courses.map(async (course) => {
        // Kiểm tra nếu khóa học có tồn tại trong bảng user_courses (không cần phân biệt Premium hay không)
        const userCourse = await prisma.user_courses.findFirst({
          where: {
            user_id: user_id,
            course_id: course.id,
          },
        });

        return {
          ...course,
          isBuy: userCourse ? true : false, // Nếu khóa học có trong bảng user_courses thì isBuy = true, ngược lại false
        };
      })
    );

    // Sắp xếp các khóa học: Đưa khóa học đã mua lên đầu, sau đó sắp xếp theo giá
    courses.sort((a, b) => {
      if (a.isBuy === b.isBuy) {
        // Nếu isBuy giống nhau, sắp xếp theo giá
        return a.price - b.price;
      }
      // Đưa khóa học đã mua lên đầu
      return b.isBuy - a.isBuy;
    });

    // Trả về dữ liệu
    return {
      isPremium: isPremium,
      courses: courses,
    };
  },
};
module.exports = UserCourseService;
