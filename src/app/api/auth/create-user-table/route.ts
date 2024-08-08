import { db, sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
    const client = await db.connect()

    try {
        const result = 
            await client.sql`
                CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
                CREATE IF NOT EXIST TABLE Users (
                    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                    username VARCHAR(50) NOT NULL,
                    password CHAR(60) NOT NULL,
                    fullname VARCHAR(50) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );

                CREATE OR REPLACE FUNCTION update_updated_at_column()
                RETURNS TRIGGER AS $$
                BEGIN
                    NEW.updated_at = NOW();
                    RETURN NEW;
                END;
                $$ LANGUAGE plpgsql;
                
                CREATE TRIGGER update_users_updated_at
                BEFORE UPDATE ON Users
                FOR EACH ROW
                EXECUTE FUNCTION update_updated_at_column();
            `
        return NextResponse.json({ result }, { status: 200 })
    } catch (error) {
        console.error('Error creating table:', error);
        return NextResponse.json({ error }, { status: 500 })
    }
}