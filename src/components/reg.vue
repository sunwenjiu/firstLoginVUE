<template>
  <div>
    <Form ref="FormOne" :model="FormOne" :rules="ruleFormOne" :label-width="80">
      <FormItem label="用户名" prop="name">
        <i-input type="text" v-model="FormOne.name" placeholder="请输入用户名"></i-input>
      </FormItem>

      <FormItem label="密码" prop="passwd">
        <i-input type="password" v-model="FormOne.passwd" placeholder="请输入密码"></i-input>
      </FormItem>
      <FormItem label="密码验证" prop="passwdCheck">
        <i-input type="password" v-model="FormOne.passwdCheck" placeholder="请再次输入密码"></i-input>
      </FormItem>
      <FormItem label="手机" prop="tel">
        <i-input type="text" v-model="FormOne.tel" placeholder="请再输入密码"></i-input>
      </FormItem>
      <FormItem label="性别" prop="gender">
        <RadioGroup v-model="FormOne.gender">
          <Radio label="男">男</Radio>
          <Radio label="女">女</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('FormOne')">注 册</Button>
        <Button @click="handleReset('FormOne')" style="margin-left: 8px">重 置</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import axios from 'axios'
import Format from '../Format.js'
import qs from 'qs'

var regpwd = /^[\w]{6,12}$/

export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!regpwd.test(value)) {
        callback(new Error('请输入6-12位的字母数字组合'))
      } else {
        if (this.FormOne.passwdCheck !== '') {
          // 对第二个密码框单独验证
          this.$refs.FormOne.validateField('passwdCheck')
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.FormOne.passwd) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    const validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('姓名不能为空'))
      }
      if (!isNaN(value)) {
        callback(new Error('请输入正确姓名!'))
      } else if (value.length < 2 || value.length > 6) {
        callback(new Error('请输入2到6个字符!'))
      } else if (this.FormOne.nameAgin) {
        callback(new Error('用户名已经被注册!'))
      } else {
        callback()
      }
    }
    return {
      FormOne: {
        name: '',
        passwd: '',
        tel: '',
        passwdCheck: '',
        gender: '男',
        nameAgin: ''
      },
      ruleFormOne: {
        name: [
          {
            /* validator: Format.FormValidate.FormOne().Name, */
            validator: validateName,
            trigger: 'blur'
          }
        ],
        tel: [
          {
            validator: Format.FormValidate.Form().Tel,
            trigger: 'blur'
          }
        ],
        passwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        passwdCheck: [
          { validator: validatePassCheck, trigger: 'blur' }

        ]
      }
    }
  },
  /* mounted() {
       console.log(Format.FormValidate.FormOne().name);
     }, */
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // this.$Message.success("Success!");
          // const axios = require('axios');
          // axios.defaults.baseURL = '/api'
          axios.post('/reg', qs.stringify({
            username: this.FormOne.name,
            tel: this.FormOne.tel,
            password: this.FormOne.passwd,
            gender: this.FormOne.gender
          }))
            .then((response) => {
              // alert('注册成功')
              const result = response.data
              const state = result.state
              this.FormOne.nameAgin = result.message
              if (state !== 200) {
                // alert('用户名重复，请重新输入')
                this.$refs.FormOne.validateField('name')
                this.FormOne.nameAgin = ''
              } else {
                this.$router.push({path: '/home'})
              }
              // console.log(response);
              // location.href=""
            })
            .catch(function (error) {
              alert(error.message)
              console.log(error)
            })

            /* axios({
               method: 'post',
               url: 'http://localhost:8080/reg',

              params: {
                 'lastName':"jiu",
                 'email' : "a@qq.com"
               }

             }).then((response) => {
               if(response.data){
                 console.log(response.data)
                 alert("注册成功！");
               }else{
                 alert("注册失败！");
               }
             }).catch((error) => {
               alert(error.message);
               }
             ) */
            // this.$Message.success("cg!");
        } else {
          this.$Message.error('注册失败')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  },
  watch: {

    'FormOne.nameAgin': {
      deep: true, // 深度监视
      handler: function (value) {
        // alert('nameAgin变了')
        // this.$refs.FormOne.validateField('name');
        // this.FormOne.nameAgin= ''
      }
    }
  }

}
</script>

<style>

</style>
