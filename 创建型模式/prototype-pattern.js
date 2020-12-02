/*
原型模式

原型模式是一种创建对象的方式

首先, 我们需要实现一个类
这个类可以通过clone的方式实现原型的创建对象
那么这个clone实际是 就是实现了js中的new的功能
因为js对象的创建本来就是通过原型的方式实现而不是完全重新开辟空间
所以我们讲原型模式可以直接模拟js类创建的方式即可
*/
class Shape{
  constructor(){
    this.id = null
    this.type = null
  }
  getType () {
    return this.type
  }
  getId () {
    return this.id
  }
  setId (id){
    this.id = id
  }
  clone (){
    /*
    如果子类要改成class形式, 这个方法要改写成下面形式
    因为主要是通过js原型链帮助理解原型模式, 所以子类不使用class形式
    class 和 function 构造函数的区别是class的构造函数增加了只能作为构造函数使用的校验, 比如new
    return Reflect.construct(
      this.__proto__.constructor,
      [],
      this.__proto__.constructor
    )
    */
    let clone = {}
    // 注意如果此类被继承, this会变成子类的方法
    // 同时这里使用的是原型的指针, 所以比直接创建对象性能损耗更低
    clone.__proto__ = this.__proto__
    this.__proto__.constructor.call(clone)
    return clone
  }
}

/*
对于子类, 原型链要实现继承是需要通过不断的追溯proto之上的对象作为继承的类
而prototype实例化之后会赋引用值到proto, 所以要实现继承则是绑定prototype.proto作为追溯所得的结果之一
*/

function Rectangle(){
  this.type = 'Rectangle'
}
Rectangle.prototype.__proto__ = new Shape()
Rectangle.prototype.draw = function () {
  console.log('我是 rectangle')
}

function Square () {
  this.type = 'Square'
}
Square.prototype.__proto__ = new Shape()
Square.prototype.draw = function () {
  console.log('我是Square')
}

function Circle () {
  this.type = 'Circle'
}
Circle.prototype.__proto__ = new Shape()
Circle.prototype.draw = function () {
  console.log('我是Circle')
}

/*
在当前例子中, 我们通过载入形状的cache的方式,
再从cache中调用clone方法来实现原型创建的例子
*/
class ShapeCache{
  static getShape(shapeId){
    const cachedShape = ShapeCache.shapeMap.get(shapeId)
    return cachedShape.clone()
  }
  static loadCache () {
    const circle = new Circle()
    circle.setId('1')
    ShapeCache.shapeMap.set(circle.getId(), circle)

    const square = new Square()
    square.setId('2')
    ShapeCache.shapeMap.set(square.getId(), square)

    const rectangle = new Rectangle()
    rectangle.setId('3')
    ShapeCache.shapeMap.set(rectangle.getId(), rectangle)
  }
}
ShapeCache.shapeMap = new Map()
ShapeCache.loadCache()

const cloneShape = ShapeCache.getShape('1')
console.log('Shape: ' + cloneShape.getType())
cloneShape.draw()

const cloneShape1 = ShapeCache.getShape('1')
console.log('Shape: ' + cloneShape1.getType())
cloneShape1.draw()
console.log(cloneShape == cloneShape1)


/*
原型模式的优势

在其他编程中使用原型模式的优势是使用更小的代价来创建对象,
通过原型引用的方式而不是开辟新的空间
但js是个例外, 直接new就好了,
因为js创建对象的方式就是原型引用
所以对比其他语言创建大对象的性能, 能高出不少

*/