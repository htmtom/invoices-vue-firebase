<template>
  <div class="new-invoice" :class="{ open: props.isOpen }">
    <h5 class="title">Bill from</h5>
    <div class="inputs-container">
      <input-base
        v-model="data.from.streetAddress"
        label="Street Address"
        name="streetAddress"
        type="text"
        inputClass="width-100"
      />
      <input-base
        v-model="data.from.city"
        label="City"
        name="city"
        type="text"
        inputClass="width-30"
      />
      <input-base
        v-model="data.from.postcode"
        label="Postal code"
        name="postcode"
        type="text"
        inputClass="width-30"
      />
      <input-base
        v-model="data.from.country"
        label="Country"
        name="country"
        type="text"
        inputClass="width-30"
      />
    </div>

    <h5 class="title">Bill to</h5>
    <div class="inputs-container">
      <input-base
        v-model="data.to.clientName"
        label="Client Name"
        name="clientName"
        type="text"
        inputClass="width-100"
      />
      <input-base
        v-model="data.to.clientEmail"
        label="Client email"
        placeholder="e.g: tom@gmail.com"
        name="clientEmail"
        type="text"
        inputClass="width-100"
      />
      <input-base
        v-model="data.to.streetAddress"
        label="Street Address"
        name="streetAddress"
        type="text"
        inputClass="width-100"
      />
      <input-base
        v-model="data.to.city"
        label="City"
        name="city"
        type="text"
        inputClass="width-30"
      />
      <input-base
        v-model="data.to.postcode"
        label="Postal code"
        name="postcode"
        type="text"
        inputClass="width-30"
      />
      <input-base
        v-model="data.to.country"
        label="Country"
        name="country"
        type="text"
        inputClass="width-30"
      />
    </div>

    <h5 class="title">Invoice info</h5>
    <div class="inputs-container">
      <input-base label="Issued date">
        <date-picker
          class="extraPadding"
          v-model="data.date"
          :format="formatDate"
          autoApply
        />
      </input-base>
      <input-base
        v-model="data.allowedPeriod"
        label="Allowed period in dats"
        name="allowedPeriod"
        type="number"
        inputClass="width-60"
      />
      <input-base
        v-model="dueDate"
        class="disabled"
        label="Due date"
        name="dueDate"
        type="text"
        inputClass="width-30"
      />
    </div>
  </div>
</template>

<script setup>
import InputBase from "./InputBase.vue";
import DatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { computed, defineProps, onUpdated, ref } from "vue";

const props = defineProps(["isOpen"]);
const data = ref({
  from: {
    streetAddress: "",
    city: "",
    postcode: "",
    country: "",
  },
  to: {
    clientName: "",
    clientEmail: "",
    streetAddress: "",
    city: "",
    postcode: "",
    country: "",
  },
  date: new Date(),
  allowedPeriod: 1, //In days
  items: [
    {
      name: "",
      quantity: 1,
      price: 0,
    },
  ],
});

const dueDate = computed(() =>
  formatDate(
    new Date(
      data.value.date.getTime() +
        +data.value.allowedPeriod * 24 * 60 * 60 * 1000
    )
  )
);

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

onUpdated(() => {
  console.log(data.value.date);
});
</script>

<style lang="scss" scoped>
.new-invoice {
  position: absolute;
  height: 100vh;
  width: 50rem;
  background: var(--main-form);
  top: 0;
  left: var(--aside-width);
  overflow-y: scroll;
  scrollbar-width: 0;
  -ms-overflow-style: none;
  transition: 0.5s transform ease-in-out;
  transform: translateX(-110%);
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 1.5rem 0 4rem rgba(0, 0, 0, 0.1);
  padding: 5rem;

  &::-webkit-scrollbar {
    display: none;
  }

  &.open {
    transform: translateX(0);
  }

  .title {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--purple);
    margin-bottom: 1.4rem;

    &:not(:first-child) {
      margin-top: 6rem;
    }
  }

  .inputs-container {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;

    > * {
      flex-grow: 1;
    }
  }
}
</style>
