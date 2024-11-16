import RN from 'components/RN';
import React from 'react';
import {MockUserPngImage} from 'shared/assets/images/mock';
import {COLORS} from 'shared/constants/colors';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';

export default function Question() {
  return (
    <RN.View style={styles.container}>
      <RN.View fd={'row'} ai={'center'} jc={'space-between'}>
        <RN.View fd={'row'} ai={'center'} g={8}>
          <RN.Image source={MockUserPngImage} style={styles.userImage} />
          <RN.View>
            <RN.Text children="Ola Dealova" size="h2" font="Medium" />
            <RN.Text children="5 min ago" size="h6" />
          </RN.View>
        </RN.View>
        <RN.TouchableOpacity style={styles.followButton}>
          <RN.Text children="Follow" size="h4" />
        </RN.TouchableOpacity>
      </RN.View>

      <RN.View p={12}>
        <RN.Text size="h2" font="Medium">
          How do you define UX with an example?
        </RN.Text>
      </RN.View>
    </RN.View>
  );
}

const styles = RN.StyleSheet.create({
  container: {
    padding: 6,
    backgroundColor: COLORS.white,
    borderRadius: 40,
  },
  userImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  followButton: {
    height: normalizeHeight(65),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: normalizeWidth(35),
  },
});
