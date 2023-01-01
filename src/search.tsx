import React from 'react';
import { Select } from 'antd';
import axios from 'axios' ;

const onChange = (value: string) => {
  console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
  console.log('search:', value);
};

axios.get(`http://127.0.0.1:8000/table/?current=1&pageSize=10`)
.then(function (response) {
  let data =response.data
  alert(data)
});

const Search: React.FC = () => (
  <Select
    showSearch
    placeholder="Select a person"
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={(input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }
    options={(data || []).map((d) => ({
      value: d.value,
      label: d.text,
    }))}
  />
);

export default Search;