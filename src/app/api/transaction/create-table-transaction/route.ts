import { db } from "@vercel/postgres"
import { NextResponse } from "next/server"

export const GET = async () => {
    const client = await db.connect()

    try {
        const response = await client.sql`
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
            CREATE TABLE IF NOT EXISTS Transactions (
                transaction_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                customer_id UUID REFERENCES customers(customer_id),
                product_id UUID REFERENCES products(id) ON DELETE CASCADE,
                quantity INT NOT NULL,
                total_price NUMERIC(10, 2) NOT NULL,
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
                
            CREATE TRIGGER update_transactions_updated_at
            BEFORE UPDATE ON Transactions
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
        `
        return NextResponse.json({ response }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error }, { status: 500 })
    }
}