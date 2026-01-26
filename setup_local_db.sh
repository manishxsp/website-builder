#!/bin/bash
echo "🐘 Setting up local PostgreSQL database..."

# Check if we can run psql as postgres user
if command -v psql >/dev/null 2>&1; then
    echo "Creating database 'website_builder'..."
    
    # Create DB and set password using sudo
    # We use 'postgres' as the password for simplicity in local dev
    if sudo -u postgres psql -c "CREATE DATABASE website_builder;" 2>/dev/null || sudo -u postgres psql -c "SELECT 1 FROM pg_database WHERE datname = 'website_builder';" | grep -q 1; then
        echo "✅ Database 'website_builder' exists or was created."
        
        echo "Setting password for user 'postgres' to 'postgres'..."
        sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'postgres';"
        
        echo ""
        echo "🎉 Success! Your local database is ready."
        echo "---------------------------------------------------"
        echo "Connection String:"
        echo "postgresql://postgres:postgres@localhost:5432/website_builder"
        echo "---------------------------------------------------"
    else
        echo "❌ Failed to create database. You might need to run this script with sudo."
        echo "Try: sudo ./setup_local_db.sh"
    fi
else
    echo "❌ PostgreSQL client (psql) not found. Please install postgresql-client."
fi
