"use strict";

const form = document.querySelector("#calculadora");
const numeroA = document.querySelector("#numero-a");
const numeroB = document.querySelector("#numero-b");
const resultado = document.querySelector("#resultado");
const mensajeError = document.querySelector("#mensaje-error");

const operaciones = {
  sumar: (a, b) => a + b,
  restar: (a, b) => a - b,
  multiplicar: (a, b) => a * b,
  dividir: (a, b) => a / b,
};

function calcular(nombreOperacion) {
  mensajeError.textContent = "";

  if (numeroA.value.trim() === "" || numeroB.value.trim() === "") {
    resultado.textContent = "—";
    mensajeError.textContent = "Completá ambos campos para realizar el cálculo.";
    return;
  }

  const a = numeroA.valueAsNumber;
  const b = numeroB.valueAsNumber;

  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    resultado.textContent = "—";
    mensajeError.textContent = "Ingresá números válidos en ambos campos.";
    return;
  }

  if (nombreOperacion === "dividir" && b === 0) {
    resultado.textContent = "—";
    mensajeError.textContent = "No se puede dividir por cero.";
    return;
  }

  const valor = operaciones[nombreOperacion](a, b);
  resultado.textContent = Number.isFinite(valor) ? String(valor) : "—";
  if (!Number.isFinite(valor)) {
    mensajeError.textContent = "El resultado está fuera del rango numérico permitido.";
  }
}

form.addEventListener("click", (event) => {
  const boton = event.target.closest("[data-operation]");
  if (boton) calcular(boton.dataset.operation);
});

form.addEventListener("reset", () => {
  resultado.textContent = "—";
  mensajeError.textContent = "";
});
