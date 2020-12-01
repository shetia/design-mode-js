/*
建造者模式

让简单的对象通过组合的方式构造成多种复杂对象

这里举例西式快餐
里面有非常多得套餐种类
但是各种套餐都是由不同种类的冷饮和汉堡组合而成
同时冷饮需要瓶子装, 汉堡需要纸盒包住, 那么我们可以先定义冷饮和汉堡类和它们所需要的瓶子和纸盒
*/
// 纸盒
class Wrapper {
  pack(){
    return '纸盒'
  }
}
// 瓶子
class Bottle {
  pack(){
    return '瓶子'
  }
}
// 汉堡需要纸盒包住
class Burger {
  packing(){
    return new Wrapper()
  }
}
//冷饮需要瓶子装
class ColdDrink{
  packing(){
    return new Bottle()
  }
}

/*
那么我们肯定不止一种冷饮和一种汉堡,
比如汉堡有蔬菜汉堡和鸡肉汉堡
冷饮有可口和百事
那么我们需要不同的类型和对应的价格
*/
// 蔬菜汉堡
class VegBurger extends Burger {
  price(){
    return 25.0
  }
  name () {
    return '蔬菜汉堡'
  }
}
//鸡肉汉堡
class ChickenBurger extends Burger{
  price(){
    return 50
  }
  name () {
    return "鸡肉汉堡"
  }
}
// 可口
class Coke extends ColdDrink{
  price(){
    return 30
  }
  name (){
    return '可口可乐'
  }
}
// 百事可乐
class Pepsi extends ColdDrink{
  price () {
    return 35
  }
  name () {
    return '百事可乐'
  }
}

/*
那一个套餐肯定是有多个不同冷饮和汉堡,
那么我们需要用一个数组作为储存不同冷饮和汉堡的条目
以下套餐就和容易打造好了

*/

class Meal {
  constructor(){
    const items = []
    this.itemsName = 'items'
    /*
      为什么不同Proxy而使用defineProperty
      因为Proxy虽然实现和defineProperty类似的功能
      但是在这个场景下, 语义是定义属性, 而不是需要代理
    */
   Reflect.defineProperty(this, 'items', {
     get: () => {
       if (this.__proto__ != Meal.prototype){
         throw new Error('items is private!')
       }
       return items
     }
   })
  }
  addItem(item){
    this[this.itemsName].push(item)
  }
  getCost () {
    let cost = 0
    for(let item of this[this.itemsName]){
      cost += item.price()
    }
    return cost
  }
  showItems (){
    for(let item of this[this.itemsName]){
      let name = 'Item: ' + item.name()
      let pack = 'Packing: ' + item.packing().pack()
      let price = 'Price: ' + item.price()
      console.log(`${name},${pack},${price}`)
    }
  }
}
/*
最后, 我们只要对外提供多个套餐就好了, 这个叫它套餐建造者好了
*/
class MealBuilder{
  prepareVegMeal(){
    let meal = new Meal()
    meal.addItem(new VegBurger())
    meal.addItem(new Coke())
    return meal
  }
  prepareNonVegMeal(){
    let meal = new Meal()
    meal.addItem(new ChickenBurger())
    meal.addItem(new Pepsi())
    return meal
  }
}
/*
最后, 我们只需用套餐建造者, 给我们做出相应的套餐
*/
const mealBuilder = new MealBuilder()
let vegMeal = mealBuilder.prepareVegMeal()
console.log('蔬菜套餐-----')
vegMeal.showItems()
console.log('价格:' + vegMeal.getCost())

let nonVegMeal = mealBuilder.prepareNonVegMeal()
console.log('鸡肉套餐--------')
nonVegMeal.showItems()
console.log('价格:' + nonVegMeal.getCost())

/*

建造者模式的优势
这是一种创建复杂对象的最佳实践。
尤其是复杂对象多变的情况下，通过基础组件来组合，
在基础组件变更时，多种依赖于基础组件的复杂组件也能方便变更，而不需要更改多种不同的复杂组件。
*/