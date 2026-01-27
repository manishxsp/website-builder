import { prisma } from './src/lib/prisma';
import * as fs from 'fs';

async function exportSites() {
  console.log('Fetching sites data from database...');

  const sites = await prisma.site.findMany({
    include: {
      services: { orderBy: { order: 'asc' } },
      testimonials: { orderBy: { order: 'asc' } },
      banners: { orderBy: { order: 'asc' } },
      products: { orderBy: { order: 'asc' } },
      businessHours: { orderBy: { order: 'asc' } },
      locations: { orderBy: { order: 'asc' } },
      tags: { orderBy: { order: 'asc' } },
      navLinks: { orderBy: { order: 'asc' } },
      faqs: { orderBy: { order: 'asc' } }
    }
  });

  console.log(`Found ${sites.length} sites. Writing to JSON file...`);

  fs.writeFileSync('sites-export.json', JSON.stringify(sites, null, 2));

  console.log('Export complete! Data saved to sites-export.json');
}

exportSites().catch(console.error);
