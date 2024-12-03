import RN from 'components/RN';
import {observer} from 'mobx-react-lite';
import React from 'react';
import ArrowDownIcon from 'shared/assets/icons/ArrowDownIcon';
import {MockUserPngImage} from 'shared/assets/images/mock';
import {COLORS} from 'shared/constants/colors';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';

const Poll = () => {
  const {state} = useRootStore().post;

  return (
    <RN.View style={styles.container}>
      <RN.View style={styles.top}>
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

        <RN.View p={12} style={styles.questionBox}>
          <RN.View style={styles.upDown}>
            <RN.TouchableOpacity style={styles.upButton}>
              <ArrowDownIcon size={32} />
            </RN.TouchableOpacity>
            <RN.Text size="h2" font="Medium">
              1
            </RN.Text>
            <RN.TouchableOpacity style={styles.downButton}>
              <ArrowDownIcon size={32} />
            </RN.TouchableOpacity>
          </RN.View>
          <RN.View style={styles.question}>
            <RN.Text size="h2" font="Medium">
              How do you define UX with an example?
            </RN.Text>
            <RN.View style={styles.pollItemBox}>
              <RN.TouchableOpacity style={styles.pollItem}>
                <RN.View style={styles.pollRadio} />
                <RN.Text size="h4" font="Medium">
                  Google
                </RN.Text>
              </RN.TouchableOpacity>
              <RN.TouchableOpacity style={styles.pollItem}>
                <RN.View style={styles.pollRadio} />
                <RN.Text size="h4" font="Medium">
                  Safari
                </RN.Text>
              </RN.TouchableOpacity>
            </RN.View>
          </RN.View>
        </RN.View>
      </RN.View>
    </RN.View>
  );
};

export default observer(Poll);

const styles = RN.StyleSheet.create({
  container: {
    backgroundColor: COLORS.dargGray,
    borderRadius: 40,
  },
  top: {
    padding: 6,
    borderRadius: 40,
    backgroundColor: COLORS.white,
  },
  userImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  followButton: {
    // height: normalizeHeight(65),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: normalizeWidth(35),
    paddingVertical: normalizeHeight(15),
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 40,
  },
  questionBox: {
    flexDirection: 'row',
    gap: 10,
  },
  question: {
    gap: 10,
  },
  pollItemBox: {
    gap: 5,
  },
  pollItem: {
    padding: 5,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  pollRadio: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  upDown: {
    alignItems: 'center',
  },
  upButton: {
    transform: [{rotate: '180deg'}],
  },
  downButton: {},
  answersCommentViews: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: normalizeWidth(15),
    paddingVertical: normalizeHeight(20),
  },
});
