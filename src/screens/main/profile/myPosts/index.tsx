import Container from 'components/Container';
import RN from 'components/RN';
import React, {useCallback, useEffect, useState} from 'react';
import {Header} from './ui';
import PostsList from './ui/PostsList';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import {observer} from 'mobx-react-lite';
import AnswersList from './ui/AnswersList';
import Tabbar from 'components/Tabbar/Tabbar';

const MyPosts = () => {
  const {visible} = useRootStore().visible;
  const {state, getMyPosts, getMyAnswers} = useRootStore().user;

  const [tab, setTab] = useState('Posts');

  const tabChangeToPosts = () => {
    setTab('Posts');
  };
  const tabChangeToAnswers = () => {
    setTab('Answers');
  };

  useEffect(() => {
    getMyPosts();
    getMyAnswers();
  }, [getMyAnswers, getMyPosts]);

  const renderLists = useCallback(() => {
    return visible.isMyPosts ? <PostsList /> : <AnswersList />;
  }, [visible.isMyPosts]);

  return (
    <Container Header={<Header />}>
      <RN.View>
        <Tabbar
          activeTab={tab}
          postsLength={state.myFollowing?.length}
          asnwersLength={state.myFollowers?.length}
          onChangePosts={tabChangeToPosts}
          onChangeAnswers={tabChangeToAnswers}
        />
        {renderLists()}
      </RN.View>
    </Container>
  );
};

export default observer(MyPosts);
