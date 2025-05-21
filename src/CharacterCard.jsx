import React from "react";

function CharacterCard({ character }){
    return (
        <>
            <div style={cardStyle}>
                <img src={character.image} alt={character.name} style={imageStyle}/>
                <h3 style={{margin:'10px 0'}}>{character.name}</h3>
                <p>Estado: {character.status}</p>
                <p>Especie: {character.species}</p>
                
            </div>
        </>
    )

}
const cardStyle = {
border: '1px solid #ddd',
borderRadius: '8px',
padding: '15px',
margin: '10px',
textAlign: 'center',
backgroundColor: '#f9f9f9',
boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
width: '180px',
flexShrink: 0,
color: '#333',
};

const imageStyle = {
width: '100%',
height: '150px',
objectFit: 'cover',
borderRadius: '4px',
marginBottom: '10px',
};

export default CharacterCard;