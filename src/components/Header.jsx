import React from 'react';
import { Select, Space, Input } from 'antd';
import { useCharacterContext } from "../store/filter-context";


const { Search } = Input;



export default function Header() {

    const { name, status, gender, setName, setStatus, setGender } =
        useCharacterContext();

    return (
        <div>
            <Space direction='vertical'>
                <Search placeholder="enter you fav character" style={{
                    width: 250,
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

        </div>
    )
}

