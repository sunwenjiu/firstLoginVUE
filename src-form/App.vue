<template>
  <div>
    <Form ref="FormOne" :model="FormOne" :rules="ruleFormOne" :label-width="80">
      <FormItem label="姓名" prop="name">
        <i-input type="text" v-model="FormOne.name"></i-input>
      </FormItem>
      <FormItem label="身份证" prop="idCard">
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
  import Format from './Format.js'
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
              validator: Format.FormValidate.Form().ID,
              trigger: "blur"
            }
          ]
        }
      };
    },
    mounted() {
      console.log(Format.FormValidate.FormOne().name);
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate(valid => {
          if (valid) {
            this.$Message.success("Success!");
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
