import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@kopilogi.id" },
    update: {},
    create: {
      fullName: "Admin Kopilogi",
      email: "admin@kopilogi.id",
      password: hashedPassword,
      phoneNumber: "081234567890",
      role: UserRole.ADMIN,
    },
  });

  console.log("Admin created:", admin.email);

  // Create categories
  const kategoriKopi = await prisma.category.upsert({
    where: { name: "Kopi" },
    update: {},
    create: {
      name: "Kopi",
      description: "Minuman kopi pilihan",
    },
  });

  const kategoriMakanan = await prisma.category.upsert({
    where: { name: "Makanan" },
    update: {},
    create: {
      name: "Makanan",
      description: "Hidangan spesial",
    },
  });

  const kategoriDessert = await prisma.category.upsert({
    where: { name: "Dessert" },
    update: {},
    create: {
      name: "Dessert",
      description: "Camilan manis",
    },
  });

  console.log("Categories created");

  // Create menus
  const menus = [
    {
      name: "Americano",
      description: "Kopi hitam klasik dengan rasa yang kuat",
      price: 25000,
      imageUrl: "americano.webp",
      categoryId: kategoriKopi.id,
      isRecommended: true,
    },
    {
      name: "Latte",
      description: "Kopi susu dengan foam lembut",
      price: 30000,
      imageUrl: "latte.webp",
      categoryId: kategoriKopi.id,
      isRecommended: true,
    },
    {
      name: "Matcha Latte",
      description: "Minuman matcha dengan susu segar",
      price: 35000,
      imageUrl: "matcha.jpeg",
      categoryId: kategoriKopi.id,
      isRecommended: false,
    },
    {
      name: "Nasi Goreng Seafood",
      description: "Nasi goreng dengan campuran seafood segar",
      price: 45000,
      imageUrl: "nasgorseafood.jpeg",
      categoryId: kategoriMakanan.id,
      isRecommended: false,
    },
    {
      name: "Sate Taichan",
      description: "Sate ayam tanpa bumbu kacang, pedas gurih",
      price: 35000,
      imageUrl: "Sate Taichan.jpeg",
      categoryId: kategoriMakanan.id,
      isRecommended: false,
    },
  ];

  for (const menu of menus) {
    const existing = await prisma.menu.findFirst({
      where: { name: menu.name, isDeleted: false },
    });

    if (!existing) {
      await prisma.menu.create({ data: menu });
      console.log(`Menu created: ${menu.name}`);
    } else {
      console.log(`Menu already exists: ${menu.name}`);
    }
  }

  // Create tables
  for (let i = 1; i <= 10; i++) {
    const existing = await prisma.restaurantTable.findUnique({
      where: { tableNumber: i },
    });

    if (!existing) {
      await prisma.restaurantTable.create({
        data: {
          tableNumber: i,
          capacity: i <= 4 ? 2 : i <= 8 ? 4 : 6,
        },
      });
      console.log(`Table ${i} created`);
    }
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
