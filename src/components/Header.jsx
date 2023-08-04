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
        <header className='App-header' style={{}}
        >

            <Space>
                <Button style={{ marginLeft: '0px', position: 'relative', visibility: prop.goback, right: '16vh' }} type="primary" shape="circle" onClick={() => navigate(-1)} icon={<CaretLeftOutlined />} size={size} />
                <Link to={'/'} style={{ color:'black' }}>
                    <h2 style={{ position: 'relative', right: '15vh'  }}>Rick and Morty App</h2>
                </Link>
            </Space>
            <Space style={{
                visibility: prop.filter,
            }}>
                <Search placeholder="Who is your favorite character?" style={{
                    width: 260,
                }} onSearch={(value) => setName(value)} enterButton />

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

        </header>
    )
}

