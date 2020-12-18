/*
状态模式
即类的行为根据状态的改变而改变
*/

/*
实例
距离定义了两种状态, 开始状态和结束状态

*/
class StartState{
  doAction(context){
    console.log('Player is in start state')
    context.setState(this)
  }
  toString(){
    return "Start State"
  }
}
class StopState{
  doAction(context){
    console.log("Player is in stop state")
    context.setState(this)
  }
  toString(){
    return 'Stop State'
  }
}
// 定义根据状态, 而发生改变的上下文类型
class Context{
  constructor(){
    this.state = null
  }
  setState (state){
    this.state = state
  }
  getState(){
    return this.state.toString()
  }
}
/*
那么在使用的时候, 当Context的状态发生改变, 那么Context获取状态的行为也发生了改变

*/
const context = new Context()

const startState = new StartState()
startState.doAction(context)
console.log(context.getState())

const stopState = new StopState()
stopState.doAction(context)
console.log(context.getState())

/*
优势

适合一些需要根据状态而改变的类, 或通过此来消除一些if...else 语句
*/