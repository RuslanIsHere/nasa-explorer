import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const apiKey = "6ScFWJkC8Gbsy1o0DlnKKUGkNAVpGYq7Rup5drN3";

export default function Terre() {
    const [date, setDate] = useState<string>('');
    const [images, setImages] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('Images de la Terre en temps réel');

  // Устанавливаем максимальную дату для поля выбора
useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('date') as HTMLInputElement;
    if (dateInput) {
        dateInput.setAttribute('max', today);
    }
    fetchTerre();
}, []);

  // Функция для загрузки изображений без указания даты
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
    } catch (error: any) {
        setError(error.message);
    }
};

  // Функция для загрузки изображений по выбранной дате
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
    } catch (error: any) {
        setError(error.message);
    }
};

  // Обработчик нажатия на кнопку
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
    <Header />
    <div className="container mt-5">
        <div className="py-5 border rounded shadow-sm">
          	<p className="lead px-4 mb-4 text-white">
            <strong>L'API EPIC (Earth Polychromatic Imaging Camera)</strong> fournit des informations sur les images quotidiennes collectées par l'instrument EPIC du satellite DSCOVR.
            <br />
            Ainsi, vous pouvez sélectionner une date dans cette champ pour obtenir les images correspondantes.
          </p>
          <form className="w-50 mx-auto" id="dateForm" onSubmit={handleSubmit}>
            <div className="mb-3 text-center text-white">
              <label htmlFor="day" className="form-label fs-4 fw-bold">
                Sélectionnez la date (assurez-vous que la date saisie est du 13 juin 2015 à la date actuelle pour obtenir des résultats valides) :
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                placeholder="Date"
                min="2015-06-13"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100" id="dateButton">Envoyer</button>
          </form>
        </div>
        <h2 className="title text-center pt-4 text-white">{title}</h2>
        {error && <div className="col-12 text-center"><p className="text-danger">{error}</p></div>}
        <div className="container py-4 row row-cols-lg-3 g-3" id="terreResult">
          {images.length > 0 ? (
            images.map((t: any) => {
              const date = new Date(t.date);
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const day = String(date.getDate()).padStart(2, '0');
              const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${t.image}.png`;
              return (
                <div key={t.image} className="col-12 col-md-4">
                  <div className="card h-100 shadow">
                    <img className="card-img-top" alt={t.caption} src={imageUrl} />
                    <div className="card-body">
                      <h5 className="card-title">Date : {t.date}</h5>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-12 text-center">
              <p className="text-danger">Aucune information trouvée</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
