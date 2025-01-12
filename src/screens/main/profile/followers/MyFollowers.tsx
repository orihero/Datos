import Container from 'components/Container';
import RN from 'components/RN';
import React, {useCallback, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {COLORS} from 'shared/constants/colors';
import {Spacing} from 'components/Spacing';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';
import Tabbar from 'components/Tabbar/Tabbar';
import TripleHeader from 'components/TripleHeader/TripleHeader';
import ArrowLeftIcon from 'shared/assets/icons/ArrowLeftIcon';
import {useTranslation} from 'react-i18next';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import UserItem from 'components/UserItem/UserItem';
import {User} from '@types';

const MyFollowers = () => {
  const {t} = useTranslation();
  const {user} = useRootStore();
  const [tab, setTab] = useState('Posts');

  console.log('user.followers', user.state.myFollowers);

  const renderSeparator = () => <Spacing height={10} />;

  const tabChangeToPosts = () => {
    setTab('Posts');
  };
  const tabChangeToAnswers = () => {
    setTab('Answers');
  };

  const renderFollowers = React.useCallback(
    ({item}: {item: User}) => {
      return (
        <UserItem
          user={item}
          onPress={() => user.setPreviewUser(item.uid)}
          btnLoading={user.state.followUserLoading[item.uid as never]}
        />
      );
    },
    [user],
  );

  const renderFollowing = React.useCallback(
    ({item}: {item: User}) => {
      return (
        <UserItem
          user={item}
          onPress={() => user.setPreviewUser(item.uid)}
          btnLoading={user.state.followUserLoading[item.uid as never]}
        />
      );
    },
    [user],
  );

  const renderUsersFlat = useCallback(() => {
    if (tab === 'Answers') {
      return (
        <RN.FlatList
          data={user.state.myFollowers}
          renderItem={renderFollowers}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={renderSeparator}
          showsVerticalScrollIndicator={false}
        />
      );
    } else {
      return (
        <RN.FlatList
          data={user.state.myFollowing}
          renderItem={renderFollowing}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={renderSeparator}
          showsVerticalScrollIndicator={false}
        />
      );
    }
  }, [
    renderFollowers,
    renderFollowing,
    tab,
    user.state.myFollowers,
    user.state.myFollowing,
  ]);

  return (
    <Container
      Header={
        <TripleHeader
          title={t('my_followers')}
          leftItem={<ArrowLeftIcon size={24} color={COLORS.white} />}
        />
      }>
      <Tabbar
        activeTab={tab}
        onChangePosts={tabChangeToPosts}
        onChangeAnswers={tabChangeToAnswers}
        leftItem={`${t('following')}`}
        rightItem={`${t('followers')}`}
        asnwersLength={user.state.myFollowers?.length}
        postsLength={user.state.myFollowing?.length}
      />
      {renderUsersFlat()}
    </Container>
  );
};

export default observer(MyFollowers);

const styles = RN.StyleSheet.create({});
