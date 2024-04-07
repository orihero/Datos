import React from 'react';
import RN from 'components/RN';
import Container from 'components/Container';
import {COLORS} from 'constants/colors';
import Header from 'components/Header';
import {LogoSvgImage} from 'assets/svg-images';
import PlusIcon from 'assets/icons/PlusIcon';

export default function HomeScreen() {
  return (
    <Container
      Header={
        <Header
          containerStyle={styles.header}
          LeftHeader={
            <RN.View>
              <LogoSvgImage />
            </RN.View>
          }
          RightHeader={<PlusIcon size={24} color={COLORS.white} />}
        />
      }>
      <RN.Text color={COLORS.white}>Home Scsssreen</RN.Text>
    </Container>
  );
}

const styles = RN.StyleSheet.create({
  header: {
    paddingHorizontal: 30,
  },
});
