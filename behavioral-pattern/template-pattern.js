/*
模板模式

当一个类型公开了他的执行方式, 其他类型只需按需实现的时候可以使用这个模式

*/
/*
实例
实现游戏的基类, 同时他的执行方式play不允许被子类修改
*/
class Game {
  constructor(){
    if (this.play != Game.prototype.play){
      throw new Error(`play mothed is final, can't be modify! `)
    }
  }
  initialize(){}
  startPlay(){}
  endPlay(){}
  play(){
    // 初始化游戏
    this.initialize()
    // 开始游戏
    this.startPlay()
    // 结束游戏
    this.endPlay()
  }
}
// 子类只需要通过基类流程中的方法即可
class Cricket extends Game {
  endPlay () {
    console.log(`Cricket Game Finished!`)
  }
  initialize(){
    console.log(`Cricket Game Initialized! Start playing`)
  }
  startPlay(){
    console.log(`Cricket Game Started. Enjoy the game!`)
  }
}
class Football extends Game {
  endPlay(){
    console.log('Football Game Finished!')
  }
  initialize(){
    console.log(`Football Game Initalied! Start playing.`)
  }
  startPlay(){
    console.log(`Football Game Started. Enjoy the game!`)
  }
}
// 最终都是通过play进行运行
let game = new Cricket()
game.play()
console.log('')
game = new Football()
game.play()

/*
Cricket Game Initialized! Start playing
Cricket Game Started. Enjoy the game!
Cricket Game Finished!

Football Game Initalied! Start playing.
Football Game Started. Enjoy the game!
Football Game Finished!
*/


/*
优势
只需关注自己功能的实现, 而不需要着眼这个流程
*/
