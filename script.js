const rateInput = document.getElementById("rate");
const textarea = document.getElementById("meters");
const totalMEl = document.getElementById("total-m");
const totalSEl = document.getElementById("total-s");
const countEl = document.getElementById("count");
const tbody = document.getElementById("tbody");
const tfootM = document.getElementById("tfoot-m");
const tfootS = document.getElementById("tfoot-s");

function calc() {
  const rate = parseFloat(rateInput.value) || 0;
  const raw = textarea.value.trim().replace(/[\n,;]+/g, " ");
  const nums = raw
    .split(/\s+/)
    .filter(Boolean)
    .map(Number)
    .filter((n) => !isNaN(n) && n > 0);

  if (nums.length === 0) {
    totalMEl.textContent = "—";
    totalSEl.textContent = "—";
    countEl.textContent = "—";
    tbody.innerHTML =
      '<tr><td colspan="3" class="empty">Введи метры выше ↑</td></tr>';
    tfootM.textContent = "";
    tfootS.textContent = "";
    return;
  }

  const totalM = nums.reduce((a, b) => a + b, 0);
  const totalS = totalM * rate;

  totalMEl.textContent = totalM.toFixed(2) + " м";
  totalSEl.textContent = totalS.toFixed(2) + " сом";
  countEl.textContent = nums.length;

  tbody.innerHTML = nums
    .map(
      (n, i) => `
    <tr style="animation-delay:${i * 0.05}s">
      <td>${i + 1}</td>
      <td>${n.toFixed(2)} м</td>
      <td>${(n * rate).toFixed(2)} сом</td>
    </tr>
  `,
    )
    .join("");

  tfootM.textContent = "Итого · " + totalM.toFixed(2) + " м";
  tfootS.textContent = totalS.toFixed(2) + " сом";
}

textarea.addEventListener("input", calc);
rateInput.addEventListener("input", calc);
