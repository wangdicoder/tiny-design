import React from 'react';
import { Tabs } from '@tiny-design/react';

export default function EditableDemo() {
  const [activeKey, setActiveKey] = React.useState('1');
  const [items, setItems] = React.useState([
    { key: '1', label: 'Tab 1', children: 'Content of Tab 1' },
    { key: '2', label: 'Tab 2', children: 'Content of Tab 2' },
  ]);
  const newTabIndex = React.useRef(3);

  const onEdit = (targetKey, action) => {
    if (action === 'add') {
      const key = String(newTabIndex.current++);
      setItems([...items, { key, label: `Tab ${key}`, children: `Content of Tab ${key}` }]);
      setActiveKey(key);
    } else {
      const newItems = items.filter(item => item.key !== targetKey);
      if (activeKey === targetKey && newItems.length) {
        setActiveKey(newItems[newItems.length - 1].key);
      }
      setItems(newItems);
    }
  };

  return (
    <Tabs
      type="editable-card"
      activeKey={activeKey}
      items={items}
      onChange={setActiveKey}
      onEdit={onEdit}
    />
  );
}