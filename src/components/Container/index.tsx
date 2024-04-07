import RN from 'components/RN';
import React, {FC, PropsWithChildren} from 'react';

interface ContainerProps extends PropsWithChildren {}

const Container: FC<ContainerProps> = ({children}) => {
  return <RN.View style={styles.container}>{children}</RN.View>;
};

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
  },
});

export default Container;
