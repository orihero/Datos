import React, {useMemo} from 'react';
import {EditDisplay, EditHeader} from './ui';
import {observer} from 'mobx-react-lite';
import {useUser} from '../../../shared/store/hooks/useUser';
import Container from '../../../components/Container/index';
import RN from 'components/RN';
import {Button} from 'components/Button';
import {Spacing} from 'components/Spacing';
import {useRootStore} from 'shared/store/hooks/useRootStore';

function ProfileSettings() {
  const {user} = useUser();
  const {state, onUpdateUser, loadingWhenUserUpdate} = useRootStore().user;

  const AreEqual = useMemo(
    () =>
      user.firstName === state.userState.firstName &&
      user.lastName === state.userState.lastName &&
      user.nickname === state.userState.nickname,
    [state.userState, user],
  );

  return (
    <Container
      Header={<EditHeader />}
      Footer={
        <RN.View pl={15} pr={15}>
          <Button
            title="Update"
            disabled={AreEqual}
            onPress={onUpdateUser}
            loading={loadingWhenUserUpdate.loading}
          />
          <Spacing height={40} />
        </RN.View>
      }>
      <EditDisplay />
    </Container>
  );
}

export default observer(ProfileSettings);
