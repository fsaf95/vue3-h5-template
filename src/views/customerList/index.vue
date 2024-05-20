<script setup lang="ts" name="Tools">
import "vant/es/toast/style";
import Select from "./component/Select.vue";
import CustomerTable from "./component/CustomerTable.vue";
import { ref } from "vue";
import { isNameValid, isPhoneNumberValid } from "@/utils/utils";
import { showToast } from "vant";

const nameInfo: string = ref("");
const allData: any = ref([
  {
    id: 1,
    name: "张三",
    phone: "123456789",
    couponStatus: 2,
    amount: 100,
    couponTime: "2023-01-01"
  },
  {
    id: 2,
    name: "张三",
    phone: "123456789",
    couponStatus: 1,
    amount: 100,
    couponTime: "2023-01-01"
  },
  {
    id: 3,
    name: "张三",
    phone: "123456789",
    couponStatus: 2,
    amount: 100,
    couponTime: "2023-01-01"
  },
  {
    id: 4,
    name: "张三",
    phone: "123456789",
    couponStatus: 1,
    amount: 100,
    couponTime: "2023-01-01"
  },
  {
    id: 5,
    name: "张三",
    phone: "123456789",
    couponStatus: 2,
    amount: 100,
    couponTime: "2023-01-01"
  },
  {
    id: 6,
    name: "张三",
    phone: "123456789",
    couponStatus: 1,
    amount: 100,
    couponTime: "2023-01-01"
  },
  {
    id: 7,
    name: "张三",
    phone: "123456789",
    couponStatus: 2,
    amount: 100,
    couponTime: "2023-01-01"
  },
  {
    id: 8,
    name: "张三",
    phone: "123456789",
    couponStatus: 2,
    amount: 100,
    couponTime: "2023-01-01"
  },
  {
    id: 9,
    name: "张三",
    phone: "123456789",
    couponStatus: 1,
    amount: 100,
    couponTime: "2023-01-01"
  },
  {
    id: 10,
    name: "张三",
    phone: "123456789",
    couponStatus: 2,
    amount: 100,
    couponTime: "2023-01-01"
  },
  {
    id: 11,
    name: "张三",
    phone: "123456789",
    couponStatus: 2,
    amount: 100,
    couponTime: "2023-01-01"
  }
]);
const overlayShow: boolean = ref(false);
const selectedValue: number = ref(0);
const formUser = ref({
  userName: "",
  userPhone: "",
  userBranch: "",
  userActivity: ""
});
const branchList = ref([
  { id: 1, value: "广州" },
  { id: 2, value: "深圳" },
  { id: 3, value: "北京" }
]);

const activityList = ref([
  { id: 1, value: "中国银行" },
  { id: 2, value: "农业银行" },
  { id: 3, value: "北京银行" }
]);

// 查询
const handleInquire = () => {
  allData.value = allData.value.filter(
    item => item.couponStatus === Number(selectedValue.value)
  );
  console.log(allData.value, selectedValue.value, 1111);
};

// 获取select选项框选中的值
const handlePetSelected = selectedPetValue => {
  // 处理接收到的值
  selectedValue.value = selectedPetValue;
};

const handleNewCustomer = () => {
  overlayShow.value = true;
};

const onSubmit = () => {
  if (!isNameValid(formUser.value.userName)) {
    return;
  }
  //验证手机号码是否正确
  if (!isPhoneNumberValid(formUser.value.userPhone)) {
    return;
  }
  if (!formUser.value.userBranch) return showToast("请选择网点支行");
  if (!formUser.value.userActivity) return showToast("请选择活动");
};
</script>

<template>
  <div class="customer-con">
    <div class="w-full h-[300px]">
      <van-image
        width="100%"
        height="100%"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      />
    </div>
    <div class="px-[26px] py-[40px] overflow-hidden">
      <div class="flex items-center justify-between">
        <Select @handleSelected="handlePetSelected" />
        <input
          v-model="nameInfo"
          placeholder="输入姓名或手机号"
          class="input-info"
        />
        <van-button
          type="danger"
          class="w-[100px] !h-[70px] !rounded-[10px] !text-[24px]"
          @click="handleInquire"
          >搜索
        </van-button>
      </div>
      <div>
        <CustomerTable :allData="allData" />
      </div>
      <div
        class="m-auto w-[380px] px-[20px] py-[10px] text-center rounded-[40px] text-[32px] text-[#ffffff] bg-[#ec0e07]"
        @click="handleNewCustomer"
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
            v-model="formUser.userName"
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
            v-model="formUser.userPhone"
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
            v-model="formUser.userActivity"
            placeholder="请选择网点支行"
          >
            <option
              v-for="pet in activityList"
              :key="pet.value"
              :value="pet.value"
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

<style lang="less" scoped>
.input-info {
  padding: 14px 10px;
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
