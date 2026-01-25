import { prisma } from './src/lib/prisma';

async function checkSite() {
    const domain = 'iron-gym';
    console.log(`Checking for site with domain: ${domain}`);

    const site = await prisma.site.findFirst({
        where: {
            OR: [
                { subdomain: domain },
                { customDomain: domain }
            ]
        },
    });

    console.log('Result:', site);
}

checkSite()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
