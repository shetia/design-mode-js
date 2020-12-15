/*
中介模式
通过一个中间人来完成不同类的交互
*/
/*
实例
在租客和房东之间, 中介者只需要负责进行租客或房东的交易, 或者在交易中收取回扣, 那么我们可以完全不用管租客或房东类的方法如何变化
*/
class Middleman {
  constructor(tenant, landlord){
    this.tenant = tenant // 租客
    this.landlord = landlord // 房东
  }
  sendLandlord(money){ // 给房东
    this.tenant.money -= money
    this.landlord.money += money
    console.log(`Now: ${this.tenant.name} has $${this.tenant.money}, ${this.landlord.name} have $${this.landlord.money}`)
  }
  sendTenant(money){ // 给租客
    this.landlord.money -= money
    this.tenant.money += money
    console.log(`Now: ${this.tenant.name} have $${this.tenant.money}, ${this.landlord.name} have $${this.landlord.money}`)
  }
}

/*
比如原来有租客和房东, 假设如果要在租客类中的方法来给房东的钱
那么必然要直接涉及房东类的方法互相调用, 那么这两个类就是耦合在一起
那么如果中介者模式, 可以通过中介者来进行缴纳, 而不需要在租客的方法中操作的类
保证了两个类不会进行耦合
*/

// 租客
class Tenant {
  constructor(name, money){
    this.name = name
    this.money = money
    console.log(`${name} have $${money}`)
  }
  payDeposit(money, middleman){ // 给押金
    console.log(`${this.name} pay $${money} deposit`)
    middleman.sendLandlord(money)
  }
  payRent (money, middleman){ // 给租金
    console.log(`${this.name} pay $${money} for rent`)
    middleman.sendLandlord(money)
  }
}
// 房东
class Landord{
  constructor(name, money){
    this.name = name
    this.money = money
    console.log(`${name} have $${money}`)
  }
  refundDeposit(money, middleman){ // 退还押金
    console.log(`${this.name} refund $${money} deposit`)
    middleman.sendTenant(money)
  }
}

// 我们调用的时候也更加直观
const tenant = new Tenant('Jack', 1000)
const landlord = new Landord('Zero', 0)
const middleman = new Middleman(tenant, landlord)
tenant.payDeposit(300, middleman)
tenant.payRent(100, middleman)
tenant.payRent(100, middleman)
tenant.payRent(100, middleman)
landlord.refundDeposit(200, middleman)


/*
优势

通过中介者模式, 可以不需要管 需要交互的类如何变化
只需要通过中介者特定的接口访问
在两种不同模型的类来交互是,能起到解耦作用
*/

