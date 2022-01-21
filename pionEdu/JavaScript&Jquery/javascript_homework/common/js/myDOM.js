const changeBtns = document.querySelectorAll(`#tbl_cart_list tbody .modi`);
for (changeBtn of changeBtns) {
  changeBtn.onclick = () => orderUpdate(event);
}

// 0. 품절.
function soldOutGoods(num) {
  const goods = document.querySelector(
    `#tbl_cart_list tbody tr:nth-child(${num})`
  );
  const goodsQty = goods.querySelector(`.g_qty .qty #cnt3`);
  const qtyValue = 0;
  goodsQty.setAttribute("value", qtyValue);
  goodsQty.disabled = true;

  const goodsQtyPlusBtn = goods.querySelector(`.g_qty .qty .plus`);
  const goodsQtyMinusBtn = goods.querySelector(`.g_qty .qty .minus`);
  goodsQtyPlusBtn.onclick = null;
  goodsQtyMinusBtn.onclick = null;

  const goodsChangeBtn = goods.querySelector(`.modi`);
  goodsChangeBtn.onclick = null;

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
  // console.log(qtyValue);
  const MAX = Number(30);

  //최대 수량 30
  if (qtyValue + 1 > MAX) {
    alert("최대 수량입니다.");
    return;
  }
  qtyValue++;
  qtyElement.setAttribute("value", qtyValue);
}

// 수량빼기
function qtyMinus(element) {
  var qtyElement = element.parentNode.querySelector("input[name=qty]");
  var qtyValue = Number(qtyElement.value);
  const MIN = Number(1);
  // console.log(qtyValue);

  //최하 수량 1
  if (qtyValue - 1 < MIN) {
    alert("최소 수량입니다.");
    return;
  }

  qtyValue--;
  qtyElement.setAttribute("value", qtyValue);
}

//개별 주문금액 체크
function orderUpdate(e) {
  const goods = e.target.parentNode.parentNode;
  const goodsQty = goods.querySelector("input[name = qty]").value;
  const goodsPrice = goods.parentNode.querySelector("input[name = amt]").value;
  const resultPrice = Number(goodsQty) * Number(goodsPrice);

  let changePrice = goods.parentNode.parentNode.querySelector(".g_prc");
  changePrice.innerHTML = `${toCurrency(resultPrice)}원`;
  orderAllUpdate();
}

//전체 주문금액 체크
function orderAllUpdate() {
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

  const orderSum = document.querySelectorAll(`#tbl_cart_list #ord_amt`);
  const orderDeliverSum = document.querySelectorAll(
    `#tbl_cart_list #deliver_total_amt`
  );
  const total = document.querySelectorAll(`#tbl_cart_list #total_amt`);
  orderSum[0].innerHTML = toCurrency(goodsAllPrice);
  orderDeliverSum[0].innerHTML = toCurrency(deliverAllPrice);
  total[0].innerHTML = toCurrency(resultPrice);
}

orderAllUpdate();

// const underCheckBox = document.querySelector(`.c_sel #sel_all_2`);
function checkAll(checkedId){
  const allCheckBox = document.querySelector(`#${checkedId}`);
  const checkBoxs = document.querySelectorAll(`.g_pic input[name = choice_prd]`);
  const allCheckBoxs = document.querySelectorAll(`input[name = sel_all]`);
  console.log(checkBoxs,allCheckBoxs );
  checkBoxs.forEach((checkBox) => {
    checkBox.checked = allCheckBox.checked;
  })
  allCheckBoxs.forEach((checkBox) => {
    checkBox.checked = allCheckBox.checked;
  })

}
// underCheckBox.addEventListener('click', checkAll);