import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogs, createBlog } from '@/lib/db';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = 10; // Number of blogs per page

  try {
    const allBlogs = await getAllBlogs();
    const paginatedBlogs = allBlogs.slice((page - 1) * limit, page * limit);
    return NextResponse.json(paginatedBlogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, content } = await request.json();

    // Validate input data
    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required.' }, { status: 400 });
    }

    const authorId = 1; // TODO: Replace with actual author ID from authentication
    const newBlog = await createBlog(title, content, authorId);
    
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);
    
    // Return a more descriptive error message for debugging
    return NextResponse.json({ error: 'Internal Server Error', details: error }, { status: 500 });
  }
}