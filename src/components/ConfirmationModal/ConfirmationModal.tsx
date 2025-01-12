import RN from 'components/RN';
import {observer} from 'mobx-react-lite';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {COLORS} from 'shared/constants/colors';

interface Props {
  visible: boolean;
  title?: string;
  onPressYes?: () => void;
  onPressNo?: () => void;
}

const ConfirmationModal: FC<Props> = ({
  visible,
  title,
  onPressYes,
  onPressNo,
}) => {
  const {t} = useTranslation();

  return (
    <RN.Modal transparent={true} visible={visible} animationType="fade">
      <RN.View style={styles.overlay}>
        <RN.View style={styles.modalContainer}>
          <RN.Text style={styles.title}>{title}</RN.Text>
          <RN.View style={styles.buttonContainer}>
            <RN.TouchableOpacity style={styles.buttonYes} onPress={onPressYes}>
              <RN.Text style={styles.buttonText}>{t('yes')}</RN.Text>
            </RN.TouchableOpacity>
            <RN.TouchableOpacity style={styles.buttonNo} onPress={onPressNo}>
              <RN.Text style={styles.buttonText}>{t('cancel')}</RN.Text>
            </RN.TouchableOpacity>
          </RN.View>
        </RN.View>
      </RN.View>
    </RN.Modal>
  );
};

const styles = RN.StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonYes: {
    flex: 1,
    backgroundColor: COLORS.blue,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonNo: {
    flex: 1,
    backgroundColor: COLORS.tomate,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default observer(ConfirmationModal);
