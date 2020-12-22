/*
MVC模式
常用于单应用框架或多应用的单体框架中, 不过目前前后端采取分离形态, 所以V很多已挪到了前端
MVC模式指的是模型, 视图, 控制器相互分离的一种思想
*/

/*
实例
首先构建模型, 一般是指数据的最小单元, 其实模型的设计又有很多细节

模型, 在业务中模式设计其实特别讲究
在领域模型其实就细分了很多种类, 比如
失血模式
贫血模式
充血模式
胀血模式
*/
class Student {
  getRollNO () {
    return this.rollNo
  }
  setRollNo(rollNo){
    this.rollNo = rollNo
  }
  getName () {
    return this.name
  }
  setName (name){
    this.name = name
  }
}
// 其次构建视图, 一般用于输出或显示
class StudentView {
  printStudentDetails(student, studentRollNo){
    console.log('Student: ')
    console.log('Name: ' + student)
    console.log('Roll No: ' + studentRollNo)
  }
}
// 最后根据控制器来控制模型渲染视图
class StudentController{
  constructor(model, view) {
    this.model = model
    this.view = view
  }
  setStudentName(name){
    this.model.setName(name)
  }
  getStudentName(){
    return this.model.getName()
  }
  setStudentRollNo(rollNo){
    this.model.setRollNo(rollNo)
  }
  getStudentRollNo(){
    return this.model.getRollNO()
  }
  updateView () {
    this.view.printStudentDetails(this.model.getName(), this.model.getRollNO())
  }
}

// 在使用来说就是根据数据变化, 更新显示了
function retrieveStudentFromDatebase(){
  const student = new Student()
  student.setName('Robert')
  student.setRollNo('10')
  return student
}

const model = retrieveStudentFromDatebase()
// 创建一个视图, 把学生详细信息输出到控制台
const view = new StudentView()
const controller = new StudentController(model, view)
controller.updateView()
// 更新模型数据
controller.setStudentName('John')
controller.updateView()


/*
Student:
Name: Robert
Roll No: 10
Student:
Name: John
Roll No: 10
*/

/*
优势
在MVC模式下, 每层各司其职, 层次清楚, 层级干涉度小, 有利于解除应用内层级之间的耦合
*/