import { db } from "@vercel/postgres"
import { NextResponse } from "next/server"

export const GET = async (request: Request) => {
    const client = await db.connect()

    try {
        const result = await client.sql`
            CREATE TYPE product_type AS ENUM ('food', 'healthcare', 'accessories');
            CREATE TYPE pet_type AS ENUM ('cat', 'dog');

            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

            CREATE TABLE IF NOT EXISTS Products (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                product_name VARCHAR(50) NOT NULL,
                image_url TEXT NOT NULL,
                sales_status sales_status NOT NULL,
                product_type product_type NOT NULL,
                pet_type pet_type NOT NULL,
                price NUMERIC(10, 2) NOT NULL,
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

            CREATE TRIGGER update_products_updated_at
            BEFORE UPDATE ON Products
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
        `
        return NextResponse.json({ result }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error }, { status: 500 })
    }
}