<script setup lang="ts" name="Tools">
import Select from "./component/Select.vue";
import CustomerTable from "./component/CustomerTable.vue";
import { ref, onMounted } from "vue";
import { isNameValid, isPhoneNumberValid } from "@/utils/utils";
import { showFailToast, showToast } from "vant";
import { createCustomer, searchCustomer } from "@/api";
import headBg from "@/assets/head-bg.png"

const allData: any[] = ref([]); // 列表数据
const overlayShow: boolean = ref(false);
const formUser = ref({
  customer_name: "", // 姓名
  mobile: "", // 手机号码
  userBranch: "",
  act_id: "" // 活动id
});

const pageData = ref({
  total_count: 0, //记录总数
  current_page: 0, //当前页
  per_page: 0,//页大小
  last_page: 0 // 最后页
});

const searchData = ref({
  obtain_status: '', // 领取状态
  keyword: ""  // 姓名或手机号码
});

const branchList = ref([
  { id: 1, value: "广州" },
  { id: 2, value: "深圳" },
  { id: 3, value: "北京" }
]);

const activityList = ref([
  { id: 39, value: "新客有礼券包80元" }
]);

onMounted(() => {
  getCustomerList({});
});

// 客户名单列表
const getCustomerList = (data) => {
  searchCustomer(data).then(res => {
    allData.value = res.data.data;
    pageData.value.total_count = res.data.total_count;
    pageData.value.current_page = res.data.current_page;
    pageData.value.per_page = res.data.per_page;
    pageData.value.last_page = res.data.last_page;
  }).catch(error => {
    showFailToast(error);
  });
};

const handlePageChanged = (value) =>{
  pageData.value.current_page = value
  getCustomerList({page:pageData.value.current_page})
}

// 列表搜索
const handleInquire = () => {
  getCustomerList(searchData.value);
};

const handlePetSelected = selectedPetValue => {
  searchData.value.obtain_status = selectedPetValue; // 列表的领取状态
};

// 新增客户白名单
const onSubmit = () => {
  if (!isNameValid(formUser.value.customer_name)) {
    return;
  }
  //验证手机号码是否正确
  if (!isPhoneNumberValid(formUser.value.mobile)) {
    return;
  }
  if (!formUser.value.userBranch) return showToast("请选择网点支行");
  if (!formUser.value.act_id) return showToast("请选择活动");
  createCustomer(formUser.value).then(res => {
    if (res.code !== 0) {
      showFailToast(res.msg);
    } else {
      showToast(res.msg);
      overlayShow.value = false;
    }
  });
};
</script>

<template>
  <div class="customer-con">
    <div class="w-full h-[300px]">
      <van-image
        width="100%"
        height="100%"
        :src="headBg"
      />
    </div>
    <div class="px-[26px] py-[40px] overflow-hidden">
      <div class="flex items-center justify-between">
        <Select @handleSelected="handlePetSelected" />
        <van-cell-group>
          <van-field
            class="input-info"
            v-model="searchData.keyword"
            center
            clearable
            placeholder="输入姓名或手机号"
          ></van-field>
        </van-cell-group>
        <van-button
          type="danger"
          class="w-[100px] !h-[70px] !rounded-[10px] !text-[24px]"
          @click="handleInquire"
        >搜索
        </van-button>
      </div>
      <CustomerTable :allData="allData" :total_count="pageData.total_count" :current_page="pageData.current_page"
                     :per_page="pageData.per_page" :last_page="pageData.last_page" @pageChanged="handlePageChanged" />
      <div
        class="m-auto w-[380px] px-[20px] py-[10px] text-center rounded-[40px] text-[32px] text-[#ffffff] bg-[#ec0e07]"
        @click="overlayShow = true;"
      >
        新增客户
      </div>
    </div>
  </div>
  <van-overlay class="!z-10" :show="overlayShow">
    <div class="wrapper p-[40px] text-[28px]" @click.stop>
      <div class="icon-cross" @click="overlayShow = false">
        <van-icon name="cross" />
      </div>
      <div class="mt-[30px] text-[42px] text-[#333333] font-bold text-center">
        新增白名单
      </div>
      <van-form class="!mt-[20px] overflow-hidden">
        <div class="flex items-center my-[30px]">
          <div class="w-[150px] text-right box-border text-[#333333]">
            姓名:
          </div>
          <input
            class="flex-auto ml-[20px] py-[10px] px-[20px] bg-[#f2f2f2] border-[2px] border-[#e0e0e0] border-solid rounded-[10px] text-[#333333]"
            v-model="formUser.customer_name"
            name="姓名"
            placeholder="请输入姓名"
          />
        </div>
        <div class="flex items-center my-[30px]">
          <div class="w-[150px] text-right box-border text-[#333333]">
            手机号:
          </div>
          <input
            class="flex-auto ml-[20px] py-[10px] px-[20px] bg-[#f2f2f2] border-[2px] border-[#e0e0e0] border-solid rounded-[10px] text-[#333333]"
            v-model="formUser.mobile"
            name="手机号"
            maxlength="11"
            placeholder="请输入手机号"
          />
        </div>
        <div class="flex items-center my-[30px]">
          <div class="w-[150px] text-right box-border text-[#333333]">
            网点支行:
          </div>
          <select
            class="flex-auto ml-[20px] py-[10px] px-[20px] bg-[#ffffff] border-[2px] border-[#e0e0e0] border-solid rounded-[10px] text-[#333333]"
            name="pets"
            id="pet-select"
            v-model="formUser.userBranch"
            placeholder="请选择网点支行"
          >
            <option v-for="pet in branchList" :key="pet.value" :value="pet.id">
              {{ pet.value }}
            </option>
          </select>
        </div>
        <div class="flex items-center my-[30px]">
          <div class="w-[150px] text-right box-border text-[#333333]">
            参与活动:
          </div>
          <select
            class="flex-auto ml-[20px] py-[10px] px-[20px] bg-[#ffffff] border-[2px] border-[#e0e0e0] border-solid rounded-[10px] text-[#333333]"
            name="pets"
            id="pet-select"
            v-model="formUser.act_id"
            placeholder="请选择网点支行"
          >
            <option
              v-for="pet in activityList"
              :key="pet.value"
              :value="pet.id"
            >
              {{ pet.value }}
            </option>
          </select>
        </div>
        <van-button
          class="!mt-[40px] !mx-auto !w-[360px] !h-[70px] !text-[28px]"
          round
          block
          type="danger"
          native-type="submit"
          @click="onSubmit"
        >
          确定
        </van-button>
      </van-form>
    </div>
  </van-overlay>
</template>

<style lang="less">

.input-info {
  width: 350px;
  padding: 12px 20px;
  font-size: 26px;
  color: #333333;
  border-radius: 10px;
  border: 2px solid #ccc;
  box-sizing: border-box;
}

.wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 60%;
  background-color: #fff;
  border-radius: 16px;

  .icon-cross {
    position: absolute;
    top: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #f11b1b;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
  }
}

.van-toast {
  --van-toast-font-size: 34px;
  --van-toast-text-padding: 10px 20px;
  --van-toast-line-height: 1.6em;
}

.van-field {
  --van-cell-vertical-padding: 18px;
  --van-cell-horizontal-padding: 18px;
  --van-cell-font-size: 28px;
  --van-cell-icon-size: 28px;
  --van-cell-line-height: 1.6em;
  --van-field-error-message-font-size: 22px;
}

.van-popup {
  --van-picker-action-font-size: 28px;
  --van-picker-action-padding: 10px 20px;
  --van-picker-toolbar-height: auto;
  --van-picker-option-font-size: 28px;
}
</style>
