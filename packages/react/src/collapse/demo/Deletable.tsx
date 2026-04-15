import React from 'react';
import { Collapse, Button } from '@tiny-design/react';

type DemoItem = {
  key: string;
  label: string;
  children: string;
};

export default function DeletableDemo() {
  const [items, setItems] = React.useState<DemoItem[]>([
    {
      key: 'architecture',
      label: 'Architecture',
      children: 'Use controlled state to remove items from the source array instead of mutating DOM nodes.',
    },
    {
      key: 'performance',
      label: 'Performance',
      children: 'The active value is filtered alongside the item list so removed panels do not leave stale state behind.',
    },
    {
      key: 'preload',
      label: 'Preload',
      children: 'This pattern works with any async source because the Collapse only consumes items data.',
    },
  ]);
  const [value, setValue] = React.useState<string[]>(['architecture', 'performance']);

  const removeItem = (key: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.key !== key));
    setValue((currentValue) => currentValue.filter((activeKey) => activeKey !== key));
  };

  const resetItems = () => {
    setItems([
      {
        key: 'architecture',
        label: 'Architecture',
        children: 'Use controlled state to remove items from the source array instead of mutating DOM nodes.',
      },
      {
        key: 'performance',
        label: 'Performance',
        children: 'The active value is filtered alongside the item list so removed panels do not leave stale state behind.',
      },
      {
        key: 'preload',
        label: 'Preload',
        children: 'This pattern works with any async source because the Collapse only consumes items data.',
      },
    ]);
    setValue(['architecture', 'performance']);
  };

  return (
    <>
      <Button size="sm" onClick={resetItems}>
        Reset panels
      </Button>
      <div style={{ height: 12 }} />
      <Collapse
        value={value}
        onValueChange={setValue}
        destroyOnHidden
        items={items.map((item) => ({
          ...item,
          extra: (
            <Button
              size="sm"
              onClick={(event) => {
                event.stopPropagation();
                removeItem(item.key);
              }}
            >
              Delete
            </Button>
          ),
        }))}
      />
    </>
  );
}
