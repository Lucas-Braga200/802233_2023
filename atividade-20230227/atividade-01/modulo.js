import moment from "moment";

function data(dt) {
  return new moment(dt).format('DD/MM/YYYY');
}

function hora(dt) {
  return new moment(dt).format('HH:mm');
}

function dataExtenso(dt) {
  return new moment(dt).locale('pt-br').format('dddd, LL');
}

export {
  data, hora, dataExtenso
}
