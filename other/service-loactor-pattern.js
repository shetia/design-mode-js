/*
服务定位器模式
即原来要通过JNDI查询定位服务成本很高， 所以通过一系列手段将服务缓存起来， 让服务更快返回， 这也是缓存服务的一种最佳实践
*/

/*
实例
定义多种服务
*/

class Service1 {
  execute(){
    console.log('Executing Service1')
  }
  getName () {
    return 'Service1'
  }
}
class Service2 {
  execute () {
    console.log('Executing Service2')
  }
  getName () {
    return 'Service2'
  }
}

// 定义查询服务功能
class InitialContext {
  lookup(jndiName){
    switch (jndiName.toUpperCase()) {
      case 'SERVICE1':
        console.log('Looking up and creating new Service1 object')
        return new Service1()
      case 'SERVICE2':
        console.log('Looking up and creating a new Service2 object')
        return new Service2
      default:
        return null
    }
  }
}
// 定义服务缓存
class Cache {
  constructor () {
    this.services = []
  }
  getService (serviceName){
    for(const service of this.services){
      if (service.getName().toUpperCase() === serviceName.toUpperCase()){
        console.log('Returning cached ' + serviceName + ' object')
        return service
      }
    }
    return null
  }
  addService(newService){
    let exists = false
    for(const service of this.services){
      if (service.getName().toUpperCase() === newService.getName().toUpperCase()){
        exists = true
      }
    }
    if (!exists){
      this.services.push(newService)
    }
  }
}

// 定义服务定位器， 其功能在获取服务时， 优先从缓存中获取， 若不存在再查询并加入缓存
class ServiceLocator {
  static getService(jndiName){
    const service = ServiceLocator.cache.getService(jndiName)
    if (service != null){
      return service
    }
    const context = new InitialContext()
    const service1 = context.lookup(jndiName)
    ServiceLocator.cache.addService(service1)
    return service1
  }
}
ServiceLocator.cache = new Cache()

// 通过服务定位器获取服务后执行
let service = ServiceLocator.getService('Service1')
service.execute()
service = ServiceLocator.getService('Service2')
service.execute()
service = ServiceLocator.getService('Service1')
service.execute()
service = ServiceLocator.getService('Service2')
service.execute()

/*
Looking up and creating new Service1 object
Executing Service1
Looking up and creating a new Service2 object
Executing Service2
Returning cached Service1 object
Executing Service1
Returning cached Service2 object
Executing Service2
*/

/*
优势
缓存服务和数据的最佳实践
*/