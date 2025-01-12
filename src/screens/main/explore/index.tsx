import Container from 'components/Container';
import RN from 'components/RN';
import * as React from 'react';
import Header from './ui/Header';
import Display from './ui/Display';
import {observer} from 'mobx-react-lite';
import {Keyboard} from 'react-native';

const Explore = () => {
  return (
    <Container Header={<Header />} onPress={Keyboard.dismiss}>
      <RN.View>
        <Display />
      </RN.View>
    </Container>
  );
};

export default observer(Explore);

const styles = RN.StyleSheet.create({
  container: {},
});
