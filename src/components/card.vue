<template>
     <el-card class="box-card" v-loading="carLoading">
      <div v-for="(items, index) in type" class="item" :key="index">
        <span class="text" :style="{'width': width}">{{ items.name }}：</span>
        <el-radio-group v-model="items.default.name" @change="toggle($event, items.list, items.typeName)">
        <transition-group name="list" tag="div">
          <el-radio-button
            v-for="child in items.list"          
            class="btn"
            :key="child.id"
            :label="child.name">
          </el-radio-button>
        </transition-group>
        </el-radio-group>
      </div>
      <slot></slot>
    </el-card>   
</template>

<script>
export default {
  props: {
    carLoading: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '40px',
      required: true
    },
    type: {
      type: Array,
      required: true,
      default: []
    }
  },
  methods: {
    toggle (e, list, typeName) {
      let id
      list.forEach(item => {
        if (item.name === e) {
          id = item.id
        }
      })
      this.$emit('toggle', { typeName, id })
    }
  }
}
</script>

<style lang="scss" >
@import '../assets/scss/variable.scss';

    .box-card {
      border: none;

      .el-card__body {
        padding-bottom: 0;
      }

      .item:last-child {
        border-bottom: 0;
        margin-top: 20px;
      }

      .item {
        display: flex;
        flex-wrap: wrap;
        position: relative;
        padding-bottom: 10px;
        margin-bottom: 10px;
        line-height: 34px;
        border-bottom: 1px dashed rgb(210, 210, 210);

        .text {
          text-align: right;
          font-size: 14px;
        }
        
        .el-radio-group {
          display: flex;
          align-items: center;
          margin-left: 10px;

          .el-radio-button__inner {
            border: none;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;      
            border-radius: 4px;
          }
        }

        .el-radio-group {
          .is-active {
            .el-radio-button__inner {
              background: $black;
              box-shadow: none;
            }
          }
        }

        .el-input {
          width: 300px;
          margin-right: 10px;
        }
      }
    }
</style>
