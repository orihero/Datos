import RN from 'components/RN';
import React from 'react';
import {MockUserPngImage} from 'shared/assets/images/mock';
import {COLORS} from 'shared/constants/colors';

export default function Question() {
  return (
    <RN.View style={styles.container}>
      <RN.View>
        <RN.View fd={'row'} ai={'center'} g={8}>
          <RN.Image source={MockUserPngImage} style={styles.userImage} />
          <RN.View>
            <RN.Text children="Ola Dealova" size="h2" font="Medium" />
            <RN.Text children="5 min ago" size="h6" />
          </RN.View>
        </RN.View>
        <RN.TouchableOpacity>
          <RN.Text children="Follow" />
        </RN.TouchableOpacity>
      </RN.View>
    </RN.View>
  );
}

const styles = RN.StyleSheet.create({
  container: {
    padding: 6,
    backgroundColor: COLORS.white,
  },
  userImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
});
