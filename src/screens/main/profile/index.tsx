import Container from 'components/Container';
import React, {useEffect} from 'react';
import {ProfileDisplay, ProfileHeader} from './ui';
import {observer} from 'mobx-react-lite';
import {Spacing} from 'components/Spacing';
import NavigationService from 'shared/navigation/NavigationService';
import {HOME_STACK} from 'shared/navigation/routes';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import {useTranslation} from 'react-i18next';
import RN from 'components/RN';
import ListItem from 'components/ListItem/ListItem';
import {COLORS} from 'shared/constants/colors';
import LogoutIcon from 'shared/assets/icons/LogoutIcon';
import FollowersIcon from 'shared/assets/icons/FollowersIcon';
import PostsIcon from 'shared/assets/icons/PostsIcon';
import TopicsIcon from 'shared/assets/icons/TopicsIcons';
import EditUserIcon from 'shared/assets/icons/EditUserIcon';
import ConfirmationModal from 'components/ConfirmationModal/ConfirmationModal';
import {useRegister} from 'shared/store/hooks/useRegister';

const ProfileScreen = () => {
  const {t} = useTranslation();
  const {user, visible} = useRootStore();
  const {onSignOut} = useRegister();

  useEffect(() => {
    user.getUserInfo();
  }, [user]);

  return (
    <Container Header={<ProfileHeader />}>
      <RN.View>
        <RN.ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <ProfileDisplay {...user.state.userState} />
          <Spacing height={20} />
          <ListItem
            title={t('posts')}
            leftIcon={<PostsIcon size={24} color={COLORS.white} />}
            onPress={() => NavigationService.navigate(HOME_STACK.MY_POSTS)}
            height={55}
          />
          <Spacing height={10} />
          <ListItem
            title={t('topics')}
            leftIcon={<TopicsIcon size={28} color={COLORS.white} />}
            onPress={() =>
              NavigationService.navigate(HOME_STACK.TOPICS_FOLLOWED_BY_ME)
            }
            height={55}
          />
          <Spacing height={10} />
          <ListItem
            title={t('followers')}
            leftIcon={<FollowersIcon size={24} color={COLORS.white} />}
            onPress={() => NavigationService.navigate(HOME_STACK.MY_FOLLOWERS)}
            height={55}
          />
          <Spacing height={10} />
          <ListItem
            title={t('edit_account')}
            leftIcon={<EditUserIcon size={28} color={COLORS.white} />}
            onPress={() => NavigationService.navigate(HOME_STACK.EDIT_ACCOUNT)}
            height={55}
          />
          <Spacing height={10} />
          <ListItem
            leftIcon={<LogoutIcon size={24} color={COLORS.white} />}
            title={t('logout')}
            onPress={() => visible.show('logoutConfirmation')}
            height={55}
          />
          <Spacing height={120} />
        </RN.ScrollView>
      </RN.View>
      <ConfirmationModal
        title={`${t('logout_confirmation')}`}
        onPressNo={() => visible.hide('logoutConfirmation')}
        visible={visible.visible.logoutConfirmation}
        onPressYes={onSignOut}
      />
    </Container>
  );
};

export default observer(ProfileScreen);
