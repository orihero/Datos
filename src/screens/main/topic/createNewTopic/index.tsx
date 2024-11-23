import Container from 'components/Container';
import RN from 'components/RN';
import React from 'react';
import Header from '../../topic/ui/Header';
import CreateTopicDisplay from '../createNewTopic/ui/Display';
import {Keyboard} from 'react-native';

const CreateTopic = () => {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <Container Header={<Header title="New Topic" />} onPress={dismissKeyboard}>
      <RN.View ph={12} flex={1} g={10}>
        <CreateTopicDisplay />
      </RN.View>
    </Container>
  );
};

export default CreateTopic;

const styles = RN.StyleSheet.create({
  container: {},
});
