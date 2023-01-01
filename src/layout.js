import React from 'react';
import './index.css';
import { Breadcrumb, Layout, Menu, theme, Card, Space } from 'antd';
import Tables from './table.tsx';
import Forms from './Form';
import Introd from './intro.tsx';
import logo from './greenlight_logo.png';
import DemoColumn from './barchart';
import Tabcard from './tabcard';




const { Header, Content, Footer } = Layout;

const Lay: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout>
            <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
                <img src={logo}
                    style={{
                        float: 'left',
                        width: 130,
                        height: 40,
                        margin: '16px 24px 16px 0',
                        background: 'rgba(255, 255, 255, 0.2)',
                    }}
                    className="App-logo" alt="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    items={new Array(2).fill(null).map((_, index) => ({
                        key: String(index + 1),
                        label: `Map ${index + 1}`,
                    }))}
                />
            </Header>
            <Content className="site-layout" style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Calculator</Breadcrumb.Item>
                    <Breadcrumb.Item>Map1</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 25, minHeight: 300, background: colorBgContainer }}>
                    <Introd />
                    <Card title="Enter and convert data">
                        <Card type="inner" title="Greenhouse Gas Equivalencies Calculator" >
                            
                                <Forms />
                           
                        </Card>
                        <Card style={{ marginTop: 16 }} type="inner" title="View results" >
                            <Tables />
                        </Card>
                    </Card>
                    <br />
                    <br />
                    <Card title="Dashboard of carbon emissions results">
                        <Space direction="vertical" style={{ display: 'flex' }}>
                            <Card type="inner" title="Bar chart of grouped carbon emission results" >
                                <DemoColumn />
                            </Card>
                            <Tabcard />                           
                        </Space>
                    </Card>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>CARBON CALCULATOR ©2023 Created by Green Light</Footer>
        </Layout>
    );
};

export default Lay;