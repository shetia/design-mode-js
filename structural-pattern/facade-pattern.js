/*
外观模式

对外提供单一的接口, 来隐藏系统的复杂性
*/

/*
实例
比如目前有几种形状类型, 假设这几个形状设计的特别复杂, 这时候你肯定不愿意修改这些接口然后来提供新的接口
*/
class Rectangle {
  draw(){
    console.log('矩形')
  }
}
class Square {
  draw () {
    console.log('正方形')
  }
}
class Circle {
  draw(){
    console.log('圆形')
  }
}

// 那么可以用外观模式来隐藏这些复杂的接口调用, 对外暴露更加单一的接口调用方式

class ShapeMaker {
  constructor(){
    this.circle = new Circle()
    this.rectangle = new Rectangle()
    this.square = new Square()
  }
  drawCircle () {
    this.circle.draw()
  }
  drawRectangle () {
    this.rectangle.draw()
  }
  drawSquare () {
    this.square.draw()
  }
}

// 那么我们使用的时候就更不需要考虑里面的复杂的接口, 而直接使用外观模式暴露的接口就好了
const shapeMaker = new ShapeMaker()

shapeMaker.drawCircle()
shapeMaker.drawSquare()
shapeMaker.drawRectangle()

/*
优势

隐藏内部的复杂性, 这样能减少一些对内部修改的可能, 同时对外暴露单一功能接口, 也有利与降低复杂性
*/