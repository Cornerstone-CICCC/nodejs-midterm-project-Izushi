'use client';

import { Post } from "../../types/post";
import { PenSquare, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('http://localhost:3500/posts', {
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data = await res.json();
      setPosts(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const res = await fetch(`http://localhost:3500/posts/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Failed to delete post');
      }

      setPosts(posts.filter(post => post.id !== id));
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Posts</h1>
          <Link
            href="/posts/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Create Post
          </Link>
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <div className="flex space-x-2">
                  <Link
                    href={`/posts/${post.id}/edit`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <PenSquare className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <p className="text-gray-600">{post.content}</p>
              <div className="mt-4 text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}