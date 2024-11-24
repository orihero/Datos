import Container from 'components/Container';
import RN from 'components/RN';
import React from 'react';
import Display from './ui/Display';
import {RecommendedTopics, TopicHeader} from './ui';
import NavigationService from 'shared/navigation/NavigationService';
import {HOME_STACK} from 'shared/navigation/routes';
import {Spacing} from 'components/Spacing';
import {COLORS} from 'shared/constants/colors';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';
import {HIT_SLOP} from 'shared/styles/globalStyles';
import {Keyboard} from 'react-native';
import {observer} from 'mobx-react-lite';

const Topics = () => {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <Container
      onPress={dismissKeyboard}
      Header={<TopicHeader title="New Post" isTopics={true} />}
      Footer={
        <RN.TouchableOpacity
          hitSlop={HIT_SLOP}
          style={styles.createTopic}
          onPress={() => NavigationService.navigate(HOME_STACK.CREATE_TOPIC)}>
          <RN.Text children="Create new Topic" color={COLORS.white} size="h4" />
        </RN.TouchableOpacity>
      }>
      <RN.View ph={12} flex={1} g={10}>
        <RN.View zI={10}>
          <Display />
        </RN.View>
        <Spacing height={50} />
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
