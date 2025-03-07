import Container from 'components/Container';
import RN from 'components/RN';
import React from 'react';
import HeaderView from './ui/Header';
import Tab from './ui/Tab';
import Display from './ui/Display';
import PollDisplay from './ui/PollDisplay';
import Footer from './ui/Footer';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import {observer} from 'mobx-react-lite';
import {Keyboard, KeyboardAvoidingView, Platform} from 'react-native';

const CreateQuestion = () => {
  const {state} = useRootStore().post;
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Container
        Header={<HeaderView />}
        Footer={<Footer />}
        onPress={dismissKeyboard}>
        <RN.ScrollView>
          <RN.View ph={12} flex={1} g={10}>
            <Tab />
            {state.newPostState.type === 'Poll' ? <PollDisplay /> : <Display />}
          </RN.View>
        </RN.ScrollView>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default observer(CreateQuestion);

const styles = RN.StyleSheet.create({
  container: {},
});
