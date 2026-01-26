const fs = require('fs');
const path = require('path');

function loadEnv(filename) {
    try {
        const content = fs.readFileSync(path.join(__dirname, filename), 'utf8');
        content.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                const value = match[2].trim().replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
                if (!process.env[key]) {
                    process.env[key] = value;
                }
            }
        });
    } catch (e) { }
}

loadEnv('.env');
loadEnv('.env.local');

const url = process.env.DATABASE_URL;

if (!url) {
    console.log("❌ DATABASE_URL is not set in .env or .env.local");
    process.exit(1);
}

console.log("\n🔍 Analyzing DATABASE_URL...\n");

// Check for common issues
const issues = [];

// Check for spaces
if (url.includes(' ')) {
    issues.push("❌ Contains SPACES (remove all spaces)");
}

// Check for newlines
if (url.includes('\n') || url.includes('\r')) {
    issues.push("❌ Contains NEWLINE characters (should be on one line)");
}

// Try to parse as URL
try {
    const parsedUrl = new URL(url);
    console.log("✅ URL structure is valid");
    console.log(`   Protocol: ${parsedUrl.protocol}`);
    console.log(`   Host: ${parsedUrl.hostname}`);
    console.log(`   Port: ${parsedUrl.port || 'default'}`);
    console.log(`   Database: ${parsedUrl.pathname}`);

    // Check password for special chars
    if (parsedUrl.password) {
        const specialChars = ['@', '#', '$', '/', '?', '%', '&', '=', '+'];
        const foundChars = specialChars.filter(char => parsedUrl.password.includes(char));

        if (foundChars.length > 0) {
            console.log(`\n⚠️  Password contains special characters: ${foundChars.join(', ')}`);
            console.log("   These should be URL-encoded in the connection string!");
        }
    }

} catch (e) {
    issues.push(`❌ Invalid URL format: ${e.message}`);

    // Provide specific hints
    if (url.includes('@@')) {
        issues.push("   → You have '@@' - likely an unencoded '@' in password");
    }

    // Check for unencoded @ in password section
    const parts = url.split('://');
    if (parts[1]) {
        const authAndHost = parts[1].split('/')[0];
        const atCount = (authAndHost.match(/@/g) || []).length;
        if (atCount > 1) {
            issues.push("   → Multiple '@' symbols detected - password needs encoding");
            issues.push("   → Replace @ with %40 in your password");
        }
    }
}

// Print all issues
if (issues.length > 0) {
    console.log("\n❌ ISSUES FOUND:\n");
    issues.forEach(issue => console.log(issue));
    console.log("\n📝 QUICK FIX:");
    console.log("   1. Open .env or .env.local");
    console.log("   2. Find DATABASE_URL=...");
    console.log("   3. URL-encode special characters in password:");
    console.log("      @ → %40");
    console.log("      # → %23");
    console.log("      $ → %24");
    console.log("      / → %2F");
    console.log("      ? → %3F");
    console.log("      % → %25");
    console.log("      & → %26");
    console.log("\n   Example:");
    console.log("   Bad:  postgresql://user:p@ss#word@host:5432/db");
    console.log("   Good: postgresql://user:p%40ss%23word@host:5432/db");
} else {
    console.log("\n✅ DATABASE_URL looks good!");
    console.log("   Try running: npx prisma db push");
}

console.log("\n");
