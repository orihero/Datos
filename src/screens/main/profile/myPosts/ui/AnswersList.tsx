import {AnswerType} from '@types';
import Answer from 'components/Cards/ui/Answer';
import RN from 'components/RN';
import {Spacing} from 'components/Spacing';
import {observer} from 'mobx-react-lite';
import React, {useCallback} from 'react';
import {useRootStore} from 'shared/store/hooks/useRootStore';

const AnswersList = () => {
  const {state} = useRootStore().user;
  //   const {userId} = useRootStore().local;

  //   console.log('state.myPosts', state.myPosts);

  const renderPosts = useCallback(({item}: {item: AnswerType}) => {
    return (
      <Answer
        answer={item}
        key={item._id}
        onUpVote={() => {}}
        onDownVote={() => {}}
      />
    );
  }, []);

  const renderSeparator = () => <Spacing height={10} />;

  return (
    <RN.View>
      <RN.FlatList
        data={state.myAnswers}
        renderItem={({item}) => renderPosts({item})}
        ListFooterComponent={<Spacing height={300} />}
        ItemSeparatorComponent={renderSeparator}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </RN.View>
  );
};

export default observer(AnswersList);
