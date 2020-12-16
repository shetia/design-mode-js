/*
迭代器模式
主要是用于遍历数据, 比如迭代链表, 在数据过大时亦可像流一样, 一点一点的来接收数据
*/
/*
实例
定义生成器, 在生成器中定义迭代器, 并通过迭代器返回
*/
class NameRepository {
  constructor() {
    this.names = ['Robert', 'John', 'Julie', 'Lora']
  }
  getIterator(){
    const names = this.names
    class NameIteratorr{
      constructor(){
        this.index = 0
      }
      hasNext(){
        if (this.index < names.length){
          return true
        }
        return false
      }
      next (){
        if(this.hasNext()){
          return names[this.index++]
        }
        return null
      }
    }
    return new NameIteratorr()
  }
}
// 通过生成器和迭代器的方式, 即可在for循环中直接遍历数据, 如下
console.log('ES5 Iterator')
const nameRepository = new NameRepository()
for(const iter = nameRepository.getIterator(); iter.hasNext();) {
  const name = iter.next()
  console.log('Name: ' + name)
}

// 当然还有ES6的写法, 很类似
class NameRepositoryEs6{
  constructor(){
    this.names = ['Robert', 'John', 'Julie', 'Lora']
    this.index = 0
  }
  [Symbol.iterator](){
    return {
      next: () => {
        let done = true
        if(this.index < this.names.length){
          done = false
        }
        return { value:this.names[this.index++], done}
      }
    }
  }
}
console.log('\nES6 Iterator:')
const nameRepositoryEs6 = new NameRepositoryEs6()
for(const name of nameRepositoryEs6){
  console.log('Name: ' + name)
}


/*
优势

通过迭代器的方式可以更加方便的遍历有规律的数据, 或者是通过迭代器来完成一些流式操作
*/