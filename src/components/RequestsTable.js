import {Table, Form, Popconfirm, Typography} from "antd";
import React, {useState} from "react";

import '../styles/RequestsTable.css'
import {connect} from "react-redux";
import {getRequestsWithAddresses} from "../reducers";
import {setCurrentRequest, updateRequest} from "../actions";
import {Request} from "./propTypes";
import EditableAddressCell from "./EditableAddressCell";

const RequestsTable = (props) => {
    const {addresses, updateRequest, setCurrentRequest, requests, currentRequest} = props;

    const [form] = Form.useForm();

    const requestsValues = Object.values(requests);
    const selectedRowKeys = [currentRequest.id];
    const rowSelection = {
        selectedRowKeys,
        onChange: (key) => {
            setCurrentRequest(requests[key])
        },
        type: 'radio'
    };

    const [editingKey, setEditingKey] = useState('');
    // Принял решение хранить значения редактирования не в форме, так как обновление полей очень долго шло и портило
    // юзер экспириенс
    const [editingAddressFrom, setEditingAddressFrom] = useState('');
    const [editingAddressTo, setEditingAddressTo] = useState('');

    const isEditing = (record) => record.id === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            address_from: record.address_from_id,
            address_to: record.address_to_id,
            ...record,
        });
        setEditingKey(record.id);
        setEditingAddressFrom(record.address_from_id);
        setEditingAddressTo(record.address_to_id);
    };

    const cancel = () => {
        setEditingKey('');
        setEditingAddressFrom('');
        setEditingAddressTo('');
    };

    const save = async (key) => {
        try {
            updateRequest(editingKey, addresses[parseInt(editingAddressFrom)], addresses[parseInt(editingAddressTo)]);
            setEditingKey('');
            setEditingAddressFrom('');
            setEditingAddressTo('');
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            editable: false,
        },
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
            editable: false,
        },
        {
            title: 'Откуда',
            dataIndex: 'address_from',
            key: 'address_from',
            render: item => item.name,
            editable: true,
            className: 'address_cell'
        },
        {
            title: 'Куда',
            dataIndex: 'address_to',
            key: 'address_to',
            render: item => item.name,
            editable: true,
            className: 'address_cell'
        },
        {
            title: 'Действия',
            key: 'action',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
                        >
                          Сохранить
                        </Typography.Link>
                        <br/>
                        <Popconfirm title="Уверенны, что хотите отменить изменения?" onConfirm={cancel}>
                          <a>Отменить</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Изменить
                    </Typography.Link>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const onAddressChange = (dataIndex, value) => {
        if (dataIndex === 'address_from') {
            setEditingAddressFrom(value);
        } else {
            setEditingAddressTo(value);
        }
    };

    return (
        <Table
            columns={mergedColumns} dataSource={requestsValues}
            pagination={false} className='requests-table'
            rowSelection={rowSelection} rowKey="id"
            rowClassName="editable-row"
            components={{
                body: {
                    cell: (props) => <EditableAddressCell form={form} addressFrom={editingAddressFrom}
                                                          addressTo={editingAddressTo} onChange={onAddressChange} {...props}/>,
                },
            }}
        />
    )
};

RequestsTable.propTypes = {
    requests: Request.isRequired,
    currentRequest: Request
};

export default connect(state => ({
    requests: getRequestsWithAddresses(state),
    currentRequest: state.currentRequest,
    addresses: state.addresses
}), {setCurrentRequest, updateRequest})(RequestsTable)