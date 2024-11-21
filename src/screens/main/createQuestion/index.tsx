import Container from 'components/Container';
import RN from 'components/RN';
import React from 'react';
import HeaderView from './ui/Header';
import Display from './ui/Display';

const CreateQuestion = () => {
  return (
    <Container Header={<HeaderView />}>
      <RN.View ph={12} pt={20} flex={1} g={10}>
        <Display />
      </RN.View>
    </Container>
  );
};

export default CreateQuestion;

const styles = RN.StyleSheet.create({
  container: {},
});
