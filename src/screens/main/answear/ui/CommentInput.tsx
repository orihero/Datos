import RN from 'components/RN';
import * as React from 'react';
import CameraIcon from 'shared/assets/icons/CameraIcon';
import SendPlaneIcon from 'shared/assets/icons/SendPlaceIcon';
import {COLORS} from 'shared/constants/colors';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';

type Props = {
  placeholder?: string;
  isShowCamera?: boolean;
};

const CommentInput: React.FC<Props> = ({placeholder, isShowCamera}) => {
  return (
    <RN.View style={styles.container}>
      <RN.TextInput
        style={styles.input}
        placeholder={placeholder ? placeholder : 'Comment'}
        placeholderTextColor={COLORS.textGray}
      />
      {isShowCamera ? (
        <RN.TouchableOpacity style={styles.sendBtn}>
          <CameraIcon size={28} color={COLORS.white} />
        </RN.TouchableOpacity>
      ) : null}
      <RN.TouchableOpacity style={styles.sendBtn}>
        <SendPlaneIcon size={28} color={COLORS.white} />
      </RN.TouchableOpacity>
    </RN.View>
  );
};

export default CommentInput;

const styles = RN.StyleSheet.create({
  container: {
    backgroundColor: COLORS.inputGray,
    padding: 5,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: COLORS.inputGray,
    paddingHorizontal: normalizeWidth(20),
    paddingVertical: normalizeHeight(20),
    borderRadius: 30,
    width: '80%',
  },
  sendBtn: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
