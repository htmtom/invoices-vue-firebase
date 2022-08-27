<template>
  <router-link :to="`/invoice/${invoice.id}`">
    <div class="invoice box">
      <p class="id">{{ invoice.id }}</p>
      <p class="data">{{ date }}</p>
      <p class="data">{{ invoice.to.clientName }}</p>
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
@use "../assets/mixins";

.invoice {
  cursor: pointer;
  font-size: 1.6rem;
  display: grid;
  grid-template-columns: 1fr 1fr 4fr 1fr 1fr;
  align-items: center;
  gap: 3rem;

  @include mixins.respond(mobile) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-auto-flow: column;
    gap: 0;
  }

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

  .status-button {
    justify-self: flex-start;
  }
}
</style>
