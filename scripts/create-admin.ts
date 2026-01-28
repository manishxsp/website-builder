import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/lib/auth';

const prisma = new PrismaClient();

async function createAdminUser() {
    const email = process.env.ADMIN_EMAIL || 'admin@example.com';
    const password = process.env.ADMIN_PASSWORD || 'admin123';
    const name = 'Admin User';

    try {
        // Check if admin already exists
        const existingAdmin = await prisma.user.findUnique({
            where: { email },
        });

        if (existingAdmin) {
            console.log('Admin user already exists:', email);
            return;
        }

        // Create admin user
        const hashedPassword = await hashPassword(password);
        const admin = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: 'admin',
            },
        });

        console.log('Admin user created successfully!');
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Please change the password after first login.');
    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        await prisma.$disconnect();
    }
}

createAdminUser();
