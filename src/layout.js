import React from 'react';
import './index.css';
import { Breadcrumb, Layout, Menu, theme, Card, Space } from 'antd';
import Tablecard from './tablecard';
import { CalculatorOutlined } from '@ant-design/icons';
import Introd from './intro.tsx';
import logo from './greenlight_logo.png';
import Tabcard from './tabcard';
import { Drawform, Calculate } from './drawerform';




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
                    items={
                        [{
                            key: "calculate",
                            label: "Greenhouse Gas Equivalencies Calculator",
                            icon: <CalculatorOutlined />
                        }]
                    }
                />
            </Header>
            <Content className="site-layout" style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Greenlight</Breadcrumb.Item>
                    <Breadcrumb.Item>Greenhouse Gas Equivalencies Calculator</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 25, minHeight: 300, background: colorBgContainer }}>
                    <Introd />
                    <Card title="Enter and convert data">
                        <Card type="inner" title="Greenhouse Gas Equivalencies Calculator" >
                            <Space size={30}>
                                <Calculate /><Drawform />
                            </Space>
                            <br />
                            <br />
                            <Tablecard />
                        </Card>
                    </Card>
                    <Card title="Dashboard of carbon emissions results">
                        <Space direction="vertical" style={{ display: 'flex' }}>
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