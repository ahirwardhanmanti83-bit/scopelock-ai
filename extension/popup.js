function updateBleed() {
  const rate = parseFloat(document.getElementById('rate').value) || 0;
  const hours = parseFloat(document.getElementById('hours').value) || 0;
  const total = rate * hours;
  document.getElementById('bleedText').innerText = '$' + total.toLocaleString() + ' USD';
}

document.getElementById('rate').addEventListener('input', updateBleed);
document.getElementById('hours').addEventListener('input', updateBleed);
updateBleed();
