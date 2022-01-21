// 0. 품절.
function soldOutGoods(num) {
  const goods = document.querySelector(
    `#tbl_cart_list tbody tr:nth-child(${num})`
  );
  const goodsQty = goods.querySelector(`.g_qty .qty #cnt3`);
  const qtyValue = Number(0);
  goodsQty.value = qtyValue;
  goodsQty.disabled = true;

  const goodsQtyBtnPlus = goods.querySelector(`.g_qty .qty .plus`);
  const goodsQtyBtnMinus = goods.querySelector(`.g_qty .qty .minus`);
  goodsQtyBtnPlus.onclick = null;
  goodsQtyBtnMinus.onclick = null;

  const goodsPrice = goods.querySelector(`.g_prc`);
  const deliveryCharge = goods.querySelector(`.g_dvr`);
  const GOODS_SOLD_OUT = `<span>품절</span>`;
  goodsPrice.innerHTML = GOODS_SOLD_OUT;
  deliveryCharge.innerHTML = GOODS_SOLD_OUT;
}
soldOutGoods(1);

// 1. 수량
//수량더하기
function qtyPlus(element) {
  var qtyElement = element.parentNode.querySelector("input[name=qty]");
  var qtyValue = Number(qtyElement.value);
  const MAX = Number(30);

  //최대 수량 30
  if (qtyValue + 1 > MAX) {
    alert("최대 수량입니다.");
    return;
  }
  qtyValue++;
  qtyElement.value = qtyValue;
}

// 수량빼기
function qtyMinus(element) {
  var qtyElement = element.parentNode.querySelector("input[name=qty]");
  var qtyValue = Number(qtyElement.value);
  const MIN = Number(1);

  //최하 수량 1
  if (qtyValue - 1 < MIN) {
    alert("최소 수량입니다.");
    return;
  }

  qtyValue--;
  qtyElement.value = qtyValue;
}

const changeBtns = document.querySelectorAll(`#tbl_cart_list tbody .modi`);
for (changeBtn of changeBtns) {
  changeBtn.onclick = () => orderUpdate(event);
}

function orderUpdate(e) {
  const goods = e.target.parentNode.parentNode;
  const goodsQty = goods.firstChild.nextSibling.value;
  const goodsPrice =
    goods.parentNode.nextSibling.nextSibling.firstChild.innerHTML;
  console.log(goodsQty, goodsPrice);
}

function orderAllUpdate() {}
