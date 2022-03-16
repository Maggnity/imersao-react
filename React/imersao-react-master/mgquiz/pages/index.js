import React from 'react';
import { useRouter } from 'next/router';

import Button from '../src/components/Button'
import db from '../db.json';
import styled from 'styled-components';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input'
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer'
import QuizLogo from '../src/components/QuizLogo';
import { Widget, WidgetContent, WidgetHeader, WidgetTopic } from '../src/components/Widget';

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  console.log('retorno do useState', name, setName)
  
  return (
    <QuizBackground BackgroundImage={db.bg}>
      <QuizContainer>
      <QuizLogo />
        <Widget>
          <WidgetHeader>
            <h1>
              {db.title}
            </h1>
          </WidgetHeader>
          <WidgetContent>
            <p>{db.description}</p>
            <form onSubmit={function(infosDoEvento){
              infosDoEvento.preventDefault();
              router.push(`quiz?name=${name}`);
              console.log('Fazendo submissão por meio do react');
            }}>
              <Input                 
                name="nomeDoUsuario"
                onChange={(infosDoEvento) => setName(infosDoEvento.target.value)}
                placeholder='Seu nome?' 
                value={name}
              />
              <Button type='submit' disabled={name.length === 0 }> {`Jogar ${name}`}</Button>
            </form>
          </WidgetContent>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/Maggnity" />
    </QuizBackground>
  );
}
