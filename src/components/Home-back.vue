<template>
  <Table border :columns="columns7" :data="data6"></Table>
</template>

<script>
  import  axios from 'axios'
  import qs from 'qs'

  export default {
    data () {
      return {
        columns7: [
          {
            title: 'Id',
            key: 'id'
          },
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
                }, 'View'),
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
                }, 'Delete')
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
      show (index) {
        this.$Modal.info({
          title: '用户信息',
          content: `用户名：${this.data6[index].username}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
        })
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
