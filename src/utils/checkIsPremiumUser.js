const { PrismaClient } = require("../generated/prisma"); // hoặc '@prisma/client' nếu dùng mặc định
const prisma = new PrismaClient();

export async function checkIsPremiumUser(user_id) {
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
