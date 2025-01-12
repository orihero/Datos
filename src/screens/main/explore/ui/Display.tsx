import React, {FC, useCallback, useRef, useState} from 'react';
import {Post, Topic, User} from '@types';
import RN from 'components/RN';
import {Spacing} from 'components/Spacing';
import {observer} from 'mobx-react-lite';
import {TopicItem} from 'screens/main/topic/ui';
import {COLORS} from 'shared/constants/colors';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import {normalizeHeight, SIZES} from 'shared/utils/dimensions';
import {QuestionCard} from 'components/Cards';
import UserItem from 'components/UserItem/UserItem';
import PreviewMediaPost from 'components/PreviewMediaPost/PreviewMediaPost';
import AnimatedAlert from 'components/AnimatedAlert/AnimatedAlert';
import SearchInput from 'components/SearchInput/SearchInput';
import ReportBottomSheet from 'components/ReportBottomSheet/ReportBottomSheet';
import {ReportsData} from 'shared/constants/reports';
import SwiperFlatList from 'react-native-swiper-flatlist';
import SortModal from 'components/SortModal/SortModal';

const tabData = [
  {
    title: 'Topics',
    key: 'topics',
  },
  {
    title: 'Posts',
    key: 'posts',
  },
  {
    title: 'Users',
    key: 'users',
  },
];

interface Props {}

const Display: FC<Props> = ({}) => {
  const {local, user, post, topic, visible} = useRootStore();
  const [activeTab, setActiveTab] = useState('topics');
  const [search, setSearch] = useState('');
  const swiperRef = useRef<SwiperFlatList>(null);

  const onSetActiveTab = useCallback(
    (key: string) => {
      const index = tabData.findIndex(item => item.key === key); // Indexni topish
      if (index !== -1) {
        setActiveTab(key);
        topic.setSearchHandle(search, key);
        swiperRef.current?.scrollToIndex({index}); // SwiperFlatList scroll qilish
      }
    },
    [search, topic],
  );

  const SetSearchHandle = (key: string) => {
    setSearch(key);
    topic.setSearchHandle(key, activeTab);
  };

  const onPressMedia = useCallback(
    (id: string, type: string) => {
      post.getPostById(id, type);
      visible.show('previewMedia');
    },
    [post, visible],
  );

  const renderTab = useCallback(() => {
    return tabData.map(item => {
      return (
        <RN.TouchableOpacity
          onPress={() => onSetActiveTab(item.key)}
          key={item.key}
          style={{
            borderBottomWidth: 3,
            borderBottomColor:
              item.key === activeTab ? COLORS.blue : COLORS.transparent,
          }}>
          <RN.Text color={COLORS.white} style={styles.tabItem}>
            {item.title}
          </RN.Text>
        </RN.TouchableOpacity>
      );
    });
  }, [activeTab, onSetActiveTab]);

  const renderSeparator = () => <Spacing height={10} />;

  const renderTopics = React.useCallback(
    ({item}: {item: Topic}) => {
      return (
        <TopicItem
          topic={item}
          isFollowed={false}
          onPress={() => topic.onSetPreviewTopic(item)}
          onFollow={() => topic.onFollowToTopic(item, 'explore')}
          loading={topic.state.joinTopicLoading[item._id as never]}
          isFollowBtnShow={false}
        />
      );
    },
    [topic],
  );

  const onReportHandle = useCallback(
    (id: string) => {
      visible.show('reportModal');
      post.setReportMessage('postId', id);
    },
    [post, visible],
  );

  const renderPosts = React.useCallback(
    ({item}: {item: Post}) => {
      return (
        <QuestionCard
          post={item}
          onEnterPost={() => post.getPostById(item._id, item.type, true)}
          onUpVote={() => post.onUpVote(item)}
          onDownVote={() => post.donwVote(item)}
          userId={local.userId as never}
          onFollowTopic={() => topic.onFollowToTopic(item.topic)}
          onVoteOptionPress={id => post.onVoteToPollOptionAtHome(item, id)}
          onPressMedia={() => onPressMedia(item._id, item.type)}
          onReportPress={() => onReportHandle(item._id)}
        />
      );
    },
    [local.userId, onPressMedia, onReportHandle, post, topic],
  );

  const renderUsers = React.useCallback(
    ({item}: {item: User}) => {
      return (
        <UserItem
          user={item}
          onPress={() => user.setPreviewUser(item.uid)}
          onFollowPress={() => user.onFollowToUser(item)}
          btnLoading={user.state.followUserLoading[item.uid as never]}
        />
      );
    },
    [user],
  );

  return (
    <RN.View style={styles.container}>
      <Spacing height={15} />
      <SearchInput
        setSearchHandle={e => SetSearchHandle(e)}
        value={search}
        onPressFilter={() => visible.toggle('sortModal')}
      />
      <RN.View fd="row" g={15} pt={10} pl={5}>
        {renderTab()}
      </RN.View>
      <RN.View>
        <SwiperFlatList
          ref={swiperRef}
          horizontal
          index={tabData.findIndex(item => item.key === activeTab)}
          onChangeIndex={index => onSetActiveTab(tabData[index.index].key)}
          style={styles.swiper}>
          <RN.View style={styles.child}>
            <RN.View style={styles.childBox}>
              <RN.FlatList
                data={topic.state.allTopics}
                renderItem={renderTopics}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={renderSeparator}
                showsVerticalScrollIndicator={false}
                onRefresh={topic.fetchRefreshAllTopics}
                refreshing={topic.state.isFetchTopicLoading}
                ListHeaderComponent={<Spacing height={20} />}
              />
            </RN.View>
          </RN.View>
          <RN.View style={[styles.child]}>
            <RN.View style={styles.childBox}>
              <RN.FlatList
                data={post.state.allPosts}
                renderItem={renderPosts}
                showsHorizontalScrollIndicator={false}
                ListFooterComponent={<Spacing height={500} />}
                ItemSeparatorComponent={renderSeparator}
                showsVerticalScrollIndicator={false}
                onRefresh={post.fetchAllPost}
                refreshing={post.state.isLoading}
                ListHeaderComponent={<Spacing height={20} />}
              />
            </RN.View>
          </RN.View>
          <RN.View style={[styles.child]}>
            <RN.View style={styles.childBox}>
              <RN.FlatList
                data={user.state.allUsers}
                renderItem={renderUsers}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={renderSeparator}
                showsVerticalScrollIndicator={false}
                onRefresh={user.fetchAllUsers}
                refreshing={user.state.isFetchUserLoading}
                ListHeaderComponent={<Spacing height={20} />}
              />
            </RN.View>
          </RN.View>
        </SwiperFlatList>
      </RN.View>
      <AnimatedAlert
        isShow={visible.visible.alert}
        message={`You are level ${user.state.userState.level.level}. You have used ${user.state.userState.usedVotes} of ${user.state.userState.level.upOrDownVote} votes in one month`}
        onClose={() => visible.hide('alert')}
      />
      <PreviewMediaPost
        onClose={() => visible.hide('previewMedia')}
        post={post.state.previewPost}
        answers={post.state.postAnswers ? post.state.postAnswers : []}
        comments={post.state.postComments ? post.state.postComments : []}
      />
      <ReportBottomSheet
        isVisible={visible.visible.reportModal}
        onClose={() => visible.hide('reportModal')}
        reports={ReportsData as never}
      />
      <SortModal
        isVisible={visible.visible.sortModal}
        onClose={() => visible.hide('sortModal')}
      />
    </RN.View>
  );
};

export default observer(Display);

const styles = RN.StyleSheet.create({
  container: {},
  tabItem: {
    paddingVertical: 5,
    fontSize: normalizeHeight(16),
  },
  swiper: {
    width: SIZES.width,
  },
  child: {
    width: SIZES.width,
  },

  childBox: {
    width: SIZES.width,
    paddingRight: 20,
  },
});
