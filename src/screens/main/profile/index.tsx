import Container from 'components/Container';
import React from 'react';
import {ProfileDisplay, ProfileHeader, ProfileTab} from './ui';

export default function ProfileScreen() {
  return (
    <Container Header={<ProfileHeader />}>
      <ProfileDisplay />
      <ProfileTab />
    </Container>
  );
}
