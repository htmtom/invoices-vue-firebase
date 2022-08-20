import { createStore } from "vuex";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      invoices: {
        data: [],
        loading: true,
      },
    };
  },
  mutations: {
    setInvoices(state, invoices) {
      state.invoices.data = invoices;
      state.invoices.loading = false;
    },
  },
});

export default store;
