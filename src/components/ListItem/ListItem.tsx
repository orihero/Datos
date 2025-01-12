import RN from 'components/RN';
import React, {FC} from 'react';
import ArrowDownIcon from 'shared/assets/icons/ArrowDownIcon';
import {COLORS} from 'shared/constants/colors';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';

interface Props {
  onPress?: () => void;
  title: string;
  rightItem?: React.ReactNode;
  height?: number;
  leftIcon?: React.ReactNode;
}

const ListItem: FC<Props> = ({onPress, title, rightItem, height, leftIcon}) => {
  return (
    <RN.Pressable
      style={[
        styles.container,
        {
          height: height ? normalizeHeight(height) : normalizeHeight(50),
        },
      ]}
      onPress={onPress}>
      <RN.View style={styles.left}>
        {leftIcon ? (
          <RN.View style={styles.leftIcon}>{leftIcon}</RN.View>
        ) : null}
        <RN.Text color={COLORS.white} size="h4" font="Medium">
          {title}
        </RN.Text>
      </RN.View>
      {rightItem ? (
        rightItem
      ) : (
        <RN.View style={styles.arrow}>
          <ArrowDownIcon size={24} color={COLORS.white} />
        </RN.View>
      )}
    </RN.Pressable>
  );
};
export default ListItem;

const styles = RN.StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalizeWidth(15),
    backgroundColor: COLORS.dargGray,
    borderRadius: 15,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
  leftIcon: {
    width: normalizeWidth(36),
  },
  arrow: {
    transform: [{rotate: `${-90}deg`}],
  },
});
