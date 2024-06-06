import { Tooltip } from './Tooltip';
import { render } from '../utils/test-utils';

describe('Tooltip', () => {
  it('renders correctly when visible is true', () => {
    const position = { x: 100, y: 200 };
    const content = 'Tooltip Content';

    const { getByText } = render(
      <Tooltip visible={true} position={position} content={content} />,
    );

    const tooltipElement = getByText(content);
    expect(tooltipElement).toBeInTheDocument();
    expect(tooltipElement).toHaveStyle(`top: ${position.y}px`);
    expect(tooltipElement).toHaveStyle(`left: ${position.x}px`);
  });

  it('does not render when visible is false', () => {
    const position = { x: 100, y: 200 };
    const content = 'Tooltip Content';

    const { queryByText } = render(
      <Tooltip visible={false} position={position} content={content} />,
    );

    const tooltipElement = queryByText(content);
    expect(tooltipElement).not.toBeInTheDocument();
  });
});
