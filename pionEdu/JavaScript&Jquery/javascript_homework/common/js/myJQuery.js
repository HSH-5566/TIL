const MAX_QTY = Number(30); // 최대수량
const MIN_QTY = Number(1); // 최소수량

// 버튼에 기능 추가
$(document).ready(() => {
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
  const removeSelectBtn = $(document).find(`.c_sel .btns a:nth-child(1)`)[0];
  $(removeSelectBtn).on("click", () => removeSelectGoods());

  //모든 요소 주문 버튼 onclick
  const buyAllBtn = $(document).find(`.c_sel .btns a:nth-child(4)`)[0];
  $(buyAllBtn).on("click", () => buyAllGoods());

  //개별 주문 버튼 onclick
  const buyBtns = $(document).find(`#tbl_cart_list .g_ord a:nth-child(1)`);
  for (var i = 0; i < buyBtns.length; i++) {
    $(buyBtns[i]).on("click", (event) => buyGoods(event));
  }

  //체크박스로 선택된 요소 주문 버튼 onclick
  const buySelectBtn = $(document).find(`.c_sel .btns a:nth-child(3)`)[0];
  $(buySelectBtn).on("click", () => buySelectGoods());
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
  // $(goodsChangeBtn).off();
  // $(document).off("click", goodsChangeBtn, updateOrder);

  const goodsBuyBtn = $(goods).find(`.g_ord > a`)[0];
  goodsBuyBtn.onclick = null;

  const goodsPrice = $(goods).find(`.g_prc`)[0];
  const deliveryPrice = $(goods).find(`.g_dvr`)[0];
  const GOODS_SOLD_OUT = `<span>품절</span>`;
  goodsPrice.innerHTML = GOODS_SOLD_OUT;
  deliveryPrice.innerHTML = GOODS_SOLD_OUT;
}

//첫번째 상품 품절
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

  const goodsQty = Number($(goods).find(`input[name = qty]`)[0].value);
  console.log(goodsQty);
  if (goodsQty === 0) {
    return;
  }
  const goodsPrice = Number($(goods).find(`input[name = amt]`)[0].value);
  const resultPrice = goodsQty * goodsPrice;

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

//초기 최종 금액 출력
updateAllOrder();

//2. 선택
// 전체 체크박스 기능 - 품절 상품 제외하고 모두 선택
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

//선택 삭제 기능 - 품절 상품제외하고 체크된 것만 삭제
function removeSelectGoods() {
  const checkBoxs = $(document).find(`.g_pic input[name = choice_prd]`);
  for (var i = 0; i < checkBoxs.length; i++) {
    checkBoxs[i].checked ? $(checkBoxs[i]).parents(`tr`)[0].remove() : null;
  }
  updateAllOrder();
}

//3. 주문
// 전체 주문버튼 기능 qty,amt,deliver_amt,goods_code,item_no
function buyAllGoods() {
  // const goodsAll = document.querySelectorAll(`#tbl_cart_list > tbody tr`);
  const goodsAll = $(document).find(`#tbl_cart_list > tbody tr`);
  let result = `[`;
  for (var i = 0; i < goodsAll.length; i++) {
    const goodsInfo = buyMsg(goodsAll[i]);
    if (goodsInfo === undefined) {
      continue;
    }
    result += goodsInfo.msg;
  }
  result += `\n]\n`;
  const total = $(document).find(`#tbl_cart_list #total_amt`)[0].innerHTML;
  result += `\n주문가격: ${total}원`;
  alert(result);
}

//주황색 개별 주문버튼
function buyGoods(e) {
  const goods = $(e.target).parents(`tr`)[0];
  let result = "[";
  const goodsInfo = buyMsg(goods);
  if (goodsInfo === undefined) {
    return;
  }
  result += goodsInfo.msg;
  result += `\n]\n`;
  const total =
    goodsInfo.goodsQty * goodsInfo.goodsPrice + goodsInfo.goodsDeliverPrice;
  result += `\n주문가격: ${toCurrency(total)}원`;
  alert(result);
}

// 선택 주문 버튼기능
function buySelectGoods() {
  const checkBoxs = $(document).find(`.g_pic input[name = choice_prd]`);
  let result = `[`;
  let total = 0;

  for (var i = 0; i < checkBoxs.length; i++) {
    if (!checkBoxs[i].checked) {
      continue;
    }
    const goods = $(checkBoxs[i]).parents(`tr`)[0];
    const goodsInfo = buyMsg(goods);
    if (goodsInfo === undefined) {
      continue;
    }
    result += goodsInfo.msg;
    total +=
      goodsInfo.goodsQty * goodsInfo.goodsPrice + goodsInfo.goodsDeliverPrice;
  }
  result += `\n]\n`;
  result += `\n주문가격: ${toCurrency(total)}원`;
  alert(result);
}

//구매 메세지 생성 함수
function buyMsg(goods) {
  let msg = "";
  const goodsQty = Number($(goods).find(`input[name = qty]`)[0].value);
  if (goodsQty === 0) {
    return;
  }
  const goodsPrice = Number($(goods).find(`input[name = amt]`)[0].value);
  const goodsDeliverPrice = Number(
    $(goods).find(`input[name = deliver_amt]`)[0].value
  );
  const goodsCode = $(goods).find(`input[name = goods_code]`)[0].value;
  const goodsNo = $(goods).find(`input[name = item_no]`)[0].value;
  msg += `
          {
            qty : ${goodsQty}
            amt : ${goodsPrice}
            deliver_amt : ${goodsDeliverPrice}
            goods_code : ${goodsCode}
            item_no : ${goodsNo}
          },`;
  return { msg, goodsQty, goodsPrice, goodsDeliverPrice, goodsCode, goodsNo };
}
