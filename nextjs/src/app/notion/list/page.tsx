'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
// import { User } from '@/types/user';
import { LogOut } from 'lucide-react';
import Header from '@/app/components/header';

interface Article {
  id: string;
  title: string;
  author: string;
  date: string;
  description: string;
  tags: string[];
}

const tagColors: { [key: string]: string } = {
  React: 'bg-blue-500 text-white',
  'Node.js': 'bg-green-500 text-white',
  Express: 'bg-gray-500 text-white',
  Database: 'bg-red-500 text-white',
  JavaScript: 'bg-yellow-500 text-black',
  Frontend: 'bg-pink-500 text-white',
  Backend: 'bg-purple-500 text-white',
  API: 'bg-teal-500 text-white',
};

export default function DiaryPage() {
  const [entries, setEntries] = useState<Article[]>([]);
  const [error, setError] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchEntries();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('http://localhost:3500/users/check-auth', {
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Not authenticated');
      }

      const userData = await res.json();
      setUser(userData);
    } catch (error) {
      router.push('/login');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEntries = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/getAllPosts');
      const data = await res.json();
      setEntries(data);
      setIsLoading(true);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:3500/users/logout', {
        method: 'GET',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Logout failed');
      }

      router.push('/login');
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Header user={user} onLogout={handleLogout} />
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Article List</h1>
          </div>
          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {entries.map((entry) => (
              <Link href={`/notion/${entry.id}`} key={entry.id}>
                <div
                  className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                      {entry.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {entry.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-2 py-1 rounded-full text-sm ${tagColors[tag]}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm mb-2">
                        {entry.author}
                      </span>
                      <span className="text-sm text-gray-500">
                        {entry.date}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}