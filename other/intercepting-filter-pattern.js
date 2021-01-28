/*
拦截过滤器模式
在执行目标操作之前的一些检查和拦截
*/

/*
实例
首先实现两个拦截器, 一个用于鉴权, 一个用于记录日志
*/
class AuthenticationFilter{
  execute(request){
    console.log('Authenticating request: ' + request)
  }
}

class DebugFilter{
  execute(request){
    console.log('request log: ' + 'request')
  }
}

/*
定义我们目标执行方法
*/
class Target {
  execute(request){
    console.log('Executing request: ' + request)
  }
}

// 定义拦截器的链
class FilterChain{
  constructor(){
    this.filters = []
  }
  addFilter(filter){
    this.filters.push(filter)
  }
  execute(request){
    for(let filter of this.filters){
      filter.execute(request)
    }
    this.target.execute(request)
  }
  setTarget(target){
    this.target = target
  }
}

// 添加拦截器的管理器
class FilterManager {
  constructor(target){
    this.filterChain = new FilterChain()
    this.filterChain.setTarget(target)
  }
  setFilter(filter){
    this.filterChain.addFilter(filter)
  }
  filterRequest(request){
    this.filterChain.execute(request)
  }
}

// 定义请求的客户端
class Client{
  setFilterManager(filterManager){
    this.filterManager = filterManager
  }
  sendRequest(request){
    this.filterManager.filterRequest(request)
  }
}
// 通过给拦截管理增加目标函数和过滤器后使用客户端请求
const filterManager = new FilterManager(new Target())
filterManager.setFilter(new AuthenticationFilter())
filterManager.setFilter(new DebugFilter())

const client = new Client()
client.setFilterManager(filterManager)
client.sendRequest('HOME')

/*
Authenticating request: HOME
request log: request
Executing request: HOME
*/

/*
优势
首先要完成一个拦截器只需要关心需要实现的接口, 只需要关心和其他拦截器的先后关系, 这也算是对拦截器和拦截器之间的解耦
其次, 在执行目标函数的拦截器页不需要关心目标操作的结果和关系
*/