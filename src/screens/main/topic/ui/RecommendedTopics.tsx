import RN from 'components/RN';
import React, {useCallback} from 'react';
import {COLORS} from 'shared/constants/colors';
import TopicItem from './TopicItem';
import {Spacing} from 'components/Spacing';
import {observer} from 'mobx-react-lite';
import {useRootStore} from 'shared/store/hooks/useRootStore';

export default observer(() => {
  const {state, onFollowToTopic} = useRootStore().topic;
  const {userId} = useRootStore().local;
  const {onSelectTopic} = useRootStore().post;

  const renderRecTopics = useCallback(() => {
    return state.allTopics?.map(item => {
      return (
        <TopicItem
          topic={item}
          onPress={() => onSelectTopic(item)}
          key={item._id}
          onFollow={() => onFollowToTopic(item)}
          isFollowed={item.followerIds.includes(userId as never)}
        />
      );
    });
  }, [onFollowToTopic, onSelectTopic, state.allTopics, userId]);

  return (
    <RN.View style={styles.container}>
      <RN.Text color={COLORS.white} children="Recommended for you" size="h2" />
      <Spacing height={10} />
      <RN.View style={styles.recomended}>{renderRecTopics()}</RN.View>
    </RN.View>
  );
});

const styles = RN.StyleSheet.create({
  container: {},
  recomended: {
    gap: 10,
  },
});
