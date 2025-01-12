import RN from 'components/RN';
import {observer} from 'mobx-react-lite';
import React, {FC} from 'react';
import PollIcon from 'shared/assets/icons/PollIcon';
import PostIcon from 'shared/assets/icons/PostIcon';
import QuestionIcon from 'shared/assets/icons/QuestionIcon';
import {COLORS} from 'shared/constants/colors';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';

interface Props {
  postType: 'Post' | 'Question' | 'Poll';
}

const PostType: FC<Props> = ({postType}) => {
  return (
    <RN.View style={styles.container}>
      {postType === 'Post' ? (
        <PostIcon />
      ) : postType === 'Question' ? (
        <QuestionIcon />
      ) : (
        <PollIcon />
      )}
    </RN.View>
  );
};

export default observer(PostType);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: normalizeWidth(5),
    paddingVertical: normalizeHeight(5),
    // backgroundColor: COLORS.dargGray,
    borderRadius: 10,
  },
});
