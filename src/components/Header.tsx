'use client'; 

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [user, setUser] = useState(null);
  const router = useRouter();


  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();

  
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
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
        <Link href="/" className="text-white font-semibold">APIs de la NASA</Link>
        <Link href="/space" className="text-white">L'Espace</Link>
        <Link href="/terre" className="text-white">La Terre</Link>
        <Link href="/objets" className="text-white">Objets Proches</Link>
        <Link href="/mars" className="text-white">Mars</Link>

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