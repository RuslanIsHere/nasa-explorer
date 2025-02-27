'use client'

import Head from 'next/head';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';


export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push('/auth');
            }
        };

        checkAuth();
    }, [router]);

    return (
    <>
        <Head>
            API de la NASA
        </Head>
        <main className="bg-gray-800 text-white text-center py-10">
            <h1 className="text-4xl font-bold">Explorez l'Univers avec les API de la NASA</h1>
            <p className="mt-4 text-gray-300">
                Découvrez des images de l&apos;espace, surveillez les objets proches de la Terre et explorez les missions martiennes grâce aux API de la NASA.
            </p>
            <div className='flex justify-center text-center py-10'>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                    <Link href="/space" className="rounded-lg bg-cover bg-center h-80 flex items-center justify-center text-lg md:text-xl lg:text-2xl font-bold transition-transform duration-500 hover:scale-105" style={{ backgroundImage: "url('/img/APOD.jpg')" }}> 
                        Astronomy Picture of the Day 
                    </Link>
                    <Link href="/terre" className="rounded-lg bg-cover bg-center h-80 flex items-center justify-center text-lg md:text-xl lg:text-2xl font-bold transition-transform duration-500 hover:scale-105" style={{ backgroundImage: "url('/img/EPIC.jpeg')" }}>
                        Earth Polychromatic Imaging Camera
                    </Link>
                    <Link href="/objets" className="rounded-lg bg-cover bg-center h-80 flex items-center justify-center text-lg md:text-xl lg:text-2xl font-bold transition-transform duration-500 hover:scale-105" style={{backgroundImage: "url('/img/ASTEROIDS.jpg')" }}>
                        Asteroids - NeoWs
                    </Link>
                    <Link href="/mars" className="rounded-lg bg-cover bg-center h-80 flex items-center justify-center  text-lg md:text-xl lg:text-2xl font-bold transition-transform duration-500 hover:scale-105" style={{ backgroundImage: "url('/img/MARS.jpg')" }}>
                        Mars Rover Photos
                    </Link>
                </div>
            </div>
        </main>

    </>
	);
}
