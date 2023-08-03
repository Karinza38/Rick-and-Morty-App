import './App.css';
import React, { useState, useEffect } from "react";
import Header from './components/Header';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Space } from 'antd';
import { Select, Input } from 'antd';
import { useCharacterContext } from "./store/filter-context";
import { Link } from "react-router-dom"


const { Search } = Input;
const { Meta } = Card;


export default function App() {
  const [characters, setCharacters] = useState([]);
  const { name, status, gender, setName, setStatus, setGender } =
    useCharacterContext();

  // if (typeof name === 'string' && typeof status === 'string' && typeof gender === 'string') {
  const filteredCharacters = characters.filter(
    (character) =>
      character.name.toLowerCase().includes(name.toLowerCase()) &&
      character.status.toLowerCase().includes(status.toLowerCase()) &&
      character.gender.toLowerCase().includes(gender.toLowerCase())
  );
  // } else {
  //   // handle the undefined variables
  // }



  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((data) => setCharacters(data.results));
  }, []);

  return (
    <div className="App">
      <Header />
      <h1>Rick and Morty Characters</h1>
      <Space direction='vertical'>
        {filteredCharacters.length !== 0 ? (
          filteredCharacters.map((character) => (
            <Card
              key={character.id}
              style={{ width: 300 }}
              cover={
                <img
                  alt="example"
                  src={character.image}
                />
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
        ) : (<div>Could not find anything</div>)}

      </Space>

    </div >
  );
}



