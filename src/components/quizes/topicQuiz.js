import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import Options from './options'
import $ from 'jquery'
import './TopicQuiz.css'

const _topicQuiz = (props) => {

    const { quizQuestionAnswer } = props.selectedQuiz 
    const [currentPage, setCurrentPage] = useState(1)
    const [optionsChoosed, setOptionsChoosed] = useState([])

    const removeClass = ()=>{
        $(".option1").removeClass("user-ans");
        $(".option2").removeClass("user-ans");
        $(".option3").removeClass("user-ans");
        $(".option4").removeClass("user-ans");
    }

    const changeQues =async (direction)=>{
        if(direction === 'back'){
           
            await setCurrentPage(currentPage-1)
            let optionId

            if(optionsChoosed[currentPage-2] != null){
       
                optionId = optionsChoosed[currentPage-2]
                removeClass()
                $(".option" + optionId).toggleClass("user-ans");

            }else{
                removeClass()
            }
  
        }else if(direction === 'next' ){

            await setCurrentPage(currentPage+1) 
            let optionId
            if(optionsChoosed[currentPage] != null){
               
                optionId = optionsChoosed[currentPage]
                removeClass()
                $(".option" + optionId).toggleClass("user-ans");

            }else{
                removeClass()
            }
        }
    }

    const choosenOption =(optionId)=>{
  
        removeClass()
        $(".option" + optionId).toggleClass("user-ans");

        let newArr = [...optionsChoosed]
        newArr[currentPage-1] = optionId
        setOptionsChoosed(newArr)      
    }

    return ( 
        <div className="ml-5 bg-light mb-5 pb-5 ">
            <h2 className="text-center pt-2"><b>Quiz</b></h2>   
            {
                (quizQuestionAnswer.slice(currentPage - 1 , currentPage )).map(item=>{
                    {/* fix the max height of options */}
                    return(
                        <div className="m-5 " key={item.id}>
                            <Card className="p-2 question ">
                             <Card.Title>  
                                <h4>{item.question}</h4>
                            </Card.Title> 
                            </Card>
                            
                            <div className="mt-4 ">
                                <Options item={item} choosenOption={choosenOption} />

                                <div className="ml-4 float-left mt-3">
                                {
                                    currentPage > 1 ? (
                                        <Button onClick={()=>changeQues('back')} className="primary">
                                            Previous
                                        </Button>
                                    ):(
                                        <Button onClick={()=>changeQues('back')} className="primary" disabled>
                                            Previous
                                        </Button>
                                    )
                                }
                                </div>
                                <div className="clearflex"></div>
                                <div className="mr-3 float-right mt-3">
                                {
                                    (quizQuestionAnswer.length - 1) >= currentPage ? (
                                        <Button onClick={()=>changeQues('next')} className="primary">
                                            Next
                                        </Button>
                                    ) : (
                                        <Button onClick={()=>changeQues('next')} className="primary" disabled >
                                            Next
                                        </Button>
                                    )
                                }
                                </div>
                            </div>
                        </div>
                    )
                })
            }
          
        </div>
    );
}
export default _topicQuiz;