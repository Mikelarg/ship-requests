import {Form, Select} from 'antd';
import React from 'react';
import {connect} from "react-redux";

const EditableAddressCell = ({
                                 form, editing, dataIndex, title,
                                 record, index, children, addresses,
                                 addressTo = '', addressFrom = '', table, forceUpdate, onChange,
                                 ...restProps
                             }) => {
    let filterId;
    let currentId;
    if (record) {
        if (dataIndex === 'address_from') {
            [currentId, filterId] = [addressFrom.toString(), addressTo ? addressTo.toString() : record.address_to_id.toString()]
        } else {
            [currentId, filterId] = [addressTo.toString(), addressFrom ? addressFrom.toString() : record.address_from_id.toString()];
        }
    }
    const options = Object.keys(addresses).filter(el => el !== filterId).map((key, index) => ({
        label: addresses[key].name,
        value: key
    }));
    const handleChange = (value) => {
        form.setFieldsValue({[dataIndex]: parseInt(value)});
        onChange(dataIndex, value)
    };

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    shouldUpdate={(prevValues, curValues) => {
                        return prevValues.address_from !== curValues.address_from || prevValues.address_to !== curValues.address_to
                    }}
                >
                    <Select defaultValue={currentId}
                            options={options} onChange={handleChange}>
                    </Select>
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

export default connect(state => ({addresses: state.addresses}))(EditableAddressCell);