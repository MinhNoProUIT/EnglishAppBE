const { PrismaClient } = require("../generated/prisma"); // hoặc '@prisma/client' nếu dùng mặc định
const prisma = new PrismaClient();

const PremiumPackageService = {
  async getPremiumPackageIdByName(name) {
    const package = await prisma.premium_packages.findUnique({
      where: { name },
      select: { id: true },
    });

    if (!package) {
      throw new Error(`Khong ton tai package: ${name}`);
    }

    return package.id;
  },
};

async function checkAndUpdatePremiumStatus(user_id) {
  const latestPackage = await prisma.user_packages.findFirst({
    where: { user_id },
    orderBy: { start_date: "desc" },
    include: {
      packages: true,
    },
  });

  if (!latestPackage) return;

  const { start_date, packages } = latestPackage;
  const expiredDate = new Date(start_date);
  expiredDate.setDate(expiredDate.getDate() + packages.duration_days);

  const today = new Date();

  if (expiredDate < today) {
    await prisma.users.update({
      where: { id: user_id },
      data: { isPremium: false },
    });
  }
}

module.exports = { PremiumPackageService, checkAndUpdatePremiumStatus };
