import React, {Component} from 'react'


class Content extends Component{
    shouldComponentUpdate(nextProps){
        return nextProps.location.pathname !== this.props.location.pathname
    }
    render(){
        console.log(this.props.location.pathname)
        return (
            <div className="content">
                {this.props.children}
            </div>
        )
    }
}

export default Content