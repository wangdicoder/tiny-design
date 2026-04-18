import React from 'react';
import { render } from '@testing-library/react';
import Descriptions from '../index';

describe('<Descriptions />', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(
      <Descriptions title="Profile" footer="Footer">
        <Descriptions.Item label="Name">John</Descriptions.Item>
        <Descriptions.Item label="Age">30</Descriptions.Item>
        <Descriptions.Item label="Address" span="fill">
          Sydney
        </Descriptions.Item>
      </Descriptions>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const { container } = render(
      <Descriptions>
        <Descriptions.Item label="Name">John</Descriptions.Item>
      </Descriptions>
    );
    expect(container.firstChild).toHaveClass('ty-descriptions');
    expect(container.querySelector('dl')).toBeInTheDocument();
  });

  it('should render header and footer', () => {
    const { getByText } = render(
      <Descriptions title="User Info" extra={<button>Action</button>} footer="Summary footer">
        <Descriptions.Item label="Name">John</Descriptions.Item>
      </Descriptions>
    );
    expect(getByText('User Info')).toBeInTheDocument();
    expect(getByText('Action')).toBeInTheDocument();
    expect(getByText('Summary footer')).toBeInTheDocument();
  });

  it('should render items', () => {
    const { getByText } = render(
      <Descriptions>
        <Descriptions.Item label="Name">John</Descriptions.Item>
      </Descriptions>
    );
    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('John')).toBeInTheDocument();
  });

  it('should render items from items prop', () => {
    const { getByText } = render(
      <Descriptions
        items={[
          { key: 'name', label: 'Name', content: 'John' },
          { key: 'role', label: 'Role', content: 'Maintainer' },
        ]}
      />
    );

    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Maintainer')).toBeInTheDocument();
  });

  it('should use table semantic when bordered', () => {
    const { container } = render(
      <Descriptions bordered items={[{ key: 'name', label: 'Name', content: 'John' }]} />
    );

    expect(container.querySelector('table')).toBeInTheDocument();
  });

  it('should render empty placeholder for nullish content', () => {
    const { getByText } = render(
      <Descriptions items={[{ key: 'name', label: 'Name', content: null }]} empty="Pending" />
    );

    expect(getByText('Pending')).toBeInTheDocument();
  });
});
