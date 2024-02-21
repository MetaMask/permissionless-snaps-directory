import { Container } from '@chakra-ui/react';
import { useEffect, type FunctionComponent } from 'react';

import { CommunityList } from '../features';
import { fetchTrustScoreForAllAccounts } from '../features/account/trust-score/api';
import { useDispatch } from '../hooks';

const CommunityPage: FunctionComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTrustScoreForAllAccounts()).catch((error) =>
      console.log(error),
    );
  }, [dispatch]);
  return (
    <Container
      maxWidth="container.xl"
      paddingTop="0"
      marginTop={{ base: 4, md: 20 }}
    >
      <CommunityList />
    </Container>
  );
};

export default CommunityPage;
