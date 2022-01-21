const changeBtns = document.querySelectorAll(`#tbl_cart_list tbody .modi`);
for (changeBtn of changeBtns) {
  changeBtn.onclick = () => updateOrder(event);
}
const removeBtns = document.querySelectorAll(`#tbl_cart_list .g_ord .del`);
for (removeBtn of removeBtns) {
  removeBtn.onclick = () => removeGoods(event);
}

const buyBtns = document.querySelectorAll(`#tbl_cart_list .g_ord a:nth-child(1)`);
for (buyBtn of buyBtns) {
  buyBtn.onclick = () => buyGoods(event);
}

const removeSelectBtn = document.querySelector(`.c_sel .btns a:nth-child(1)`);
removeSelectBtn.onclick = () => removeSelectGoods();

const buyAllBtn = document.querySelector(`.c_sel .btns a:nth-child(3)`);
buyAllBtn.onclick = () => buyAllGoods();

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

  const goodsBuyBtn = goods.querySelector(`.g_ord > a`);
  goodsBuyBtn.onclick = null;

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
function updateOrder(e) {
  const goods = e.target.parentNode.parentNode;
  const goodsQty = goods.querySelector("input[name = qty]").value;
  const goodsPrice = goods.parentNode.querySelector("input[name = amt]").value;
  const resultPrice = Number(goodsQty) * Number(goodsPrice);

  let changePrice = goods.parentNode.parentNode.querySelector(".g_prc");
  changePrice.innerHTML = `${toCurrency(resultPrice)}원`;
  updateAllOrder();
}

//전체 주문금액 체크
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

//2. 선택
// 전체 체크박스 기능
function checkAll(checkedId){
  const allCheckBox = document.querySelector(`#${checkedId}`);
  const checkBoxs = document.querySelectorAll(`.g_pic input[name = choice_prd]`);
  const allCheckBoxs = document.querySelectorAll(`input[name = sel_all]`);
  checkBoxs.forEach((checkBox) => {
    checkBox.checked = allCheckBox.checked;
  })
  allCheckBoxs.forEach((checkBox) => {
    checkBox.checked = allCheckBox.checked;
  })
}

//단일 삭제기능
function removeGoods(e){
  const goods = e.target.parentNode.parentNode;
  goods.remove();
  updateAllOrder();
}

//선택 삭제 기능
function removeSelectGoods(){
  const checkBoxs = document.querySelectorAll(`.g_pic input[name = choice_prd]`);
  checkBoxs.forEach((checkBox)=>{
    checkBox.checked ? checkBox.parentNode.parentNode.remove() : null;
  })
  updateAllOrder();
}

//3. 주문
// 검정색 전체 주문버튼 기능 qty,amt,deliver_amt,goods_code,item_no
function buyAllGoods(){
  const goodsAll = document.querySelectorAll(`#tbl_cart_list > tbody tr`);
  let result = `[`;
  for(goods of goodsAll){
    const goodsQty = goods.querySelector(`input[name = qty]`).value;
    if (Number(goodsQty) === 0) {
      continue;
    }
    const goodsPrice = goods.querySelector(`input[name = amt]`).value;
    const goodsDeliverPrice = goods.querySelector(`input[name = deliver_amt]`).value;
    const goodsCode = goods.querySelector(`input[name = goods_code]`).value;
    const goodsNo = goods.querySelector(`input[name = item_no]`).value;
    result += `
            {
              qty : ${goodsQty}
              amt : ${goodsPrice}
              deliver_amt : ${goodsDeliverPrice}
              goods_code : ${goodsCode}
              item_no : ${goodsNo}
            },`
  }
  result += `\n]\n`;
  const total = document.querySelector(`#tbl_cart_list #total_amt`).innerHTML;
  result += `\n주문가격: ${total}`;
  alert(result);
}
//주황색 개별 주문버튼
function buyGoods(e){
  const goods = e.target.parentNode.parentNode.parentNode;
  const goodsQty = goods.querySelector(`input[name = qty]`).value;
  const goodsPrice = goods.querySelector(`input[name = amt]`).value;
  const goodsDeliverPrice = goods.querySelector(`input[name = deliver_amt]`).value;
  const goodsCode = goods.querySelector(`input[name = goods_code]`).value;
  const goodsNo = goods.querySelector(`input[name = item_no]`).value;
  let result = `[
          {
            qty : ${goodsQty}
            amt : ${goodsPrice}
            deliver_amt : ${goodsDeliverPrice}
            goods_code : ${goodsCode}
            item_no : ${goodsNo}
          },\n]\n`
  result += `\n주문가격: ${goodsQty*goodsPrice+Number(goodsDeliverPrice)}`;
  alert(result);
}