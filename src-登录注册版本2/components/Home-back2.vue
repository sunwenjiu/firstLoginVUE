<template>
  <div>


  <Table border :columns="columns7" :data="data6"></Table>
    <Modal
      v-model="modal6"
      title="信息修改"
      :loading="loading"
      @on-ok="asyncOK">

     <!-- <Form ref="FormOne" :model="FormOne" :rules="ruleFormOne" :label-width="80">
        <FormItem label="用户名" prop="name">
          <i-input type="text" v-model="FormOne.name" placeholder="请输入用户名"></i-input>
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
      </Form>-->
    </Modal>
  </div>
</template>

<script>
  import  axios from 'axios'
  import qs from 'qs'

  export default {
    data () {
      return {
        modal6: false,
        loading: true,
        columns7: [
          /*{
            title: 'Id',
            key: 'id'
          },*/
          {
            title: 'Name',
            key: 'username',
            /*render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'person'
                  }
                }),
                h('strong', params.row.username)
              ]);
            }*/
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
              ]);
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
    mounted(){
      axios.defaults.baseURL='/api'
      axios.get('/show')
        .then((response) => {

          const result=response.data
          const state=result.state
          this.data6=result.data
          if (state!==200){
            alert('请先登录')
            this.$router.push({path: '/login'})
          }

          //console.log(response);
          //location.href=""
        })
        .catch(function (error) {
          //alert(error.message)
         // console.log(error);
        })
    },
    methods: {
      asyncOK () {
        setTimeout(() => {
          this.modal6 = false;
        }, 2000);
      },
      show (index) {
        this.modal6 = true
       /* this.$Modal.info({
          title: '用户信息',
          content: `用户名：${this.data6[index].username}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
        })
        */

      },
      remove (index) {

        //alert( this.data6[index].id+'；'+this.data6[index].username)
        if (window.confirm(`确认删除${this.data6[index].username}吗？`)){
          axios.defaults.baseURL='/api'
          axios.get('/del/'+this.data6[index].id)
            .then( (response) => {
              const result=response.data
              const state=result.state
            })
            .catch(function (error) {
              alert(error.message)
              console.log(error);
            })
          this.data6.splice(index, 1);
        }

      }
    }
  }
</script>
<style>

</style>
