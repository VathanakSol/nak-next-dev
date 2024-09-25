import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Function to handle POST requests for creating a blog
export async function POST(request: Request) {
    const { title, content } = await request.json();

    try {
        const result = await pool.query(
            'INSERT INTO blogs(title, content) VALUES($1, $2) RETURNING *',
            [title, content]
        );
        return NextResponse.json(result.rows[0], { status: 201 });
    } catch (error) {
        console.error('Error inserting blog:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

// Function to handle GET requests for fetching blogs
export async function GET() {
    try {
        const result = await pool.query('SELECT * FROM blogs');
        return NextResponse.json(result.rows, { status: 200 });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}