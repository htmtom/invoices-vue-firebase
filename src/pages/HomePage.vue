<template>
  <div class="container">
    <invoice-new-form :isOpen="isOpen" :toggle="toggleForm" />
    <home-header
      :toggleForm="toggleForm"
      :selectedStatus="selectedStatus"
      :handleChange="handleChange"
    />
    <brief-message variant="info" v-if="!isAuthenticated">
      Sign in to start creating your invoices.
    </brief-message>

    <div class="skeleton" v-if="invoices.loading">
      <Skeletor v-for="count in 4" :key="count" width="100%" height="50" />
    </div>

    <brief-message
      variant="info"
      v-else-if="
        invoices.data.length == 0 && isAuthenticated && selectedStatus == 'all'
      "
    >
      Start creating your invoices from new invoice button!
    </brief-message>
    <div class="invoices" v-else>
      <transition-group name="fade">
        <home-invoice
          v-for="invoice in invoices.data"
          :key="invoice.id"
          :invoice="invoice"
        />
      </transition-group>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";

import HomeHeader from "../components/HomeHeader.vue";
import HomeInvoice from "../components/HomeInvoice.vue";
import InvoiceNewForm from "../components/InvoiceNewForm.vue";
import BriefMessage from "../components/BriefMessage.vue";
import useToggle from "../composables/useToggle";
import { EqualityFilter } from "../services/filters";

const selectedStatus = ref("all");
const store = useStore();
const { isTrue: isOpen, toggle: toggleForm } = useToggle();

const filters = computed(() => {
  return [new EqualityFilter({ field: "status", value: selectedStatus.value })];
});
//store.state.invoices
const invoices = computed(() => ({
  loading: store.state.invoices.loading,
  data: filters.value.reduce(
    (acc, cur) => cur.filter(acc),
    store.state.invoices.data
  ),
}));

const isAuthenticated = computed(() => !!store.state.user);

function handleChange(event) {
  console.log(event);
  selectedStatus.value = event.target.value;
}
</script>

<style scoped>
.container {
  color: var(--main-text);
}

.invoices,
.skeleton {
  margin-block: 4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
