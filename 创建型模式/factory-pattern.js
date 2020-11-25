/*
工厂模式
当你需要什么东西, 不直接使用new的方法生成实例, 然后统一通过工厂进行生产加工再生成实例
*/

/*
比如现在我们有很多形状, 矩形,正方形...
*/
class Circle{
  draw(){
    console.log('我是圆形')
  }
}
class Rectangle {
  draw(){
    console.log('我是矩形')
  }
}
class Square{
  draw(){
    console.log('我是正方形')
  }
}
/*
接下来, 我们可以建立一个专门生产形状的工厂来生产他们了
*/
class ShapeFactory{
  getShape(type){
    switch(type){
      case 'CIRCLE':
        return new Circle()
      case 'RECTANGLE':
        return new Rectangle()
      case 'SQUARE':
        return new Square()
      default:
        return null
    }
  }
}

/*
那么在我们需要的时候, 就可以直接只需new 出一个工厂, 再根据字符串就能拿到对应的需要生产的类了
而不需要分别对类就行new
*/
const shapeFactory = new ShapeFactory()
// 通过工厂拿各种形状
const circle = shapeFactory.getShape('CIRCLE')
const rectangle = shapeFactory.getShape('RECTANGLE')
const square = shapeFactory.getShape('SQUARE')
circle.draw()
rectangle.draw()
square.draw()

/*
优势:
实例的生产比较复杂或生成实例还需要额外加工, 这时候工厂给了我们一个统一的出入口
也方便日后对这个实例的修改, 比如你要修改工厂的产出是一个单例的时候, 就不需要在所有的类中修改
而只要在工厂出入口修改即可
*/