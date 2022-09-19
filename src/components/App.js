import React from 'react';
import {Layout} from 'antd';
import {useResizable} from 'react-resizable-layout';
import {DatabaseOutlined} from "@ant-design/icons";
import SampleSplitter from "./SampleSplitter";
import RequestsTable from "./RequestsTable";
import Map from "./Map";

import "antd/dist/antd.css";
import "antd/dist/antd.dark.css";
import '../styles/App.css';

const {Header} = Layout;


function App() {
    const {
        isDragging: isFileDragging,
        position: fileW,
        splitterProps: fileDragBarProps
    } = useResizable({
        axis: "x",
        initial: 540,
        min: 300,
        max: 1000
    });
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Header className="header">
                <h1><DatabaseOutlined className="icon" />Заявки</h1>
            </Header>
            <Layout>
                <div className="site-layout flex grow">
                    <div className={"shrink-0 requests"} style={{width: fileW}}>
                        <RequestsTable/>
                    </div>
                    <SampleSplitter isDragging={isFileDragging} {...fileDragBarProps} />
                    <div className={"flex grow"}>
                        <Map/>
                    </div>
                </div>
            </Layout>
        </Layout>
    );
}

export default App;
