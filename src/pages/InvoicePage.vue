<template>
  <div class="container">
    <router-link class="go-back" to="/">&larr; &nbsp; Go back</router-link>
    <div class="skeleton" v-if="data.loading">
      <skeletor width="100%" height="50" />
      <skeletor width="100%" height="300" />
    </div>

    <brief-message v-else-if="data.invoice == undefined">
      Invoice not found
    </brief-message>

    <div class="invoice-data" v-else>
      <div class="invoice-header">
        <div class="status">
          Status: &nbsp;
          <button class="status-button" :class="data.invoice.status">
            {{ data.invoice.status }}
          </button>
        </div>

        <div class="btns">
          <button class="red" :class="{ disabled: loading }" @click="remove">
            Delete invoice
          </button>
          <button
            class="green"
            v-show="data.invoice.status !== 'paid'"
            :class="{ disabled: loading }"
            @click="markAsPaid"
          >
            Mark as Paid
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BriefMessage from "../components/BriefMessage.vue";
import { deleteInvoice, markInvoiceAsPaid } from "../firebase/controllers";
import { useToast } from "vue-toastification";
import { asyncHandler, formatFirebaseError } from "../utils";

export default {
  components: [BriefMessage],
  data() {
    return { loading: false };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  computed: {
    data() {
      return this.$store.getters.getInvoiceById(this.$route.params.id);
    },
  },
  mounted() {
    console.log(this.data);
  },
  methods: {
    async markAsPaid() {
      this.loading = true;
      const [, err] = await asyncHandler(markInvoiceAsPaid, {
        id: this.$route.params.id,
      });
      this.loading = false;
      if (err) {
        this.toast.error(formatFirebaseError(err));
      }
    },

    async remove() {
      if (window.confirm("Delete invoice?")) {
        this.loading = true;
        const [, err] = await asyncHandler(deleteInvoice, {
          id: this.$route.params.id,
        });
        this.loading = false;
        if (err) {
          this.toast.error(formatFirebaseError(err));
        } else {
          this.$router.push("/");
          this.toast.success("Deleted Successfully");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.go-back {
  display: block;
  margin-bottom: 2rem;
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--main-label);
}

.invoice-header {
  background: var(--invoice-bg);
  border-radius: 5px;
  padding: 1.5rem 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--main-label);

  .status {
    display: flex;
    align-items: center;
    font-size: 1.4rem;
  }
}
</style>
