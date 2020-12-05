/*
过滤器模式

通过多个单一的功能筛选出一个复杂的筛选功能

首先定义一个对象, 我们后续可以通过名字name, 性别gender, 婚姻状况maritalStatus
*/
// 定义对象
class Person {
  constructor (name, gender, maritalStatus) {
    this.name = name
    this.gender = gender
    this.maritalStatus = maritalStatus
  }
  getName () {
    return this.name
  }
  getGender () {
    return this.gender
  }
  getMaritalStatus () {
    return this.maritalStatus
  }
}
// 定义一些单一功能的筛选条件, 比如 判断是男, 是女, 是不是单身
// 添加筛选条件
class CriteriaMale{
  meetCriteria(persons){
    const malePersons = []
    for(const person of persons){
      if (person.getGender().toUpperCase() === 'MALE'){
        malePersons.push(person)
      }
    }
    return malePersons
  }
}
class CriteriaFemale {
  meetCriteria(persons){
    const famalePersons = []
    for(const person of persons){
      if (person.getGender().toUpperCase() == 'FEMALE'){
        famalePersons.push(person)
      }
    }
    return famalePersons
  }
}

class CriteriaSigle {
  meetCriteria (persons){
    const singlePersons = []
    for(const person of persons){
      if (person.getMaritalStatus().toUpperCase() == 'SINGLE'){
        singlePersons.push(person)
      }
    }
    return singlePersons
  }
}

/*
将单一功能增加对应的操作符, 使单一功能筛选条件能通过组合来实现复杂的筛选
*/
// 添加筛选操作符
class AndCriteria {
  constructor(criteria, otherCriteria){
    this.criteria = criteria
    this.otherCriteria = otherCriteria
  }
  meetCriteria(persons){
    const firstCriteriaPersons = this.criteria.meetCriteria(persons)
    return this.otherCriteria.meetCriteria(firstCriteriaPersons)
  }
}
class OrCriterial {
  constructor(criteria, otherCriteria){
    this.criteria = criteria
    this.otherCriteria = otherCriteria
  }
  meetCriteria (persons){
    const firstCriteriaItems = this.criteria.meetCriteria(persons)
    const otherCriteriaItems = this.otherCriteria.meetCriteria(persons)
    for(const person of otherCriteriaItems){
      if (firstCriteriaItems.indexOf(person) == -1){
        firstCriteriaItems.push(person)
      }
    }
    return firstCriteriaItems
  }
}
function printPersons(persons){
  for(const person of persons){
    console.log(person)
  }
}

const persons = []
persons.push(new Person('小明', 'Male', 'Single'))
persons.push(new Person('小强', 'Male', 'Married'))
persons.push(new Person('小红', 'Female', 'Married'))
persons.push(new Person('小丽', 'Female', 'Single'))

const male = new CriteriaMale()
const female = new CriteriaFemale()
const single = new CriteriaSigle()
const singleMale = new AndCriteria(single, male)
const singleOrFemale = new OrCriterial(single, female)

console.log('男人:')
printPersons(male.meetCriteria(persons))

console.log('\n女人:')
printPersons(female.meetCriteria(persons))

console.log('\n 单身男人:')
printPersons(singleMale.meetCriteria(persons))

console.log('\n 单身或女人:')
printPersons(singleOrFemale.meetCriteria(persons))

/*
优势

在需要做类似筛选的时候, 通过每次单一功能的筛选, 在做聚合能极大的降低筛选功能的复杂性
*/