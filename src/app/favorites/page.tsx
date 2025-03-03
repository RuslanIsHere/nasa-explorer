'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Favorite {
    id: number;
    image_url: string;
}

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFavorites = async () => {
            setLoading(true);
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    setError("Pas authoris");
                    setLoading(false);
                    return;
                }
                const { data, error } = await supabase
                    .from('favorites')
                    .select('id, image_url')
                    .eq('user_id', user.id);

                if (error) throw error;

                if (data) {
                    setFavorites(data);
                }
            } catch (err: unknown) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    return (
        <div className="container min-h-[80vh] bg-gray-800 mx-auto p-5 text-white">
            <h1 className="text-2xl font-bold text-center">Favorites</h1>
            {loading && <p>Loading</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                {favorites.length > 0 ? (
                    favorites.map((favorite) => (
                        <div key={favorite.id} className="bg-gray-900 p-4 rounded-lg shadow-lg">
                            <img
                                src={favorite.image_url}
                                alt={`Favorite ${favorite.id}`}
                                className="w-full h-80 object-cover rounded-xl"
                            />
                        </div>
                    ))
                ) : (
                    !loading && <p className="text-center col-span-3">Pas de favorites</p>
                )}
            </div>
        </div>
    );
}
