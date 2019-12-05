
import React, { Component } from 'react';
import {
  Button,
  Card,
  Col,
  Row,
  Modal, ModalBody, ModalFooter,
} from "reactstrap";

class QuizList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listQuiz: [],
      modal: false,
      quizId: '',
      quizName: '',
      quizQuestionNum: 0,
    }
    this.toggleSet = this.toggleSet.bind(this)
    this.toggleClear = this.toggleClear.bind(this)
  }
  returnSubjectList(){
    this.props.returnSubjectList()
  }
  toggleClear() {
    this.setState({
      modal: !this.state.modal,
      quizId: '',
      quizName: '',
      quizQuestionNum: 0
    });
  }
  toggleSet(quizId, quizName, quizQuestionNum) {
    this.setState({
      modal: !this.state.modal,
      quizId: quizId,
      quizName: quizName,
      quizQuestionNum: quizQuestionNum
    });
  }
  selectQuiz(quizId){
    localStorage.setItem('quizId',quizId)
    window.location.replace('/courses')
  }
  render() {
    return (
      <>
        <div>
          <Row>
            <Col md={{size: 6, offset: 3}}>
              <Card className="quiz_card p-5">
                { this.props.quizs.map( (quiz, index) => 
                    <Card 
                      key={index} 
                      onClick={this.toggleSet.bind(this,quiz.id,quiz.name,quiz.questionNumber)}
                      className="quiz_child"
                      title={quiz.name}
                    >
                      <div className="text-dark">
                        <b>{quiz.name.length > 30 ? `${quiz.name.slice(0,30)}...` : quiz.name}</b>
                      </div>
                      <div className="text-dark">
                        <div>{`Number of question: ${quiz.questionNumber}`}</div>
                        <div>{`Time test: ${quiz.timeTest}`}</div>
                      </div>
                    </Card>
                )}
              </Card>
            </Col>
          </Row>
          <Modal isOpen={this.state.modal}>
            <ModalBody>
                {
                  this.state.quizQuestionNum > 0
                  ?
                  <>
                    <div><b>Bạn có chắc chắn muốn bắt đầu bài thi {this.state.quizName}?</b></div>
                    <div>Không thể tạm dừng hoặc hủy bỏ bài thi cho đến khi nộp bài hoặc thời gian kết thúc.</div>
                    <div>Thời gian sẽ bắt đầu tính ngay khi xác nhận.</div>  
                  </>
                  :
                  <div>Quiz chưa có câu hỏi nào, không thể thực hiện.</div>
                }
            </ModalBody>
            <ModalFooter className="align-items-center  justify-content-center">
            <Button color="secondary" onClick={this.toggleClear}>Cancel</Button>
            {this.state.quizQuestionNum > 0 && 
              <Button color="info" className="ml-4" onClick={this.selectQuiz.bind(this,this.state.quizId,this.state.quizQuestionNum)}>
                Confirm
              </Button>
            }
            </ModalFooter>
          </Modal>
          <Button onClick={this.returnSubjectList.bind(this)}>Back Subject List</Button>
        </div>
      </>
    );
  }
}
export default QuizList;