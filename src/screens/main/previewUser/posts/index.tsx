import Container from 'components/Container';
import RN from 'components/RN';
import React from 'react';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import {observer} from 'mobx-react-lite';
import Header from '../ui/Header';
import Display from './ui/Display';

const UserPosts = () => {
  const {user} = useRootStore();

  return (
    <Container Header={<Header user={user.state.previewUser} />}>
      <RN.View>
        <Display
          posts={user.state.previewUserPosts}
          answers={user.state.previewUserAnswers}
        />
      </RN.View>
    </Container>
  );
};

export default observer(UserPosts);
