import RN from 'components/RN';
import React, {FC} from 'react';
import {COLORS} from 'shared/constants/colors';

type Props = {
  title: string;
};

const ListEmptyComponent: FC<Props> = ({title}) => {
  return (
    <RN.View ai={'center'} jc={'center'} pb={10} pt={10}>
      <RN.Text size="h4" color={COLORS.darkGray2}>
        {title}
      </RN.Text>
    </RN.View>
  );
};

export default ListEmptyComponent;
