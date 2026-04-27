// app.js — Vue Food Order Calculator
// Lab Activity 06 | SECJ 3483 Web Technology
// Includes Extension Activities: discount, remove, totalSales, high-value badge

const app = Vue.createApp({
  data() {
    return {
      appTitle: 'Food Order Calculator App',
      cafeName: 'MyCampus Café',
      location: 'Faculty of Computing',
      customerName: '',
      selectedFood: '',
      quantity: 1,
      foods: [
        { name: 'Nasi Lemak',    price: 5 },
        { name: 'Chicken Rice',  price: 7 },
        { name: 'Mee Goreng',    price: 6 },
        { name: 'Sandwich',      price: 4 }
      ],
      orders: [],
      nextId: 1   // used to give each order a unique key for transitions
    };
  },

  computed: {
    // Raw subtotal before any discount
    subtotalPrice() {
      if (!this.selectedFood) return 0;
      return this.selectedFood.price * this.quantity;
    },

    // Extension Activity 1: 10% discount when subtotal >= RM30
    hasDiscount() {
      return this.subtotalPrice >= 30;
    },

    discountAmount() {
      return this.hasDiscount ? this.subtotalPrice * 0.10 : 0;
    },

    // Final total after optional discount
    totalPrice() {
      return this.subtotalPrice - this.discountAmount;
    },

    // Extension Activity 4: flag for "high value order" (total > RM50)
    isHighValue() {
      return this.totalPrice > 50;
    },

    // Extension Activity 3: sum of all order totals
    totalSales() {
      return this.orders.reduce((sum, order) => sum + order.total, 0);
    }
  },

  methods: {
    addOrder() {
      if (!this.customerName || !this.selectedFood || this.quantity <= 0) {
        alert('Please complete all order information correctly.');
        return;
      }

      const order = {
        id:         this.nextId++,
        customer:   this.customerName,
        food:       this.selectedFood.name,
        quantity:   this.quantity,
        total:      this.totalPrice,
        discounted: this.hasDiscount,   // flag for badge in table
        highValue:  this.isHighValue    // Extension Activity 4
      };

      this.orders.push(order);

      // Reset form
      this.customerName  = '';
      this.selectedFood  = '';
      this.quantity      = 1;
    },

    // Extension Activity 2: remove an order by index
    removeOrder(index) {
      this.orders.splice(index, 1);
    }
  }
});

app.mount('#app');
