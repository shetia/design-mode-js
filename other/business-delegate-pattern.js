/*
业务代表模式
也是一种分层模型, 分为业务服务层, 服务查询层, 业务代表层, 客户层

*/
/*
实例
假设我们有以下业务服务层

*/
class EJBService{
  doProcessing(){
    console.log('Processing task by invoking EJB Service')
  }
}
class JMSService{
  doProcessing(){
    console.log('Processing task by invoking JMS Service')
  }
}

// 服务查询层能对服务进行查找
class BusinessLookUp{
  getBusinessService(serviceType){
    switch(serviceType.toUpperCase()){
      case 'EJB':
        return new EJBService()
      default:
        return new JMSService()
    }
  }
}

// 定义业务代表
class BusinessDelegate {
  constructor(){
    this.lookupService = new BusinessLookUp()
  }
  setServiceType(serviceType){
    this.serviceType = serviceType
  }
  doTask () {
    this.businessService = this.lookupService.getBusinessService(this.serviceType)
    this.businessService.doProcessing()
  }
}

// 定义客户端
class Client {
  constructor(businessService){
    this.businessService = businessService
  }
  doTask(){
    this.businessService.doTask()
  }
}
// 使用业务代表和客户端交互
const businessDelegate = new BusinessDelegate()
businessDelegate.setServiceType('EJB')

const client = new Client(businessDelegate)
client.doTask()

businessDelegate.setServiceType('JMS')
client.doTask()


/*
Processing task by invoking EJ8 Service
Processing task by invoking JMS Service
*/

/*
优势
统一了业务出口, 客户端不需要关心底层的模型, 只需要关心业务代表暴露的模型
*/