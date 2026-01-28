import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/lib/auth';
import * as readline from 'readline';

const prisma = new PrismaClient();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(query: string): Promise<string> {
    return new Promise(resolve => rl.question(query, resolve));
}

async function createUser() {
    try {
        console.log('\n=== Create New User ===\n');

        const email = await question('Email: ');
        const name = await question('Name: ');
        const password = await question('Password (min 6 characters): ');
        const roleInput = await question('Role (admin/customer) [customer]: ');

        const role = roleInput.trim().toLowerCase() || 'customer';

        if (!['admin', 'customer'].includes(role)) {
            console.log('❌ Invalid role. Must be "admin" or "customer"');
            rl.close();
            return;
        }

        if (password.length < 6) {
            console.log('❌ Password must be at least 6 characters long');
            rl.close();
            return;
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: email.trim() },
        });

        if (existingUser) {
            console.log('❌ User with this email already exists');
            rl.close();
            return;
        }

        // Hash password
        const hashedPassword = await hashPassword(password.trim());

        // Create user
        const user = await prisma.user.create({
            data: {
                email: email.trim(),
                name: name.trim() || null,
                password: hashedPassword,
                role: role,
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
            },
        });

        console.log('\n✅ User created successfully!');
        console.log('----------------------------');
        console.log('Email:', user.email);
        console.log('Name:', user.name);
        console.log('Role:', user.role);
        console.log('Created:', user.createdAt);
        console.log('----------------------------\n');

    } catch (error) {
        console.error('❌ Error creating user:', error);
    } finally {
        rl.close();
        await prisma.$disconnect();
    }
}

createUser();
