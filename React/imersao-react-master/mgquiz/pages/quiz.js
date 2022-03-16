// eslint-disable-next-line eslint linebreak-style
import React from 'react';
import Button from '../src/components/Button'
import db from '../db.json';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import { Widget, WidgetContent, WidgetHeader, WidgetTopic } from '../src/components/Widget';

function LoadingWidget(){
  return (
    <Widget>
      <WidgetHeader>
        <h1>
          Carreganu...
        </h1>
      </WidgetHeader>
      <WidgetContent>
        <p>
          [Desafio do Loading]
        </p>
      </WidgetContent>
    </Widget>
  );
}

function QuestionWidget ({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
}){
  const questionId = `question__${questionIndex}`

  return (
    <Widget>
      <WidgetHeader>
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </WidgetHeader>
      <img
        alt='Descrição'  
        style={{
          width:'100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <WidgetContent>
        <h2>{question.title}</h2>
        <p>{question.description}</p>
        
        <form onSubmit={(infosDoEvento) => {
          infosDoEvento.preventDefault();
          onSubmit()
        }}>
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            return (
              <WidgetTopic 
                as="label"
                htmlFor={alternativeId}
              >
                <input 
                  id={alternativeId}
                  type="radio"
                  name={questionId}
                />
                {alternative}
              </WidgetTopic>
            );
            
          })}

          <pre>
            {JSON.stringify(question, null, 4)}
          </pre>
          
          <Button>Confirmar</Button>
        </form>
      </WidgetContent>
    </Widget>

  );
  
}

const screenStates = {
  QUIZ:'QUIZ',
  LOADING:'LOADING',
  RESULT:'RESULT',
  
}
export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING)
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const totalQuestions = db.questions.length;
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];
  
  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 10000);
  }, []);

  function handleSubmitQuiz(){
    const nextQuestion = questionIndex+1;
    if(nextQuestion<totalQuestions){
      setCurrentQuestion(nextQuestion)
    } else {
      setScreenState(screenStates.RESULT);
    }
  }
  
  return (
    <QuizBackground BackgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
        <QuestionWidget 
          question={question} 
          questionIndex = {questionIndex}
          totalQuestions={totalQuestions}
          onSubmit={handleSubmitQuiz}
        />)}

        {screenState===screenStates.LOADING && <LoadingWidget/>}

        {screenState===screenStates.RESULT && <div>Vocên acertou X questões, parabéns</div>}

      </QuizContainer>
    </QuizBackground>
  );
}
