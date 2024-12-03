import RN from 'components/RN';
import {Spacing} from 'components/Spacing';
import React, {FC, useState} from 'react';
import {COLORS} from 'shared/constants/colors';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';

interface Props {
  activeTab: string;
}

const ProfileTab: FC<Props> = ({activeTab}) => {
  const [active, setActive] = useState<'Posts' | 'Answers'>(activeTab as never);

  const onChangePosts = () => {
    setActive('Posts');
  };

  const onChangeAnswers = () => {
    setActive('Answers');
  };

  return (
    <>
      <Spacing height={20} />
      <RN.View style={styles.group}>
        <RN.TouchableOpacity
          onPress={onChangePosts}
          style={[styles.button, active === 'Posts' && styles.activeButton]}>
          <RN.Text style={styles.buttonText}>Posts</RN.Text>
        </RN.TouchableOpacity>
        <RN.TouchableOpacity
          onPress={onChangeAnswers}
          style={[styles.button, active === 'Answers' && styles.activeButton]}>
          <RN.Text style={styles.buttonText}>Answers</RN.Text>
        </RN.TouchableOpacity>
      </RN.View>
      <Spacing height={20} />
    </>
  );
};
export default ProfileTab;

const styles = RN.StyleSheet.create({
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalizeWidth(8),
    paddingVertical: normalizeHeight(6),
    backgroundColor: COLORS.dargGray,
    borderRadius: 54,
    borderWidth: 2,
    borderColor: COLORS.dargGray,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
  },
  button: {
    height: normalizeHeight(65),
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 54,
  },
  activeButton: {
    backgroundColor: COLORS.blue,
  },
});
