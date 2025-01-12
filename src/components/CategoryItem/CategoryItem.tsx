import {InterestType} from '@types';
import RN from 'components/RN';
import {observer} from 'mobx-react-lite';
import * as React from 'react';
import CloseIcon from 'shared/assets/icons/CloseIcon';
import {COLORS} from 'shared/constants/colors';
import {HIT_SLOP} from 'shared/styles/globalStyles';

interface Props {
  category: InterestType;
  onSelect?: () => void;
  onRemove?: () => void;
  isSelect?: boolean;
}

const CategoryItem: React.FC<Props> = ({
  category,
  onSelect,
  onRemove,
  isSelect,
}) => {
  return (
    <RN.TouchableOpacity
      style={[
        styles.interestButton,
        {backgroundColor: isSelect ? COLORS.blue : COLORS.dargGray},
      ]}
      onPress={onSelect}>
      <RN.Image
        source={{uri: category.img}}
        resizeMode="cover"
        style={styles.iconImg}
      />
      <RN.Text style={[styles.interestText]}>{category?.name}</RN.Text>
      {isSelect && (
        <RN.TouchableOpacity onPress={onRemove} hitSlop={HIT_SLOP}>
          <CloseIcon color={COLORS.white} size={20} />
        </RN.TouchableOpacity>
      )}
    </RN.TouchableOpacity>
  );
};

export default observer(CategoryItem);

const styles = RN.StyleSheet.create({
  interestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: COLORS.dargGray,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 15,
    marginRight: 8,
  },

  interestText: {
    fontSize: 14,
    color: COLORS.white,
  },

  iconImg: {
    width: 22,
    height: 22,
  },
});
