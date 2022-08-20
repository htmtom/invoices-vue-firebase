<template>
  <div class="container">
    <invoice-new-form :isOpen="isOpen" :toggle="toggleForm" />
    <home-header :toggleForm="toggleForm" />

    <div class="skeleton" v-if="invoices.loading">
      <Skeletor width="100%" height="50" style="margin-top: 2rem" />
      <Skeletor width="100%" height="50" style="margin-top: 2rem" />
      <Skeletor width="100%" height="50" style="margin-top: 2rem" />
      <Skeletor width="100%" height="50" style="margin-top: 2rem" />
    </div>
    <div class="invoices" v-else>
      <home-invoice
        v-for="invoice in invoices.data"
        :key="invoice.id"
        :invoice="invoice"
      />
    </div>
  </div>
</template>

<script setup>
import HomeHeader from "../components/HomeHeader.vue";
import { Skeletor } from "vue-skeletor";
import HomeInvoice from "../components/HomeInvoice.vue";
import InvoiceNewForm from "../components/InvoiceNewForm.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";

const isOpen = ref(false);
const store = useStore();

const invoices = computed(() => store.state.invoices);

function toggleForm() {
  isOpen.value = !isOpen.value;
}
</script>

<style scoped>
.container {
  color: var(--main-text);
}

.invoices {
  margin-block: 4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
