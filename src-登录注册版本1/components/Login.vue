<template>
  <div>
    <Form ref="FormOne" :model="FormOne" :rules="ruleFormOne" :label-width="80">
      <FormItem label="用户名" prop="name">
        <i-input type="text" v-model="FormOne.name" placeholder="请输入用户名"></i-input>
      </FormItem>
      <FormItem label="密码" prop="passwd">
        <i-input type="password" v-model="FormOne.passwd" placeholder="请输入密码"></i-input>
      </FormItem>

      <FormItem>
        <Button type="primary" @click="handleSubmit('FormOne')">登 录</Button>
        <Button @click="handleReset('FormOne')" style="margin-left: 8px">重 置</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import axios from 'axios'
// import Format from '../Format.js'
// import qs from 'qs'

var regpwd = /^[\w]{6,12}$/

export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!regpwd.test(value)) {
        callback(new Error('请输入6-12位的字母数字组合'))
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
      } else if (this.FormOne.nameerror) {
        callback(new Error('用户名或密码错误!'))
      } else {
        callback()
      }
    }

    return {
      FormOne: {
        name: '',
        passwd: '',
        nameerror: ''

      },
      ruleFormOne: {
        name: [
          {
            validator: validateName,
            trigger: 'blur'
          }
        ],

        passwd: [
          {validator: validatePass, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // this.$Message.success("Success!");
          // const axios = require('axios');
          // axios.defaults.baseURL = '/api'
          axios.post('/login', {
            username: this.FormOne.name,
            password: this.FormOne.passwd
          })
            .then((response) => {
              const result = response.data
              const state = result.state
              this.FormOne.nameerror = result.message
              if (state !== 200) {
                // alert('用户名或密码错误，请重新输入')
                this.$refs.FormOne.validateField('name')
                this.FormOne.nameerror = ''
              } else {
                this.$router.push({path: '/home'})
              }

              // console.log(response);
              // location.href=""
            })
            .catch(function (error) {
              alert(error.message)
            })
        } else {
          this.$Message.error('登录失败')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }

}
</script>

<style>

</style>
