const MAX_QTY = Number(30); // 최대수량
const MIN_QTY = Number(1); // 최소수량

// 직접 입력시 수량 검증 함수 on blur
$(document).ready(function () {
  var qtyElements = $(document).find(`input[name=qty]`);
  for (idx in qtyElements) {
    console.log(qtyElements[idx])
    // $(qtyElements[idx]).on("blur", (event) => validationQty(event));
  }
});

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

  const goodsPrice = $(goods).find(`.g_prc`)[0];
  const deliveryPrice = $(goods).find(`.g_dvr`)[0];
  const GOODS_SOLD_OUT = `<span>품절</span>`;
  goodsPrice.innerHTML = GOODS_SOLD_OUT;
  deliveryPrice.innerHTML = GOODS_SOLD_OUT;
}
soldOutGoods(1);

// 1. 수량
//수량더하기
function qtyPlus(element) {
  var qtyElement = $(element).parent().children(`input[name=qty]`)[0];
  var qtyValue = Number(qtyElement.value);

  //최대 수량 30
  if (qtyValue + 1 > MAX_QTY) {
    alert("최대 수량입니다.");
    qtyElement.value = MAX_QTY;
    return;
  }
  qtyValue++;
  qtyElement.value = qtyValue;
}

// 수량빼기
function qtyMinus(element) {
  var qtyElement = $(element).parent().children(`input[name=qty]`)[0];
  var qtyValue = Number(qtyElement.value);

  //최하 수량 1
  if (qtyValue - 1 < MIN_QTY) {
    alert("최소 수량입니다.");
    qtyElement.value = MIN_QTY;
    return;
  }

  qtyValue--;
  qtyElement.value = qtyValue;
}

// 직접 수량 입력 시 수량 검증 함수 blur 이용
function validationQty(event) {
  if (event.target.value < MIN_QTY) {
    alert(`최소 수량은 ${MIN_QTY}입니다.`);
    event.target.value = MIN_QTY;
  } else if (event.target.value > MAX_QTY) {
    alert(`최대 수량은 ${MAX_QTY}입니다.`);
    event.target.value = MAX_QTY;
    updateOrder(event);
  }
}
