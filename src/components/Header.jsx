import React, { useState } from 'react';
import { Select, Space, Input, Button } from 'antd';
import { useCharacterContext } from "../store/filter-context";
import { CaretLeftOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"

const { Search } = Input;



export default function Header(prop) {

    const { name, status, gender, setName, setStatus, setGender } =
        useCharacterContext();
    const navigate = useNavigate();
    const [size, setSize] = useState('large');

    return (
        <header className='App-header' style={{ paddingLeft: '10px', paddingRight: '10px' }}
        >

            <Space>
                <Button className='go-back' style={{ visibility: prop.goback }} type="primary" shape="circle" onClick={() => navigate(-1)} icon={<CaretLeftOutlined />} size={size} />
                <Link to={'/'} style={{ color: 'black' }}>
                    <h2 className="App-logo">Rick N Morty</h2>
                </Link>
            </Space>
            <Space className='search-filter' style={{
                visibility: prop.filter,
            }}>
                <Search placeholder="Who is your favorite character?" style={{
                    width: 260,
                }} onSearch={(value) => setName(value)} enterButton />

                <Space className="filter">
                    <Select
                        defaultValue="Status"
                        style={{ width: 120 }}
                        onChange={(value) => setStatus(value)}
                        // allowClear
                        options={[
                            { value: 'alive', label: 'Alive' },
                            { value: 'dead', label: 'Dead' },
                            { value: 'unknown', label: 'Unknown' },
                        ]}
                    />
                    <Select
                        defaultValue="Gender"
                        style={{ width: 120 }}
                        onChange={(value) => setGender(value)}
                        // allowClear
                        options={[
                            { value: 'female', label: 'Female' },
                            { value: 'male', label: 'Male' },
                            { value: 'unknown', label: 'Unknown' },
                        ]}
                    />
                </Space>

            </Space>

        </header >
    )
}

