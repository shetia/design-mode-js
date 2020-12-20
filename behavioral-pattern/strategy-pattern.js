/*
策略模式
策略模式, 状态模式的一种升级或衍生版本, 策略模式更倾向于运算或策略, 而状态模式更倾向于状态
*/

/*
实例
首先定义几种不同的策略
*/
class OperationAdd{
  doOperation(num1, num2){
    return num1 + num2
  }
}
class OperationMultiply{
  doOperation(num1, num2){
    return num1 * num2
  }
}
class OperationSubsract{
  doOperation(num1, num2){
    return num1 - num2
  }
}

// 最后定义根据策略变更行为的上下文
class Context {
  constructor(strategy){
    this.strategy = strategy
  }
  executeStrategy(num1, num2){
    return this.strategy.doOperation(num1, num2)
  }
}

// 那么根据策略的不同改变了上下文执行的行为
let context = new Context(new OperationAdd())
console.log('10 + 5 = ' + context.executeStrategy(10, 5))

context = new Context(new OperationSubsract())
console.log('10 - 5 = ' + context.executeStrategy(10, 5))

context = new Context(new OperationMultiply())
console.log('10 * 5 = ' + context.executeStrategy(10, 5))
/*
10 + 5 = 15
10 - 5 = 5
10 * 5 = 50
 */

 /*
 优势
 策略和策略之间实现解耦, 和状态模式类似可以通过此来消除一些if...else语句
 */