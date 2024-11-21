import React from 'react';
import {EditDisplay, EditHeader} from './ui';
import {observer} from 'mobx-react-lite';
import {useUser} from '../../../shared/store/hooks/useUser';
import Container from '../../../components/Container/index';
import RN from 'components/RN';
import {Button} from 'components/Button';
import {Spacing} from 'components/Spacing';

function ProfileSettings() {
  const {user} = useUser();

  return (
    <Container
      Header={<EditHeader />}
      Footer={
        <RN.View pl={15} pr={15}>
          <Button title="Update" disabled onPress={() => {}} />
          <Spacing height={40} />
        </RN.View>
      }>
      <EditDisplay {...user} />
    </Container>
  );
}

export default observer(ProfileSettings);
