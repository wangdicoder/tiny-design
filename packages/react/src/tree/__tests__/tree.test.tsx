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

  it('should preserve expanded state when data rerenders with new nodes', () => {
    const DynamicTree = () => {
      const [data, setData] = React.useState(treeData);
      return (
        <>
          <Tree data={data} />
          <button
            onClick={() =>
              setData([
                {
                  key: '1',
                  title: 'Node 1',
                  children: [
                    { key: '1-1', title: 'Node 1-1' },
                    { key: '1-2', title: 'Node 1-2' },
                    { key: '1-3', title: 'Node 1-3' },
                  ],
                },
                { key: '2', title: 'Node 2' },
              ])
            }
          >
            refresh
          </button>
        </>
      );
    };

    const { getByText, container } = render(<DynamicTree />);
    const rootTreeItem = container.querySelector('[role="treeitem"]') as HTMLElement;
    expect(rootTreeItem).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(getByText('Node 1'));
    expect(rootTreeItem).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(getByText('refresh'));

    expect(rootTreeItem).toHaveAttribute('aria-expanded', 'true');
    expect(getByText('Node 1-1')).toBeInTheDocument();
    expect(getByText('Node 1-3')).toBeInTheDocument();
  });

  it('should preserve checked state when data rerenders with new nodes', () => {
    const DynamicCheckTree = () => {
      const [data, setData] = React.useState(treeData);
      return (
        <>
          <Tree data={data} checkable />
          <button
            onClick={() =>
              setData([
                ...treeData,
                { key: '3', title: 'Node 3' },
              ])
            }
          >
            refresh
          </button>
        </>
      );
    };

    const { container, getByText } = render(<DynamicCheckTree />);
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    fireEvent.click(checkboxes[0]);
    expect(checkboxes[0]).toBeChecked();

    fireEvent.click(getByText('refresh'));

    const nextCheckboxes = container.querySelectorAll('input[type="checkbox"]');
    expect(nextCheckboxes[0]).toBeChecked();
  });
});
