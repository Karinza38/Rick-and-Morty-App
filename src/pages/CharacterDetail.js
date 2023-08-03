import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from 'antd';
import { CaretLeftOutlined } from '@ant-design/icons';



export default function CharacterDetail() {
    const [character, setCharacter] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const [size, setSize] = useState('large'); // default is 'middle'

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/character/${id}`)
            .then((response) => response.json())
            .then((data) => setCharacter(data));
    }, []);

    return (
        <div className="App">
            <Button type="primary" shape="circle" onClick={() => navigate(-1)} icon={<CaretLeftOutlined />} size={size} />
            {character ? (
                <div>
                    <h1>{character.name}</h1>
                    <img src={character.image} alt={character.name} />
                    <p>Status: {character.status}</p>
                    <p>Species: {character.species}</p>
                    <p>Gender: {character.gender}</p>
                    <p>Location: {character.location.name}</p>
                    <p>Location: {console.log(character)}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
