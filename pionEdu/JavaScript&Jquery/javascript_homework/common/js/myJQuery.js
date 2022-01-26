const MAX_QTY = Number(30); // 최대수량
const MIN_QTY = Number(1); // 최소수량

// 직접 입력시 수량 검증 함수 on blur
const qtyElements = $(document).find(`input[name=qty]`);
for (var i = 0; i < qtyElements.length; i++) {
  $(qtyElements[i]).on("blur", (event) => validationQty(event));
}

//수량 변경 버튼 on click
const changeBtns = $(document).find(`#tbl_cart_list tbody .modi`);
for (var i = 0; i < changeBtns.length; i++) {
  $(changeBtns[i]).on("click", (event) => updateOrder(event));
}

//개별 삭제 버튼 on click
const removeBtns = $(document).find(`#tbl_cart_list .g_ord .del`);
for (var i = 0; i < removeBtns.length; i++) {
  $(removeBtns[i]).on("click", (event) => removeGoods(event));
}

//체크박스로 선택된 요소 삭제 버튼 on click
const removeSelectBtn = document.querySelector(`.c_sel .btns a:nth-child(1)`);
removeSelectBtn.onclick = () => removeSelectGoods();

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
  const goodsAll = $(document).find(`#tbl_cart_list > tbody tr`);
  let goodsAllPrice = 0;
  let deliverAllPrice = 0;
  let resultPrice = 0;
  for (var i = 0; i < goodsAll.length; i++) {
    const goodsQty = $(goodsAll[i]).find(`input[name = qty]`)[0].value;
    if (Number(goodsQty) === 0) {
      continue;
    }
    const goodsPrice = $(goodsAll[i]).find(`input[name = amt]`)[0].value;
    const deliverPrice = Number(
      $(goodsAll[i]).find(`input[name = deliver_amt]`)[0].value
    );
    goodsAllPrice += goodsQty * goodsPrice;
    deliverAllPrice += deliverPrice;
  }
  resultPrice = goodsAllPrice + deliverAllPrice;
  const orderSum = $(document).find(`#tbl_cart_list #ord_amt`)[0];
  const orderDeliverSum = $(document).find(
    `#tbl_cart_list #deliver_total_amt`
  )[0];
  const total = $(document).find(`#tbl_cart_list #total_amt`)[0];
  orderSum.innerHTML = toCurrency(goodsAllPrice);
  orderDeliverSum.innerHTML = toCurrency(deliverAllPrice);
  total.innerHTML = toCurrency(resultPrice);
}
updateAllOrder();

//2. 선택
// 전체 체크박스 기능
function checkAll(checkedId) {
  const allCheckBox = $(document).find(`#${checkedId}`)[0];
  const checkBoxs = $(document).find(`.g_pic input[name = choice_prd]`);
  const allCheckBoxs = $(document).find(`input[name = sel_all]`);
  for (var i = 0; i < checkBoxs.length; i++) {
    if (checkBoxs[i].disabled) {
      continue;
    }
    checkBoxs[i].checked = allCheckBox.checked;
  }
  for (var i = 0; i < allCheckBoxs.length; i++) {
    allCheckBoxs[i].checked = allCheckBox.checked;
  }
}

//단일 삭제기능
function removeGoods(e) {
  const goods = $(e.target).parents(`tr`);
  goods.remove();
  updateAllOrder();
}

//선택 삭제 기능
function removeSelectGoods() {
  console.log("aaaa");
  // const checkBoxs = document.querySelectorAll(
  //   `.g_pic input[name = choice_prd]`
  // );
  // checkBoxs.forEach((checkBox) => {
  //   checkBox.checked ? checkBox.closest(`tr`).remove() : null;
  // });
  // updateAllOrder();
}
