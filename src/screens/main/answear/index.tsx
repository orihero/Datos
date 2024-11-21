import Container from 'components/Container';
import React from 'react';
import {QuestionCard} from 'components/Cards';
import RN from 'components/RN';
import Answer from 'components/Cards/ui/Answer';
import Header from './ui/Header';
import CommentInput from './ui/CommentInput';
import AnswearInput from './ui/AnswearInput';

export default function AnswearScreen() {
  return (
    <Container Header={<Header />} Footer={<AnswearInput />}>
      <RN.View ph={12} pt={20} flex={1} g={10}>
        <QuestionCard activeInfo={'answear' as never} />
        <CommentInput />
        <Answer />
      </RN.View>
    </Container>
  );
}
