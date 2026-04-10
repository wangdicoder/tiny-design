import { render } from '@testing-library/react';
import Flip from '../index';

describe('<Flip />', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(
      <Flip width={200} height={200}>
        <Flip.Item><div>Front</div></Flip.Item>
        <Flip.Item><div>Back</div></Flip.Item>
      </Flip>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const { container } = render(
      <Flip width={200} height={200}>
        <Flip.Item><div>Front</div></Flip.Item>
        <Flip.Item><div>Back</div></Flip.Item>
      </Flip>
    );
    expect(container.firstChild).toHaveClass('ty-flip');
  });

  it('should render content', () => {
    const { getByText } = render(
      <Flip width={200} height={200}>
        <Flip.Item><div>Front Side</div></Flip.Item>
        <Flip.Item><div>Back Side</div></Flip.Item>
      </Flip>
    );
    expect(getByText('Front Side')).toBeInTheDocument();
    expect(getByText('Back Side')).toBeInTheDocument();
  });
});
