const API = process.env.API

export default {
  CATEGORIA: API + '/categoria',
  CATEGORIA_FILTRAR_POR_TEXTO: API + '/categoria/filtrarPorTexto',

  LANCAMENTO: API + '/lancamento',
  LANCAMENTO_FILTRAR_POR_TEXTO: API + '/lancamento/filtrarPorTexto',

  PESSOA: API + '/pessoas'
}
