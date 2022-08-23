<template>
  <div ref="main" class="radar">雷达图</div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {}
  },

  created() {},
  mounted() {
    this.initRadar()
  },

  methods: {
    initRadar() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.main)
      // 绘制图表
      const radarOptions = {
        backgroundColor: 'RGB(0, 47, 167)',
        title: {
          text: '人员绩效表',
          left: 'left',
          textStyle: {
            color: '#eee'
          }
        },
        legend: {
          data: ['张三', '李四'],
          textStyle: {
            color: 'skyblue',
            fontSize: 20
          }
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '加班', max: 100 },
            { name: '分享', max: 100 },
            { name: '助人', max: 100 },
            { name: '打游戏', max: 100 },
            { name: '看电影', max: 100 },
            { name: '睡觉', max: 100 }
          ],
          axisName: {
            color: '#fff'
          },
          splitLine: {
            lineStyle: {
              color: ['black', 'white']
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowBlur: 10
            }
          },
          axisLine: {
            lineStyle: {
              color: 'skyblue'
            }
          }
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [42, 30, 20, 35, 50, 18],
                name: '张三'
              },
              {
                value: [50, 14, 28, 26, 42, 21],
                name: '李四'
              }
            ]
          }
        ]
      }
      myChart.setOption(radarOptions)
    }
  }
}
</script>

<style scoped lang="scss">
.radar {
  width: 700px;
  height: 500px;
}
</style>
