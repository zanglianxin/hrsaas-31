<template>
  <div>
    <el-upload
      action="#"
      v-loading="loading"
      element-loading-text="上传中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      list-type="picture-card"
      :http-request="onRequest"
      :file-list="fileList"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :limit="1"
      :class="fileList.length ? 'hide' : ''"
      class="custom-upload"
      :before-upload="onBeforeUpload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
var cos =  new COS({
  SecretId: 'AKIDnRt75qSqytZBdqmTuFRQClAML6ez66uU',
  SecretKey: 'PbZKsDLGzTiiW7VgfQwFOK4bw4xa0CD2'
})

export default {
  name: 'UploadImg',
  data() {
    return {
      fileList: [],
      dialogVisible: false,
      dialogImageUrl: '',
      loading: false
    }
  },

  created() {},

  methods: {
    onRequest({ file }) {
      this.loading = true
      cos.putObject(
        {
          Bucket: 'storage-person-1307444905' /* 必须 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，必须字段 */,
          Key: file.name /* 必须 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData))
          }
        },
        (err, data) => {
          this.loading = false
          if (err || data.statusCode !== 200) {
            return this.$message.error('亲，上传失败，请重试')
          }
          this.$emit('onSuccess', {
            url: 'https://' + data.Location
          })
        }
      )
    },
    onChange(file, fileList) {
      this.fileList = fileList
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    onPreview(file) {
      // console.log(file);
      this.dialogVisible = true
      this.dialogImageUrl = file.url
    },
    onBeforeUpload(file) {
      // 可以上传的图片类型
      const types = ['image/jpeg', 'image/gif']
      if (!types.includes(file.type)) {
        this.$message.error('请选择' + types.join('、') + '图片')
        return false
      }

      // 限制图片上传的大小
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('选择的图片不能超过2mb')
        return false
      }
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .hide .el-upload--picture-card {
  display: none;
}

.custom-upload {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
