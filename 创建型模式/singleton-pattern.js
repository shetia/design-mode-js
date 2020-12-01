/*
单例模式
简单来说就是一个实例只生产一次

*/

class SingleObject {
  constructor(){
    // 防止调用new 初始化
    if(new.target != undefined){
      const errorMsg = `This is single Object, Can't use keyword new`
      const tipMsg = `Yow should use method getTnstance to get instance`
      throw new Error (`\n${errorMsg}\n${tipMsg}`)
    }
  }
  static getInstance(){
    // 生产单例
    if(SingleObject.instance){
      return SingleObject.instance
    }
    SingleObject.instance = {}
    SingleObject.instance.__proto__ = SingleObject.prototype
    return SingleObject.instance
  }
  showMessage(){
    console.log('Hello world!')
  }
}
const instance = SingleObject.getInstance()
console.log(instance.showMessage())

/*
单例模式的优势
对于频繁使用且可重复使用的对象，可以极大来减少内存消耗和没必要的垃圾回收。
*/