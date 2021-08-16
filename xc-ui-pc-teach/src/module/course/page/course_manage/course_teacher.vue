<template>
  <div>
    <el-form  :model="teacherForms" label-width="80px"  ref="teacherForms" >
      <el-form-item label="教师姓名" prop="name">
        <el-input type="text"  v-model="teacherForms.name"></el-input>
      </el-form-item>
      <el-form-item label="详细描述" prop="description">
        <el-input type="textarea"  v-model="teacherForms.description"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary"  @click.native="save" :loading="editLoading">提交</el-button>
    </div>
  </div>
</template>

    <script>
        import * as courseApi from '../../api/course';
        import utilApi from '../../../../common/utils';
        import * as systemApi from '../../../../base/api/system';
        export default {
            data() {
                let validateName = (rule, value, callback) => {
                    if (value === ''){
                        callback(new Error('请输入名称'));
                    }
                    callback();
                };
                return {
                    courseid:'',
                    teacherForms:{
                        name:'',
                        description:''
                    },
                    editLoading: false,
                    rules22: {
                        name: [
                            { validator: validateName, trigger: 'blur' }
                        ],

                    }
                }
            },
            methods:{
                save(){
                    this.$refs.teacherForms.validate((valid) => {
                        console.log('***********'+ this.teacherForms)
                        if (valid) {
                            this.$confirm('确认提交吗？', '提示', {}).then(() => {
                                courseApi.updateCourseTeacherinfo(this.courseid,this.teacherForms).then((res) => {
                                    this.editLoading = false;
                                    if(res.success){
                                        this.$message.success('提交成功');
                                    }else{
                                        this.$message.error('提交失败');
                                    }
                                });
                            });
                        }
                    });
                },
                // save(){
                //             this.$confirm('确认提交吗？', '提示', {}).then(() => {
                //                 console.log('***********'+ this.teacherForms)
                //                 courseApi.updateCourseTeacherinfo(this.courseid,this.teacherForms).then((res) => {
                //                     this.editLoading = false;
                //                         if(res.success){
                //                         this.$message.success('提交成功');
                //                     }else{
                //                         this.$message.error('提交失败');
                //                     }
                //                 });
                //             });
                // }

            },
            created(){
            },
            mounted(){
                this.courseid = this.$route.params.courseid;
                courseApi.getCourseTeacherinfoById(this.courseid).then((res) => {
                    this.teacherForms = res ? res:{tname:'', tdescription:''};
                });

            },
        }
    </script>

<style>

</style>
