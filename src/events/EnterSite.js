import API from "../API.js";

export default class EnterSite {
  constructor(token) {
    this.chart_token = token;
  }

  createCookie() {
    var dataExpiracao = new Date();
    dataExpiracao.setTime(dataExpiracao.getTime() + 24 * 60 * 60 * 1000);
    var expires = "expires=" + dataExpiracao.toUTCString();
    document.cookie = "x0631=true;" + expires + ";path=/";
  }

  getCookie() {
    var nome = "x0631=";
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      while (cookie.charAt(0) == " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(nome) == 0) {
        return cookie.substring(nome.length, cookie.length);
      }
    }
    return undefined;
  }

  register() {
    // Verifique se foi a primeira vez no dia que o usuário entrou
    if (!this.getCookie()) {
      // Pega os dados do gráfico.
      API.get(this.chart_token).then((response) => {
        // Pega da data atual.
        const date = new Date();
        const day = ("0" + date.getDate()).slice(-2);
        const mount = ("0" + (date.getMonth() + 1)).slice(-2);

        // Pega os dados do gráfico
        let { data } = response;

        let edit = data.find((data) => {
          return data[0] === `${day}/${mount}`;
        });

        if (edit) {
          edit = [`${day}/${mount}`, edit[1] + 1];
        } else {
          edit = [`${day}/${mount}`, 1];
        }

        // Envia os dados novamente.
        API.send(edit, this.chart_token, `${day}/${mount}`).then(() => {
          this.createCookie();
        });
      });
    }

    return true;
  }
}
