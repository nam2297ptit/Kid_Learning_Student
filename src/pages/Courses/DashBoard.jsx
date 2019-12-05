import React, { Component } from 'react';
import SubjectList from './SubjectList'
import QuizList from './QuizList'
import {
  Col,
  Row,
} from "reactstrap";
const api = require("./api/api");

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listSubject: [],
      listQuiz: [],
      subjectPage: true,
      subjectName: ''
    }
  }
  componentDidMount(){
    localStorage.removeItem('quizId')
    api.listSubject((err,result) => {
      if(err){
        console.log(err)
      }
      else{
        this.setState({
          listSubject: result
        });
      }
    })
  }
  listQuiz(subjectId,subjectName){
    api.listQuiz(subjectId, (err,result) => {
      if(err){
        console.log(err)
      }
      else{
        this.setState({
          listQuiz: result,
          subjectPage: false,
          subjectName: ' - '+ subjectName,
        });
      }
    })
  }
  returnSubjectList(){
    this.setState({
      subjectPage: true,
      subjectName: ''
    });
  }
  render() {
    return (
      <div>
        <h2><b>{this.state.subjectPage ? "Subject" : `Quiz${this.state.subjectName}`}</b></h2>
        <Row>
          <Col>
            {this.state.subjectPage
            ?
            <SubjectList subjects={this.state.listSubject} selectSubject={this.listQuiz.bind(this)}/>
            :
            <QuizList quizs={this.state.listQuiz} returnSubjectList={this.returnSubjectList.bind(this)}/>
            }
          </Col>
        </Row>
      </div>
    );
  }
}

export default DashBoard;