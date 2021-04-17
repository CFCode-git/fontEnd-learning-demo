import React from 'react'
import PageB from '../PageB'

class PageA extends React.Component {
  constructor(props) {
    super(props)
    console.log('constructor')
    this.state = {
      count: 0,
      num:0
    }
    this.myRef = React.createRef()
  }

  // static getDerivedStateFromProps(){
  //   console.log(1,'render 前调用')
  // }

  // 可以拿到旧的 DOM
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('在最近一次渲染输出前调用')
    const node = this.myRef.current
    console.log(node,111)
    return 12
  }

  // 拿到最新的 DOM
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('did update')
    const node = this.myRef.current
    console.log(node,222)
    console.log(snapshot)
  }

  componentDidMount() {
    console.log('did mount')
  }

  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   console.log('should update')
  //   console.log(nextProps)
  //   console.log(nextState)
  //   console.log(nextContext)
  //   console.log(this.state.count)
  //   return nextState.count < 10;
  //
  // }

  // componentWillUnmount() {
  //   console.log('will unmount')
  // }

  add = () => {
    this.setState((state) => ({...state,num: state.num + 1}))
  }

  render() {
    console.log('render')
    // console.log('props',this.props)
    return (
      <div ref={this.myRef}>
        {this.state.num}
        <button onClick={() => this.add()}>+</button>
        <PageB count={this.state.count}/>
      </div>
    )
  }
}

export default PageA
