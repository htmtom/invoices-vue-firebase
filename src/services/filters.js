export class EqualityFilter {
  constructor({ field, value }) {
    this.field = field;
    this.value = value;
  }

  filter(items) {
    return items.filter(
      (item) => item[this.field] === this.value || this.value === "all"
    );
  }
}
