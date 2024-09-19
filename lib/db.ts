import { Pool, QueryResult, QueryResultRow } from 'pg';

// Define interfaces for our data models
interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  is_admin: boolean;
  created_at: Date;
}

interface Blog {
  id: number;
  title: string;
  content: string;
  author_id: number;
  created_at: Date;
  updated_at: Date;
}

interface Comment {
  id: number;
  blog_id: number;
  user_id: number;
  content: string;
  created_at: Date;
}

interface Like {
  id: number;
  blog_id: number;
  user_id: number;
  created_at: Date;
}

// Create a new pool instance
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Initialize database function
async function initDatabase(): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_admin BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS blogs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        author_id INTEGER NOT NULL REFERENCES users(id),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        blog_id INTEGER NOT NULL REFERENCES blogs(id),
        user_id INTEGER NOT NULL REFERENCES users(id),
        content TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS likes (
        id SERIAL PRIMARY KEY,
        blog_id INTEGER NOT NULL REFERENCES blogs(id),
        user_id INTEGER NOT NULL REFERENCES users(id),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(blog_id, user_id)
      );
    `);
    console.log('Database initialized');
  } catch (err) {
    console.error('Error initializing database', err);
  } finally {
    client.release();
  }
}

// Utility function to run queries with error handling
async function query<T extends QueryResultRow>(text: string, params: any[] = []): Promise<QueryResult<T>> {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } catch (err) {
    console.error('Error executing query', err);
    throw new Error('Database query failed');
  } finally {
    client.release();
  }
}

async function createBlog(title: string, content: string, authorId: number): Promise<Blog> {
  try {
    const result = await query<Blog>(
      'INSERT INTO blogs (title, content, author_id) VALUES ($1, $2, $3) RETURNING *',
      [title, content, authorId]
    );

    // Log the result for debugging purposes
    console.log('Blog created:', result.rows[0]);

    return result.rows[0]; // Return the newly created blog
  } catch (error) {
    console.error('Error creating blog in the database:', error);
    throw new Error('Unable to create blog'); // This will be caught in POST handler
  }
}

async function getBlogById(id: number): Promise<Blog | null> {
  const result = await query<Blog>('SELECT * FROM blogs WHERE id = $1', [id]);
  return result.rows[0] || null;
}

async function getAllBlogs(): Promise<Blog[]> {
  const result = await query<Blog>('SELECT * FROM blogs ORDER BY created_at DESC');
  return result.rows;
}

async function updateBlog(id: number, title: string, content: string): Promise<Blog | null> {
  const result = await query<Blog>(
    'UPDATE blogs SET title = $1, content = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
    [title, content, id]
  );
  return result.rows[0] || null;
}

async function deleteBlog(id: number): Promise<void> {
  await query('DELETE FROM blogs WHERE id = $1', [id]);
}

// Comment-related database functions
async function createComment(blogId: number, userId: number, content: string): Promise<Comment> {
  const result = await query<Comment>(
    'INSERT INTO comments (blog_id, user_id, content) VALUES ($1, $2, $3) RETURNING *',
    [blogId, userId, content]
  );
  return result.rows[0];
}

async function getCommentsByBlogId(blogId: number): Promise<Comment[]> {
  const result = await query<Comment>('SELECT * FROM comments WHERE blog_id = $1 ORDER BY created_at DESC', [blogId]);
  return result.rows;
}

// Like-related database functions
async function addLike(blogId: number, userId: number): Promise<Like | null> {
  try {
    const result = await query<Like>(
      'INSERT INTO likes (blog_id, user_id) VALUES ($1, $2) RETURNING *',
      [blogId, userId]
    );
    return result.rows[0];
  } catch (error: any) {
    if (error.code === '23505') { // Unique violation error code
      return null; // User has already liked the blog
    }
    console.error('Error adding like:', error);
    throw new Error('Error adding like');
  }
}

async function removeLike(blogId: number, userId: number): Promise<void> {
  await query('DELETE FROM likes WHERE blog_id = $1 AND user_id = $2', [blogId, userId]);
}

async function getLikeCount(blogId: number): Promise<number> {
  const result = await query<{ count: string }>('SELECT COUNT(*) FROM likes WHERE blog_id = $1', [blogId]);
  return parseInt(result.rows[0].count, 10);
}

// User-related database functions
async function createUser(username: string, email: string, password: string, isAdmin: boolean = false): Promise<User> {
  const result = await query<User>(
    'INSERT INTO users (username, email, password, is_admin) VALUES ($1, $2, $3, $4) RETURNING *',
    [username, email, password, isAdmin]
  );
  return result.rows[0];
}

async function getUserById(id: number): Promise<User | null> {
  const result = await query<User>('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0] || null;
}

async function getUserByEmail(email: string): Promise<User | null> {
  const result = await query<User>('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0] || null;
}

export {
    initDatabase,
    createBlog,
    getBlogById,
    getAllBlogs,
    updateBlog,
    deleteBlog,
    createComment,
    getCommentsByBlogId,
    addLike,
    removeLike,
    getLikeCount,
    createUser,
    getUserById,
    getUserByEmail
};

export type {
    User,
    Blog,
    Comment,
    Like
};
