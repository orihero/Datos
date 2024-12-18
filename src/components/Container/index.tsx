import RN from 'components/RN';
import {COLORS} from 'shared/constants/colors';
import {useAppViewInsets} from 'shared/hooks/useAppViewInsets';
import React, {FC, PropsWithChildren, ReactNode} from 'react';

interface ContainerProps extends PropsWithChildren {
  background?: string;
  Header?: ReactNode;
  Footer?: ReactNode;
  isScroll?: boolean;
  isPaddingTop?: boolean;
  onPress?: () => void;
}

const Container: FC<ContainerProps> = ({
  children,
  background = COLORS.black,
  isScroll = false,
  isPaddingTop = false,
  Header,
  Footer,
  onPress,
}) => {
  const {paddingTop} = useAppViewInsets();
  const Main = isScroll ? RN.ScrollView : RN.View;
  return (
    <RN.Pressable
      onPress={onPress}
      style={[
        styles.container,
        {backgroundColor: background},
        isPaddingTop && {paddingTop},
      ]}>
      {Header}
      <Main style={styles.main}>{children}</Main>
      {Footer}
    </RN.Pressable>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default Container;
