import React from 'react';

import styled from 'styled-components'
import db from '../db.json';
import { Widget , WidgetContent, WidgetHeader } from '../src/components/Widget';
import { Footer } from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
//import QuizLogo from '../src/components/QuizLogo';


const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto; 
    padding: 15px;
  }
`;


export default function Home() {
  return (
    
     <QuizBackground BackgroundImage={db.bg}>
      <QuizContainer>
        <Widget>
          <WidgetHeader>
            <h1>
            {db.title}
            </h1>
          </WidgetHeader>
          <WidgetContent>
            <p>{db.description}</p>
          </WidgetContent>

        </Widget>
        <Widget>
          <WidgetHeader>
            <h1>Nota 2</h1>
          </WidgetHeader>
          <WidgetContent>
            <p>Lorem</p>
          </WidgetContent>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl={"https://github.com/Maggnity"}/>
    </QuizBackground>    
  )
};
