
import React, { Component } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {
  Card,
} from "reactstrap";
import './course.css'

class SubjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        focusOnSelect: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 100
      }
    }

  }
  selectSubject(subjectId,subjectName){
    this.props.selectSubject(subjectId,subjectName)
  }
  render() {
    return (
      <>
        <Slider {...this.state.params}>
          { this.props.subjects.map( (subject,index) => 
            <Card key={index} className="bg-transparent">
              <div className="subject_card m-auto" onClick={this.selectSubject.bind(this,subject.id,subject.name)}>
                  <div className="text-white">
                      <h3 className="mb-1"><b>{subject.name}</b></h3>
                  </div>
                  <img 
                      src={subject.image ? subject.image : require('../../assets/img/placeholder.png')}
                      className="m-auto"
                      title={subject.description}
                      alt={subject.description}
                  />
              </div>
            </Card>
          )}
        </Slider>
      </>
    );
  }
}
export default SubjectList;