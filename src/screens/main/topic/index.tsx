import Container from 'components/Container';
import RN from 'components/RN';
import React from 'react';
import Display from './ui/Display';
import {RecommendedTopics, TopicHeader} from './ui';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';
import {Keyboard} from 'react-native';
import {observer} from 'mobx-react-lite';

const Topics = () => {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <Container
      onPress={dismissKeyboard}
      Header={<TopicHeader title="New Post" isTopics={true} />}>
      <RN.View ph={12} flex={1} g={10}>
        <RN.View zI={10}>
          <Display />
        </RN.View>
        <RecommendedTopics />
      </RN.View>
    </Container>
  );
};

export default observer(Topics);

const styles = RN.StyleSheet.create({
  container: {},
  createTopic: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalizeHeight(30),
    paddingHorizontal: normalizeWidth(15),
  },
});
