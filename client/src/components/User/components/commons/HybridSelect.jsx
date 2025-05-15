"use client"
import React, { useState } from 'react';
import { Select, Input, Button } from 'antd';


const HybridSelect = ({ initialItems, value, onChange, disabled, placeholder }) => {
    const [items, setItems] = useState(initialItems);
    const [inputValue, setInputValue] = useState('');

    const handleAddItem = () => {
        if (inputValue && !items.includes(inputValue)) {
            const newItems = [inputValue, ...items];
            setItems(newItems);
            onChange([...value, inputValue]);
            setInputValue('');
        }
    };

    const handleChange = (selectedValues) => {
        onChange(selectedValues);
    };

    return (
        <Select
            mode="multiple"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            style={{ width: '100%' }}
            maxTagCount={2}
            maxTagTextLength={10}
            dropdownRender={menu => (
                <>
                    {menu}
                    {!disabled && (
                        <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                            <Input
                                style={{ flex: 'auto', marginRight: 8 }}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Add more"
                            />
                            <Button type="primary" onClick={handleAddItem}>
                                Add
                            </Button>
                        </div>
                    )}
                </>
            )}
        >
            {items.map((item, index) => (
                <Select.Option key={index} value={item}>
                    {item}
                </Select.Option>
            ))}
        </Select>
    );
};

export default HybridSelect;
