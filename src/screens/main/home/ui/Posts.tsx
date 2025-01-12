import {Post} from '@types';
import Question from 'components/Cards/ui/Question';
import RN from 'components/RN';
import {useCallback} from 'react';
import {useRootStore} from 'shared/store/hooks/useRootStore';

export default () => {
  const {state} = useRootStore().post;

  const renderPosts = useCallback(({item}: {item: Post}) => {
    return <Question post={item} key={item._id} />;
  }, []);

  return (
    <RN.View style={styles.container}>
      <RN.FlatList
        data={state.allPosts}
        renderItem={({item}) => renderPosts({item})}
      />
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    gap: 10,
  },
});
