'use client';

import { User } from "../../types/user";
import { User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "../components/header";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    checkAuth();
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
      <div className="min-h-screen p-4 mt-16">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-full">
                <UserIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold">Profile</h1>
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Username</h3>
              <p className="mt-1 text-lg font-medium">{user?.username}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
              <p className="mt-1 text-lg font-medium">
                {user?.firstname} {user?.lastname}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}