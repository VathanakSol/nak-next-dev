// app/api/blogs/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { deleteBlog } from '@/lib/db';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    await deleteBlog(id);
    return NextResponse.json({ message: 'Blog deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}