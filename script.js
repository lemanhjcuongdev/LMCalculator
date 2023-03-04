const screen = document.querySelector(".screen");
const history_results = document.querySelector(".history_results");
const result = document.querySelector(".result");
const keyItems = document.querySelectorAll(".key");

let currentValue = 0;

keyItems.forEach(function (btn) {
  btn.addEventListener("click", function () {
    if (result.innerHTML === "0") {
      // avoid create zero before number
      result.innerHTML = "";
    }
    if (!isFinite(result.innerHTML.charAt(0))) {
      //avoid create operator at first character
      result.innerHTML = "";
    }
    switch (btn.innerHTML) {
      case "AC":
        result.innerHTML = "0";
        break;
      case "DEL":
        {
          const arrInput = result.innerHTML.split("");
          arrInput.splice(arrInput.length - 1, 1);
          if (arrInput.length != 0) {
            result.innerHTML = arrInput.join("");
          } else result.innerHTML = "0";
        }
        break;
      case "%":
        {
          if (result.innerHTML !== "") {
            result.innerHTML = isFinite(result.innerHTML)
              ? eval(result.innerHTML + "/100")
              : result.innerHTML;
          } else {
            result.innerHTML = "0";
          }
        }
        break;
      case "=":
        {
          try {
            if (result.innerHTML !== "" && isFinite(eval(result.innerHTML))) {
              if (eval(currentValue) != result.innerHTML) {
                const historyItem = document.createElement("div");
                historyItem.classList.add("history");
                history_results.appendChild(historyItem);
                historyItem.innerHTML = result.innerHTML;
                currentValue = result.innerHTML;
                result.innerHTML = eval(result.innerHTML);
              }
            } else {
              result.innerHTML = 0;
            }
            if (history_results.childElementCount >= 6) {
              history_results.removeChild(history_results.firstChild);
            }
          } catch (error) {
            alert("Syntax error!");
          }
        }
        break;
      default: {
        result.innerHTML += btn.innerHTML;
      }
    }
  });
});
