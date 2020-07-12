import React from 'react';
import { Datatable } from 'react-antd-dashboard';


const Users = props => {
    const dataSource = [
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
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            // Aditional properties for sorting and filterin, can be used in combination with normal properties
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
            filterOptions:[
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
    ];

    return <div className="page-container">
        <Datatable dataSource={dataSource} columns={columns} />
    </div>;

}

export default Users;