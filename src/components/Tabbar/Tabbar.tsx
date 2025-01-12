import RN from 'components/RN';
import {Spacing} from 'components/Spacing';
import {observer} from 'mobx-react-lite';
import React, {FC} from 'react';
import {COLORS} from 'shared/constants/colors';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';

interface Props {
  activeTab: string;
  onChangePosts?: () => void;
  onChangeAnswers?: () => void;
  postsLength?: number;
  asnwersLength?: number;
  leftItem?: string;
  rightItem?: string;
}

const Tabbar: FC<Props> = ({
  activeTab,
  onChangeAnswers,
  onChangePosts,
  postsLength,
  asnwersLength,
  leftItem,
  rightItem,
}) => {
  return (
    <>
      <Spacing height={20} />
      <RN.View style={styles.group}>
        <RN.TouchableOpacity
          onPress={onChangePosts}
          style={[styles.button, activeTab === 'Posts' && styles.activeButton]}>
          <RN.Text style={styles.buttonText}>
            {leftItem ? leftItem : 'Posts'} ({postsLength ? postsLength : 0})
          </RN.Text>
        </RN.TouchableOpacity>
        <RN.TouchableOpacity
          onPress={onChangeAnswers}
          style={[
            styles.button,
            activeTab === 'Answers' && styles.activeButton,
          ]}>
          <RN.Text style={styles.buttonText}>
            {rightItem ? rightItem : 'Answers'} (
            {asnwersLength ? asnwersLength : 0})
          </RN.Text>
        </RN.TouchableOpacity>
      </RN.View>
      <Spacing height={20} />
    </>
  );
};
export default observer(Tabbar);

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
    height: normalizeHeight(50),
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 54,
  },
  activeButton: {
    backgroundColor: COLORS.blue,
  },
});
