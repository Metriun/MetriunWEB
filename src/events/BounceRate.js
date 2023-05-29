import API from "../API.js";

export default class BounceRate {
  constructor(token, events) {
    this.chart_token = token;
    this.events = events;
    this.join_time = new Date(Date.now() + 15000).getTime();
  }

  request(type) {
    API.get(this.chart_token).then((response) => {
      // Pega os dados do gráfico
      let { data } = response;

      let edit = data.find((data) => {
        return data[0] === type;
      });

      if (edit) {
        edit = [type, edit[1] + 1];
      } else {
        edit = [type, 1];
      }

      // Envia os dados novamente.
      API.send(edit, this.chart_token, type);
    });
  }

  register() {
    let accepted = false;
    const { events } = this;

    const eventCallback = () => {
      const date = Date.now();

      if (date > this.join_time) {
        // Fazer as requisições aqui.
        this.request("Acceptance");
        accepted = true;
        unloadEvents();
      }
    };

    function unloadEvents() {
      events.forEach((event) => {
        window.removeEventListener(event, eventCallback);
      });
    }

    events.forEach((event) => {
      window.addEventListener(event, eventCallback);
    });

    setTimeout(() => {
      this.request("Visitors");
    }, 10000);

    return true;
  }
}
