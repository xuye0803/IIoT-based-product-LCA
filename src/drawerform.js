import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Row } from 'antd';
import { Fathername, Fathernum, Childrenlist, Childnum, Adb, Levels } from './mapform.tsx';
import Forms from './Form';

const Drawform: React.FC = () => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />} danger>
                Create New Parent Activity
            </Button>
            <Drawer
                title="Create a new parent activity"
                width={750}
                onClose={onClose}
                open={open}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Parent Activity Name"
                                rules={[{ required: true }]}
                            >
                                <Fathername />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="Parent Activity Amount"
                                label="amount"
                                rules={[{ required: true }]}
                            >
                                <Fathernum />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="Parent Activity Level"
                                label="level"
                                rules={[{ required: true }]}
                            >
                                <Levels />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="children"
                                label="Children Activities Names"
                                rules={[{ required: true }]}
                            >
                                <Childrenlist />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="type"
                                label="Children Activities Amount"
                                rules={[{ required: true }]}
                            >
                                <Childnum />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="bt"
                                label="Pls click button"
                            >
                                <Adb />
                            </Form.Item>
                        </Col>
                    </Row>

                </Form>
            </Drawer>
        </>
    );
};

const Calculate: React.FC = () => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
            Calculate the Carbon Emissions of a New Activity
            </Button>
            <Drawer
                title="Calculate the Carbon Emissions of a New Activity"
                width={1000}
                onClose={onClose}
                open={open}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <Forms />
            </Drawer>
        </>
    );
};

export {Drawform,Calculate};