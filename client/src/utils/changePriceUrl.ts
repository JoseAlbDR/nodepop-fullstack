export const changePriceUrl = (form: HTMLFormElement) => {
  const minPrice = form.querySelector('input[data-index="0"]');
  const maxPrice = form.querySelector('input[data-index="1"]');
  if (minPrice && maxPrice) {
    minPrice.setAttribute('name', 'min-price');
    maxPrice.setAttribute('name', 'max-price');
  }
};
