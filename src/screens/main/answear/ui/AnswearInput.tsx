import RN from 'components/RN';
import React from 'react';
import CommentInput from './CommentInput';
import {COLORS} from 'shared/constants/colors';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';

const AnswearInput = () => {
  return (
    <RN.View style={styles.container}>
      <CommentInput placeholder="Answear" isShowCamera />
    </RN.View>
  );
};

export default AnswearInput;

const styles = RN.StyleSheet.create({
  container: {
    backgroundColor: COLORS.dargGray,
    paddingVertical: normalizeHeight(10),
    paddingHorizontal: normalizeWidth(10),
  },
});
