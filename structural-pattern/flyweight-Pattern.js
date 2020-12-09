/*
享元模式
利用Map或其他方式减少重复创建类型的实例对象
*/

/*
实例
现在有一个圆, 但是我们需要不同颜色的圆来使用
*/
class Circle {
  constructor(color){
    this.color = color
  }
  setX(x){
    this.x = x
  }
  setY(y){
    this.y = y
  }
  setRadius (radius){
    this.radius = radius
  }
  draw (){
    console.log(`Circle: Draw()[Color: ${this.color}, x: ${this.x}, y: ${this.y}, radius: ${this.radius}]`)
  }
}

/*
那么我们可以使用一个形状工厂, 在生产的时候使用Map将相同的颜色缓存起来, 需要在用的时候还可以在使用
*/
class ShapeFactory{
  static getCircle (color){
    let circle = ShapeFactory.circleMap.get(color)
    if (circle == null){
      circle = new Circle(color)
      ShapeFactory.circleMap.set(color, circle)
      console.log('Creating circle of color: ' + color)
    }
    return circle
  }
}
ShapeFactory.circleMap = new Map()
// 那么即使创建很多不同种类的圆, 但真正创建的实例只有圆种类的数量
const colors = ['Red', 'Green', 'Blue', 'White', 'Black']
for(let i = 0; i < 20; i++){
  const circle = ShapeFactory.getCircle(colors[Math.floor(Math.random() * colors.length)])
  circle.setX(Math.floor(Math.random() * 100))
  circle.setY(Math.floor(Math.random() * 100))
  circle.setRadius(100)
  circle.draw()
}

/*
优势
在需要大量重复相同实例的时候, 可以使用这种方式来降低极大的内存开销
*/