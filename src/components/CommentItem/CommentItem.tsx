import {CommentType} from '@types';
import RN from 'components/RN';
import {observer} from 'mobx-react-lite';
import React, {FC, useMemo} from 'react';
import {COLORS} from 'shared/constants/colors';
import {timeSince} from 'shared/utils/date';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';

interface Props {
  comment: CommentType;
}

const CommentItem: FC<Props> = ({comment}) => {
  const commentData = useMemo(() => {
    return {...comment};
  }, [comment]);

  return (
    <RN.View style={styles.commentUser}>
      {commentData?.user?.userImageUrl && (
        <RN.Image
          style={styles.commentUserAvatar}
          source={{uri: commentData.user?.userImageUrl}}
        />
      )}
      <RN.View style={styles.commentUserInfo}>
        <RN.View style={styles.commentUserName}>
          <RN.Text color={COLORS.white} style={{fontSize: 11}}>
            {commentData?.user?.firstName} {commentData?.user?.lastName}
          </RN.Text>
          <RN.Text color={COLORS.textGray} style={{fontSize: 10}}>
            {timeSince(commentData?.createdAt)}
          </RN.Text>
        </RN.View>
        <RN.Text
          color={COLORS.white}
          style={{fontSize: 13, fontWeight: 'bold'}}>
          {commentData?.title}
        </RN.Text>
      </RN.View>
    </RN.View>
  );
};

export default observer(CommentItem);

const styles = RN.StyleSheet.create({
  commentUserAvatar: {
    width: normalizeWidth(30),
    height: normalizeHeight(30),
    borderRadius: 30,
  },
  commentUser: {
    flexDirection: 'row',
    gap: 8,
  },
  commentUserInfo: {
    gap: 2,
  },
  commentUserName: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
});
