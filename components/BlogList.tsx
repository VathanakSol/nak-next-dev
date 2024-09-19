'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Blog } from '@/lib/db';

interface BlogListProps {
  initialBlogs: Blog[];
}

export default function BlogList({ initialBlogs }: BlogListProps) {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs || []); // Ensure initialBlogs is an array
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadMoreBlogs = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/blogs?page=${page + 1}`);
      const newBlogs: Blog[] = await response.json();

      if (Array.isArray(newBlogs)) {
        setBlogs((prevBlogs) => [...prevBlogs, ...newBlogs]);
        setPage(page + 1);
      } else {
        console.error('Invalid response format:', newBlogs);
      }
    } catch (error) {
      console.error('Error loading more blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Ensure blogs is an array and map over valid blog objects */}
      {Array.isArray(blogs) && blogs.length > 0 ? (
        blogs.map((blog) =>
          blog && blog.id && blog.title && blog.content && blog.created_at ? ( // Validate each blog object
            <div key={blog.id} className="mb-6 p-4 border border-gray-200 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">
                <Link href={`/blogs/${blog.id}`} className="text-blue-600 hover:underline">
                  {blog.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-2">
                Posted on: {new Date(blog.created_at).toLocaleDateString()}
              </p>
              <p className="text-gray-800">
                {blog.content.substring(0, 150)}...
              </p>
            </div>
          ) : (
            <div key={blog?.id || Math.random()} className="text-red-500">
              Invalid blog data
            </div>
          )
        )
      ) : (
        <main className="w-full h-[80vh] grid place-content-center font-semibold">
            <p>No blogs found</p>
        </main>
      )}

      {/* Only show load more if there are enough blogs */}
      {blogs.length >= page * 10 && (
        <button
          onClick={loadMoreBlogs}
          disabled={loading}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
}
