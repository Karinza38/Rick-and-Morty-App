import './App.css';
import React, { useState, useEffect } from "react";
import { EllipsisOutlined } from '@ant-design/icons';
import { Card, Space, Input } from 'antd';
import { useCharacterContext } from "./store/filter-context";
import { Link } from "react-router-dom"

const { Search } = Input;
const { Meta } = Card;


export default function App() {
  const [characters, setCharacters] = useState([]);
  const { name, status, gender, setName, setStatus, setGender } =
    useCharacterContext();

  const filteredCharacters = characters.filter(
    (character) =>
      character.name.toLowerCase().includes(name.toLowerCase()) &&
      character.status.toLowerCase().includes(status.toLowerCase()) &&
      character.gender.toLowerCase().includes(gender.toLowerCase())
  );

  const uniqueNames = new Set();
  const uniqueFilteredCharacters = filteredCharacters.filter((character) => {
    if (!uniqueNames.has(character.name.toLowerCase())) {
      uniqueNames.add(character.name.toLowerCase());
      return true;
    }
    return false;
  });




  useEffect(() => {

    const fetchCharacters = async (pageNumber) => {
      try {
        for (let page = 1; page <= pageNumber; page++) {
          const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
          const data = await response.json();
          setCharacters((prevCharacters) => [...prevCharacters, ...data.results]);
        }
        console.log(characters);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };



    // Fetch characters for pages characters from page 1 till 6

    fetchCharacters(10);


  }, []);

  return (
    <div className="App">
      <Space style={{ alignItems: 'center', justifyContent: 'center', margin: '20px' }} wrap>
        {uniqueFilteredCharacters.length !== 0 ? (
          uniqueFilteredCharacters.map((character) => (
            <Card
              key={character.id}
              style={{ width: 300, borderColor: 'lightgrey' }}
              cover={
                <Link to={`/${character.id}`}>
                  <img
                    alt="example"
                    src={character.image}
                  />
                </Link>
              }
              actions={[
                <Link to={`/${character.id}`}><EllipsisOutlined title='Go to detail page' style={{ fontSize: 30 }} key="ellipsis" /></Link>,
              ]}
            >
              <Meta
                title={character.name}
              />
            </Card>
          ))
        ) : (<div style={{ height: '76vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '30px' }}>Could not find anything</div>)}
      </Space>
    </div >
  );
}



