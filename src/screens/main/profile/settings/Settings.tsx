import Container from 'components/Container';
import React from 'react';
import {observer} from 'mobx-react-lite';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import {useTranslation} from 'react-i18next';
import RN from 'components/RN';
import ConfirmationModal from 'components/ConfirmationModal/ConfirmationModal';
import {useRegister} from 'shared/store/hooks/useRegister';
import EditHeader from '../editAccount/ui/EditHeader';

const Settings = () => {
  const {t} = useTranslation();
  const {user, visible} = useRootStore();
  const {onSignOut} = useRegister();

  return (
    <Container Header={<EditHeader />}>
      <RN.View>
        <RN.ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </RN.View>
      <ConfirmationModal
        title="Accountingizdan rostdan ham chiqmoqchimisz"
        onPressNo={() => visible.hide('logoutConfirmation')}
        visible={visible.visible.logoutConfirmation}
        onPressYes={onSignOut}
      />
    </Container>
  );
};

export default observer(Settings);
