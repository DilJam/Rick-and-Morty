import React , {useState, useEffect} from 'react';

const API_URL = 'https://rickandmortyapi.com/api/character '

function RickAndMortyCharacters() {
    //Estado para guardar la lista depersonajes
    const [characters, setCharacters] = useState([])
    //Estado para indicar si estamos cargando los datos
    const [loading, setLoading] = useState(true)
    //Estado para indicar si hay un error
    const [error, setError] = useState(null)

    //useEffect para realizar el fecth cuando el componente se monta
    useEffect(()=>{
        const fecthCharacters = async () => {
            try {
                setLoading(true);
                const response = await fetch(API_URL)

                if (!response.ok) {
                    throw new Error ('Error HTTP: ', response.status)
                }
                const data = await response.json();
                setCharacters(data.results);
            }catch(error){
                console.log(error);
                setError('No pudimos cargar los personajes, Intentelo mas tarde')
            }finally{
                setLoading(false);
            }
        }
        fecthCharacters();
    },[])

    if(loading){
        return <p style={{ textAlign: 'center', fontSize: '1.5em', color: '#555' }}>Cargando personajes de Rick and Morty...</p>;
    }
    if (error){
        return <p style={{ textAlign: 'center', fontSize: '1.5em', color: 'red' }}>{error}</p>;
    }

    return(
        <>
            <div style={appContainerStyle}>
                <h1>Primeros 20 personajes de Rick and Morty</h1>
                <div style={characterGridStyle}>
                    {characters.map(character => {
                        <characterGridStyle character={character}/>
                    })                 
                    }
                </div>
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