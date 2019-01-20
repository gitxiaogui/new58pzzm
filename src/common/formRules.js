export const basicRules = {
  phone: [
    {required: true, message: '手机号不能为空'},
    {minlength: 11, message: '手机号长度为11个字符'},
    {maxlength: 11, message: '手机号长度为11个字符'},
    {checked: '^1[3|4|5|6|8|7][0-9]\\d{8}$', message: '手机号格式错误'}
  ],
  password:[
    {required: true, message: '密码不能为空'},
    {checked: '^[0-9a-zA-Z]*$', message: '请输入6-12位的数字或字母密码'},
    {minlength: 6, message: '密码不能少于6位'},
    {maxlength: 12, message: '密码不能多于12位'},
  ],
  password1:[
    {required: true, message: '密码不能为空'},
    {checked: '^[0-9a-zA-Z]*$', message: '请输入6-12位的数字或字母密码'},
    {minlength: 6, message: '密码不能少于6位'},
    {maxlength: 12, message: '密码不能多于12位'},
  ],
  captcha: [
    {required: true, message: '验证码不能为空'},
    {minlength: 6, message: '验证码长度为6个字符'},
    {maxlength: 6, message: '验证码长度为6个字符'},
  ],
  username: [
    {required: true, message: '姓名不能为空'},
  ],
  idCard:[
    {required: true, message: '请输入身份证号'},
    {checked: ['^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}([0-9]|X)$'], message: '身份证格式错误'},
    {maxlength: 18, message: '身份证长度为18位'},
  ],
  bankAccount:[
    {required: true, message: '银行卡号不能为空'},
  ],
  bankUserName: [
    {required: true, message: '姓名不能为空'},
  ],
  /*oldPassWord: [
    {required: true, message: '旧密码不能为空'},
    {minlength: 6, message: '密码长度为6个字符'},
    {maxlength: 20, message: '密码长度为20个字符'},
  ],*/
  newPassWord: [
    {required: true, message: '新密码不能为空'},
    {checked: '^[0-9a-zA-Z]*$', message: '请输入6-12位的数字或字母密码'},
    {minlength: 6, message: '密码长度为6个字符'},
    {maxlength: 12, message: '密码长度为20个字符'},
  ],
  surePassWord: [
    {required: true, message: '新密码不能为空'},
    {checked: '^[0-9a-zA-Z]*$', message: '请输入6-12位的数字或字母密码'},
    {minlength: 6, message: '密码长度为6个字符'},
    {maxlength: 12, message: '密码长度为20个字符'},
  ],
}


