import { useEffect, useState } from 'react'
import movie from '../data/movies'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {

  const [movies, setMovies] = useState(movie);     // State per la lista completa dei film (dati originali, non modificati)
  const [filteredGenre, setFilteredGenre] = useState(movie);   // State per la lista filtrata dei film (risultato della ricerca)
  const [searchedGenre, setSearchedGenre] = useState('');     // State per il testo di ricerca inserito 


  // Effetto che si attiva ogni volta che l'utente modifica la ricerca
  //()cosa fare, []quando farlo
  useEffect(() => {
    // Filtra i film e mantiene solo quelli il cui genere contiene il testo cercato
    const searched = movies.filter(e => e.genre.toLowerCase().includes(searchedGenre.toLowerCase()))

    // Aggiorna lo state con i film filtrati
    setFilteredGenre(searched)

    // console.log(filteredGenre)
  }, [searchedGenre]);  // Si riesegue quando searchedGenre(nel input) cambia


  //////////////////////////BONUS//////////////////////////////

  const [filteredMovie, setFilteredMovie] = useState(movie);
  const [searchedText, setSearchedText] = useState('');

  useEffect(() => {
    const searched = movies.filter(movie => {
      // Cerca sia nel genere che nel titolo
      const searchedTitle = movie.title.toLowerCase().includes(searchedText.toLowerCase());
      const searchedGenre = movie.genre.toLowerCase().includes(searchedText.toLowerCase());
      //Restituisce la corrispondenza trovata
      return searchedTitle || searchedGenre;
    }
    )
    setFilteredMovie(searched)
    console.log(filteredMovie)
  }, [searchedText]);

  /////////////////////////////////////////////

  return (
    <>
      <nav className='container my-4'>
        <div className='d-flex justify-content-end m-4'>
          <div className="col-3">
            <form className="d-flex" role="search">
              <input className="form-control me-2" value={searchedGenre} onChange={e => setSearchedGenre(e.target.value)} type="search" placeholder="Search by Genre" aria-label="Search" />
            </form>
          </div>
          <div className="col-3">
            <form className="d-flex" role="search">
              <input className="form-control me-2" value={searchedText} onChange={e => setSearchedText(e.target.value)} type="search" placeholder="Search" aria-label="Search" />
            </form>
          </div>
        </div>
      </nav>

      {searchedGenre && <div className='container my-4 py-4'>
        <div className='row gy-4'>
          {filteredGenre.map((movie, i) =>
            <div key={i} className="card-body col-4">
              <h3 className="card-title">{movie.title}</h3>
              <p className="card-text">{movie.genre}</p>
            </div>)}
        </div>
      </div>}

      {!searchedGenre &&
        (< div className='container my-4 py-4'>
          <div className='row gy-4'>
            {filteredMovie.map((movie, i) =>
              <div key={i} className="card-body col-4">
                <h3 className="card-title">{movie.title}</h3>
                <p className="card-text">{movie.genre}</p>
              </div>)}
          </div>
        </div >)}
    </>
  )
}

export default App
