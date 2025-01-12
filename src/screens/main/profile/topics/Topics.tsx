import Container from 'components/Container';
import RN from 'components/RN';
import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {COLORS} from 'shared/constants/colors';
import {Spacing} from 'components/Spacing';
import TripleHeader from 'components/TripleHeader/TripleHeader';
import ArrowLeftIcon from 'shared/assets/icons/ArrowLeftIcon';
import {useTranslation} from 'react-i18next';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import {Topic} from '@types';
import TopicItem from 'components/TopicItem/TopicItem';

const Topics = () => {
  const {t} = useTranslation();
  const {user, topic} = useRootStore();

  console.log('user.topicsFollowedByMe', user.state.topicsFollowedByMe);

  const renderSeparator = () => <Spacing height={10} />;

  const renderFollowers = React.useCallback(
    ({item}: {item: Topic}) => {
      return (
        <TopicItem
          topic={item}
          onPress={() => topic.onSetPreviewTopic(item)}
          loading={topic.state.joinTopicLoading[item?._id as never]}
        />
      );
    },
    [topic],
  );

  const renderUsersFlat = useCallback(() => {
    return (
      <RN.FlatList
        data={user.state.topicsFollowedByMe}
        renderItem={renderFollowers}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={renderSeparator}
        showsVerticalScrollIndicator={false}
      />
    );
  }, [renderFollowers, user.state.topicsFollowedByMe]);

  return (
    <Container
      Header={
        <TripleHeader
          title={t('topics')}
          leftItem={<ArrowLeftIcon size={24} color={COLORS.white} />}
        />
      }>
      <Spacing height={20} />
      {renderUsersFlat()}
    </Container>
  );
};

export default observer(Topics);

const styles = RN.StyleSheet.create({});
