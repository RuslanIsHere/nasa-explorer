'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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

    useEffect(() => {
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

    return (
        <>
        <Header />
        <div className="bg-gray-800 container p-5 text-white text-center">
            <div className="py-5 border rounded shadow-sm">
            <p className="lead px-4 mb-4">
                <strong>L'API "Astronomy Picture of the Day" (APOD)</strong> de la NASA offre une image astronomique quotidienne, accompagnée d'une explication.
            </p>
            <form className="w-50 mx-auto" onSubmit={handleSubmit}>
                <div className="mb-3 text-center">
                <label className="form-label fs-4 fw-bold text-white">
                Sélectionnez une date :
                </label>
                <input
                    type="date"
                    className="form-control"
                    value={selectedDate}
                    min="1995-06-16"
                    max={new Date().toISOString().split("T")[0]}
                    onChange={handleDateChange}
                />
                </div>
                <button type="submit" className="btn btn-primary w-100">Envoyer</button>
            </form>
            </div>
            {error && <p className="text-danger text-center">{error}</p>}
            {apodData && (
                <div className="container py-4 border rounded shadow-sm">
                    <h2 className="title text-center pt-4">
                        Astronomy Picture of the Day: {apodData.date}
                    </h2>
                    <div className="row">
                        <div className="col-12 col-md-8">
                            <img className="img-fluid" style={{ width: "100%" }} alt={apodData.title} src={apodData.hdurl} />
                        </div>
                        <div className="col-12 col-md-4 d-flex">
                            <div>
                                <h5 className="card-title">{apodData.title}</h5>
                                <p className="card-text">Date : {apodData.date}</p>
                                <p className="card-text">Description : {apodData.explanation}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        <Footer />
        </>
    );
}
