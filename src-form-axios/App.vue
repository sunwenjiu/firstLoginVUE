<template>
  <div>
    <Form ref="FormOne" :model="FormOne" :rules="ruleFormOne" :label-width="80">
      <FormItem label="姓名" prop="name">
        <i-input type="text" v-model="FormOne.name"></i-input>
      </FormItem>
      <FormItem label="邮箱" prop="idCard">
        <i-input type="text" v-model="FormOne.idCard"></i-input>
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
      return {
        FormOne: {
          name: "",
          idCard: "",
          age: ""
        },
        ruleFormOne: {
          name: [
            {
              validator: Format.FormValidate.FormOne().Name,
              trigger: "blur"
            }
          ],
          idCard: [
            {
              validator: Format.FormValidate.Form().Email,
              trigger: "blur"
            }
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
