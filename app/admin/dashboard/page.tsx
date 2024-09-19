// app/admin/dashboard/page.tsx
import { Suspense } from 'react';

import CreateBlogForm from '@/components/CreateBlogForm';
import BlogList from '@/components/BlogList';

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Create New Blog</h2>
          <CreateBlogForm />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Existing Blogs</h2>
          <Suspense fallback={<div>Loading blogs...</div>}>
            <BlogList initialBlogs={[]} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}