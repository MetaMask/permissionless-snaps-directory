import { Text } from '@chakra-ui/react';
import { act } from '@testing-library/react';

import { Layout } from './Layout';
import { render } from '../utils/test-utils';

describe('Layout', () => {
  it('renders the children', async () => {
    const { queryByText } = await act(async () =>
      render(
        <Layout>
          <Text>Foo</Text>
        </Layout>,
      ),
    );

    expect(queryByText('Foo')).toBeInTheDocument();
  });
});
