function createRain() {
    const itemRain = document.createElement("div");
    const itemWave = document.createElement("div");
    itemRain.classList.add("rain");
    itemWave.classList.add("wave");
    const position = randomPosition() + "px";
    itemRain.style.marginLeft = position;
    itemWave.style.marginLeft = position;
  
    document.body.appendChild(itemRain);
    document.body.appendChild(itemWave);
  }
  
  function randomPosition() {
    return Math.floor(Math.random() * window.innerWidth);
  }
  
  for (let i = 0; i < 100; i++) {
    createRain();
  }
  