import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Tree from '../index';

describe('<Tree />', () => {
  const treeData = [
    {
      key: '1',
      title: 'Node 1',
      children: [
        { key: '1-1', title: 'Node 1-1' },
        { key: '1-2', title: 'Node 1-2' },
      ],
    },
    { key: '2', title: 'Node 2' },
  ];

  it('should match the snapshot', () => {
    const { asFragment } = render(<Tree data={treeData} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const { container } = render(<Tree data={treeData} />);
    expect(container.firstChild).toHaveClass('ty-tree');
  });

  it('should render tree nodes', () => {
    const { getByText } = render(<Tree data={treeData} />);
    expect(getByText('Node 1')).toBeInTheDocument();
    expect(getByText('Node 2')).toBeInTheDocument();
  });

  it('should update rendered nodes when data changes', () => {
    const DynamicTree = () => {
      const [data, setData] = React.useState(treeData);
      return (
        <>
          <Tree data={data} />
          <button
            onClick={() =>
              setData([
                ...treeData,
                { key: '3', title: 'Node 3' },
              ])
            }
          >
            add-node
          </button>
        </>
      );
    };

    const { getByText } = render(<DynamicTree />);
    fireEvent.click(getByText('add-node'));
    expect(getByText('Node 3')).toBeInTheDocument();
  });
});
