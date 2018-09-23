import React, {Component} from 'react'


class Content extends Component{
    shouldComponentUpdate(nextProps){
        return nextProps.location.pathname !== this.props.location.pathname
    }
    render(){
        return (
            <div className="content">
                <h1>{this.props.title}</h1>
                {this.props.children}
            </div>
        )
    }
}

export default Content