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
  const GOODS_SOLD_OUT = `품절`;
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

function orderUpdate() {
  const goodsAll = document.querySelectorAll(`#tbl_cart_list tbody tr`);
  for (goods of goodsAll) {
    const goodsQty = goods.querySelector(`.g_qty .qty #cnt3`);
    const goodsPrice = goods.querySelector(`.g_prc span`);
    console.log(goodsPrice);
  }
}

orderUpdate();

function orderAllUpdate() {}
