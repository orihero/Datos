import Container from 'components/Container';
import RN from 'components/RN';
import * as React from 'react';
import {observer} from 'mobx-react-lite';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import {Spacing} from 'components/Spacing';
import Display from './ui/Display';
import Header from './ui/Header';

const PreviewUser = () => {
  const {user} = useRootStore();

  return (
    <Container Header={<Header user={user.state.previewUser} />}>
      <RN.View style={styles.container}>
        <Spacing height={15} />
        <Display user={user.state.previewUser} />
      </RN.View>
    </Container>
  );
};

export default observer(PreviewUser);

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
  },
});
