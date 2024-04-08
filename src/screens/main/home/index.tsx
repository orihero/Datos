import Container from 'components/Container';
import React from 'react';
import {HomeHeader} from './ui';
import {QuestionCard} from 'components/Cards';

export default function HomeScreen() {
  return (
    <Container Header={<HomeHeader />}>
      <QuestionCard />
    </Container>
  );
}
