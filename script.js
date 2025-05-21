// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDpGd6J82qbSTEWnfrYEUm8B-5tK4IITSo",
  authDomain: "hushclientsite.firebaseapp.com",
  projectId: "hushclientsite"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("cadastro-container").style.display = "none";
    document.getElementById("lojinha").style.display = "block";
    carregarProdutos();
  } else {
    document.getElementById("login-container").style.display = "block";
    document.getElementById("lojinha").style.display = "none";
  }
});

function entrar() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  auth.signInWithEmailAndPassword(email, senha)
    .catch(e => alert("Erro: " + e.message));
}

function cadastrar() {
  const email = document.getElementById("cadastro-email").value;
  const senha = document.getElementById("cadastro-senha").value;
  auth.createUserWithEmailAndPassword(email, senha)
    .catch(e => alert("Erro: " + e.message));
}

function sair() {
  auth.signOut();
}

function toggleCadastro() {
  const login = document.getElementById("login-container");
  const cadastro = document.getElementById("cadastro-container");
  if (login.style.display === "none") {
    login.style.display = "block";
    cadastro.style.display = "none";
  } else {
    login.style.display = "none";
    cadastro.style.display = "block";
  }
}

// Lojinha
const produtos = [
  { nome: "Camisa Legal", preco: 49.90, imagem: "https://via.placeholder.com/200?text=Camisa" },
  { nome: "Tênis Top", preco: 129.90, imagem: "https://via.placeholder.com/200?text=T%C3%AAnis" },
  { nome: "Boné Estiloso", preco: 39.90, imagem: "https://via.placeholder.com/200?text=Bon%C3%A9" }
];

let total = 0;

function carregarProdutos() {
  const container = document.getElementById("produtos");
  container.innerHTML = "";
  produtos.forEach((p, index) => {
    const div = document.createElement("div");
    div.className = "produto";
    div.innerHTML = `
      <img src="${p.imagem}" alt="${p.nome}">
      <h3>${p.nome}</h3>
      <p>R$ ${p.preco.toFixed(2)}</p>
      <button onclick="adicionarAoCarrinho(${index})">Adicionar</button>
    `;
    container.appendChild(div);
  });
}

function adicionarAoCarrinho(index) {
  const produto = produtos[index];
  const li = document.createElement("li");
  li.textContent = `${produto.nome} - R$ ${produto.preco.toFixed(2)}`;
  document.getElementById("itens-carrinho").appendChild(li);
  total += produto.preco;
  document.getElementById("total").textContent = total.toFixed(2);
}