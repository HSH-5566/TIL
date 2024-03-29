const MAX_QTY = Number(30); // 최대수량
const MIN_QTY = Number(1); // 최소수량
const currentSoldOuts = [1]; // 품절 상품 배열: 첫번째 상품 선택

// 직접 입력시 수량 검증 함수 addEvent & 숫자인지 체크 함수 keydown
var qtyElements = document.querySelectorAll("input[name=qty]");
for (qtyElement of qtyElements) {
  qtyElement.addEventListener("blur", (event) => validationQty(event));
  qtyElement.onkeydown = (event) => checkNumber(event);
}

//수량 변경 버튼 onclick
const changeBtns = document.querySelectorAll(`#tbl_cart_list tbody .modi`);
for (changeBtn of changeBtns) {
  changeBtn.onclick = (event) => updateOrder(event);
}

//개별 삭제 버튼 onclick
const removeBtns = document.querySelectorAll(`#tbl_cart_list .g_ord .del`);
for (removeBtn of removeBtns) {
  removeBtn.onclick = (event) => removeGoods(event);
}

//개별 주문 버튼 onclick
const buyBtns = document.querySelectorAll(
  `#tbl_cart_list .g_ord a:nth-child(1)`
);
for (buyBtn of buyBtns) {
  buyBtn.onclick = (event) => buyGoods(event);
}

//체크박스로 선택된 요소 삭제 버튼 onclick
const removeSelectBtn = document.querySelector(`.c_sel .btns a:nth-child(1)`);
removeSelectBtn.onclick = () => removeSelectGoods();

//체크박스로 선택된 요소 주문 버튼 onclick
const buySelectBtn = document.querySelector(`.c_sel .btns a:nth-child(3)`);
buySelectBtn.onclick = () => buySelectGoods();

//모든 요소 주문 버튼 onclick
const buyAllBtn = document.querySelector(`.c_sel .btns a:nth-child(4)`);
buyAllBtn.onclick = () => buyAllGoods();

// 0. 품절.
// num번째 요소를 품절로 변경
function soldOutGoods(num) {
  const goods = document.querySelector(
    `#tbl_cart_list tbody tr:nth-child(${num})`
  );

  const goodsCheck = goods.querySelector(`input[name = choice_prd]`);
  goodsCheck.disabled = true;

  const goodsQty = goods.querySelector(`.g_qty .qty #cnt3`);
  const SOLD_OUT_VALUE = Number(0);
  goodsQty.setAttribute("value", SOLD_OUT_VALUE);
  goodsQty.disabled = true;

  const goodsQtyPlusBtn = goods.querySelector(`.g_qty .qty .plus`);
  const goodsQtyMinusBtn = goods.querySelector(`.g_qty .qty .minus`);
  goodsQtyPlusBtn.onclick = null;
  goodsQtyMinusBtn.onclick = null;

  const goodsChangeBtn = goods.querySelector(`.modi`);
  goodsChangeBtn.onclick = null;

  const goodsBuyBtn = goods.querySelector(`.g_ord > a`);
  goodsBuyBtn.onclick = null;

  const goodsPrice = goods.querySelector(`.g_prc`);
  const deliveryPrice = goods.querySelector(`.g_dvr`);
  const GOODS_SOLD_OUT = `<span>품절</span>`;
  goodsPrice.innerHTML = GOODS_SOLD_OUT;
  deliveryPrice.innerHTML = GOODS_SOLD_OUT;
}

//품절 상품 배열의 상품들 품절
for (goods of currentSoldOuts) {
  soldOutGoods(goods);
}

// 1. 수량
//수량더하기
function qtyPlus(element) {
  var qtyElement = element.parentNode.querySelector("input[name=qty]");
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
  var qtyElement = element.parentNode.querySelector("input[name=qty]");
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

// 직접 수량 입력 시 숫자인지 체크
function checkNumber(e) {
  if (
    (e.key >= 0 && e.key <= 9) ||
    e.keyCode == 8 ||
    e.keyCode == 37 ||
    e.keyCode == 39
  ) {
    return true;
  }
  return false;
}

//개별 주문금액 체크해 리페인팅 Element.closest()
function updateOrder(e) {
  const goods = e.target.closest(`tr`);

  const goodsQty = Number(goods.querySelector("input[name = qty]").value);
  if (goodsQty === 0) {
    return;
  }
  const goodsPrice = Number(goods.querySelector("input[name = amt]").value);
  const resultPrice = goodsQty * goodsPrice;

  let changePrice = goods.querySelector(".g_prc span");

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
    const goodsQty = goods.querySelector(`input[name = qty]`).value;
    if (Number(goodsQty) === 0) {
      continue;
    }
    const goodsPrice = goods.querySelector(`input[name = amt]`).value;
    const deliverPrice = goods.querySelector(`input[name = deliver_amt]`).value;
    goodsAllPrice += goodsQty * goodsPrice;
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

//2. 선택
// 전체 체크박스 기능 - 품절 상품 제외하고 모두 선택
function checkAll(checkedId) {
  const allCheckBox = document.querySelector(`#${checkedId}`);
  const checkBoxs = document.querySelectorAll(
    `.g_pic input[name = choice_prd]`
  );
  const allCheckBoxs = document.querySelectorAll(`input[name = sel_all]`);
  checkBoxs.forEach((checkBox) => {
    if (checkBox.disabled) {
      return;
    }
    checkBox.checked = allCheckBox.checked;
  });
  allCheckBoxs.forEach((checkBox) => {
    checkBox.checked = allCheckBox.checked;
  });
}

//단일 삭제기능
function removeGoods(e) {
  const goods = e.target.closest(`tr`);
  goods.remove();
  updateAllOrder();
}

//선택 삭제 기능
function removeSelectGoods() {
  const checkBoxs = document.querySelectorAll(
    `.g_pic input[name = choice_prd]`
  );
  checkBoxs.forEach((checkBox) => {
    checkBox.checked ? checkBox.closest(`tr`).remove() : null;
  });
  updateAllOrder();
}

//3. 주문
// 전체 주문버튼 기능 qty,amt,deliver_amt,goods_code,item_no
function buyAllGoods() {
  const goodsAll = document.querySelectorAll(`#tbl_cart_list > tbody tr`);
  let result = `[`;
  for (goods of goodsAll) {
    const goodsInfo = buyMsg(goods);
    if (goodsInfo === undefined) {
      continue;
    }
    result += goodsInfo.msg;
  }
  result += `\n]\n`;
  const total = document.querySelector(`#tbl_cart_list #total_amt`).innerHTML;
  result += `\n주문가격: ${total}원`;
  alert(result);
}

//주황색 개별 주문버튼
function buyGoods(e) {
  const goods = e.target.closest(`tr`);
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
  const checkBoxs = document.querySelectorAll(
    `.g_pic input[name = choice_prd]`
  );
  let result = `[`;
  let total = 0;
  for (checkBox of checkBoxs) {
    if (!checkBox.checked) {
      continue;
    }
    const goods = checkBox.closest(`tr`);
    const goodsInfo = buyMsg(goods);
    if (goodsInfo === undefined) {
      continue;
    }
    result += goodsInfo.msg;
    total +=
      goodsInfo.goodsQty * goodsInfo.goodsPrice + goodsInfo.goodsDeliverPrice;
  }
  result += `\n]\n`;
  if (result === "[\n]\n") {
    alert("선택된 상품이 없습니다!");
    return;
  }
  result += `\n주문가격: ${toCurrency(total)}원`;
  alert(result);
}

//구매 메세지 생성 함수
function buyMsg(goods) {
  let msg = "";
  const goodsQty = Number(goods.querySelector(`input[name = qty]`).value);
  if (goodsQty === 0) {
    return;
  }
  const goodsPrice = Number(goods.querySelector(`input[name = amt]`).value);
  const goodsDeliverPrice = Number(
    goods.querySelector(`input[name = deliver_amt]`).value
  );
  const goodsCode = goods.querySelector(`input[name = goods_code]`).value;
  const goodsNo = goods.querySelector(`input[name = item_no]`).value;
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
