import React from 'react'
import Question from './Question';
import Article from './Article';
import Videos from './Videos';

function Type(props){

    function Greeting(type) {
        
        if (type === "Question") {
          return <Question />;
        }
        else if(type === "Videos") {
          return <Videos/>;
        }
        return <Article />;
      }


    return (

        Greeting(props.typeSelected)

    )
   
}
export default Type