import './App.css';
import React, { useState, useEffect } from "react";
import { EllipsisOutlined } from '@ant-design/icons';
import { Card, Space, Input } from 'antd';
import { useCharacterContext } from "./store/filter-context";
import { Link } from "react-router-dom";
import { Pagination } from 'antd';

const { Search } = Input;
const { Meta } = Card;


export default function App() {
  const [characters, setCharacters] = useState([]);
  const { name, status, gender, setName, setStatus, setGender } =
    useCharacterContext();
  const [current, setCurrent] = useState(1);

  const onChange = (page) => {
    setCurrent(page);

    const fetchCharacters = async (pageNumber) => {
      try {
          const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${pageNumber}`);
          const data = await response.json();
          setCharacters(data.results);
        console.log(characters);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters(page);

  };

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

    onChange(1);

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
            >
              <Meta
                title={character.name}
              />
            </Card>
          ))
        ) : (<div style={{ height: '76vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '30px' }}>Could not find anything</div>)}
      </Space>
      <Space style={{ alignItems: 'center', justifyContent: 'center', margin: '20px',marginTop: '40px' }} wrap>
        <Pagination current={current} onChange={onChange} total={420} />
      </Space>
    </div >
  );
}






