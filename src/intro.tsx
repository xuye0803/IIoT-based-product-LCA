import React from 'react';
import './index.css';
import { Typography} from 'antd';


const { Title, Paragraph, Text, Link } = Typography;
const blockContent = `Designed by Green Light, Industry 4.0`;

const Introd: React.FC = () => (
  <Typography>

    <Title>Greenhouse Gas Equivalencies Calculator</Title>
    <Paragraph>
    Convert emissions or energy data into concrete terms you can understand — such as the annual CO2 emissions of cars, households, and power plants.
    </Paragraph>
    <Paragraph>
    The Greenhouse Gas Equivalencies calculator allows you to <Text strong>convert emissions or energy data to the equivalent amount of carbon dioxide (CO2) emissions from using that amount</Text>. The calculator helps you translate abstract measurements into concrete terms you can understand, such as the annual emissions from cars, households, or power plants. This calculator may be useful in communicating your greenhouse gas reduction strategy, reduction targets, or other initiatives aimed at reducing greenhouse gas emissions.
    </Paragraph>
    <Paragraph>
    <Text code>The reference websites:</Text>
    </Paragraph>

    <Paragraph>
      <ul>
        <li>
          <Link href="https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator#results">EPA</Link>
        </li>
        <li>
          <Link href="https://www.carbonfootprint.com/calculator.aspx">Carbon Footprint</Link>
        </li>
      </ul>
    </Paragraph>

    <Paragraph>
      <blockquote><Text italic>{blockContent}</Text></blockquote>
    </Paragraph>

  </Typography>
);

export default Introd;