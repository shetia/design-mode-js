/*
装饰器模式
装饰器模式实现了不改变原有对象, 在原有对象上实现功能的添加, 这是一种对原有对象的一种包装
*/

/*
实例
假设现在有两个形状, 一个矩形一个圆形, 这时候我们希望能在形状上实现一些特殊的功能, 但又不能改变原来的类, 要如何做呢
*/
class Rectangle{
  draw(){
    console.log("矩形")
  }
}
class Circle {
  draw () {
    console.log('圆形')
  }
}
// 这时 我们可以用装饰器来实现, 假设我们要给形状添加颜色功能
class RedShapeDecorator {
  constructor(decoratedShape){
    this.decoratedShape = decoratedShape
  }
  draw(){
    this.decoratedShape.draw()
    this.setRedBorder()
  }
  setRedBorder(){
    console.log('边框颜色: 红色')
  }
}
// 那么在使用装饰器的类, 在圆圈的时候就实现了画边框的颜色

const circle = new Circle()
const redCircle = new RedShapeDecorator(new Circle)
const redRectangle = new RedShapeDecorator(new Rectangle())

console.log('正常圆边框')
circle.draw()

console.log('红边框的圆')
redCircle.draw()

console.log('红边框的矩形')
redRectangle.draw()

/*
优势
即使原有对象发生改变, 装饰器是种非侵入式功能添加, 对原有对象的影响也能降低到最小
同时在js中更方便的装饰器的实例也在提案中
*/