import {User} from '@types';
import Avatar from 'components/Avatar/Avatar';
import {Button} from 'components/Button';
import RN from 'components/RN';
import {observer} from 'mobx-react-lite';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {COLORS} from 'shared/constants/colors';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';

interface Props {
  user: User;
  onPress?: () => void;
  onFollowPress?: () => void;
  titleColor?: string;
  btnLoading?: boolean;
}

const UserItem: FC<Props> = ({
  user,
  onPress,
  onFollowPress,
  titleColor,
  btnLoading,
}) => {
  const {t} = useTranslation();
  const {local} = useRootStore();

  return (
    <RN.Pressable style={styles.User} onPress={onPress}>
      <RN.View style={styles.UserInfo}>
        {user?.userImageUrl && (
          <Avatar uri={user?.userImageUrl} size={50} isUser={true} />
        )}
        <RN.View style={styles.UserName}>
          <RN.Text
            color={titleColor ? titleColor : COLORS.white}
            size="h3"
            font="Medium">
            {user?.firstName} {user?.lastName}
          </RN.Text>
          <RN.Text
            children={`${user?.followerIds?.length} ${t('followers')}  ${
              user?.postsIds?.length
            } ${t('posts')}`}
            color={COLORS.textGray}
            size="h6"
          />
        </RN.View>
      </RN.View>
      {!user?.followerIds?.includes(local.userId as never) && (
        <Button
          onPress={onFollowPress}
          title={
            user?.followerIds?.includes(local.userId as never)
              ? `${t('following')}`
              : `${t('follow')}`
          }
          width={85}
          height={30}
          loading={btnLoading}
        />
      )}
    </RN.Pressable>
  );
};

export default observer(UserItem);

const styles = RN.StyleSheet.create({
  UserAvatar: {
    width: normalizeWidth(30),
    height: normalizeHeight(30),
    borderRadius: 30,
  },
  User: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  UserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  UserName: {
    gap: 2,
  },
});
