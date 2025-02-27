'use client';

import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

const apiKey="6ScFWJkC8Gbsy1o0DlnKKUGkNAVpGYq7Rup5drN3";

interface ApodData {
    date: string;
    title: string;
    explanation: string;
    hdurl: string;
}

export default function Space() {
    const [apodData, setApodData] = useState<ApodData | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/auth');
            }
        };
        checkAuth();

        const today = new Date().toISOString().split("T")[0];
        setSelectedDate(today);
        fetchApod(today);
    }, []);

    const fetchApod = async (date: string) => {
        try {
            const response = await fetch(
                `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`
            );
            if (!response.ok) {
                throw new Error("Erreur lors du chargement de l'API APOD");
            }
            const data: ApodData = await response.json();
            setApodData(data);
            setError(null);
        } catch (err) {
        setError((err as Error).message);
        setApodData(null);
        }
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        fetchApod(selectedDate);
    };

    const addToFavorites = async (imageUrl: string) => {
        const { data: { user } } = await supabase.auth.getUser();
    
        if (!user) {
            alert('Vous devez être connecté pour ajouter aux favoris.');
            return;
        }
    
        const { error } = await supabase
            .from('favorites')
            .insert([{ user_id: user.id, image_url: imageUrl }]);
    
        if (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de l\'ajout aux favoris.');
        } else {
            alert('Ajouté aux favoris!');
        }
    };

    return (
        <>
        <Head>
            Astronomy Picture of the Day
        </Head>
        <main className="bg-gray-800 text-white text-center py-10">
        <div className=" container p-5">

            <p className="lead px-4 mb-4">
                <strong>L'API "Astronomy Picture of the Day" (APOD)</strong> de la NASA offre une image astronomique quotidienne, accompagnée d'une explication.
            </p>

            <form className="w-50 mx-auto p-5" onSubmit={handleSubmit}>
                <div className="mb-3 text-center">
                    <label className="block text-lg form-label fs-4 fw-bold text-white">
                    Sélectionnez une date :
                    </label>
                    <input
                        type="date"
                        className="text-black px-4 py-2 rounded-lg form-control  focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={selectedDate}
                        min="1995-06-16"
                        max={new Date().toISOString().split("T")[0]}
                        onChange={handleDateChange}
                    />
                </div>
                <button type="submit" className="bg-blue-600 px-10 py-3 font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300">Envoyer</button>
            </form>
        
            {error && <p className="text-danger text-center">{error}</p>}
            {apodData && (
                <div className="container py-4  rounded-xl shadow-sm">
                    <h2 className="text-3xl font-bold text-center pt-4">
                        Astronomy Picture of the Day: {apodData.date}
                    </h2>
                    <div className="bg-gray-900 grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 rounded-xl">
                        <div className="flex justify-center md:justify-start">
                            <img className="w-full h-auto rounded-lg shadow-md m-4"  alt={apodData.title} src={apodData.hdurl} />
                        </div>
                        <div className="flex flex-col p-4">
                            <h5 className="text-lg font-bold">{apodData.title}</h5>
                            <p className="card-text">Date : {apodData.date}</p>
                            <p className="card-text">Description : {apodData.explanation}</p>
                            <button
                            onClick={() => addToFavorites(apodData.hdurl)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-700 transition-colors duration-300"
                            >
                                Ajouter aux favoris
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </main>
        
        </>
    );
}
