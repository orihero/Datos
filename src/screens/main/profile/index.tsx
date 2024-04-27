import Container from 'components/Container';
import React from 'react';
import {ProfileDisplay, ProfileHeader, ProfileTab} from './ui';
import {useUser} from 'shared/store/hooks/useUser';
import {observer} from 'mobx-react-lite';

function ProfileScreen() {
  const {user} = useUser();

  return (
    <Container Header={<ProfileHeader />}>
      <ProfileDisplay {...user} />
      <ProfileTab />
    </Container>
  );
}

export default observer(ProfileScreen);
