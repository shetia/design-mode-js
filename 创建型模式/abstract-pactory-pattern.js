/*
抽象工厂模式

简单来说就是工厂的工厂, 一般来说一个工厂只负责加载一类组件, 那么你有很多小类组件需要生产,
那么势必会有很多小类的工厂, 那么你最终生产一个大类, 那就要很多小类的工厂负责生产,
那么如何更方便的管理或者说生产这些工厂呢, 那就用生产工厂的工厂来生成
*/

// 先把形状工厂搬过来
const ShapeFactory = require('./factory-pattern')

// 现在我们再写个颜色工厂
class Blue {
  fill(){
    console.log('蓝色')
  }
}
class Green {
  fill(){
    console.log('绿色')
  }
}
class Red {
  fill(){
    console.log('红色')
  }
}
// 颜色工厂
class ColorFactory{
  getColor(color){
    switch(color){
      case 'RED':
        return new Red()
      case 'GREEN':
        return new Green()
      case 'BLUE':
        return new Blue()
      default:
        return null
    }
  }
}

// 抽象工厂

class FactoryProducer{
  static getFactory(choice){
    switch(choice){
      case 'SHAPE':
        return new ShapeFactory()
      case 'COLOR':
        return new ColorFactory()
      default:
        return null
    }
  }
}

/****
 *
 */

//通过抽象工厂拿形状工厂
const shapeFactory = FactoryProducer.getFactory('SHAPE')
const square = shapeFactory.getShape('SQUARE')
square.draw()

// 通过抽象工厂拿颜色工厂
const colorFactory = FactoryProducer.getFactory('COLOR')
const red = colorFactory.getColor('RED')
red.fill()