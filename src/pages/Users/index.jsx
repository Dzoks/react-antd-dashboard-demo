import React, { useRef, useState } from 'react';
import { Datatable, Header, TooltipButton, FormModal } from 'react-antd-dashboard';
import KeyModal from './KeyModal';
import { EditOutlined, DeleteOutlined, PlusOutlined, InfoOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, DatePicker } from 'antd';
import moment from 'moment';
const Users = props => {
    const formModal = useRef(null);
    const keyModal = useRef(null);

    const [dataSource, setDataSource] = useState([
        {
            key: 1,
            name: 'Mark',
            age: 40,
            date: '1980-05-02',
            status: 1,
        },
        {
            key: 2,
            name: 'Gendry',
            age: 35,
            date: '1985-05-13',
            status: 1,
        },
        {
            key: 3,
            name: 'George',
            age: 24,
            date: '1995-12-13',
            status: 1,
        },
        {
            key: 4,
            name: 'Michael',
            age: 29,
            date: '1991-04-03',
            status: 2,
        },
        {
            key: 4,
            name: 'Rachel',
            age: 24,
            date: '1995-10-10',
            status: 1,
        },
        {
            key: 5,
            name: 'Delilah',
            age: 22,
            date: '1987-12-21',
            status: 1,
        },
        {
            key: 6,
            name: 'Michelle',
            age: 25,
            date: '1994-08-05',
            status: 2,
        },
    ]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            // Aditional properties for sorting and filtering, can be used in combination with normal properties
            sort: 'string',
            filter: 'string'
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            sort: 'number',
            filter: 'number' // Possible operators are <,>,<=,>=,= e.g. (>5, <=10, 10)
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            sort: 'date',
            filter: 'date',
            filterFormat: 'DD.MM.yyyy', // when using date filter you must specify date format that will be typed in filter box. Operators are same as in number filter
            format: 'DD.MM.yyyy.' // if this property exists, component tries to parse date and show it in specified format
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 140,
            sort: 'number',
            filter: 'select', // if filter is select or multiSelect, you must specify filterOptions array with id, value pairs. Id denotes original value and value denotes mapped value.
            filterOptions: [
                {
                    id: 1,
                    value: 'Valid'
                },
                {
                    id: 2,
                    value: 'Invalid'
                }
            ],
            options: [ // you can use options to map values similar to filter options regardless of filter
                {
                    id: 1,
                    value: 'Valid'
                },
                {
                    id: 2,
                    value: 'Invalid'
                }
            ]
        },
        {
            title: 'Actions',
            width: 170,
            render: (text, record, index) => {
                return <div>
                    <TooltipButton text="Key info" icon={<InfoOutlined />} onClick={() => keyModal.current.showDialog(record)} />
                    <TooltipButton text="Edit" icon={<EditOutlined />} onClick={() => formModal.current.showDialog({ ...record, date: moment(record.date) })} />
                    {/*We are explicitly creating moment object since DatePicker value must be moment object */}
                    <TooltipButton text="Delete" icon={<DeleteOutlined />} onClick={() => setDataSource(dataSource.filter(u => u.key !== record.key))} />
                </div>
            }
        },
    ];


    return <div className="page-container" style={{ flexDirection: 'column' }} >
        <Header title="Users" >
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => formModal.current.showDialog()}>
                Add
            </Button>
        </Header>
        <Datatable dataSource={dataSource} columns={columns} />
        <KeyModal ref={keyModal} />
        <FormModal
            addTitle="Add user"
            editTitle="Edit user"
            ref={formModal}
            onAdd={user => {
                setDataSource([...dataSource,
                {
                    key: Date.now(),
                    ...user
                }]);
                formModal.current.closeDialog();
            }}
            onEdit={user => {
                setDataSource(dataSource.map(u => u.key !== user.key ? u : user));
                formModal.current.closeDialog();
            }}
        >
            <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Name is required!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="age"
                label="Age"
                rules={[{ required: true, message: 'Age is required!' }]}
            >
                <InputNumber step={1} />
            </Form.Item>
            <Form.Item
                name="date"
                label="Date"
                rules={[{ required: true, message: 'Date is required!' }]}
            >
                <DatePicker />
            </Form.Item>
            <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: 'Status is required!' }]}
            >
                <Select defaultValue={1}>
                    <Select.Option value={1}>Valid</Select.Option>
                    <Select.Option value={2}>Invalid</Select.Option>
                </Select>
            </Form.Item>
        </FormModal>
    </div>;

}

export default Users;