import React, { useState, useEffect } from 'react';
import { Select, InputNumber, Button, message, Space } from 'antd';
import jsonp from 'fetch-jsonp';
import qs from 'qs';
import type { SelectProps, } from 'antd';
import axios from 'axios';

let timeout: ReturnType<typeof setTimeout> | null;
let currentValue: string;
let location: string;
let activity: string;
let sectors: string;
let product: string;
let unit: number;
let pro_unit: string;


const fetch2 = (value: string, callback: Function) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  const fake2 = () => {
    const str = qs.stringify({
      //code: 'utf-8',
      sector: sectors,
      key_word: value
    });
    // https://suggest.taobao.com/sug?${str}

    jsonp(`http://127.0.0.1:8000/activity_list?${str}`)
      .then((response: any) => response.json())
      .then((d: any) => {
        if (currentValue === value) {
          const { result } = d;
          const data = result.map((item: any) => ({
            value: item[0],
            text: item[0],
          }));
          callback(data);
        }
      });
  };

  timeout = setTimeout(fake2, 300);
};

const SearchInput2: React.FC<{ placeholder: string; style: React.CSSProperties }> = (props) => {
  const [data, setData] = useState<SelectProps['options']>([]);
  const [value, setValue] = useState<string>();

  const handleSearch2 = (newValue: string) => {
    if (newValue) {
      fetch2(newValue, setData);
    } else {
      fetch2("", setData);
    }
  };

  const handleChange2 = (newValue: string) => {
    setValue(newValue);
    activity = encodeURIComponent(newValue)
  };



  return (
    <Select
      showSearch
      value={value}
      placeholder={props.placeholder}
      style={props.style}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch2}
      onChange={handleChange2}
      notFoundContent={null}
      options={(data || []).map((d) => ({
        value: d.value,
        label: d.text,
      }))}
    />

  );
};

const Activity: React.FC = () => <SearchInput2 placeholder="input search text" style={{ width: 700 }} />;

const Location = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(`http://127.0.0.1:8000/location_list/?ac=${activity}&sector=${sectors}`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
    location = encodeURIComponent(value);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  return (
    <Select
      showSearch
      placeholder="Select a geography"
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      onMouseEnter={asyncFetch}
      style={{ width: 250 }}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      options={(data || []).map((d) => ({
        value: d,
        label: d,
      }))}
    />)
};

const InputNum: React.FC = () => {
  const [anum, setDisplayanum] = useState('unit');
  const onChange = (value: number) => {
    console.log(value);
    unit = value;
    axios.get(`http://127.0.0.1:8000/unit/?ac=${activity}&refer_prod=${product}&location=${location}`)
      .then(function (response) {
        setDisplayanum(response.data);
        pro_unit = response.data
      })
  };

  return (<InputNumber defaultValue={1} onChange={onChange} style={{ width: 240 }} addonAfter={anum} />)
}



export default function AXX() {

  const [text, setDisplayText] = useState('');

  const [messageApi, contextHolder] = message.useMessage();

  const handleClick = () => {
    axios.get(`http://127.0.0.1:8000/append/?act_name=${activity}&product=${product}&amt=${unit}&geo=${location}&unit=${pro_unit}`)
      .then(function (response) {
        window.location.href = 'http://localhost:3000/';
        messageApi.open({
          type: 'success',
          content: 'Insert successfully!',
        });
      })
      .catch(function (error) {
        console.log(error);
        messageApi.open({
          type: 'error',
          content: 'This is an error message',
        });
      });

  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.get(`http://127.0.0.1:8000/calculation/?activity=${activity}&num_unit=${unit}&refer_prod=${product}&location=${location}`)
      .then(function (response) {
        setDisplayText(response.data);
      })
  };


  return (
    <>
      <form onSubmit={e => handleSubmit(e)}>
        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
          Calculate
        </Button>
        <p style={{ whiteSpace: "pre-wrap" }}>{text}</p>
      </form>
      {contextHolder}
      <Space>
        <Button onClick={handleClick}>Add to database</Button>
      </Space>
    </>
  );

}

const Sector = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(`http://127.0.0.1:8000/sector_list/`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
    sectors = encodeURIComponent(value);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  return (
    <Select
      showSearch
      placeholder="Select a sector"
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      style={{ width: 700 }}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      options={(data || []).map((d) => ({
        value: d,
        label: d,
      }))}
    />)
};


const Refer = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(`http://127.0.0.1:8000/reference_product_list/?key_word=${activity}&sector=${sectors}`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
    product = encodeURIComponent(value);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  return (
    <Select
      showSearch
      placeholder="Select a product"
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      onMouseEnter={asyncFetch}
      style={{ width: 700 }}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      options={(data || []).map((d) => ({
        value: d,
        label: d,
      }))}
    />)
};




export { Location, Activity, InputNum, AXX, Sector, Refer };

// 其他也可用的代码-xuye
// class Train extends Component {


//   constructor(props) {
//     super(props)
//     this.state = {
//       list: []
//     }
//     this.handleClick = this.handleClick.bind(this)

//   }

//   handleClick() {
//     axios.get(`http://127.0.0.1:8000/calculation/?activity=${activity}&num_unit=${unit}`)
//       .then(function (response) {
//         let userMessage = response.data
//         alert(userMessage)
//         return userMessage
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }


//   render() {
//     return (
//       <div className="App">
//         <Button type="primary" htmlType="submit" onClick={this.handleClick}>Calculate!</Button>

//       </div>
//     );
//   }
// }



// class Add extends Component {


//   constructor(props) {
//     super(props)
//     this.state = {
//       list: []
//     }
//     this.handleClick = this.handleClick.bind(this)

//   }

//   handleClick() {
//     axios.get(`http://127.0.0.1:8000/append/?act_name=${activity}&amt=${unit}&geo=${location}&unit=unit`)
//       .then(function (response) {
//         let data = response.data

//       })
//       .catch(function (error) {
//         console.log(error);
//       });

//     window.location.href = 'http://localhost:3000/';
//   }


//   render() {
//     return (
//       <div className="App">
//         <Button type="primary" htmlType="submit" onClick={this.handleClick}>Add to database!</Button>

//       </div>
//     );
//   }
// }

// const fetch = (value: string, callback: Function) => {
//   if (timeout) {
//     clearTimeout(timeout);
//     timeout = null;
//   }
//   currentValue = value;

//   const fake = () => {
//     const str = qs.stringify({
//       //code: 'utf-8',
//       key_loc: value,
//       ac: activity,
//       sector: sectors
//     });
//     // http://127.0.0.1:8000/location_list?${str}
//     // https://suggest.taobao.com/sug?${str}

//     jsonp(`http://127.0.0.1:8000/location_list?${str}`)
//       .then((response: any) => response.json())
//       .then((d: any) => {
//         if (currentValue === value) {
//           const { result } = d;
//           const data = result.map((item: any) => ({
//             value: item[0],
//             text: item[0],
//           }));
//           callback(data);

//         }
//       });
//   };

//   timeout = setTimeout(fake, 300);
// };



// const SearchInput: React.FC<{ placeholder: string; style: React.CSSProperties }> = (props) => {
//   const [data, setData] = useState<SelectProps['options']>([]);
//   const [value, setValue] = useState<string>();


//   const handleSearch = (newValue: string) => {
//     if (newValue) {
//       fetch(newValue, setData);
//     } else {
//       fetch("", setData);
//     }
//   };



//   const handleChange = (newValue: string) => {
//     setValue(newValue);
//     location = newValue;
//   };



//   return (
//     <><Select
//       showSearch
//       value={value}
//       placeholder={props.placeholder}
//       style={props.style}
//       defaultActiveFirstOption={false}
//       showArrow={false}
//       filterOption={false}
//       onSearch={handleSearch}
//       onChange={handleChange}
//       notFoundContent={null}
//       options={(data || []).map((d) => ({
//         value: d.value,
//         label: d.text,
//       }))} /></>
//   );
// };

// const Demo: React.FC = () => <SearchInput placeholder="input search text" style={{ width: 250 }} />;

// const fetch4 = (value: string, callback: Function) => {
//   if (timeout) {
//     clearTimeout(timeout);
//     timeout = null;
//   }
//   currentValue = value;

//   const fake4 = () => {
//     const str = qs.stringify({
//       //code: 'utf-8',
//       sector: sectors,
//       key_product: value,
//       key_word: activity
//     });
//     // http://127.0.0.1:8000/location_list?${str}
//     // https://suggest.taobao.com/sug?${str}

//     jsonp(`http://127.0.0.1:8000/reference_product_list?${str}`)
//       .then((response: any) => response.json())
//       .then((d: any) => {
//         if (currentValue === value) {
//           const { result } = d;
//           const data = result.map((item: any) => ({
//             value: item[0],
//             text: item[0],
//           }));
//           callback(data);
//         }
//       });
//   };

//   timeout = setTimeout(fake4, 300);
// };

// const SearchInput4: React.FC<{ placeholder: string; style: React.CSSProperties }> = (props) => {
//   const [data, setData] = useState<SelectProps['options']>([]);
//   const [value, setValue] = useState<string>();

//   const handleSearch4 = (newValue: string) => {
//     if (newValue) {
//       fetch4(newValue, setData);
//     } else {
//       fetch4("", setData);
//     }
//   };

//   const handleChange4 = (newValue: string) => {
//     setValue(newValue);
//     product = newValue
//   };



//   return (
//     <Select
//       showSearch
//       value={value}
//       placeholder={props.placeholder}
//       style={props.style}
//       defaultActiveFirstOption={false}
//       showArrow={false}
//       filterOption={false}
//       onSearch={handleSearch4}
//       onChange={handleChange4}
//       notFoundContent={null}
//       options={(data || []).map((d) => ({
//         value: d.value,
//         label: d.text,
//       }))}
//     />
//   );
// };

// const Refer: React.FC = () => <SearchInput4 placeholder="input search text" style={{ width: 700 }} />;

// const fetch3 = (value: string, callback: Function) => {
//   if (timeout) {
//     clearTimeout(timeout);
//     timeout = null;
//   }
//   currentValue = value;

//   const fake3 = () => {
//     const str = qs.stringify({
//       //code: 'utf-8',
//       key_sector: value
//     });
//     // http://127.0.0.1:8000/location_list?${str}
//     // https://suggest.taobao.com/sug?${str}

//     jsonp(`http://127.0.0.1:8000/sector_list?${str}`)
//       .then((response: any) => response.json())
//       .then((d: any) => {
//         if (currentValue === value) {
//           const { result } = d;
//           const data = result.map((item: any) => ({
//             value: item[0],
//             text: item[0],
//           }));
//           callback(data);
//         }
//       });
//   };

//   timeout = setTimeout(fake3, 300);
// };

// const SearchInput3: React.FC<{ placeholder: string; style: React.CSSProperties }> = (props) => {
//   const [data, setData] = useState<SelectProps['options']>([]);
//   const [value, setValue] = useState<string>();

//   const handleSearch3 = (newValue: string) => {
//     if (newValue) {
//       fetch3(newValue, setData);
//     } else {
//       fetch3("", setData);
//     }
//   };

//   const handleChange3 = (newValue: string) => {
//     setValue(newValue);
//     sectors = newValue
//   };



//   return (
//     <Select
//       showSearch
//       value={value}
//       placeholder={props.placeholder}
//       style={props.style}
//       defaultActiveFirstOption={false}
//       showArrow={false}
//       filterOption={false}
//       onSearch={handleSearch3}
//       onChange={handleChange3}
//       notFoundContent={null}
//       options={(data || []).map((d) => ({
//         value: d.value,
//         label: d.text,
//       }))}
//     />
//   );
// };

// const Sector: React.FC = () => <SearchInput3 placeholder="input search text" style={{ width: 700 }} />;

