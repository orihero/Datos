import {Post} from '@types';
import Question from 'components/Cards/ui/Question';
import RN from 'components/RN';
import {Spacing} from 'components/Spacing';
import {observer} from 'mobx-react-lite';
import React, {useCallback} from 'react';
import {useRootStore} from 'shared/store/hooks/useRootStore';

const PostsList = () => {
  const {state} = useRootStore().user;
  const {userId} = useRootStore().local;

  const renderPosts = useCallback(
    ({item}: {item: Post}) => {
      return (
        <Question
          post={item}
          key={item._id}
          onEnterPost={() => {}}
          onUpVote={() => {}}
          onDownVote={() => {}}
          userId={userId as never}
          onFollowTopic={() => {}}
          onVoteOptionPress={() => {}}
        />
      );
    },
    [
      userId,
      //   getPostById,
      //   onUpVote,
      //   donwVote,
      //   onFollowToTopic,
      //   onVoteToPollOptionAtHome,
    ],
  );

  const renderSeparator = () => <Spacing height={10} />;

  return (
    <RN.View>
      <RN.FlatList
        data={state.myPosts}
        renderItem={({item}) => renderPosts({item})}
        ListFooterComponent={<Spacing height={300} />}
        ItemSeparatorComponent={renderSeparator}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </RN.View>
  );
};

export default observer(PostsList);
