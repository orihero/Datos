import RN from 'components/RN';
import React, {useCallback} from 'react';
import {COLORS} from 'shared/constants/colors';
import TopicItem from './TopicItem';
import {Spacing} from 'components/Spacing';
import {observer} from 'mobx-react-lite';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import {HIT_SLOP} from 'shared/styles/globalStyles';
import NavigationService from 'shared/navigation/NavigationService';
import {HOME_STACK} from 'shared/navigation/routes';

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
          isFollowed={item.followerIds?.includes(userId as never)}
        />
      );
    });
  }, [onFollowToTopic, onSelectTopic, state.allTopics, userId]);

  return (
    <RN.View style={styles.container}>
      <RN.View style={styles.recomendedTitle}>
        <RN.Text
          color={COLORS.white}
          children="Recommended for you"
          size="h2"
        />
        <RN.TouchableOpacity
          hitSlop={HIT_SLOP}
          style={styles.createTopic}
          onPress={() => NavigationService.navigate(HOME_STACK.CREATE_TOPIC)}>
          <RN.Text children="Create new topic" color={COLORS.blue} size="h4" />
        </RN.TouchableOpacity>
      </RN.View>
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
  recomendedTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  createTopic: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
