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

      fetch(`https://rickandmortyapi.com/api/character/?page=5`)
        .then((response) => response.json())
        .then((data) => setCharacters([...characters,...data.results]));


  }, []);

  return (
    <div className="App">
      <Space style={{ alignItems: 'center', justifyContent: 'center', margin: '20px' }} wrap>
        {filteredCharacters.length !== 0 ? (
          filteredCharacters.map((character) => (
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



