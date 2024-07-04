import React, { useState } from 'react';
import { Select, Input, Button, Form, message } from 'antd';

const { Option } = Select;

const LessonPlanDropdown = ({ existingModules, onAddNew, onSelect, type }) => {
  const [addingNew, setAddingNew] = useState(false);
  const [newValue, setNewValue] = useState('');

  const handleSelectChange = (value) => {
    if (value === 'add_new') {
      setAddingNew(true);
    } else {
      onSelect(value);
      setAddingNew(false);
    }
  };

  const handleAddNew = () => {
    if (newValue.trim() === '') {
      message.error('Please enter a valid name');
      return;
    }
    onAddNew(newValue);
    setNewValue('');
    setAddingNew(false);
  };

  return (
    <div>
      <Select
        style={{ width: '100%' }}
        onChange={handleSelectChange}
        placeholder={`Select ${type}`}
      >
        {existingModules.map((module) => (
          <Option key={module} value={module}>
            {module}
          </Option>
        ))}
        <Option key="add_new" value="add_new">
          Add New {type}
        </Option>
      </Select>
      {addingNew && (
        <Form layout="inline" style={{ marginTop: 8 }}>
          <Form.Item>
            <Input
              placeholder={`New ${type}`}
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleAddNew}>
              Add
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default LessonPlanDropdown;
