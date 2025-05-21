import React, {useState} from 'react';

export default function SearchBar({onSearch}){
    const [inputValue, setInputValue] = useState('')

    const handleInputChange = (event) =>{
        setInputValue(event.target.value)
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter'){
            onSearch(inputValue)
        }
    };

    const handleClick = () => {
        onSearch(inputValue);
    };

    return(
        <div style={{textAlign: 'center', margin: '20px 0'}}>
            <input
                type="text"
                placeholder="Buscar personajes por nombre ..."
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                style={{ padding: '10px', width: '300px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <button
            style={{ padding: '10px 15px', marginLeft: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            onClick={handleClick}
            >
                Buscar</button>
        </div>
    )

}