<template>
  <div class="container">
    <invoice-new-form :isOpen="isOpen" :toggle="toggleForm" />
    <home-header :toggleForm="toggleForm" />

    <div class="invoices">
      <home-invoice
        v-for="invoice in invoices"
        :key="invoice.id"
        :invoice="invoice"
      />
    </div>
  </div>
</template>

<script setup>
import HomeHeader from "../components/HomeHeader.vue";
import HomeInvoice from "../components/HomeInvoice.vue";
import InvoiceNewForm from "../components/InvoiceNewForm.vue";
import { invCol } from "../firebase/controllers";
import { formatFirebaseRecord } from "../utils";
import { ref, onMounted, onUnmounted } from "vue";
import { onSnapshot } from "firebase/firestore";

const isOpen = ref(false);
const sub = ref("");
const invoices = ref([]);

function toggleForm() {
  isOpen.value = !isOpen.value;
}

onMounted(() => {
  sub.value = onSnapshot(invCol, (snap) => {
    invoices.value = snap.docs.map(formatFirebaseRecord);
  });
});

onUnmounted(() => {
  sub.value();
});
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
