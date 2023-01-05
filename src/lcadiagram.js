import React, { useState, useEffect } from 'react';
import { DecompositionTreeGraph } from '@ant-design/graphs';

const DemoDecompositionTreeGraph: React.FC = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = () => {
        fetch('http://127.0.0.1:8000/treechart/')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };

    const config = {
        data,
        width :1500,
        hight :2000,
        layout: {
            type: 'indented',
            direction: 'LR',
            dropCap: false,
            indent: 900,
            getHeight: () => {
                return 80;
            },
            getWidth: () => {
                return 70;
            },
        },
        nodeCfg: {
            autoWidth: true,
            title: {
                fill: 'yellow',
            },
            items: {
                layout: 'follow',
                containerStyle: {
                    fill: '#fff',
                },
                style: (cfg, group, type) => {
                    const styles = {
                        value: {
                            fill: '#52c41a',
                        },
                        text: {
                            fill: '#aaa',
                        },
                    };
                    return styles[type];
                },
            },
            nodeStateStyles: {
                hover: {
                    stroke: '#1890ff',
                    lineWidth: 3,
                },
            },
            style: {
                radius: [2, 2, 2, 2],
            },
        },
        markerCfg: (cfg) => {
            const { children } = cfg;
            return {
                show: children?.length,
            };
        },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node'],
    };

    return <DecompositionTreeGraph {...config} />;
};

export default DemoDecompositionTreeGraph ;