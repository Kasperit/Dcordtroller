import React, {Component} from 'react'


class Content extends Component{
    shouldComponentUpdate(nextProps){
        return nextProps.location.pathname !== this.props.location.pathname
    }
    render(){
        return (
            <div className="content">
                <h2>{this.props.title}</h2>
                {this.props.children}
            </div>
        )
    }
}

export default Content