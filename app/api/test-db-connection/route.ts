// app/api/test-db-connection/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

export async function GET(request: NextRequest) {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });

  try {
    // Attempt to connect to the database
    const client = await pool.connect();
    
    // Run a simple query
    const result = await client.query('SELECT NOW()');
    
    // Release the client back to the pool
    client.release();

    // Return success response
    return NextResponse.json({
      status: 'success',
      message: 'Successfully connected to the database',
      currentTime: result.rows[0].now
    }, { status: 200 });

  } catch (error) {
    console.error('Error connecting to the database:', error);
    
    // Return error response
    return NextResponse.json({
      status: 'error',
      message: 'Failed to connect to the database',
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });

  } finally {
    // End the pool
    await pool.end();
  }
}