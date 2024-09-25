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
        <div>
            {blogs.map((blog) => (
                <div key={blog.id}>
                    <h2>{blog.title}</h2>
                    <p>{blog.content}</p>
                </div>
            ))}
        </div>
    );
}