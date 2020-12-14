/*
解释器模式

提供了对语言或语法的一些判断方式

*/
/*
实例

定义对语法的断言
*/
class TerminalExpression{
  constructor(props) {
    this.data = props
  }
  interpret(context){
    if(context.indexOf(this.data) > -1){
      return true
    }
    return false
  }
}

// 添加断言的操作符
// 添加表达式判断符
class OrExpression {
  constructor(expr1, expr2){
    this.expr1 = expr1
    this.expr2 = expr2
  }
  interpret(context){
    return this.expr1.interpret(context) || this.expr2.interpret(context)
  }
}

class AndExpression {
  constructor(expr1, expr2){
    this.expr1 = expr1
    this.expr2 = expr2
  }
  interpret (context){
    return this.expr1.interpret(context) && this.expr2.interpret(context)
  }
}

// 组合断言模式操作符
// 获取对应表达式
function getMaleExpression (){
  const robert = new TerminalExpression('Robert')
  const john = new TerminalExpression('John')
  return new OrExpression(robert, john)
}

function getMarriedWomanExpression(){
  const julie = new TerminalExpression('Julie')
  const married = new TerminalExpression('Married')
  return new AndExpression(julie, married)
}

// 实现断言的判断
// 判断语句断言
const isMale = getMaleExpression()
const isMarriedWoman = getMarriedWomanExpression()

console.log('John is male?' + isMale.interpret('John'))
console.log('Julie is a married women? ' + isMarriedWoman.interpret('Married Julie'))
/*
优势
通过单一断言判断来组合出一些断言的提升, 比如在解析二进制表达式断言的判断, 只需要区分是否存在左表达式或右表达式, 而不需要关心左表达式中是否还有左右表达式或 右表达式中是否还有左右表达式, 最后通过组合提升的方式, 来解析整个二进制表达式
*/