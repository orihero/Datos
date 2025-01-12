import React, {useMemo} from 'react';
import {observer} from 'mobx-react-lite';
import {useUser} from '../../../../shared/store/hooks/useUser';
import Container from '../../../../components/Container/index';
import RN from 'components/RN';
import {Button} from 'components/Button';
import {Spacing} from 'components/Spacing';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import {useTranslation} from 'react-i18next';
import EditDisplay from './ui/EditDisplay';
import EditHeader from './ui/EditHeader';
import {useRegister} from 'shared/store/hooks/useRegister';
import ConfirmationModal from 'components/ConfirmationModal/ConfirmationModal';

const EditAccount = () => {
  const {t} = useTranslation();
  const {user} = useUser();
  const {onSignOut} = useRegister();
  const {state, onUpdateUser, loadingWhenUserUpdate} = useRootStore().user;
  const {visible} = useRootStore();

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
        <RN.View pl={15} pr={15} pt={10}>
          <Button
            title={t('update')}
            disabled={AreEqual}
            onPress={onUpdateUser}
            loading={loadingWhenUserUpdate.loading}
          />
          <Spacing height={40} />
        </RN.View>
      }>
      <EditDisplay />
      <ConfirmationModal
        title={`${t('logout_confirmation')}`}
        onPressNo={() => visible.hide('logoutConfirmation')}
        visible={visible.visible.logoutConfirmation}
        onPressYes={onSignOut}
      />
      <ConfirmationModal
        title={`${t('delete_account_confirmation')}`}
        visible={visible.visible.deleteAccountConfirmation}
        onPressNo={() => visible.hide('deleteAccountConfirmation')}
      />
    </Container>
  );
};

export default observer(EditAccount);
