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
        <Button type="primary" @click="handleSubmit('FormOne')">提 交</Button>
        <Button @click="handleReset('FormOne')" style="margin-left: 8px">重 置</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import  axios from 'axios'
  import Format from './Format.js'
  import qs from 'qs'



  export default {
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter your password'));
        } else {
          if (this.formCustom.passwdCheck !== '') {
            // 对第二个密码框单独验证
            this.$refs.formCustom.validateField('passwdCheck');
          }
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter your password again'));
        } else if (value !== this.formCustom.passwd) {
          callback(new Error('The two input passwords do not match!'));
        } else {
          callback();
        }
      };
      return {
        FormOne: {
          name: "",
          idCard: "",
          passwd: '',
          tel: '',
          passwdCheck: '',
          gender: '男',
          age: ""
        },
        ruleFormOne: {
          name: [
            {
              validator: Format.FormValidate.FormOne().Name,
              trigger: "blur"
            }
          ],
          tel: [
            {
              validator: Format.FormValidate.Form().Tel,
              trigger: "blur"
            }
          ],
          passwd: [
            { validator: validatePass, trigger: 'blur' }
          ],
          passwdCheck: [
            { validator: validatePassCheck, trigger: 'blur' }
          ]
        }
      };
    },
   /* mounted() {
      console.log(Format.FormValidate.FormOne().name);
    },*/
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate(valid => {
          if (valid) {
            this.$Message.success("Success!");
            //const axios = require('axios');
            //axios.defaults.baseURL='/api'
            axios.post('/api/reg', qs.stringify({
              lastName: this.FormOne.name,
              email: this.FormOne.idCard
            }))
              .then(function (response) {
                alert(response.data.lastName)
                console.log(response);
              })
              .catch(function (error) {
                alert(error.message)
                console.log(error);
              })

           /*axios({
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
            )*/
            //this.$Message.success("cg!");

          } else {
            this.$Message.error("Fail!");
          }
        });
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>


<style>

</style>
