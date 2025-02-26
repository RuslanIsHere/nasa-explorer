"use client";
import Head from "next/head";
import { useState, useEffect } from "react";


const apiKey = "6ScFWJkC8Gbsy1o0DlnKKUGkNAVpGYq7Rup5drN3";

interface EstimatedDiameter {
    estimated_diameter_min: number;
    estimated_diameter_max: number;
}

interface CloseApproachData {
    miss_distance: { kilometers: string };
}

interface NeoObject {
    name: string;
    is_potentially_hazardous_asteroid: boolean;
    estimated_diameter: { kilometers: EstimatedDiameter };
    close_approach_data: CloseApproachData[];
}

export default function NearEarthObjects() {
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [neoObjects, setNeoObjects] = useState<NeoObject[]>([]);
    const [error, setError] = useState<string | null>(null);
    const today = new Date().toISOString().split("T")[0];

    useEffect(() => {
        setSelectedDate(today);
        fetchNeoObjects(today);
    }, [today]);

    const fetchNeoObjects = async (date: string) => {
    try {
        const response = await fetch(
            `https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=${apiKey}`
        );
        if (!response.ok) throw new Error("Erreur lors du chargement de l'API NeoWs");

        const data = await response.json();
        const objectsByDate: NeoObject[] = Object.values(data.near_earth_objects as Record<string, NeoObject[]>).flat();
        setNeoObjects(objectsByDate);
        setError(null);
    } catch (err) {
        setError((err as Error).message);
        setNeoObjects([]);
    }
};

const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetchNeoObjects(selectedDate);
};

return (
    <>
        <Head>
            Asteroids - NeoWs
        </Head>
        <main className='bg-gray-800 text-white text-center'>
        <div className="container p-5 ">
            <div className="py-5">
                <p className="lead px-4 mb-4">
                    Le service <strong>Asteroids - NeoWs</strong> de la NASA fournit des informations sur les astéroïdes proches de la Terre.
                </p>
                <form className="w-50 mx-auto p-5" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="block text-lg form-label fs-4 fw-bold">Sélectionnez une date :</label>
                        <input
                            type="date"
                            className="text-black px-4 py-2 rounded-lg form-control  focus:outline-none focus:ring-2 focus:ring-blue-500rm-control"
                            value={selectedDate}
                            min="2015-06-13"
                            max={today}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="bg-blue-600 px-10 py-3 font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300">Envoyer</button>
                </form>
            </div>
            <h2 className="text-3xl text-bold pt-4">Asteroids - NeoWs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {error && <p className="text-red-500 text-center">{error}</p>}
                {neoObjects.length === 0 && !error && <p className="p-4 text-center text-red-500">Aucun astéroïde trouvé pour cette date.</p>}
                {neoObjects.map((obj, index) => (
                    <div key={index} className="bg-gray-900 rounded-lg  h-full">
                        <div className="p-4">
                    
                            <h5 className="text-xl font-semibold">Nom: {obj.name}</h5>
                            <p className="p-2">
                                Danger Potentiel: {obj.is_potentially_hazardous_asteroid ? "Oui" : "Non"}
                            </p>
                            <p className="p-2">
                                Taille: {obj.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} - {" "}
                                {obj.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km
                            </p>
                            <p className="p-2">
                                Distance de la Terre: {obj.close_approach_data.length > 0 ? parseInt(obj.close_approach_data[0].miss_distance.kilometers) : "Inconnue"} km
                            </p>
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </main>
        
    </>
);
}
