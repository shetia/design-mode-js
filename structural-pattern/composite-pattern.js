
/*
组合模式

以结构化的方式, 是单一对象具有树形结构, 让单一对象更具有结构性
*/

/*
 实例
  在雇员和雇员之间都是存在上下级关系, 如何用代码更直观的表达和关系的操作
  这是个棘手的问题, 但通过组合模式, 将关系表达为树形结构将更方便更直观的表达
*/
class Employee {
  constructor (name, dept, sal){
    this.name = name
    this.dept = dept
    this.salary = sal
    this.subordinates = []
  }
  add (employee) {
    this.subordinates.push(employee)
  }
  remove (employee){
    this.subordinates.splice(this.subordinates.inndexOf(employee), 1)
  }
  getSubordinates () {
    return this.subordinates
  }
  toString () {
    return (`
      雇员: [name: ${this.name}, dept: ${this.dept}, salary:${this.salary}]
    `)
  }
}
/*
所以当我们添加雇员和关系的时候将更加方便的添加, 而且对于一个雇员, 他只需要关心和下属的关系维护
而不需要关系上级和一些间接的关系, 这样会更加清晰和维护更加方便
*/
const CEO = new Employee('John', 'CEO', 30000)

const headMarketing = new Employee('Michel', 'Head marketing', 20000)
const headSales = new Employee('Robort', 'Head Sales', 20000)

const clerk1 = new Employee('Laure', 'Marketing', 10000)
const clerk2 = new Employee('Bob', 'Marketing', 1000)

const salesExecutinve1 = new Employee('Richard', 'Sales', 10000)
const salesExecutinve2 = new Employee('Rob', 'Sales', 10000)

CEO.add(headSales)
CEO.add(headMarketing)
headMarketing.add(clerk1)
headMarketing.add(clerk2)
headSales.add(salesExecutinve1)
headSales.add(salesExecutinve2)

// 那么我们打印来说也只要打印最高级别的上级就能实现全部打印
function printAllEmpolyee(employee){
  for(const subEmployee of employee.getSubordinates()){
    console.log(subEmployee.toString())
    if (subEmployee.getSubordinates().length > 0){
      printAllEmpolyee(subEmployee)
    }
  }
}

// 打印该组织的所有员工
console.log(CEO.toString())
printAllEmpolyee(CEO)

/*
优势
让相互关联的对象产生了结构性, 无论是在关系修改或者是关系直观性上
都只需要关心当前下级的关系,那么这样能更好的降低关系和关系之间的复杂度, 加强单对象关系结构性的可维护性
*/