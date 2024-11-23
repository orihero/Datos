import Container from 'components/Container';
import RN from 'components/RN';
import React from 'react';
import Display from './ui/Display';
import {RecommendedTopics, TopicHeader} from './ui';
import {Button} from 'components/Button';
import NavigationService from 'shared/navigation/NavigationService';
import {HOME_STACK} from 'shared/navigation/routes';
import {Spacing} from 'components/Spacing';
import {COLORS} from 'shared/constants/colors';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';
import {HIT_SLOP} from 'shared/styles/globalStyles';

const Topics = () => {
  return (
    <Container
      Header={<TopicHeader title="New Post" />}
      Footer={
        <RN.TouchableOpacity
          hitSlop={HIT_SLOP}
          style={styles.createTopic}
          onPress={() => NavigationService.navigate(HOME_STACK.CREATE_TOPIC)}>
          <RN.Text children="Create new Topic" color={COLORS.white} />
        </RN.TouchableOpacity>
      }>
      <RN.View ph={12} flex={1} g={10}>
        <Display />
        <Spacing height={50} />
        <RecommendedTopics />
      </RN.View>
    </Container>
  );
};

export default Topics;

const styles = RN.StyleSheet.create({
  container: {},
  createTopic: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalizeHeight(30),
    paddingHorizontal: normalizeWidth(15),
  },
});
