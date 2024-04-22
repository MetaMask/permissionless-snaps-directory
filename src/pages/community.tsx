import { Container } from '@chakra-ui/react';
import { useEffect, type FunctionComponent } from 'react';

import { UsersList } from '../features';
import { fetchAssertionsForAllAccounts } from '../features/account/assertions/api';
import { fetchTrustScoreForAllAccounts } from '../features/account/trust-score/api';
import { fetchAllUsers } from '../features/users/api';
import { useDispatch } from '../hooks';

const CommunityPage: FunctionComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTrustScoreForAllAccounts()).catch((error) =>
      console.log(error),
    );
    dispatch(fetchAssertionsForAllAccounts()).catch((error) =>
      console.log(error),
    );
    dispatch(fetchAllUsers()).catch((error) => console.log(error));
  }, [dispatch]);

  return (
    <Container maxWidth="container.xl" paddingTop="0" marginTop={20}>
      <UsersList />
    </Container>
  );
};

export default CommunityPage;
