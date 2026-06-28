let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const modal = document.getElementById("carrinho-modal");

document
    .getElementById("carrinho")
    .addEventListener("click", () => {

        modal.classList.add("ativo");
        atualizarCarrinho();

    });

document
    .getElementById("fechar-carrinho")
    .addEventListener("click", () => {

        modal.classList.remove("ativo");

    });


function adicionarAoCarrinho(
    nome,
    preco,
    imagem
) {

    carrinho.push({
        nome,
        preco,
        imagem
    });

    salvarCarrinho();
    atualizarCarrinho();
    atualizarContador();
}
function removerItem(index) {

    carrinho.splice(index, 1);

    salvarCarrinho();
    atualizarCarrinho();
    atualizarContador();
}

function salvarCarrinho() {

    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

}
function atualizarCarrinho() {

    const lista =
        document.getElementById("lista-carrinho");

    lista.innerHTML = "";

    document.getElementById("quantidade-itens")
        .innerText = `Itens: ${carrinho.length}`;

    let total = 0;

    if (carrinho.length === 0) {

        document.getElementById("finalizar-btn").style.display = "none";
        document.getElementById("esvaziar-btn").style.display = "none";

        lista.innerHTML = `
            <div class="carrinho-vazio">
                <img src="./img/shopping-cart.svg" alt="Carrinho">
                <h3>Seu carrinho está vazio</h3>
                <p>Adicione alguns produtos para começar suas compras.</p>
            </div>
        `;

        document.getElementById("total")
            .innerText = "Total: R$ 0,00";

        return;
    }

    document.getElementById("finalizar-btn").style.display = "block";
    document.getElementById("esvaziar-btn").style.display = "block";

    carrinho.forEach((item, index) => {

        total += item.preco;

        lista.innerHTML += `
<div class="item-carrinho">

    <img
        class="miniatura"
        src="${item.imagem}"
        alt="${item.nome}"
    >

    <div class="info-item">
        <h4>${item.nome}</h4>
        <p>R$ ${item.preco.toFixed(2)}</p>
    </div>

    <div class="acoes-item">

        <button
            class="remover-link"
            onclick="removerItem(${index})"
        >
            Remover
        </button>

    </div>

</div>
`;
    });

    document.getElementById("total")
        .innerText =
        `Total: R$ ${total.toFixed(2)}`;
}

function esvaziarCarrinho() {

    carrinho = [];

    salvarCarrinho();
    atualizarCarrinho();
    atualizarContador();

}

modal.addEventListener("click", (e) => {

    if (e.target === modal) {
        modal.classList.remove("ativo");
    }

});


function enviarWhatsapp() {

    let mensagem =
        "Olá, gostaria de fazer este pedido:%0A%0A";

    let total = 0;

    carrinho.forEach(item => {
        mensagem += `🛍️ ${item.nome} - R$ ${item.preco.toFixed(2)}%0A`;
        total += item.preco;
    });

    mensagem += `%0A💰 Total: R$ ${total.toFixed(2)}`;

    window.open(
        `https://wa.me/5543991176852?text=${mensagem}`,
        "_blank"
    );
}

window.addEventListener("click", (e) => {

    if (
        e.target === modal
    ) {
        modal.classList.remove("ativo");
    }

});
function atualizarContador() {

    const contador =
        document.getElementById("contador-carrinho");

    contador.innerText = carrinho.length;

    contador.style.display =
        carrinho.length > 0 ? "flex" : "none";
}
atualizarCarrinho();
atualizarContador();

const campoPesquisa = document.querySelector(".pesquisa input");
const produtos = document.querySelectorAll(".produto");

if (campoPesquisa) {
    campoPesquisa.addEventListener("input", () => {
        const textoDigitado = campoPesquisa.value.toLowerCase();

        produtos.forEach(produto => {
            const nomeProduto = produto
                .querySelector(".textinho h3")
                .innerText
                .toLowerCase();

            if (nomeProduto.includes(textoDigitado)) {
                produto.style.display = "block";
            } else {
                produto.style.display = "none";
            }
        });
    });
}

const pesquisa = document.getElementById("pesquisa");

if (pesquisa) {
    pesquisa.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const termo = pesquisa.value.trim();

            if (termo !== "") {
                window.location.href =
                    `shop.html?pesquisa=${encodeURIComponent(termo)}`;
            } else {
                window.location.href = "shop.html";
            }
        }
    });
}

const parametros = new URLSearchParams(window.location.search);
const pesquisaURL = parametros.get("pesquisa");

if (pesquisaURL && campoPesquisa) {
    campoPesquisa.value = pesquisaURL;

    const evento = new Event("input");
    campoPesquisa.dispatchEvent(evento);
}