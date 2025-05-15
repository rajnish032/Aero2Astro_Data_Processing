"use client"

import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Select, Space } from 'antd';

const SpecialDropDown = ({ mappingData, placeholder, onChange,value }) => {
  const [items, setItems] = useState(mappingData);
  const [name, setName] = useState(value||'');
  const inputRef = useRef(null);

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    if (name && !items.includes(name)) {
      const newItems = [name,...items];
      setItems(newItems);
      onChange(newItems); 
    }
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <Select
    showSearch ={true}
      style={{ width: 250 }}
      placeholder={placeholder}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Space style={{ padding: '0 8px 4px' }}>
            <Input
              placeholder="Please enter item"
              ref={inputRef}
              value={name}
              onChange={onNameChange}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
              Add Other
            </Button>
          </Space>
        </>
      )}
      options={items?.map((item) => ({
        label: item,
        value: item,
      }))}
      onChange={onChange} 
    />
  );
};

export default SpecialDropDown;
