import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { t } from '@lingui/macro';
import { graphql, useStaticQuery } from 'gatsby';
import type { FunctionComponent, ChangeEvent } from 'react';
import { useEffect } from 'react';
import { useGatsbyPluginFusejs } from 'react-use-fusejs';

import { SearchIcon } from '../../../components';
import { useDispatch, useSelector } from '../../../hooks';
import type { Snap } from '../../snaps';
import { getSearchQuery, setSearchQuery, setSearchResults } from '../store';

export const FilterSearch: FunctionComponent = () => {
  const { fusejs } = useStaticQuery<{ fusejs: Queries.fusejs }>(graphql`
    query {
      fusejs {
        index
        data
      }
    }
  `);

  const dispatch = useDispatch();
  const searchQuery = useSelector(getSearchQuery);
  const searchResults = useGatsbyPluginFusejs<Snap>(searchQuery, fusejs, {
    threshold: 0.3,
    distance: 300,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  useEffect(() => {
    dispatch(setSearchResults(searchResults));
  }, [dispatch, searchResults]);

  return (
    <InputGroup
      background="background.card"
      borderRadius="full"
      maxWidth={['100%', null, '18.75rem']}
      marginLeft="auto"
      order={[2, null, 1]}
    >
      <InputLeftElement pointerEvents="none">
        <SearchIcon width="1.25rem" />
      </InputLeftElement>
      <Input
        type="search"
        borderRadius="full"
        placeholder={t`Search snaps...`}
        value={searchQuery}
        onChange={handleChange}
        border="none"
        boxShadow="md"
        _focusVisible={{
          border: 'none',
          outline: 'none',
          boxShadow: 'md',
        }}
      />
    </InputGroup>
  );
};