<template>
  <Layout  class="layout-container">
    <LayoutContent class="layout-content" :style="{ width: state==STATE_ARRAY[2] || state==STATE_ARRAY[3] ? '100%' : '72% !important',  height: state==STATE_ARRAY[2] || state==STATE_ARRAY[3] ? '100%' : '42rem !important' }"> 
      <div class="carousel-container">
        <Carousel theme="dark" style="width: 100%;height: 100%;" indicatorType="line"  :showArrow="false" :activeIndex="carouselActiveIndex"   @change="onCarouselChange">
          <div  class="page-container" v-for="(page, pageIndex) in logoShownList" :key="pageIndex">
            <div class="logo-list-container">
              <div class="logo-container" :style="{ 
                  width: (100/targetStyleColumnNumber-2) + '%', 
                  borderRadius: targetStyleRadious + 'px',
                  border: targetStyleBorderWidth + 'px solid ' + targetStyleBorderColor,
                  margin: (targetStyleRowGap/2) +'px' + ' ' + (targetStyleColumnGap/2) +'px',
                  backgroundColor: targetStyleBgColor,
                }" 
                v-for="(url, urlIndex) in page" :key="urlIndex"
              >
                <Image :placeholder="CONSTANT.DEFAULT_IMAGE_PATH"  :src="url" 
                  :imgStyle="{ objectFit: targetModeOption}"
                />
              </div>
              
            </div>
          </div>
        </Carousel>
      </div>
      
    </LayoutContent>

    <!-- 配置区域 -->
    <LayoutSider v-if="state === STATE_ARRAY[1] || state === STATE_ARRAY[0]" class="layout-sider" >
      <!-- TABLE SELECT  -->
      <a-form-item class="a-form-item">
        <div class="lable">{{ $t('label.table') }}</div> 
        <Select :optionList="tableOptionList" :defaultValue="targetTableId" :value="targetTableId"
          @change="onTableIdChange"
          style="margin-top: 8px;width: 100%;background-color: transparent;border: 1px solid #D0D3D6;
            border-radius: 6px;" 
        />
      </a-form-item>

      <!-- LABEL SELECT  -->
      <a-form-item class="a-form-item">
        <div class="lable">{{ $t('label.view') }}</div> 
        <Select :optionList="viewOptionList" :value="targetViewId"
          @change="onViewIdChange"
          style="margin-top: 8px;width: 100%;background-color: transparent;border: 1px solid #D0D3D6;
            border-radius: 6px;" 
        />
      </a-form-item>

      <!-- FIELD SELECT  -->
      <a-form-item class="a-form-item">
        <div class="lable">{{ $t('label.field') }}</div> 
        <Select :optionList="fieldOptionList" :value="targetFieldId"
          @change="onFieldIdChange"
          style="margin-top: 8px;width: 100%;background-color: transparent;border: 1px solid #D0D3D6;
            border-radius: 6px;" 
        />
      </a-form-item>

      <!-- CONST MODEL SELECT  -->
      <a-form-item class="a-form-item">
        <div class="lable">{{ $t('label.mode') }}</div> 
        <Select :optionList="modeOptionList" defaultValue="contain" :value="targetModeOption"
          @change="onModeOptionChange"
          style="margin-top: 8px;width: 100%;background-color: transparent;border: 1px solid #D0D3D6;
            border-radius: 6px;" 
        />
      </a-form-item>

      <a-form-item class="a-form-item">
        <div class="lable">{{ $t('label.number') }}</div>
        <InputNumber style="margin-top: 8px;width: 100%;border: 1px solid #D0D3D6;border-radius: 6px;" 
          :value="targetNumberShown" @change="onOriginalNumberShownChange" />  
      </a-form-item>

      <a-form-item class="a-form-item">
        <div class="lable">{{ $t('label.style.name') }}</div> 
        <div class="style-container">
          <div>
            <b-form-item class="b-form-item">
              <div>{{ $t('label.style.row_num') }}</div>
              <InputNumber size="small" style="margin-top: 8px;width: 100%;background-color: #fff;border: 1px solid #D0D3D6;
                  border-radius: 6px;" :value="targetStyleRowNumber" @change="onOriginalStyleRowNumber" />  
            </b-form-item>

            <b-form-item class="b-form-item">
              <div>{{ $t('label.style.column_num') }}</div>
              <InputNumber size="small" style="margin-top: 8px;width: 100%;background-color: #fff;border: 1px solid #D0D3D6;
                  border-radius: 6px;" :value="targetStyleColumnNumber" @change="onOriginalStyleColumnNumber" />  
            </b-form-item>
          </div>
          <div>
            <b-form-item class="b-form-item">
              <div>{{ $t('label.style.row_gap') }}</div>
              <InputNumber size="small" style="margin-top: 8px;width: 100%;background-color: #fff;border: 1px solid #D0D3D6;
                  border-radius: 6px;" :value="targetStyleRowGap" @change="onOriginalStyleRowGap" />  
            </b-form-item>

            <b-form-item class="b-form-item">
              <div>{{ $t('label.style.column_gap') }}</div>
              <InputNumber size="small" style="margin-top: 8px;width: 100%;background-color: #fff;border: 1px solid #D0D3D6;
                  border-radius: 6px;" :value="targetStyleColumnGap" @change="onOriginalStyleColumnGap" />  
            </b-form-item>
          </div>
          <div>
            <b-form-item class="b-form-item">
              <div>{{ $t('label.style.radius') }}</div>
              <InputNumber size="small" style="margin-top: 8px;width: 100%;background-color: transparent;border: 1px solid #D0D3D6;
                  border-radius: 6px;" :value="targetStyleRadious" @change="onOriginalStyleRadious" />  
            </b-form-item>

            <b-form-item class="b-form-item">
              <div>{{ $t('label.style.border_width') }}</div>
              <InputNumber size="small" style="margin-top: 8px;width: 100%;background-color: transparent;border: 1px solid #D0D3D6;
                  border-radius: 6px;" :value="targetStyleBorderWidth" @change="onOriginalStyleBorderWidth" />  
            </b-form-item>
          </div>
          <div>
            <b-form-item class="b-form-item">
              <div>{{ $t('label.style.background_color') }}</div>
              <Input size="small" style="margin-top: 8px;background-color: #fff;border: 1px solid #D0D3D6;
                  border-radius: 6px;" :addonBefore="createVNode('span', { id: 'myspan', style: { backgroundColor: targetStyleBgColor, height: '16px', width: '16px', border: '1px solid #cacfd4', margin: '0 0 0 10px'} }, '')" 
                  :value="targetStyleBgColor" @change="onOriginalStyleBgColor" />  
            </b-form-item>

            <b-form-item class="b-form-item">
              <div>{{ $t('label.style.border_color') }}</div>
              <Input size="small" style="margin-top: 8px;background-color: #fff;border: 1px solid #D0D3D6;
                  border-radius: 6px;"  :addonBefore="createVNode('span', { id: 'myspan', style: { backgroundColor: targetStyleBorderColor, height: '16px', width: '16px', border: '1px solid #cacfd4', margin: '0 0 0 10px'} }, '')"
                  :value="targetStyleBorderColor" @change="onOriginalStyleBorderColor" />  
            </b-form-item>

            
          </div> 

        </div>
      </a-form-item>
      
      <a-form-item class="a-form-item">
        <div class="lable">{{ $t('label.speed') }}</div>
        <InputNumber style="margin-top: 8px;width: 100%;border: 1px solid #D0D3D6;border-radius: 6px;" 
          :value="targetCarouselSpeed" @change="onTargetCarouselSpeed" />  
      </a-form-item>

      <a-form-item class="a-form-item" style="align-items: flex-end;">
        <Button  @click="saveConfig" theme='solid' type='primary' style="padding: 0 20px;border-radius: 4px;">保存</Button> 
      </a-form-item>
    </LayoutSider>
  </Layout>
</template>

<script setup>
import { dashboard, DashboardState, bitable } from '@lark-base-open/js-sdk';

import { useI18n } from 'vue-i18n';
import { ref, onMounted, computed, watch, createVNode } from 'vue';
import axios from 'axios';
import { Button } from "@kousum/semi-ui-vue"
import { Layout, LayoutSider, LayoutContent } from '@kousum/semi-ui-vue';
import { Select, Carousel, Icon, InputNumber, Input, Image } from "@kousum/semi-ui-vue"
import * as myBase from '../utils/base.js'
import * as CONSTANT from '../utils/constant.js'
import * as commonFn from '../utils/common.js'


// -- 配置区域
const { t } = useI18n();  // 国际化
const STATE_ARRAY = ["Create","Config", "View", "FullScreen"]


// -- 核心数据
const state = ref("View"); // 初始状态为配置模式
const logoShownList = ref([])

const targetTableId = ref("")
const targetViewId = ref("")
const targetFieldId = ref("")
const targetModeOption = ref("contain")
const targetNumberShown = ref(12)

const targetStyleRowNumber = ref(2)
const targetStyleColumnNumber = ref(3)
const targetStyleRowGap = ref(10)
const targetStyleColumnGap = ref(10)
const targetStyleRadious = ref(10)
const targetStyleBorderWidth = ref(0)
const targetStyleBgColor = ref("#f8f8f8")
const targetStyleBorderColor = ref("#fff")

const targetCarouselSpeed = ref(5)

// -- 辅助数据
const tableOptionList = ref([]); 
const viewOptionList = ref([])
const fieldOptionList = ref([])
const modeOptionList = ref([
  {label: "适应", value: "contain"},
  {label: "裁切铺满", value: "cover"},
  {label: "拉伸填充", value: "fill"}
])
const autoPlayConfig = ref({
  interval: 1500, hoverToPause: false
})

const carouselActiveIndex = ref(0);  // 轮播图当前索引
let intervalId = ""

let originAttachmentList = [] // 原始附件列表






// -- 方法 --
/**
 * 保存配置
 */
const saveConfig = async () => {
  await dashboard.saveConfig({
    customConfig: {
      tableId: targetTableId.value,
      viewId: targetViewId.value,
      fieldId: targetFieldId.value,
      modeOption: targetModeOption.value,
      numberShown: targetNumberShown.value,
      styleRowNumber: targetStyleRowNumber.value,
      styleColumnNumber: targetStyleColumnNumber.value,
      styleRowGap: targetStyleRowGap.value,
      styleColumnGap: targetStyleRowGap.value,
      originAttachmentList: JSON.stringify(originAttachmentList),
      logoShownList: JSON.stringify(logoShownList.value),
      targetCarouselSpeed: targetCarouselSpeed.valu
    }
  })
  await initDashboard()

}; 



const simulateCarouselChange = () => {
  carouselActiveIndex.value = (carouselActiveIndex.value + 1) % logoShownList.value.length;
}; 

/**
 * @command {} 格式化选项列表
 * @param {array} tableOptionList 
 */
const formatOptionList = async (oldOptionList) => {
  
  return oldOptionList.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });
};

const queryAttachementList = async (tableId, viewId, attachmentFieldId, length) => {
  console.log(222, tableId, viewId, attachmentFieldId, length)
  const recordIdList = await myBase.queryVisibleRecordList(tableId, viewId)
  console.log("recordIdList", recordIdList)
  if (recordIdList.length === 0) return

  return await myBase.queryAttachementList(tableId, recordIdList, attachmentFieldId, length)
}



// --== 监听事件：包括 watch 方法和 @change 方法

// 1. 依据tableId变化，更新viewOptionList
watch(targetTableId, async (newTableId, oldTableId) => {
    console.log("watch view", newTableId, oldTableId)
    if (newTableId !== "")
      viewOptionList.value = await queryViewOptionList(newTableId)
  
})

// 2. 依据viewId变化，更新fieldOptionList
watch(targetViewId, async (newViewId, oldViewId) => {
    console.log("watch field", newViewId, oldViewId)
    if (newViewId !== "")
      fieldOptionList.value = await queryFieldOptionList(targetTableId.value, newViewId)
  
})

// 3. 依据fieldId和viewId变化，获取attachmentList
watch([targetViewId, targetFieldId], async ([newViewId, newFieldId], [oldViewId, oldFieldId]) => {
  if (newFieldId !== "" && newViewId !== "") {
    originAttachmentList = await queryAttachementList(targetTableId.value, targetViewId.value, newFieldId, targetNumberShown.value)
    // 数组拆分
    splitLogoShownList(originAttachmentList)
    const previewData = await dashboard.getPreviewData()
    console.log("previewData", previewData)
  }
  
})


// 4. 监听 state 变化
watch(dashboard.state, async (newState, oldState) => {
  state.value = dashboard.state

})

/**
 * @command {} 监听 Table 选择
 * @param {string} e table id value
 */
const onTableIdChange = (e) => {
  targetTableId.value = e
}

/**
 * @command {} 监听 View 选择
 * @param {string} e view id value
 */
const onViewIdChange = (e) => {
  targetViewId.value = e
  console.log("targetViewId.value", targetViewId.value)
}

/**
 * @command {} 监听 Attachment 选择
 * @param {string} e attachment field value
 */
const onFieldIdChange = (e) => {
  targetFieldId.value = e
}

/**
 * @command {} 监听Logo显示的最大数量
 * @param {string} e mode value
 */
const onOriginalNumberShownChange =  async (e) => {
  if (targetNumberShown.value < e) {
    targetNumberShown.value = e
    originAttachmentList = await queryAttachementList(targetTableId.value, targetViewId.value, targetFieldId.value, targetNumberShown.value)
    
  } else {
    targetNumberShown.value = e
    originAttachmentList = originAttachmentList.slice(0, targetNumberShown.value)
  }

  splitLogoShownList(originAttachmentList)
  
  
}

/**
 * @command {} 监听图片渲染模式
 * @param {string} e mode value
 */
const onModeOptionChange = (e) => {
  targetModeOption.value = e
}

/**
 * @command {} 监听 轮播图切换
 * @param {string} newIndex 轮播图当前index
 */
const onCarouselChange = (newIndex) => {
  carouselActiveIndex.value = newIndex;
};

const onOriginalStyleRowNumber = (e) => {
  targetStyleRowNumber.value = e
  console.log("targetStyleRowNumber", targetStyleRowNumber.value)
  splitLogoShownList(originAttachmentList)
}

const onOriginalStyleColumnNumber = (e) => {
  targetStyleColumnNumber.value = e
  console.log("targetStyleColumnNumber", targetStyleColumnNumber.value)
  splitLogoShownList(originAttachmentList)

}

const onOriginalStyleRowGap = (e) => {
  targetStyleRowGap.value = e
}

const onOriginalStyleColumnGap = (e) => {
  targetStyleColumnGap.value = e
}

const onOriginalStyleRadious = (e) => {
  targetStyleRadious.value = e
}

const onOriginalStyleBorderWidth = (e) => {
  targetStyleBorderWidth.value = e
}

const onOriginalStyleBgColor = (e) => {
  targetStyleBgColor.value = e
}

const onOriginalStyleBorderColor = (e) => {
  targetStyleBorderColor.value = e
}

const onTargetCarouselSpeed = (e) => {
  targetCarouselSpeed.value = e
  clearInterval(intervalId);
  intervalId = ""
  intervalId = setInterval(simulateCarouselChange, targetCarouselSpeed.value * 1000)
}





// --== 查询选项列表
/**
 * @query {} 获取 view 选项列表
 * @param {string} tableId 
 * @return {array} view 选项列表
 */
const queryViewOptionList = async (tableId) => {
  const list = await myBase.queryViewMetaList(tableId)
  list.unshift({name: t('allData'), id: "allData"})
  return await formatOptionList(list)
}

/**
 * @query {} 获取 field 选项列表
 * viewId 为空时，默认获取全部的数据
 * @param {string} tableId 
 * @param {string} viewId 
 * @return {array} field 选项列表
 */
const queryFieldOptionList = async (tableId, viewId) => {
  const list = await myBase.queryFieldMetaList(tableId, viewId)
  const listFiltered = list.filter((item) => item.type === 17)
  return await formatOptionList(listFiltered)
}






// --== 设置初始值
/**
 * @command {init} 初始化表格Id选项
 * 
 */
const initTableOptionList = async () => {
  const list = await myBase.queryBaseTableMetaList()
  tableOptionList.value = await formatOptionList(list)
}

/**
 * @query {} 查询 table 的默认值
 * @return {string} table id value
 */
const queryTableIdDefaultValue = async () => {
  
  return tableOptionList.value[0].value

}

const queryViewIdDefaultValue = () => {
  return 'allData'
}

/**
 * @query {} 默认获取当前table下的全部field
 * @param {string} targetTableId tableId
 */

const queryFieldIdDefaultValue = async (targetTableId) => {
  return
}

const queryOriginalAttachmentListDefaultValue = () => {
  const list = []
  const defaultLogoSrc = CONSTANT.DEFAULT_IMAGE_PATH
  for (let i = 0; i < targetNumberShown.value; i++) {
    list.push(defaultLogoSrc)
  }
  return list
}

/**
 * @command {update} 将 logo list 拆分成二维数组 
 * @param {array} attachmentList 附件一维数组
 */
const splitLogoShownList = (attachmentList) => {
  logoShownList.value = commonFn.splitListInto2DArray(attachmentList, targetStyleRowNumber.value * targetStyleColumnNumber.value)
  console.log("logoShownList", logoShownList.value)
}

/**
 * @command {init} 如果没有配置时，进行初始化操作
 */
const initWithoutConfig = async () => {
  
  await initTableOptionList()

  targetTableId.value = await queryTableIdDefaultValue()
  targetViewId.value = queryViewIdDefaultValue()
  originAttachmentList = queryOriginalAttachmentListDefaultValue()
  splitLogoShownList(originAttachmentList)
}

/**
 * @command {init} 初始化仪表盘
 */
const initDashboard = async (config) => {
  const customConfig = config.customConfig
  
  targetTableId.value = "tableId" in customConfig ? customConfig.tableId : await queryTableIdDefaultValue()
  targetViewId.value =  customConfig.viewId
  targetFieldId.value = customConfig.fieldId
  targetModeOption.value = customConfig.modeOption
  targetNumberShown.value = customConfig.numberShown
  targetStyleColumnNumber.value = customConfig.styleColumnNumber
  targetStyleRowGap.value = customConfig.styleRowGap
  targetStyleColumnGap.value = customConfig.styleColumnGap
  logoShownList.value = JSON.parse(customConfig.logoShownList) 
  originAttachmentList = JSON.parse(customConfig.originAttachmentList)
  targetCarouselSpeed.value = "carouselSpeed" in customConfig ? customConfig.carouselSpeed : 5

  // 模拟定时切换
  intervalId = setInterval(simulateCarouselChange, targetCarouselSpeed.value * 1000)

  // 获取初始值
  initTableOptionList()
}


onMounted(async () => {
  // 初始化勾选字段
  console.log(111) 
  state.value = dashboard.state 
  console.log("state", state.value)
  if (state.value == STATE_ARRAY[0]) {
    await initWithoutConfig()
  } else {
    const config = await dashboard.getConfig();
    console.log("config", config)
    if (! "customConfig" in config) 
      await initWithoutConfig()
    else 
      await initDashboard(config)

  }

});
    
</script>



<style scoped>


.main-config,
.main-display {
  transition: all 0.3s; /* 添加平滑过渡效果 */
}

.layout-container {
  width: 100%;
  height: 100%;
}


.layout-content {
  /* border: 1px solid #DEE0E3; */
  height: 42rem !important;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-container {
  width: 100%;
  height: 100%;
}

.layout-sider {
  border-left: 1px solid #DEE0E3;
  width: 26%;
}

.a-form-item {
  margin: 16px 0;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
}

:deep(.semi-input) {
  background-color: #fff;
}

:deep(.semi-carousel-indicator-line) {
  width: 40px;
}

:deep(.semi-carousel-indicator-line .semi-carousel-indicator-item) {
  border-radius: 40px;
  height: 5px;
}

.lable {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  text-align: left;

}

.style-container {
  margin-top: 8px;
  width: calc(100% - 16px);
  padding: 16px 8px;
  gap: 20px;
  border-radius: 6px;
  background-color: #f5f6f7;
  
  display: flex;
  flex-direction: column;

}

.style-container > div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.style-container > div > b-form-item {
  width: 48%;
  font-size: 12px !important;
  color: #646A73 !important;
}

.page-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.logo-list-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

.logo-container {
  height: 16%;
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.logo-container img, .semi-image-img-preview) {
  /* height: 100%; */
  width: 90%;
  height: 100%;
  
}

:deep(.semi-image) {
  display: flex;
  align-self: center;
  justify-content: center;
}



</style>