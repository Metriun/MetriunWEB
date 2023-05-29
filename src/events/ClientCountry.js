import API from "../API.js";

export default class ClientContry {
  constructor(token) {
    this.chart_token = token;
  }

  createCookie() {
    var dataExpiracao = new Date();
    dataExpiracao.setTime(dataExpiracao.getTime() + 24 * 60 * 60 * 1000);
    var expires = "expires=" + dataExpiracao.toUTCString();
    document.cookie = "x0632=true;" + expires + ";path=/";
  }

  getCookie() {
    var nome = "x0632=";
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
        let { data } = response;

        fetch("https://ipapi.co/json/")
          .then((r) => r.json())
          .then(({ country }) => {
            let edit = data.find((data) => {
              return data[0] === country;
            });

            if (edit) {
              edit = [country, edit[1] + 1];
            } else {
              edit = [country, 1];
            }

            // Envia os dados novamente.
            API.send(edit, this.chart_token, country).then(() => {
              this.createCookie();
            });
          });
      });
    }

    return true;
  }
}
