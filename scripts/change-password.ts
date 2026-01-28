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

async function changePassword() {
    try {
        const email = await question('Enter user email: ');

        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { email: email.trim() },
        });

        if (!user) {
            console.log('❌ User not found with email:', email);
            rl.close();
            return;
        }

        console.log(`\n✓ Found user: ${user.name || user.email} (${user.role})`);

        const newPassword = await question('Enter new password: ');

        if (newPassword.length < 6) {
            console.log('❌ Password must be at least 6 characters long');
            rl.close();
            return;
        }

        // Hash the new password
        const hashedPassword = await hashPassword(newPassword.trim());

        // Update the password
        await prisma.user.update({
            where: { email: email.trim() },
            data: { password: hashedPassword },
        });

        console.log('\n✅ Password changed successfully!');
        console.log(`User: ${user.email}`);
        console.log('You can now login with the new password.');

    } catch (error) {
        console.error('❌ Error changing password:', error);
    } finally {
        rl.close();
        await prisma.$disconnect();
    }
}

changePassword();
