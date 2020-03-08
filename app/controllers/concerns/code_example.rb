module CodeExample
  extend ActiveSupport::Concern

  #老师C语言的标准代码
  def c_stantard_code_teacher
    "// 老师您好！这是一个C语言的样例程序
// 程序功能：输入两个整数，输出两者之和
// 测试集合：老师可以给出多组测试集，例如：
//                 输入1和2，输出3
//                 输入3和4，输出7
//                 ... ...
//                 系统将根据您给出的测试集对学生代码进行自动评分

// 特别提醒：程序采用命令行传参方式，输入通过argv传入
//                 否则您的作业标准代码将不能通过测试

#include <stdio.h> //引用必须头文件
int main(int argc, char** argv) {
    int a = atoi(argv[1]);  //将第一个输入转成整型
    int b = atoi(argv[2]);  //将第二个输入转换为整型

    printf(\"%d\",a+b);      //输出a+b
    return 0;
}".html_safe
  end

  #老师C++语言的标准代码
  def c_stantard_code_teacher_
    "// 老师您好！这是一个C++语言的样例程序
// 程序功能：输入两个整数，输出两者之和
// 测试集合：老师可以给出多组测试集，例如：
//                 输入1和2，输出3
//                 输入3和4，输出7
//                 ... ...
//                 系统将根据您给出的测试集对学生代码进行自动评分

// 特别提醒：程序采用命令行传参方式，输入通过argv传入
//                 否则您的作业标准代码将不能通过测试

#include <iostream> //引用必须头文件
#include <cstdlib>
using namespace std;
int main(int argc, char** argv){
  int a = atoi(argv[1]); //将第一个输入转成整型
  int b = atoi(argv[2]); //将第二个输入转换为整型
  cout<<a+b;   //输出a+b
  return 0;
}".html_safe
  end

  #学生C语言的标准代码
  def c_stantard_code_student
    "// 同学好！这是一个C语言的样例程序
// 程序功能：输入两个整数，输出两者之和
// 测试集合：老师可以给出多组测试集，例如：
//                 输入1和2，输出3
//                 输入3和4，输出7
//                 ... ...
//                 系统将根据您给出的测试集对学生代码进行自动评分

// 特别提醒：程序采用命令行传参方式，输入通过argv传入
//                 否则您的作业标准代码将不能通过测试

#include <stdio.h> //引用必须头文件
int main(int argc, char** argv) {
    int a = atoi(argv[1]);  //将第一个输入转成整型
    int b = atoi(argv[2]);  //将第二个输入转换为整型

    printf(\"%d\",a+b);      //输出a+b
    return 0;
}".html_safe
  end

  #学生C++语言的标准代码
  def c_stantard_code_student_
    "// 同学好！这是一个C++语言的样例程序
// 程序功能：输入两个整数，输出两者之和
// 测试集合：老师可以给出多组测试集，例如：
//                 输入1和2，输出3
//                 输入3和4，输出7
//                 ... ...
//                 系统将根据您给出的测试集对学生代码进行自动评分

// 特别提醒：程序采用命令行传参方式，输入通过argv传入
//                 否则您的作业标准代码将不能通过测试

#include <iostream> //引用必须头文件
#include <cstdlib>
using namespace std;
int main(int argc, char** argv){
  int a = atoi(argv[1]); //将第一个输入转成整型
  int b = atoi(argv[2]); //将第二个输入转换为整型
  cout<<a+b;   //输出a+b
  return 0;
}".html_safe
  end

  def compile_command
    "compile(){
		# 编译命令
        compileCommand=\"COMPILECOMMAND\"
		# 取当前关卡的编译文件
        challengeProgramName=${challengeProgramNames[$1 - 1]}
		# 获取编译结果（此处编译无输出则说明编译通过，否则输出编译错误信息，请按实训实际情况调整）
        compileResult=$($compileCommand $challengeProgramName 2>&1 | base64)
        if [ -z \"$compileResult\" ]; then
                compileResult=$(echo -n \"compile successfully\" | base64)
        fi

		}
		compile $1"
  end

  def execute_command
    "execute(){
	#执行命令
        executeCommand=\"EXECUTECOMMAND\"
	#执行文件名
        sourceClassName=${sourceClassNames[$1 - 1]}
        challengeStage=$1

        output=''
        i=0
        while [[ i -lt ${#ins[*]} ]]; do
            #执行，并拼接执行结果
            result=$(echo \"${ins[$i]}\" | base64 -d | $executeCommand $sourceClassName 2>&1 | base64)
            #拼接输出结果
            output=$output\\\"$result\\\",
            let i++
        done
        output=\"[${output%?}]\"
}

execute $1
"
  end
end