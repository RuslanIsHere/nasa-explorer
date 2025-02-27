'use client';
import Head from 'next/head';
import { useState, useEffect } from 'react';


const apiKey = "6ScFWJkC8Gbsy1o0DlnKKUGkNAVpGYq7Rup5drN3";

export default function Terre() {
    const [date, setDate] = useState<string>('');
    const [images, setImages] = useState<unknown[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('Images de la Terre en temps réel');


useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('date') as HTMLInputElement;
    if (dateInput) {
        dateInput.setAttribute('max', today);
    }
    fetchTerre();
}, []);


const fetchTerre = async () => {
    try {
        const response = await fetch(`https://api.nasa.gov/EPIC/api/natural/images?api_key=${apiKey}`);
        if (!response.ok) {
            throw new Error("Erreur lors du chargement de l'API EPIC");
        }
    const data = await response.json();
    if (data.length === 0) {
        setError('Aucune information trouvée');
    } else {
        setImages(data);
    }
    } catch (error: unknown) {
        setError(error.message);
    }
};


const fetchTerreByDate = async (selectedDate: string) => {
    try {
        const response = await fetch(`https://api.nasa.gov/EPIC/api/natural/date/${selectedDate}?api_key=${apiKey}`);
        if (!response.ok) {
            throw new Error("Erreur lors du chargement de l'API EPIC");
        }
    const data = await response.json();
        if (data.length === 0) {
        setTitle("Aucune image n'a été trouvée pour la date choisie.");
        setImages([]);
        } else {
        setTitle(`Images de la Terre à la date choisie : ${selectedDate}`);
        setImages(data);
        }
    } catch (error: unknown) {
        setError(error.message);
    }
};


const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date) {
        fetchTerreByDate(date);
    } else {
        fetchTerre();
    }
};

return (
    <>
	<Head>
		Earth Polychromatic Imaging Camera
	</Head>
    <main className='bg-gray-800 text-white text-center'>
    <div className="container mx-auto p-5">
        <div className="py-5">
			<p className="lead px-4 mb-4 text-white">
				<strong>L&apos;API EPIC (Earth Polychromatic Imaging Camera)</strong> fournit des informations sur les images quotidiennes collectées par l'instrument EPIC du satellite DSCOVR.
				<br />
				Ainsi, vous pouvez sélectionner une date dans cette champ pour obtenir les images correspondantes.
			</p>
			<form className="w-50 mx-auto p-5" id="dateForm" onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="day" className="block text-lg form-label fs-4 fw-bold">
						Sélectionnez la date (assurez-vous que la date saisie est du 13 juin 2015 à la date actuelle pour obtenir des 	résultats valides) :
					</label>
					<input
						type="date"
						className="text-black px-4 py-2 rounded-lg form-control  focus:outline-none focus:ring-2 focus:ring-blue-500"
						id="date"
						placeholder="Date"
						min="2015-06-13"
						value={date}
						onChange={(e) => setDate(e.target.value)}
					/>
				</div>
				<button type="submit" className="bg-blue-600 px-10 py-3 font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300" id="dateButton">Envoyer</button>
			</form>
        </div>
        <h2 className="text-3xl font-bold text-center p-4 text-white">{title}</h2>
        {error && <div className="col-12 text-center"><p className="text-danger">{error}</p></div>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4  rounded shadow-sm" id="terreResult">
          {images.length > 0 ? (
            images.map((t: unknown) => {
              const date = new Date(t.date);
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const day = String(date.getDate()).padStart(2, '0');
              const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${t.image}.png`;
              return (
                <div key={t.image} className="bg-gray-900 rounded-lg shadow-md overflow-hidden">
                    <img className="rounded-xl w-full h-100  p-4 " alt={t.caption} src={imageUrl} />
                    <div className="p-4">
                      <h5 className="text-lg font-semibold">Date : {t.date}</h5>
                    </div>
                  
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center">
              <p className="text-red-500">Aucune information trouvée</p>
            </div>
          )}
        </div>
      </div>
      </main>
      
    </>
  );
}
