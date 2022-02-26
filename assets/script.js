// 705.484.450-52 // CPF TESTE
// 070.987.720-03  // CPF TESTE

// Puxando o HTML
let btn = document.querySelector('button');
let input = document.querySelector('input');
console.log(input)
let div = document.querySelector('.div-cpf');

// Criando elementos
let p1 = document.createElement("p");
p1.classList.add('p1');
let p2 = document.createElement("p");
p2.classList.add('p2');
let span = document.createElement("span");
span.classList.add('span-cpf');

// Função para retirar oque não é número
function ValidaCPF(cpfEnviado) {
  Object.defineProperty(this, 'cpfLimpo', {
    enumerable: true,
    get: function() {
      return cpfEnviado.replace(/\D+/g, '');
    }
  });
}

// Função para validar o CPF
ValidaCPF.prototype.validador = function() {
  if(typeof this.cpfLimpo === 'undefined') return false;
  if(this.cpfLimpo.length !== 11) return false;
  if(this.isSequencia()) return false;

  const cpfParcial = this.cpfLimpo.slice(0, -2);
  const digito1 = this.criaDigito(cpfParcial);
  const digito2 = this.criaDigito(cpfParcial + digito1);

  const novoCpf = cpfParcial + digito1 + digito2;
  return novoCpf === this.cpfLimpo;
};

// Função para verificar se o CPF é sequência
ValidaCPF.prototype.isSequencia = function() {
  const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
  return sequencia === this.cpfLimpo;
}; 

// Função para verificar definitivamente o CPF
ValidaCPF.prototype.criaDigito = function(cpfParcial) {
  const cpfArray = Array.from(cpfParcial);
  let regressivo = cpfArray.length + 1;
  const total = cpfArray.reduce((ac, val) => {
    ac += (regressivo * Number(val));
    regressivo--;
    return ac;
  }, 0);

  const digito = 11 - (total % 11);
  return digito > 9 ? '0' : String(digito);
};

// Função chamada pelo botão, para exibir o resultado
function verificar() {
  if (!input.value) return alert('Insira um CPF')
  const cpf = new ValidaCPF(input.value);
  p2.innerHTML = '';
  span.innerHTML = '';
  span.innerHTML = input.value;
  p1.innerHTML = 'CPF: '
  p1.appendChild(span);
  div.appendChild(p1);
  div.appendChild(p2);
  if(cpf.validador()) {
    p2.innerHTML = 'CPF Válido';
    p2.style.background = 'green'
  } else {
    p2.innerHTML = 'CPF Inválido';
    p2.style.background = 'red'
  }
}
input.addEventListener('keypress', function (e) {
  switch (e.keyCode) {
      case 13:
        verificar();
          break;
      default:
          break;
  }
});
btn.addEventListener('click', verificar);
