const MAX_QTY = Number(30); // 최대수량
const MIN_QTY = Number(1); // 최소수량

// 직접 입력시 수량 검증 함수 on blur
const qtyElements = $(document).find(`input[name=qty]`);
for (var i = 0; i < qtyElements.length; i++) {
  $(qtyElements[i]).on("blur", (event) => validationQty(event));
}

//수량 변경 버튼 on

const changeBtns = $(document).find(`#tbl_cart_list tbody .modi`);
for (var i = 0; i < changeBtns.length; i++) {
  $(changeBtns[i]).on("click", (event) => updateOrder(event));
}

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
function validationQty(e) {
  if (e.target.value < MIN_QTY) {
    alert(`최소 수량은 ${MIN_QTY}입니다.`);
    e.target.value = MIN_QTY;
    updateOrder(e);
  } else if (e.target.value > MAX_QTY) {
    alert(`최대 수량은 ${MAX_QTY}입니다.`);
    e.target.value = MAX_QTY;
    updateOrder(e);
  }
}

//개별 주문금액 체크해 리페인팅
function updateOrder(e) {
  const goods = $(e.target).parents(`tr`);

  const goodsQty = $(goods).find(`input[name = qty]`)[0].value;
  const goodsPrice = $(goods).find(`input[name = amt]`)[0].value;
  const resultPrice = Number(goodsQty) * Number(goodsPrice);

  let changePrice = $(goods).find(`.g_prc span`)[0];
  changePrice.innerHTML = `${toCurrency(resultPrice)}원`;
  updateAllOrder();
}

//전체 주문금액 체크해 리페인팅
function updateAllOrder() {
  const goodsAll = document.querySelectorAll(`#tbl_cart_list > tbody tr`);
  let goodsAllPrice = 0;
  let deliverAllPrice = 0;
  let resultPrice = 0;
  for (goods of goodsAll) {
    const goodsQty = goods.querySelector(`input[name = qty]`);
    if (Number(goodsQty.value) === 0) {
      continue;
    }
    const goodsPrice = goods.querySelector(`input[name = amt]`).value;
    const deliverPrice = goods.querySelector(`input[name = deliver_amt]`).value;
    goodsAllPrice += goodsQty.value * goodsPrice;
    deliverAllPrice += Number(deliverPrice);
  }
  resultPrice = goodsAllPrice + deliverAllPrice;

  const orderSum = document.querySelector(`#tbl_cart_list #ord_amt`);
  const orderDeliverSum = document.querySelector(
    `#tbl_cart_list #deliver_total_amt`
  );
  const total = document.querySelector(`#tbl_cart_list #total_amt`);
  orderSum.innerHTML = toCurrency(goodsAllPrice);
  orderDeliverSum.innerHTML = toCurrency(deliverAllPrice);
  total.innerHTML = toCurrency(resultPrice);
}

updateAllOrder();
