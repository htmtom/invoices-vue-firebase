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

  getters: {
    getInvoiceById: (state) => (id) => {
      return {
        loading: state.invoices.loading,
        invoice: state.invoices.data.find((invoice) => invoice.id === id),
      };
    },
  },
});

export default store;
