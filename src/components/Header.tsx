'use client'; 

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

type User = {
  // Define the properties of the User type here
  id: string;
  email: string;
  // Add other properties as needed
};

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const getLinkClass = (path: string) => {
    return `text-white ${pathname === path ? 'font-semibold text-blue-400 border-b-2 border-blue-400 ' : 'hover:text-blue-400'}`;
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user as User | null);
    };

    fetchUser();

  
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user as User | null) ;
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);


  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/auth'); 
  };

  return (
    <header className="bg-gray-800 py-4 border-b flex justify-center">
      <nav className="flex gap-4 items-center">
        <Link href="/" className={getLinkClass('/')}>APIs de la NASA</Link>
        <Link href="/space" className={getLinkClass('/space')}>L&apos;Espace</Link>
        <Link href="/terre" className={getLinkClass('/terre')}>La Terre</Link>
        <Link href="/objets" className={getLinkClass('/objets')}>Objets Proches</Link>
        <Link href="/mars" className={getLinkClass('/mars')}>Mars</Link>
        <Link href="/favorites" className={getLinkClass('/favorites')}>Favorites</Link>

        {user ? (
          <div className="relative group">
            <button className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              {user.email}
            </button>
            {}
            <button
              onClick={handleSignOut}
              className="absolute top-full mt-2 right-0 bg-red-500 text-white px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Déconnexion
            </button>
          </div>
        ) : (
          <Link href="/auth" className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            Connexion
          </Link>
        )}
      </nav>
    </header>
  );
}