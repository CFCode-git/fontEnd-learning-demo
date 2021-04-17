import React from 'react'

class PageB extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if(nextProps.count === this.props.count){
      console.log('更新个屁啊')
      return false
    }else{
      return true
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('child update')
  }

  render(){
    // console.log(this.props)
   return(
    <div>
      child
      <div>
        {this.props.count}
      </div>
    </div>
  )
 }
}
export default PageB
