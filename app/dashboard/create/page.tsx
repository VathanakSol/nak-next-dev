'use client'

import { FormEvent, useState } from 'react';

export default function CreateBlog() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const response = await fetch('/api/blogs', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            // Reset form fields after successful submission
            setTitle('');
            setContent('');
            alert('Blog created successfully!');
        } else {
            alert('Failed to create blog.');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Blog Title" 
                required 
            />
            <textarea 
                name="content" 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                placeholder="Blog Content" 
                required 
            />
            <button type="submit">Create Blog</button>
        </form>
    );
}