import React , {useState, useEffect, useCallback} from 'react';
import CharacterCard from './CharacterCard';
import PaginationControls from './PaginationControls';
import SearchBar from './SearchBar';

const API_URL = 'https://rickandmortyapi.com/api/character/'

function RickAndMortyCharacters() {
    //Estado para guardar la lista de personajes
    const [characters, setCharacters] = useState([])
    //Estado para indicar si estamos cargando los datos
    const [loading, setLoading] = useState(true)
    //Estado para indicar si hay un error
    const [error, setError] = useState(null)
    //Estado de la paginación 
    const [currentPage, setCurrentPage] = useState(1);
    //Estado con la información de la paginación
    const [paginationInfo, setPaginationInfo] = useState(null);
    //Estado para la busqueda
    const [searchTerm, setSearchTerm] = useState('');

    const fecthCharacters = useCallback(async ()=>{
        setLoading(true);
        setError(null);
        //Construimos la URL de la API, incluyendo la página actual
        let url =`${API_URL}?page=${currentPage}`
        if(searchTerm){
            url = `${API_URL}?name=${searchTerm}`
        }

        try {
            const response = await fetch(url)
            if (!response.ok){
                if(response.status === 404 && currentPage > 1 && currentPage > (paginationInfo?.pages || 0)){
                       setError("No hay más páginas disponibles");
                       setCharacters([]);
                       setPaginationInfo(null);
                       setLoading(false);
                       return;
                }
                if(response.status === 404 && searchTerm){
                    setCharacters([]);
                    setLoading(false);
                    return;
                }
                throw new Error('Error HTTP: ' + response.status)
            }
            const data = await response.json();
            setCharacters(data.results || []);
            if (!searchTerm){
                setPaginationInfo(data.info); 
            }    
        } 
        catch(error){
            console.error("Error al obtener personajes ", error);
            setError(error.message);
            setCharacters([]);
            setPaginationInfo(null);
        }finally{
            setLoading(false);
        }
    },[currentPage, searchTerm])

    //useEffect para realizar el fetch cuando el componente se monta
    useEffect(()=>{
        fecthCharacters();
    },[fecthCharacters])

    if(loading){
        return <p style={{ textAlign: 'center', fontSize: '1.5em', color: '#555' }}>Cargando personajes de Rick and Morty...</p>;
    }
    if (error){
        return <p style={{ textAlign: 'center', fontSize: '1.5em', color: 'red' }}>{error}</p>;
    }

    // Algoritmo de navegación de página 
    const handlerNextPage = () =>{
        if (paginationInfo && paginationInfo.next){
            setCharacters([]);
            setCurrentPage(prevPage => prevPage + 1);
        }
    }

    const handlerPrevPage = () =>{
        if (currentPage > 1){
            setCharacters([]);
            setCurrentPage(prevPage => prevPage - 1);
        }
    }

    //Algoritmo de busqueda
    const handlerSearch = (newSearchTerm) =>{
        if(newSearchTerm !== searchTerm){
            setCharacters([]);
            setSearchTerm(newSearchTerm);
        }
    }


    return(
        <>
            <div style={appContainerStyle}>
                <h1>Personajes de Rick and Morty</h1>
                <SearchBar onSearch={handlerSearch} />
                <div style={characterGridStyle}>
                    {characters.map(character => (
                        <CharacterCard key={character.id} character={character}/>
                    ))                 
                    }
                </div>
                {!error && (
                    <PaginationControls
                        onPrevPage={handlerPrevPage}//handlerPrevPage
                        onNextPage={handlerNextPage}
                        currentPage={currentPage}
                        isLoading={loading}
                        hasPrev={currentPage > 1}
                        hasNext={paginationInfo?.next !==  null}                    
                    />
                )}
            </div>
        </>
    )
}

const appContainerStyle = {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '900px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    color: '#333',
};

const characterGridStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '15px',
    marginTop: '20px',
};

export default RickAndMortyCharacters
