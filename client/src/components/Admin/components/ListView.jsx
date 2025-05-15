"use client"

import { Button, Select, Table, Dropdown, Menu } from 'antd';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
// import 'antd/dist/antd.css';

const ListView = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
    


  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const handleMenuClick = (e, record) => {
    // console.log(record, e.key);
    // Add your action handling logic here
  };

  const menu = (record) => (
    <Menu onClick={(e) => handleMenuClick(e, record)}>
      <Menu.Item key="2">View</Menu.Item>
      <Menu.Item key="3">Approve</Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'City',
      dataIndex: 'city',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => (
        <Dropdown overlay={menu(record)} trigger={['click']} placement="bottomRight">
          <Button icon={<BsThreeDotsVertical />} />
        </Dropdown>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      city: 'New York',
      status: 'Software Engineer',
      phone: '1234567890',
    },
    {
      key: '2',
      name: 'Jim Green',
      city: 'London',
      status: 'Designer',
      phone: '2345678901',
    },
    {
      key: '3',
      name: 'Joe Black',
      city: 'Sydney',
      status: 'Manager',
      phone: '3456789012',
    },
  ];

  return (
    <div className="p-4 overflow-scroll" style={{ scrollbarWidth: "none" }}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
        <Select
          size="medium"
          placeholder="Bulk Actions"
          disabled={!hasSelected}
          className=""
        >
          {["Remove", "Approve", "Suspend"].map((val, idx) => (
            <Select.Option key={idx} value={val}>{val}</Select.Option>
          ))}
        </Select>
        <span className="ml-0 sm:ml-2">
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <div className="overflow-x-auto rounded-lg">
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
      </div>
    </div>
  );
};

export default ListView;
