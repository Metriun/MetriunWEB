import API from "../API.js";

export default class ClientDevice {
  constructor(token) {
    this.chart_token = token;
  }

  createCookie() {
    var dataExpiracao = new Date();
    dataExpiracao.setTime(dataExpiracao.getTime() + 60 * 60 * 1000);
    var expires = "expires=" + dataExpiracao.toUTCString();
    document.cookie = "x0633=true;" + expires + ";path=/";
  }

  getCookie() {
    var nome = "x0633=";
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

  getDevice() {
    const { userAgent } = navigator;

    if (/Mobi|Android/i.test(userAgent)) {
      return "Smartphone";
    } else if (/Tablet|iPad/i.test(userAgent)) {
      return "Tablet";
    } else {
      return "Desktop";
    }
  }

  register() {
    // Verifique se foi a primeira vez no dia que o usuário entrou
    if (!this.getCookie()) {
      // Pega os dados do gráfico.
      const device = this.getDevice();

      API.get(this.chart_token).then((response) => {
        // Pega os dados do gráfico
        let { data } = response;

        let edit = data.find((data) => {
          return data[0] === device;
        });

        if (edit) {
          edit = [device, edit[1] + 1];
        } else {
          edit = [device, 1];
        }

        // Envia os dados novamente.
        API.send(edit, this.chart_token, device).then(() => {
          this.createCookie();
        });
      });
    }

    return true;
  }
}
