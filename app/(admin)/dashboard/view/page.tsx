'use client'

import { Blog } from '@/types/blog';
import { useEffect, useState } from 'react';

export default function ViewBlog() {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        async function fetchBlogs() {
            const response = await fetch('/api/blogs');
            const data = await response.json();
            setBlogs(data);
        }
        fetchBlogs();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Blog Posts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <div key={blog.id} className="bg-gray-200 rounded-lg overflow-hidden">
                        <div className="p-6 flex justify-between flex-col">
                            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                            <p className="text-gray-700 mb-4">{blog.content}</p>
                            <a 
                                href={`/blogs/${blog.id}`} 
                                className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                            >
                                Read More
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}