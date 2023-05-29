import API from "./src/API.js";
import BounceRate from "./src/events/BounceRate.js";
import ClientContry from "./src/events/ClientCountry.js";
import ClientDevice from "./src/events/ClientDevice.js";
import EnterSite from "./src/events/EnterSite.js";

// Eventos padrões
const events = { BounceRate, ClientContry, ClientDevice, EnterSite };

// Registrar eventos
const register = (className) => {
  if (typeof className === "function") {
    events[className.name] = className;
  } else {
    console.error(
      Error("The registry value must be a constructor function or a class.")
    );
  }
};

// Ligar evento, use o nome da classe, token do gráfico e outros parâmetros.
const load = (className, token, ...params) => {
  if (events[className]) {
    return new events[className](token, ...params).register();
  } else {
    console.error(Error(`${className} not registered`));
  }

  return false;
};

export { API };

export default {
  register,
  load,
};

// new EnterSite(
//   "1685301023c2ae855c0ac5e9c0647b7f019cb617ce86ae5404fa699f3e6ae0014ef4c9cb2e6473a71fcb908112346712"
// ).register();

// new ClientContry(
//   "1685302010bfc5610a69f43f6cc3b0eb8c005c600a4eace9de20c2a0ef5767ceae84b4182b6473aafa0ceed271832065"
// ).register();

// new ClientDevice(
//   "1685317352eaeb966345b16a2f162e8df6ef00f17efa3c5748e7828bb3f178197fb18588316473e6e80f76d915865778"
// ).register();

// new BounceRate(
//   "1685319581dd4acb4f3d8ddde2bc54f67ac59b7d83d523b0303b23fdcba7ea751232c2c3616473ef9d3df99802113895",
//   ["click", "submit", "keydown", "keyup"]
// ).register();
