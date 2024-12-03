import Container from 'components/Container';
import React, {useCallback} from 'react';
import {HomeHeader} from './ui';
import RN from 'components/RN';
import {observer} from 'mobx-react-lite';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import Question from 'components/Cards/ui/Question';
import {Post} from '@types';
import {Spacing} from 'components/Spacing';

const HomeScreen = () => {
  const {state, getPostById, onUpVote, donwVote, onVoteToPollOptionAtHome} =
    useRootStore().post;
  const {userId} = useRootStore().local;
  const {onFollowToTopic} = useRootStore().topic;

  const renderPosts = useCallback(
    ({item}: {item: Post}) => {
      return (
        <Question
          post={item}
          key={item._id}
          onEnterPost={() => getPostById(item._id, item.type)}
          onUpVote={() => onUpVote(item)}
          onDownVote={() => donwVote(item)}
          userId={userId as never}
          onFollowTopic={() => onFollowToTopic(item.topic)}
          onVoteOptionPress={id => onVoteToPollOptionAtHome(item, id)}
        />
      );
    },
    [
      userId,
      getPostById,
      onUpVote,
      donwVote,
      onFollowToTopic,
      onVoteToPollOptionAtHome,
    ],
  );

  const renderSeparator = () => <Spacing height={10} />;

  return (
    <Container Header={<HomeHeader />}>
      <RN.View ph={12} pt={20} flex={1} g={10}>
        <RN.FlatList
          data={state.allPosts}
          renderItem={({item}) => renderPosts({item})}
          ListFooterComponent={<Spacing height={120} />}
          ItemSeparatorComponent={renderSeparator}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </RN.View>
    </Container>
  );
};

export default observer(HomeScreen);
