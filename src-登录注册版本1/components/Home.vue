<template>
  <div>

  <Table border :columns="columns7" :data="data6"></Table>
    <Modal
      v-model="modal6"
      title="信息修改"
      ok-text="确认修改"
      :loading="loading"
      @on-ok="asyncOK">

     <Form ref="FormOne" :model="FormOne" :rules="ruleFormOne" :label-width="80">
        <FormItem label="用户名" prop="name">
          <i-input type="text" v-model="FormOne.name" placeholder="请输入用户名" disabled="disabled"></i-input>
        </FormItem>
        <FormItem label="手机" prop="tel">
          <i-input type="text" v-model="FormOne.tel" placeholder="请输入密码"></i-input>
        </FormItem>
        <FormItem label="性别" prop="gender">
          <RadioGroup v-model="FormOne.gender">
            <Radio label="男">男</Radio>
            <Radio label="女">女</Radio>
          </RadioGroup>
        </FormItem>
        <!--<FormItem>
          <Button type="primary" @click="handleSubmit('FormOne')">注 册</Button>
          <Button @click="handleReset('FormOne')" style="margin-left: 8px">重 置</Button>
        </FormItem>-->
      </Form>
    </Modal>
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
      modal6: false,
      loading: true,
      FormOne: {
        id: '',
        name: '',
        passwd: '',
        tel: '',
        passwdCheck: '',
        gender: '',
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
      },
      columns7: [
        /* {
            title: 'Id',
            key: 'id'
          }, */
        {
          title: 'Name',
          key: 'username'
          /* render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'person'
                  }
                }),
                h('strong', params.row.username)
              ]);
            } */
        },
        {
          title: 'Tel',
          key: 'tel'
        },
        {
          title: 'Gender',
          key: 'gender'
        },
        {
          title: 'Action',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      data6: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park'
        }
      ]
    }
  },
  mounted () {
    // axios.defaults.baseURL = '/api'
    axios.get('/show')
      .then((response) => {
        const result = response.data
        const state = result.state
        this.data6 = result.data
        if (state !== 200) {
          alert('请先登录')
          this.$router.push({path: '/login'})
        }

        // console.log(response);
        // location.href=""
      }).catch((error) => {
        alert(error.message)
        // console.log(error);
      })
  },
  methods: {
    asyncOK () {
      // 修改的axios
      this.$refs.FormOne.validate(valid => {
        if (valid) {
          // alert("modal点击成功")
          // this.$Message.success("Success!");
          // const axios = require('axios');
          // axios.defaults.baseURL = '/api'
          axios.post('/update', qs.stringify({
            id: this.FormOne.id,
            tel: this.FormOne.tel,
            gender: this.FormOne.gender
          }))
            .then((response) => {
              this.$Message.success('修改成功!')
              location.reload()
              /* const result=response.data
                const state=result.state
                this.FormOne.nameAgin=result.message
                if (state!==200){
                  //alert('用户名重复，请重新输入')
                  this.$refs.FormOne.validateField('name');
                  this.FormOne.nameAgin=''
                }else {
                  this.$router.push({path: '/home'})
                } */
              // console.log(response);
              // location.href=""
            }).catch((error) => {
              alert('修改失败a内' + error.message)
            })
        } else {
          this.$Message.error('修改失败A外')
        }
      })
    },
    show (index) {
      this.modal6 = true
      this.FormOne.tel = this.data6[index].tel
      this.FormOne.gender = this.data6[index].gender
      this.FormOne.id = this.data6[index].id
      this.FormOne.name = this.data6[index].username
      /* this.$Modal.info({
          title: '用户信息',
          content: `用户名：${this.data6[index].username}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
        })
        */
    },
    remove (index) {
      // alert( this.data6[index].id+'；'+this.data6[index].username)
      if (window.confirm(`确认删除${this.data6[index].username}吗？`)) {
        // axios.defaults.baseURL = '/api'
        axios.get('/del/' + this.data6[index].id)
          .then((response) => {
            // const result = response.data
            // const state = result.state
          })
          .catch(function (error) {
            alert(error.message)
            console.log(error)
          })
        this.data6.splice(index, 1)
      }
    }
  }
}
</script>
<style>

</style>
