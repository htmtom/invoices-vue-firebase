<template>
  <router-link :to="`/invoice/${invoice.id}`">
    <div class="invoice">
      <p class="id">{{ invoice.id }}</p>
      <p class="data">{{ date }}</p>
      <p class="data">{{ invoice.to.clientName }}</p>
      <p></p>
      <p class="total">{{ invoice.total }}$</p>
      <p class="status-button" :class="invoice.status">
        {{ invoice.status }}
      </p>
    </div>
  </router-link>
</template>

<script>
import { format } from "date-fns";

export default {
  props: ["invoice"],
  computed: {
    date() {
      return format(new Date(this.invoice.date.seconds * 1000), "yyyy/MM/dd");
    },
  },
};
</script>

<style lang="scss" scoped>
.invoice {
  background-color: var(--invoice-bg);
  padding: 2rem 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer;
  font-size: 1.3rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 2fr 1fr 1fr;
  align-items: center;
  gap: 3rem;

  &:hover {
    border: 1px solid var(--main-text);
  }

  .id {
    font-weight: 700;
    text-transform: uppercase;
  }

  .data {
    color: var(--secondary-text);
  }

  .total {
    font-size: 1.7rem;
    font-weight: 800;
  }
}
</style>
