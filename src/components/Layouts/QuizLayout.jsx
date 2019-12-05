import React, { Component } from 'react';

class QuizLayout extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default QuizLayout;