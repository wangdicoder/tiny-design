import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Table from '../index';

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age', sorter: (a: any, b: any) => a.age - b.age },
];

const dataSource = [
  { key: '1', name: 'Alice', age: 30 },
  { key: '2', name: 'Bob', age: 25 },
  { key: '3', name: 'Charlie', age: 35 },
];

describe('<Table />', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(<Table columns={columns} dataSource={dataSource} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const { container } = render(<Table columns={columns} dataSource={dataSource} />);
    expect(container.firstChild).toHaveClass('ty-table');
  });

  it('should render data rows', () => {
    const { getByText } = render(<Table columns={columns} dataSource={dataSource} />);
    expect(getByText('Alice')).toBeInTheDocument();
    expect(getByText('Bob')).toBeInTheDocument();
  });

  it('should render column headers', () => {
    const { getByText } = render(<Table columns={columns} dataSource={dataSource} />);
    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Age')).toBeInTheDocument();
  });

  it('should render bordered', () => {
    const { container } = render(<Table columns={columns} dataSource={dataSource} bordered />);
    expect(container.firstChild).toHaveClass('ty-table_bordered');
  });

  it('should show empty state', () => {
    const { getByText } = render(<Table columns={columns} dataSource={[]} />);
    expect(getByText('No Data')).toBeInTheDocument();
  });

  it('should sort on header click', () => {
    const { container, getAllByRole } = render(
      <Table columns={columns} dataSource={dataSource} pagination={false} />
    );
    const ageHeader = container.querySelector('.ty-table__cell_sortable');
    fireEvent.click(ageHeader!);
    const rows = container.querySelectorAll('.ty-table__tbody .ty-table__row');
    expect(rows[0]).toHaveTextContent(/Bob/);
  });

  it('should handle row selection', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Table
        columns={columns}
        dataSource={dataSource}
        rowSelection={{ onChange }}
        pagination={false}
      />
    );
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    // first is select all, second is first row
    fireEvent.click(checkboxes[1]);
    expect(onChange).toHaveBeenCalled();
  });

  it('should sync controlled selectedRowKeys when parent clears selection', () => {
    const ControlledTable = () => {
      const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>(['1']);
      return (
        <>
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
          />
          <button onClick={() => setSelectedRowKeys([])}>clear</button>
        </>
      );
    };

    const { container, getByText } = render(<ControlledTable />);
    expect(container.querySelectorAll('input[type="checkbox"]')[1]).toBeChecked();

    fireEvent.click(getByText('clear'));

    expect(container.querySelectorAll('input[type="checkbox"]')[1]).not.toBeChecked();
  });

  it('should sync controlled pagination current from parent updates', () => {
    const ControlledPaginationTable = () => {
      const [current, setCurrent] = React.useState(1);
      return (
        <>
          <Table
            columns={columns}
            dataSource={[
              ...dataSource,
              { key: '4', name: 'David', age: 22 },
              { key: '5', name: 'Eve', age: 28 },
            ]}
            pagination={{ current, pageSize: 2 }}
          />
          <button onClick={() => setCurrent(2)}>page-2</button>
        </>
      );
    };

    const { getByText, queryByText } = render(<ControlledPaginationTable />);
    expect(getByText('Alice')).toBeInTheDocument();
    expect(queryByText('Charlie')).not.toBeInTheDocument();

    fireEvent.click(getByText('page-2'));

    expect(getByText('Charlie')).toBeInTheDocument();
    expect(queryByText('Alice')).not.toBeInTheDocument();
  });

  it('should preserve uncontrolled current page when pagination object rerenders without current', () => {
    const RerenderingTable = () => {
      const [version, setVersion] = React.useState(1);
      return (
        <>
          <Table
            columns={columns}
            dataSource={[
              ...dataSource,
              { key: '4', name: 'David', age: 22 },
              { key: '5', name: 'Eve', age: 28 },
            ]}
            pagination={{ pageSize: 2, showQuickJumper: version > 1 }}
          />
          <button onClick={() => setVersion((current) => current + 1)}>rerender</button>
        </>
      );
    };

    const { getByText, queryByText } = render(<RerenderingTable />);
    fireEvent.click(getByText('2'));

    expect(getByText('Charlie')).toBeInTheDocument();
    expect(queryByText('Alice')).not.toBeInTheDocument();

    fireEvent.click(getByText('rerender'));

    expect(getByText('Charlie')).toBeInTheDocument();
    expect(queryByText('Alice')).not.toBeInTheDocument();
  });

  it('should preserve active sort when columns rerender without changing the chosen sort', () => {
    const SortingTable = () => {
      const [wide, setWide] = React.useState(false);
      return (
        <>
          <Table
            columns={[
              { title: 'Name', dataIndex: 'name', key: 'name', width: wide ? 180 : 160 },
              { title: 'Age', dataIndex: 'age', key: 'age', sorter: (a: any, b: any) => a.age - b.age },
            ]}
            dataSource={dataSource}
            pagination={false}
          />
          <button onClick={() => setWide((current) => !current)}>rerender</button>
        </>
      );
    };

    const { container, getByText } = render(<SortingTable />);
    const ageHeader = container.querySelector('.ty-table__cell_sortable');
    fireEvent.click(ageHeader!);

    let rows = container.querySelectorAll('.ty-table__tbody .ty-table__row');
    expect(rows[0]).toHaveTextContent(/Bob/);

    fireEvent.click(getByText('rerender'));

    rows = container.querySelectorAll('.ty-table__tbody .ty-table__row');
    expect(rows[0]).toHaveTextContent(/Bob/);
  });

  it('should prune uncontrolled selected keys when the data source removes those rows', () => {
    const DynamicSelectionTable = () => {
      const [rows, setRows] = React.useState(dataSource);
      return (
        <>
          <Table
            columns={columns}
            dataSource={rows}
            pagination={false}
            rowSelection={{}}
          />
          <button onClick={() => setRows(dataSource.slice(1))}>shrink</button>
        </>
      );
    };

    const { container, getByText } = render(<DynamicSelectionTable />);
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    fireEvent.click(checkboxes[1]);
    expect(checkboxes[1]).toBeChecked();

    fireEvent.click(getByText('shrink'));

    const nextCheckboxes = container.querySelectorAll('input[type="checkbox"]');
    expect(nextCheckboxes[1]).not.toBeChecked();
  });

  it('should clamp uncontrolled current page when the data source shrinks', () => {
    const DynamicPaginationTable = () => {
      const [rows, setRows] = React.useState([
        ...dataSource,
        { key: '4', name: 'David', age: 22 },
        { key: '5', name: 'Eve', age: 28 },
      ]);
      return (
        <>
          <Table columns={columns} dataSource={rows} pagination={{ pageSize: 2 }} />
          <button onClick={() => setRows(dataSource.slice(0, 2))}>shrink</button>
        </>
      );
    };

    const { getByText, queryByText } = render(<DynamicPaginationTable />);
    fireEvent.click(getByText('3'));
    expect(getByText('Eve')).toBeInTheDocument();

    fireEvent.click(getByText('shrink'));

    expect(getByText('Alice')).toBeInTheDocument();
    expect(queryByText('Eve')).not.toBeInTheDocument();
  });

  it('should show loading state', () => {
    const { getByText } = render(<Table columns={columns} dataSource={dataSource} loading />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });
});
