import React, { useState } from 'react';
import { Button, Drawer, Typography } from 'antd';
const { Text } = Typography;

const Draw: React.FC = () => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            Firstly, there are two methods for the carbon footprint calculator, namely <Text strong>IPCC 2013, GWP 100a</Text> and <Text strong>ReCiPe Midpoint (H), GWP 100a</Text>.
            <Button type="link" onClick={showDrawer}>
                What are they?
            </Button>
            <Drawer title="Carbon emission calculation method" placement="right" onClose={onClose} open={open}>
                <p>The IPCC 2013 GWP 100a method, which is based on data published by the Intergovernmental Panel on Climate Change, was selected as the carbon emission calculation method. The method expresses the emissions of greenhouse gases generated, in kilograms of CO2 equivalent, over a time horizon of 100 years.</p>
                <p>ReCiPe is a method for the impact assessment (LCIA) in a LCA. Life cycle impact assessment (LCIA) translates emissions and resource extractions into a limited number of environmental impact scores by means of so-called characterisation factors. Midpoint indicators focus on single environmental problems, for example climate change or acidification.</p>
                <p>ReCiPe Midpoint (H) characterized total impacts calculated for the different conversion routes of biogas, with reference to a functional unit of 1 m 3 of used biogas. The method also expresses the emissions of greenhouse gases generated, in kilograms of CO2 equivalent, over a time horizon of 100 years.</p>
            </Drawer>
        </>
    );
};

export default Draw;