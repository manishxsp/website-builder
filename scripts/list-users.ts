import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listUsers() {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                isActive: true,
                createdAt: true,
                _count: {
                    select: {
                        sites: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        if (users.length === 0) {
            console.log('\n📭 No users found in the database.\n');
            return;
        }

        console.log('\n=== All Users ===\n');
        console.log('Total users:', users.length);
        console.log('----------------------------\n');

        users.forEach((user, index) => {
            console.log(`${index + 1}. ${user.email}`);
            console.log(`   Name: ${user.name || 'N/A'}`);
            console.log(`   Role: ${user.role}`);
            console.log(`   Status: ${user.isActive ? '✓ Active' : '✗ Inactive'}`);
            console.log(`   Sites: ${user._count.sites}`);
            console.log(`   Created: ${user.createdAt.toLocaleDateString()}`);
            console.log('----------------------------\n');
        });

        // Summary
        const adminCount = users.filter(u => u.role === 'admin').length;
        const customerCount = users.filter(u => u.role === 'customer').length;

        console.log('Summary:');
        console.log(`  Admins: ${adminCount}`);
        console.log(`  Customers: ${customerCount}`);
        console.log(`  Total: ${users.length}\n`);

    } catch (error) {
        console.error('❌ Error listing users:', error);
    } finally {
        await prisma.$disconnect();
    }
}

listUsers();
