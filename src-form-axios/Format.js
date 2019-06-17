var regId = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
var email = /^(\w+\.?)*\w+@(?:\w+\.)\w+$/
var tel = /^1[345789]\d{9}$/
var fax = /^(\d{3,4}-)?\d{7,8}$/
var FormValidate = (function () {
  // eslint-disable-next-line
  function FormValidate() {}
  // From表单验证规则  可用于公用的校验部分
  FormValidate.Form = function () {
    return {
      // 姓名的验证规则
      Email: function (rule, value, callback) {
        if (!value) {
          return callback(new Error('邮箱不能为空'))
        }
        if (!email.test(value)) {
          callback(new Error('请输入正确的邮箱!'))
        } else {
          callback()
        }
      },
      // 身份证的验证规则
      ID: function (rule, value, callback) {
        if (!value) {
          return callback(new Error('身份证不能为空'))
        }
        if (!regId.test(value)) {
          callback(new Error('请输入正确的二代身份证号码'))
        } else {
          callback()
        }
      },
      // 电话号码的验证
      Tel: (rule, value, callback) => {
        if (!value) {
          return callback(new Error('电话不能为空'))
        }
        if (!tel.test(value)) {
          callback(new Error('请正确填写电话号码'))
        } else {
          callback()
        }
      }
    }
  }

  // FromOne表单验证规则  用于FromOne个性化的校验
  FormValidate.FormOne = function () {
    return {
      // 姓名的验证规则
      Name: function (rule, value, callback) {
        if (!value) {
          return callback(new Error('姓名不能为空'))
        }
        if (!isNaN(value)) {
          callback(new Error('请输入正确姓名!'))
        } else if (value.length < 2 || value.length > 6) {
          callback(new Error('请输入2到6个字符!'))
        } else {
          callback()
        }
      }
    }
  }

  // FromTwo表单验证规则  用于FromTwo表单个性化的校验
  FormValidate.FormTwo = function () {
    return {
      // 传真的校验规则
      Fax: (rule, value, callback) => {
        if (!value) {
          return callback(new Error('传真不能为空'))
        }
        if (!fax.test(value)) {
          callback(new Error('请正确填写传真'))
        } else {
          callback()
        }
      }
    }
  }
  return FormValidate
}())
exports.FormValidate = FormValidate
