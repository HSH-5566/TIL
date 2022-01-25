// 0. 품절.
// num번째 요소를 품절로 변경
function soldOutGoods(num) {
  const goods = $(`#tbl_cart_list tbody tr:nth-child(${num})`)[0];
  const goodsCheck = $(goods).find(`input[name = choice_prd]`)[0];
  goodsCheck.disabled = true;

  const goodsQty = $(goods).find(`.g_qty .qty #cnt3`)[0];
  const SOLD_OUT_VALUE = Number(0);
  goodsQty.setAttribute("value", SOLD_OUT_VALUE);
  goodsQty.disabled = true;

  const goodsQtyPlusBtn = $(goods).find(`.g_qty .qty .plus`)[0];
  const goodsQtyMinusBtn = $(goods).find(`.g_qty .qty .minus`)[0];
  goodsQtyPlusBtn.onclick = null;
  goodsQtyMinusBtn.onclick = null;

  const goodsChangeBtn = $(goods).find(`.modi`)[0];
  goodsChangeBtn.onclick = null;

  const goodsBuyBtn = $(goods).find(`.g_ord > a`)[0];
  goodsBuyBtn.onclick = null;

  // const goodsPrice = goods.querySelector(`.g_prc`);
  // const deliveryCharge = goods.querySelector(`.g_dvr`);
  // const GOODS_SOLD_OUT = `<span>품절</span>`;
  // goodsPrice.innerHTML = GOODS_SOLD_OUT;
  // deliveryCharge.innerHTML = GOODS_SOLD_OUT;
}
soldOutGoods(1);
