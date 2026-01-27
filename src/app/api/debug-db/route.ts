import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        console.log('Debug DB: Attempting to connect...');

        // Check environment variable (masked)
        const dbUrl = process.env.DATABASE_URL;
        const directUrl = process.env.DIRECT_URL;

        let dbConfig = {
            host: 'UNKNOWN',
            port: 'UNKNOWN',
            user: 'UNKNOWN',
            database: 'UNKNOWN',
            schema: 'UNKNOWN',
            ssl: 'UNKNOWN'
        };

        if (dbUrl) {
            try {
                // Parse the connection string safely
                // Format: postgresql://user:password@host:port/database?schema=public
                const url = new URL(dbUrl);
                dbConfig = {
                    host: url.hostname,
                    port: url.port,
                    user: url.username ? `${url.username.substring(0, 2)}***` : 'MISSING',
                    database: url.pathname.replace('/', ''),
                    schema: url.searchParams.get('schema') || 'public',
                    ssl: url.searchParams.get('sslmode') || 'default'
                };
            } catch (e) {
                console.error('Failed to parse DB URL', e);
            }
        }

        const maskedDbUrl = dbUrl
            ? `${dbUrl.substring(0, 15)}...${dbUrl.substring(dbUrl.length - 5)}`
            : 'NOT_DEFINED';

        // Attempt a simple query
        const startTime = Date.now();
        // We use findFirst but limit select to just id to be lightweight
        const site = await prisma.site.findFirst({
            select: { id: true },
        });
        const duration = Date.now() - startTime;

        return NextResponse.json({
            status: 'success',
            message: 'Database connection successful',
            duration: `${duration}ms`,
            connectionDetails: dbConfig,
            databaseUrlMasked: maskedDbUrl,
            directUrlDefined: !!directUrl,
            result: site ? 'Found site' : 'No sites found (but connection worked)',
            env: {
                NODE_ENV: process.env.NODE_ENV,
                VERCEL_ENV: process.env.VERCEL_ENV,
            }
        });

    } catch (error: any) {
        console.error('Debug DB Error:', error);

        // Construct a detailed error object
        const errorDetails = {
            name: error.name,
            message: error.message,
            code: error.code,
            meta: error.meta,
            clientVersion: error.clientVersion,
            stack: error.stack,
        };

        // Parse DB URL for error context too
        let dbConfig = { host: 'UNKNOWN', user: 'UNKNOWN' };
        if (process.env.DATABASE_URL) {
            try {
                const url = new URL(process.env.DATABASE_URL);
                dbConfig = {
                    host: url.hostname,
                    user: url.username ? `${url.username.substring(0, 2)}***` : 'MISSING',
                };
            } catch (e) { }
        }

        return NextResponse.json({
            status: 'error',
            message: 'Database connection failed',
            error: errorDetails,
            connectionDetails: dbConfig,
            databaseUrlMasked: process.env.DATABASE_URL ? 'DEFINED' : 'UNDEFINED',
            env: {
                NODE_ENV: process.env.NODE_ENV,
            }
        }, { status: 500 });
    }
}
