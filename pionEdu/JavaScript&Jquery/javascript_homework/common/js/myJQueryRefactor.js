const MAX_QTY = Number(30); // 최대수량
const MIN_QTY = Number(1); // 최소수량
const currentSoldOuts = [1]; // 품절 상품 배열: 첫번째 상품 선택

//TODO : 이미 jquery내에서 document 객체를 호출 하기 때문에 $(document) 호출뒤 find 할 필요 없음.
//바로 찾고자 하는 셀렉터 조건 넣으면 됨.$('#dkdlel')

// 직접 입력시 수량 검증 함수 on blur & 숫자인지 체크 함수 keydown
const qtyElements = $(`input[name=qty]`);
//TODO: 다중이벤트 처리 시 방법.
// 이벤트가 많을 경우에는 개별로 처리하는게 좋으나
// 아래와 같은 방법도 있음.
qtyElements.on("blur keydown", function (e) {
  const eventType = e.type;
  if (eventType == "blur") {
    validationQty(e);
  } else {
    checkNumber(e);
  }
});

//수량 변경 버튼 on click
const changeBtns = $(`#tbl_cart_list tbody .modi`);

//TODO: 엘리먼트가 배열로 넘어올 경우 each순환 함수 실행 시킬 필요 없이. click 이벤트 함수만 호출 하면
//모든 엘리먼트에 click이벤트가 적용 됨.
changeBtns.click(updateOrder);

//체크박스로 선택된 요소 삭제 버튼 on click
const removeSelectBtn = $(`.c_sel .btns a:nth-child(1)`);
removeSelectBtn.click(removeSelectGoods);

//모든 요소 주문 버튼 on click
const buyAllBtn = $(`.c_sel .btns a:nth-child(4)`);
buyAllBtn.click(buyAllGoods);

//개별 주문 버튼 on click
const buyBtns = $(`#tbl_cart_list .g_ord a:nth-child(1)`);
buyBtns.click(buyGoods);

//개별 삭제 버튼 on click
const removeBtns = $(`#tbl_cart_list .g_ord .del`);
removeBtns.click(removeGoods);

//체크박스로 선택된 요소 주문 버튼 onclick
const buySelectBtn = $(`.c_sel .btns a:nth-child(3)`);
$(buySelectBtn).on("click", () => buySelectGoods());

// 0. 품절.
// num번째 요소를 품절로 변경
function soldOutGoods(num) {
  const goods = $(`#tbl_cart_list tbody tr:nth-child(${num})`);
  const goodsCheck = goods.find(`input[name = choice_prd]`);
  $(goodsCheck).attr("disabled", true);

  //TODO : 이미 goods 값이 jquery 객체로 반환 되기 때문에 또다시 $(goods) 로 다시 조회할 필요 없음.
  const goodsQty = goods.find(`.g_qty .qty #cnt3`)[0];
  const SOLD_OUT_VALUE = Number(0);
  //TODO setAttribute 한 이유는??? .attr("value", '값')으로 설정 가능.
  goodsQty.setAttribute("value", SOLD_OUT_VALUE);
  $(goodsQty).attr("disabled", true);

  const goodsQtyPlusBtn = goods.find(`.g_qty .qty .plus`)[0];
  const goodsQtyMinusBtn = goods.find(`.g_qty .qty .minus`)[0];
  $(goodsQtyPlusBtn).removeAttr(`onclick`);
  $(goodsQtyMinusBtn).removeAttr(`onclick`);

  const goodsChangeBtn = goods.find(`.modi`)[0];
  $(goodsChangeBtn).off("click");

  const goodsBuyBtn = goods.find(`.g_ord > a`)[0];
  $(goodsBuyBtn).off("click");

  const goodsPrice = goods.find(`.g_prc`)[0];
  const deliveryPrice = goods.find(`.g_dvr`)[0];
  const GOODS_SOLD_OUT = `<span>품절</span>`;
  $(goodsPrice).html(GOODS_SOLD_OUT);
  $(deliveryPrice).html(GOODS_SOLD_OUT);
}

//품절 상품 배열의 상품들 품절
for (goods of currentSoldOuts) {
  soldOutGoods(goods);
}

// 1. 수량
//수량더하기
function qtyPlus(element) {
  var qtyElement = $(element).parent().children(`input[name=qty]`);
  var qtyValue = Number(qtyElement.val());

  //최대 수량 30
  if (qtyValue + 1 > MAX_QTY) {
    alert("최대 수량입니다.");
    qtyElement.val(MAX_QTY);
    return;
  }
  qtyValue++;
  qtyElement.val(qtyValue);
}

// 수량빼기
function qtyMinus(element) {
  var qtyElement = $(element).parent().children(`input[name=qty]`);
  var qtyValue = Number(qtyElement.val());

  //최하 수량 1
  if (qtyValue - 1 < MIN_QTY) {
    alert("최소 수량입니다.");
    qtyElement.val(MIN_QTY);
    return;
  }

  qtyValue--;
  qtyElement.val(qtyValue);
}

// 직접 수량 입력 시 수량 검증 함수 blur 이용
function validationQty(e) {
  const goodsQty = $(e.target);
  if (goodsQty.val() < MIN_QTY) {
    alert(`최소 수량은 ${MIN_QTY}입니다.`);
    goodsQty.val(MIN_QTY);
    updateOrder(e);
  } else if (goodsQty.val() > MAX_QTY) {
    alert(`최대 수량은 ${MAX_QTY}입니다.`);
    goodsQty.val(MAX_QTY);
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

//개별 주문금액 체크해 리페인팅
function updateOrder(e) {
  const goods = $(e.target).parents(`tr`);

  const goodsQty = Number($(goods).find(`input[name = qty]`).val());
  if (goodsQty === 0) {
    return;
  }
  const goodsPrice = Number($(goods).find(`input[name = amt]`).val());
  const resultPrice = goodsQty * goodsPrice;

  const changePrice = $(goods).find(`.g_prc span`);
  changePrice.text(`${toCurrency(resultPrice)}원`);
  updateAllOrder();
}

//전체 주문금액 체크해 리페인팅
function updateAllOrder() {
  const goodsAll = $(`#tbl_cart_list > tbody tr`);
  let goodsAllPrice = 0;
  let deliverAllPrice = 0;
  let resultPrice = 0;

  goodsAll.each(function () {
    const goodsQty = $(this).find(`input[name = qty]`).val();
    if (Number(goodsQty) === 0) {
      return;
    }
    const goodsPrice = $(this).find(`input[name = amt]`).val();
    const deliverPrice = Number(
      $(this).find(`input[name = deliver_amt]`).val()
    );
    goodsAllPrice += goodsQty * goodsPrice;
    deliverAllPrice += deliverPrice;
  });
  resultPrice = goodsAllPrice + deliverAllPrice;
  const orderSum = $(`#tbl_cart_list #ord_amt`);
  const orderDeliverSum = $(`#tbl_cart_list #deliver_total_amt`);
  const total = $(`#tbl_cart_list #total_amt`);
  orderSum.text(toCurrency(goodsAllPrice));
  orderDeliverSum.text(toCurrency(deliverAllPrice));
  total.text(toCurrency(resultPrice));
}

//초기 최종 금액 출력
updateAllOrder();

//2. 선택
// 전체 체크박스 기능 - 품절 상품 제외하고 모두 선택
function checkAll(checkedId) {
  const allCheckBox = $(`#${checkedId}`)[0];
  const checkBoxs = $(`.g_pic input[name = choice_prd]`);
  const allCheckBoxs = $(`input[name = sel_all]`);
  checkBoxs.each(function () {
    if (this.disabled) {
      return;
    }
    this.checked = allCheckBox.checked;
  });
  allCheckBoxs.each(function () {
    if (this.disabled) {
      return;
    }
    this.checked = allCheckBox.checked;
  });
}

//단일 삭제기능
function removeGoods(e) {
  const goods = $(e.target).parents(`tr`);
  goods.remove();
  updateAllOrder();
}

//선택 삭제 기능 - 품절 상품제외하고 체크된 것만 삭제
function removeSelectGoods() {
  const checkBoxs = $(`.g_pic input[name = choice_prd]`);
  checkBoxs.each(function () {
    this.checked ? $(this).parents(`tr`).remove() : null;
  });
  updateAllOrder();
}

//3. 주문
// 전체 주문버튼 기능 qty,amt,deliver_amt,goods_code,item_no
function buyAllGoods() {
  const goodsAll = $(`#tbl_cart_list > tbody tr`);
  let result = `[`;

  goodsAll.each(function () {
    const goodsInfo = buyMsg(this);
    if (goodsInfo === undefined) {
      return;
    }
    result += goodsInfo.msg;
  });

  result += `\n]\n`;
  const total = $(`#tbl_cart_list #total_amt`).html();
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
  const checkBoxs = $(`.g_pic input[name = choice_prd]`);
  let result = `[`;
  let total = 0;

  checkBoxs.each(function () {
    if (!this.checked) {
      return;
    }
    const goods = $(this).parents(`tr`);
    const goodsInfo = buyMsg(goods);
    if (goodsInfo === undefined) {
      return;
    }
    result += goodsInfo.msg;
    total +=
      goodsInfo.goodsQty * goodsInfo.goodsPrice + goodsInfo.goodsDeliverPrice;
  });

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
  const goodsQty = Number($(goods).find(`input[name = qty]`).val());
  if (goodsQty === 0) {
    return;
  }
  const goodsPrice = Number($(goods).find(`input[name = amt]`).val());
  const goodsDeliverPrice = Number(
    $(goods).find(`input[name = deliver_amt]`).val()
  );
  const goodsCode = $(goods).find(`input[name = goods_code]`).val();
  const goodsNo = $(goods).find(`input[name = item_no]`).val();
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
