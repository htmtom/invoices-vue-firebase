<template>
  <div class="new-invoice" :class="{ open: props.isOpen }">
    <form @submit.prevent="handleSubmit">
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

      <h5 class="title">Invoice Date</h5>
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
          label="Allowed period in days"
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

      <h5 class="title">Invoice items</h5>
      <new-items
        :items="data.items"
        :addNewItem="addNewItem"
        :handleChangeItem="handleChangeItem"
        :handleDeleteItem="handleDeleteItem"
      />
      <div class="draft">
        <input
          id="isDraft"
          name="isDraft"
          type="checkbox"
          v-model="data.isDraft"
        />
        <label for="isDraft"> Mark as draft</label>
      </div>
      <div class="btns-container">
        <button type="button" class="btn-cancel" @click="props.toggle">
          Cancel
        </button>
        <button class="btn-submit" :class="{ disabled: loading }" type="submit">
          Create invoice
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import NewItems from "./NewItems.vue";
import InputBase from "./InputBase.vue";
import { useToast } from "vue-toastification";
import DatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { computed, ref, defineProps } from "vue";
import { uid } from "uid";

import { createInvoice } from "../firebase/controllers";
import { asyncHandler, formatFirebaseError } from "../utils";

function createEmptyInvoice() {
  return {
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
    isDraft: true,
    allowedPeriod: 1, //In days
    items: [
      {
        name: "",
        quantity: 1,
        price: 0,
        id: Date.now(),
      },
    ],
  };
}

const props = defineProps(["isOpen", "toggle"]);
const toast = useToast();
const loading = ref(false);
const data = ref(createEmptyInvoice());

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

  return `${year}/${month}/${day}`;
}

function addNewItem() {
  data.value.items.push({
    name: "",
    quantity: 1,
    price: 0,
    id: Date.now(),
  });
}

function handleChangeItem(index, name, value) {
  data.value.items[index][name] = value;
}

function handleDeleteItem(index) {
  console.log("Clicked");
  data.value.items.splice(index, 1);
}

async function handleSubmit() {
  loading.value = true;
  const { isDraft, ...rest } = data.value;
  const invoice = {
    ...rest,
    id: uid(7),
    status: isDraft ? "draft" : "pending",
    total: data.value.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    ),
  };
  const [, err] = await asyncHandler(createInvoice, { invoice });
  if (err) {
    toast.error(formatFirebaseError(err));
  } else {
    toast.success("Invoice created successfully");
    props.toggle(false);
    data.value = createEmptyInvoice();
  }
  loading.value = false;
}
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

  .btns-container {
    margin-block: 2rem;
    display: flex;

    .btn-cancel {
      flex-grow: 1;
      background-color: var(--main-text);
      color: var(--main-space);
    }
    .btn-submit {
      flex-grow: 6;
    }
  }

  .draft {
    color: var(--main-text);
    margin-top: 1rem;
  }
}
</style>
