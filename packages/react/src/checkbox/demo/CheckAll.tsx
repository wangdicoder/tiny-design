import React from 'react';
import { Checkbox } from '@tiny-design/react';

export default function CheckAllDemo() {
  const [checkboxVal, setCheckboxVal] = React.useState(['a', 'c']);
  const [indeterminate, setIndeterminate] = React.useState(true);
  const [checkAll, setCheckAll] = React.useState(false);

  return (
    <>
      <div style={{ borderBottom: '1px solid rgb(233, 233, 233)', marginBottom: '15px' }}>
        <Checkbox
          onChange={(e) => {
            const { checked } = e.currentTarget;
            setCheckboxVal(checked ? ['a', 'b', 'c'] : []);
            setIndeterminate(false);
            setCheckAll(checked);
          }}
          checked={checkAll}
          indeterminate={indeterminate}
        >
          Check All
        </Checkbox>
      </div>

      <Checkbox.Group
        value={checkboxVal}
        onChange={(val) => {
          setCheckboxVal(val);
          setIndeterminate(val.length < 3 && val.length > 0);
          setCheckAll(val.length === 3);
        }}
      >
        <Checkbox value="a">A</Checkbox>
        <Checkbox value="b">B</Checkbox>
        <Checkbox value="c">C</Checkbox>
      </Checkbox.Group>
    </>
  );
}