import { Notify, date } from 'quasar'

export default {
  mensagemSucessoAoSalvar () {
    Notify.create({
      icon: 'done',
      color: 'positive',
      message: 'Registro salvo com sucesso!'
    })
  },
  mensagemSucessoAoAtualizar () {
    Notify.create({
      icon: 'done',
      color: 'positive',
      message: 'Registro atualizado com sucesso!'
    })
  },
  mensagemSucessoAoDeletar () {
    Notify.create({
      icon: 'done',
      color: 'positive',
      message: 'Registro deletado com sucesso!'
    })
  },
  mensagemFalha (error) {
    error.response.data.forEach(erro => {
      Notify.create({
        icon: 'done',
        color: 'positive',
        message: erro.mensagemUsuario
      })
    })
  },
  validarCamposAntesSalvar (refs) {
    var campoInvalido = true
    Object.keys(refs).forEach(ref => {
      if (refs[ref] !== undefined && typeof refs[ref].validate === 'function' && !refs[ref].validate()) {
        campoInvalido = false
      }
    })
    return campoInvalido
  },
  criarData (data) {
    if (!data) return
    let dat = new Date(data)
    dat.setTime(dat.getTime() + dat.getTimezoneOffset() * 240000)
    return dat
  },
  formatarData (data, formato) {
    if (!data) { return }
    debugger
    return date.formatDate(this.criarData(data), formato)
  }
}
