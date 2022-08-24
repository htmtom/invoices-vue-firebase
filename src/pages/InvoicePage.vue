<template>
  <div class="container">
    <router-link class="go-back" to="/">&larr; &nbsp; Go back</router-link>
    <div class="skeleton" v-if="data.loading">
      <skeletor width="100%" height="50" />
      <skeletor width="100%" height="300" />
    </div>

    <brief-message v-else-if="data.invoice == undefined"
      >Invoice not found</brief-message
    >

    <div class="invoice-data" v-else>
      <div class="invoice-header box">
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

      <div class="invoice-details box">
        <div class="header">
          <p class="id">{{ data.invoice.id }}</p>
          <ul class="secondary">
            <li>{{ data.invoice.from.streetAddress }}</li>
            <li>{{ data.invoice.from.city }}</li>
            <li>{{ data.invoice.from.postcode }}</li>
            <li>{{ data.invoice.from.country }}</li>
          </ul>
        </div>
        <div class="details">
          <div class="dates">
            <div class="date">
              <p class="secondary">Invoice date</p>
              <p class="primary">{{ dates?.currentDate }}</p>
            </div>
            <div class="date">
              <p class="secondary">Payment due</p>
              <p class="primary">{{ dates?.dueDate }}</p>
            </div>
          </div>

          <div class="to">
            <div class="secondary">Bill to</div>
            <p class="primary client">{{ data.invoice.to.clientName }}</p>
            <ul class="secondary">
              <li>{{ data.invoice.to.streetAddress }}</li>
              <li>{{ data.invoice.to.city }}</li>
              <li>{{ data.invoice.to.postcode }}</li>
              <li>{{ data.invoice.to.country }}</li>
            </ul>
          </div>

          <div class="email">
            <p class="secondary">Sent to</p>
            <p class="primary client">{{ data.invoice.to.clientEmail }}</p>
          </div>
        </div>

        <table class="table">
          <thead class="secondary">
            <td>Name</td>
            <td>Price</td>
            <td>Qty</td>
            <td>Total</td>
          </thead>
          <tbody class="primary">
            <tr v-for="item in data.invoice.items" :key="item.id">
              <td>{{ item.name }}</td>
              <td>{{ item.price }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ (item.quantity * item.price).toFixed(2) }}$</td>
            </tr>
          </tbody>
        </table>
        <div class="total">
          <p>Total</p>
          <p class="total-text">{{ data.invoice.total }}$</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BriefMessage from "../components/BriefMessage.vue";
import { deleteInvoice, markInvoiceAsPaid } from "../firebase/controllers";
import { useToast } from "vue-toastification";
import { asyncHandler, formatDate, formatFirebaseError } from "../utils";

export default {
  components: { BriefMessage },
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
    dates() {
      return formatDate({
        curInSeconds: this.data?.invoice?.date?.seconds,
        allowedInDays: this.data?.invoice?.allowedPeriod,
      });
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--main-label);
  margin-bottom: 5rem;

  .status {
    display: flex;
    align-items: center;
    font-size: 1.4rem;
  }
}

.invoice-details {
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3rem;
  }

  .details {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-bottom: 5rem;

    .date {
      margin-bottom: 2rem;
    }
  }

  .table {
    width: 100%;
    border-radius: 5px;
    border-collapse: collapse;

    td {
      padding: 2rem;
    }

    thead {
      background: var(--table-bg);
      color: var(--secondary-text);
      padding: 1rem;
    }

    tbody {
      color: var(--main-text);

      tr {
        &:nth-child(odd) {
          background: var(--invoice-bg);
        }
        &:nth-child(even) {
          background: var(--main-space);
        }
      }
    }
  }

  .total {
    background: var(--main-text);
    color: var(--main-space);
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;

    &-text {
      font-size: 2.5rem;
    }
  }
}

.primary {
  font-weight: 600;
  color: var(--main-text);
  font-size: 1.4rem;

  &.client {
    margin-block: 1rem;
  }
}
.secondary {
  font-weight: 300;
  color: var(--secondary-text);
  font-size: 1.2rem;
}
</style>
