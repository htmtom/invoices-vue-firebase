import { createStore } from "vuex";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      invoices: {
        data: [],
        loading: false,
      },
      isAuthenticated: false,
    };
  },
  mutations: {
    loadingInvoices(state) {
      state.invoices.loading = true;
    },
    setInvoices(state, invoices) {
      state.invoices.data = invoices;
      state.invoices.loading = false;
    },

    login(state, user) {
      state.user = user;
    },

    logout(state) {
      state.user = null;
      state.invoices.data = [];
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
