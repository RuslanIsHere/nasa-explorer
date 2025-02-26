"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
    }, []);

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
        <Header />
        <div className="container mt-5 text-white">
            <div className="py-5 border rounded shadow-sm">
                <p className="lead px-4 mb-4">
                    Le service <strong>Asteroids - NeoWs</strong> de la NASA fournit des informations sur les astéroïdes proches de la Terre.
                </p>
                <form className="w-50 mx-auto" onSubmit={handleSubmit}>
                    <div className="mb-3 text-center">
                        <label className="form-label fs-4 fw-bold text-white">Sélectionnez une date :</label>
                        <input
                            type="date"
                            className="form-control"
                            value={selectedDate}
                            min="2015-06-13"
                            max={today}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Envoyer</button>
                </form>
            </div>
            <h2 className="title text-center pt-4">Asteroids - NeoWs</h2>
            <div className="container py-4 row g-2">
                {error && <p className="text-danger text-center">{error}</p>}
                {neoObjects.length === 0 && !error && <p className="text-center">Aucun astéroïde trouvé pour cette date.</p>}
                {neoObjects.map((obj, index) => (
                    <div key={index} className="col-12 col-md-6 col-lg-4">
                        <div className="text-black card h-100 shadow">
                            <div className="card-body">
                                <h5 className="card-title">Nom: {obj.name}</h5>
                                <p className="card-text">
                                    Danger Potentiel: {obj.is_potentially_hazardous_asteroid ? "Oui" : "Non"}
                                </p>
                                <p className="card-text">
                                    Taille: {obj.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} - {" "}
                                    {obj.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km
                                </p>
                                <p className="card-text">
                                    Distance de la Terre: {obj.close_approach_data.length > 0 ? parseInt(obj.close_approach_data[0].miss_distance.kilometers) : "Inconnue"} km
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <Footer />
    </>
);
}
