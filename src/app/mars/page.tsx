'use client';
import Head from "next/head";
import { useState, useEffect } from "react";


const apiKey = "6ScFWJkC8Gbsy1o0DlnKKUGkNAVpGYq7Rup5drN3";

type Photo = {
    img_src: string;
    rover: { name: string };
    camera: { full_name: string };
    earth_date: string;
    sol: number;
};

export default function MarsPage() {
    const [rover, setRover] = useState("curiosity");
    const [sol, setSol] = useState(1000);
    const [camera, setCamera] = useState("FHAZ");
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [error, setError] = useState("");

    const fetchMarsPhotos = async () => {
    if (!rover || !sol || !camera) {
        setError("Veuillez remplir tous les champs du formulaire");
        return;
    }

    try {
        const response = await fetch(
            `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${camera}&api_key=${apiKey}`
        );
        if (!response.ok) throw new Error("Erreur lors du chargement de l'API");
        const data = await response.json();
        setPhotos(data.photos);
        setError("");
    } catch (err) {
        setError((err as Error).message);
    }
};

useEffect(() => {
    fetchMarsPhotos();
}, []);

return (
    <>
    <Head>Mars Rover Photos</Head>
    <main className='bg-gray-800 text-white text-center'>
    <div className="container mx-auto p-5">
    <h1 className="text-2xl font-bold">Mars Rover Photos</h1>
    <div className="p-5 rounded-lg shadow-lg">
        <label className="block">Choisissez un rover:</label>
        <select value={rover} onChange={(e) => setRover(e.target.value)} className="w-full p-2 rounded text-black">
            <option value="curiosity">Curiosity</option>
            <option value="opportunity">Opportunity</option>
            <option value="spirit">Spirit</option>
        </select>

        <label className="block mt-2">Entrez une date martienne (sol):</label>
        <input
            type="number"
            value={sol}
            onChange={(e) => setSol(Number(e.target.value))}
            className="w-full p-2 rounded text-black"
        />

        <label className="block mt-2">Choisissez un type de caméra:</label>
        <select value={camera} onChange={(e) => setCamera(e.target.value)} className="w-full p-2 rounded text-black">
            <option value="FHAZ">Front Hazard Avoidance Camera</option>
            <option value="RHAZ">Rear Hazard Avoidance Camera</option>
            <option value="MAST">Mast Camera</option>
            <option value="CHEMCAM">Chemistry and Camera Complex</option>
            <option value="MAHLI">Mars Hand Lens Imager</option>
            <option value="MARDI">Mars Descent Imager</option>
            <option value="NAVCAM">Navigation Camera</option>
            <option value="PANCAM">Panoramic Camera</option>
            <option value="MINITES">Miniature Thermal Emission Spectrometer</option>
        </select>

        <button onClick={fetchMarsPhotos} className="mt-4 w-full bg-blue-500 p-2 rounded text-white">
            Envoyer
        </button>
    </div>

    {error && <p className="text-red-500 text-center mt-4">{error}</p>}

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        {photos.length > 0 ? (
            photos.map((photo, index) => (
                <div key={index} className="bg-gray-900 p-4 rounded-lg shadow-lg">
                    <img src={photo.img_src} alt="Mars" className="w-full h-64 object-cover rounded" />
                    <p className="mt-2">Rover: {photo.rover.name}</p>
                    <p>Camera: {photo.camera.full_name}</p>
                    <p>Date(Terre): {photo.earth_date}</p>
                    <p>Date(Mars Sol): {photo.sol}</p>
                </div>
            ))
        ) : (
            <p className="text-center col-span-3">Aucune photo trouvée</p>
        )}
    </div>
    </div>
    </main>
    </>
    );
}
