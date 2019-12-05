import React, {Component} from 'react';
import {
    Button,
    Card,
    Container,
    Col,
    Row,
    Badge,
    Progress,
    Modal, ModalBody, ModalFooter 
  } from "reactstrap";
import './quiz.css'
const api = require("./api/api");

class EnglishCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionArray: [],
            present: 0,
            progress: 0,
            score: null,
            answersA: 'answersA',
            answersB: 'answersB',
            answersC: 'answersC',
            answersD: 'answersD',
            lastAnswers: -1,    //-1 if student doesn't choose any answers
            lastResult: [],
            modal: false,

            minutes: '00',
            seconds: '0',
            loaded: false
        }
        // this.changeAnwser = this.changeAnwser.bind(this)
        this.toggleYes = this.toggleYes.bind(this)
        this.toggle = this.toggle.bind(this)
    }
    toggle() {
        this.setState({
          modal: !this.state.modal
        });
        localStorage.removeItem('quizId')
        window.location.replace('/dashboard')
    }
    toggleYes(){
        this.setState({
            chooseSendAnswers: true,
        });
        // var quizId = localStorage.getItem('quizId')
        api.submitQuiz(this.state.lastResult,(err,result) => {
            if(err){
                console.log(err)
            }
            else{
                if(result.keyArray)
                    this.setState({
                        score: `${result.point}/${result.keyArray.length}`,
                    });
                else console.log('Dont have any answer from server!')
            }
        })
    }
    componentWillMount() {
        //get api start Quiz
        var quizId = localStorage.getItem('quizId')
        api.startQuiz(quizId, (err,result) => {
            if(err){
                console.log(err)
            }
            else{
                var tempArr = []
                result.questionArray.map( data => {
                    var question = {
                        content: data.content,
                        //if exist linkImage first, save file with linkImage
                        file:
                            data.linkImage !== null ? data.linkImage
                        :   data.linkVideo !== null ? data.linkVideo
                        :   data.linkAudio !== null ? data.linkAudio
                        :   null,
                        fileType:
                            data.linkImage !== null ? "image"
                        :   data.linkVideo !== null ? "video"
                        :   data.linkAudio !== null ? "audio"
                        :   null,
                        result: data.result,
                        solution: data.solution
                    }
                    tempArr.push(question)
                    return 0
                })
                var templastResult = []
                result.questionArray.map((quiz) => {
                    templastResult.push(-1)
                    return 0
                })
                this.setState({
                    minutes: result.timeTest,
                    seconds: 0,
                    questionArray: tempArr,
                    loaded: true,
                    lastResult: templastResult
                });
            }
        })

        //random answers
        // var templist = []
        // quizs.map( quiz => {
        //     var newquiz = {
        //         id : quiz.id,
        //         question : quiz.question,
        //         file: quiz.file,
        //     }
        //     var sort = quiz.answers.sort(function() {  
        //         return Math.random() - 0.5
        //     })
        //     newquiz.answers = sort
        //     templist.push(newquiz)
        // })
        // this.setState({
        //     questionArray: templist
        // });

        //init lastResult to send server
        // var templastResult = []
        // quizs.map((quiz, index) => {
        //     templastResult.push(-1)
        // })
        // this.setState({
        //     lastResult: templastResult
        // });
    }
    componentDidMount(){
        //Count down timer
        this.myInterval = setInterval(() => {
            const {minutes, seconds} = this.state
            if(seconds > 0){
                this.setState(({seconds}) => ({
                    seconds: seconds - 1
                }));
            }
            if(seconds === 1 && minutes === 0){
                this.setState({
                    modal: true
                });
            }
            if(seconds === 0){
                if(minutes === 0){
                    //clear count down timer
                    clearInterval(this.myInterval)
                }
                else{
                    this.setState(({minutes}) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }));
                }
            }
        }, 1000)
    }
    componentWillUnmount(){
        //clear count down timer
        clearInterval(this.myInterval)
    }
    nextQuestion(event){
        var {
            lastAnswers, lastResult, questionArray,
            present, answersA, answersB, answersC, answersD,
        } = this.state
        var result = lastAnswers
        // if(lastAnswers === 'exist'){
        var checkAnswers = [answersA, answersB, answersC, answersD]
        result = checkAnswers.indexOf(event.target.id)
        // }
        // this.state.lastResult.push(result)
        lastResult[present] = result
        if(present<questionArray.length){
            this.setState( prevState => ({
                progress: (prevState.present+1)/prevState.questionArray.length*100,
            }));
        }
        if(present<questionArray.length-1){
            this.setState( prevState => ({
                answersA: 'answersA',
                answersB: 'answersB',
                answersC: 'answersC',
                answersD: 'answersD',
                lastAnswers: -1,
                present: prevState.present+1,
            }));
        }
        else{
            this.setState({
                modal: true
            });
            this.toggleYes()
            clearInterval(this.myInterval)
        }
       
    }
    // changeAnwser(event){
    //     this.setState({
    //         answersA: false,
    //         answersB: false,
    //         answersC: false,
    //         answersD: false,
    //         [event.target.id]: true,
    //         lastAnswers: 'exist'
    //     });
    // }
    finishQuiz(){
        this.setState({
            modal: true
        });
        this.toggleYes()
        clearInterval(this.myInterval)
    }
    render() {
        // let {answersA, answersB, answersC, answersD} = this.state
        let {minutes, seconds, questionArray} = this.state
        return (
            this.state.loaded &&
            <div>
                <Container className="mt-3 text-center">
                    <Row className="mb-1">
                        <Col xs={{ size: 10, offset: 1}}>
                            <div className="text-center">Number of question: {this.state.present+1}/{questionArray.length}</div>
                            <Progress value={this.state.progress}></Progress>
                        </Col>
                        <Col xs="1" className="pl-0 mt-3 quiz-pointer" title="Click here to finish the quiz">
                            <b onClick={this.finishQuiz.bind(this)}>Finish</b>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        { minutes === 0 && seconds === 0 
                        ?
                            <Badge size="lg" color="primary">
                                <div>Time out</div>
                            </Badge>
                        :
                            <Badge size="lg" color="primary">
                                <div>Time Remaining</div>
                                <div>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>
                            </Badge>
                        }
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={{ size: 10, offset: 1}}>
                            <Card className="p-0">
                                <Row className="mb-3">
                                    <Col>
                                        {/* <img width="50%" src={questionArray[this.state.present].file}></img> */}
                                        {questionArray[this.state.present].fileType === 'image' &&
                                        <img 
                                            width="50%" 
                                            src={questionArray[this.state.present].file}
                                            alt={questionArray[this.state.present].content}
                                        />}
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        {/* <div>{questionArray[this.state.present].question}</div> */}
                                        {/* <p dangerouslySetInnerHTML={{ __html: questionArray[this.state.present].content}}></p> */}
                                        <div>{questionArray[this.state.present].content}</div>
                                    </Col>
                                </Row>
                                <Row className="p-2">
                                    <Col xs="6" md={{ size: 5, offset: 1 }}>
                                        <Card className={"d-flex bg-danger quiz-no-opacity"} onClick={this.nextQuestion.bind(this)} id="answersA">
                                        {/* <Card className={"d-flex bg-danger " + (answersA ? "quiz-no-opacity" : "quiz-opacity" )} onClick={this.changeAnwser} id="answersA"> */}
                                            {/* <b>A. {questionArray[this.state.present].answers[0].content}</b> */}
                                            <b>A. {questionArray[this.state.present].result[0]}</b>
                                        </Card>
                                    </Col>
                                    <Col xs="6" md="5">
                                        <Card className={"d-flex bg-info quiz-no-opacity"} onClick={this.nextQuestion.bind(this)} id="answersB">
                                        {/* <Card className={"d-flex bg-info " + (answersB ? "quiz-no-opacity" : "quiz-opacity" )} onClick={this.changeAnwser} id="answersB"> */}
                                            {/* <b>B. {questionArray[this.state.present].answers[1].content}</b> */}
                                            <b>B. {questionArray[this.state.present].result[1]}</b>
                                        </Card>
                                    </Col>
                                    <Col xs="6" md={{ size: 5, offset: 1 }}>
                                        <Card className={"d-flex bg-warning quiz-no-opacity"} onClick={this.nextQuestion.bind(this)} id="answersC">
                                        {/* <Card className={"d-flex bg-warning " + (answersC ? "quiz-no-opacity" : "quiz-opacity" )} onClick={this.changeAnwser} id="answersC"> */}
                                            {/* <b>C. {questionArray[this.state.present].answers[2].content}</b> */}
                                            <b>C. {questionArray[this.state.present].result[2]}</b>
                                        </Card>
                                    </Col>
                                    <Col xs="6" md="5">
                                        <Card className={"d-flex bg-success quiz-no-opacity"} onClick={this.nextQuestion.bind(this)} id="answersD">
                                        {/* <Card className={"d-flex bg-success " + (answersD ? "quiz-no-opacity" : "quiz-opacity" )} onClick={this.changeAnwser} id="answersD"> */}
                                            {/* <b>D. {questionArray[this.state.present].answers[3].content}</b> */}
                                            <b>D. {questionArray[this.state.present].result[3]}</b>
                                        </Card>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                    {/* <Row>
                        <Col lg={{ size: 10, offset: 1 }}>
                            <Button className="mr-1" color="success" onClick={this.nextQuestion.bind(this)}>Next</Button>
                        </Col>
                    </Row> */}
                    <Modal isOpen={this.state.modal}>
                        <ModalBody className="d-flex justify-content-center">
                            {(!this.state.chooseSendAnswers) 
                                ?
                                    <b>Click "Yes" to show number of question which you pass</b>
                                :
                                    <b>You passed {this.state.score ? this.state.score : '...'} question</b>
                            }
                        </ModalBody>
                        <ModalFooter className="d-flex justify-content-center" >
                        {!this.state.chooseSendAnswers 
                        ? <Button color="info" onClick={this.toggleYes}>Yes</Button>
                        : <Button color="secondary" onClick={this.toggle}>Exit</Button>}
                        </ModalFooter>
                    </Modal>
                </Container>
            </div>
        );
    }
}

export default EnglishCourse;