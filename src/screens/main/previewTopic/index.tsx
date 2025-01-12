import Container from 'components/Container';
import RN from 'components/RN';
import * as React from 'react';
import Header from './ui/Header';
import Display from './ui/Display';
import {observer} from 'mobx-react-lite';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import {Spacing} from 'components/Spacing';

const PreviewTopic = () => {
  const {topic} = useRootStore();

  return (
    <Container Header={<Header topic={topic.state.previewTopic} />}>
      <RN.View style={styles.container}>
        <Spacing height={15} />
        <Display
          topic={topic.state.previewTopic}
          posts={topic.state.topicPosts}
        />
      </RN.View>
    </Container>
  );
};

export default observer(PreviewTopic);

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
  },
});
