import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BookIcon, LogOut, UserIcon } from 'lucide-react';

export default function Header({ user, onLogout }: { user: any, onLogout: () => void }) {
  const router = useRouter();

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link href="/notion/list" className="text-2xl font-bold text-blue-500">
          TechTalk Notion
        </Link>
        <div className="flex items-center">
          <button
            className="flex items-center px-4 py-2 text-sm hover:bg-gray-50"
          >
            <Link href="/notion/list" className="text-gray-700 hover:text-gray-900">
            <BookIcon />
          </Link>
          </button>
          <button
            className="flex items-center px-4 py-2 text-sm hover:bg-gray-50"
          >
            <Link href="/profile" className="text-gray-700 hover:text-gray-900">
            <UserIcon />
          </Link>
          </button>
          <button
            onClick={onLogout}
            className="flex items-center px-4 py-2 text-sm hover:bg-gray-50"
          >
            <LogOut className="h-4 w-4 mr-2" />
          </button>
        </div>
      </div>
    </header>
  );
}