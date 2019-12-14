<template>
    <div>
       <q-card>
      <q-card-section>
        <div class="row q-gutter-sm"></div>
        <div class="col-6">
       <q-input
        ref="refNome"
        label="Descricao"
        Type="text"
        counter
        maxlength="30"
        v-model="lancamento.descricao"
        @keypress.enter="pesquisarCategoria"
        dense>
        </q-input>
        </div>
        <div class="row">
          <div class="col-sm-6 text-left">
            <q-btn icon="fas fa-search" label="Pesquisar" color="warning" @click="pesquisarLancamento"></q-btn>
          </div>
           <div class="col-sm-6 text-left">
            <q-btn icon="fas fa-plus" label="Nova" color="primary" @click="novoLancamento"></q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
      <q-card>
        <q-card-section>
           <table style="width: 100%">
          <q-tr>
            <q-th style="text-align: left;">Codigo</q-th>
            <q-th style="text-align: left;" >Pessoa</q-th>
            <q-th style="text-align: left;">Categoria</q-th>
            <q-th style="text-align: left;" >Valor</q-th>
            <q-th style="text-align: left;">Descrição</q-th>
            <div style="float: right;">
                <q-th>Operacao</q-th>
            </div>
          </q-tr>
          <q-tr v-for="lancamento in lancamentoList" v-bind:key="lancamento.codigo" >
            <q-td>{{lancamento.codigo}}</q-td>
            <q-td>{{lancamento.pessoa.nome}}</q-td>
            <q-td>{{lancamento.categoria.nome}}</q-td>
            <q-td>{{lancamento.valor}}</q-td>
            <q-td>{{lancamento.descricao}}</q-td>
            <div style="float: right;">
            <q-td class="col-md-1">
              <q-btn flat dense size="sm" color="blue" icon="fas fa-search" @click="visualizarLancamento(lancamento)"/>
            </q-td>
            <q-td class="col-md-1">
              <q-btn flat dense size="sm" color="orange" icon="fas fa-pencil-alt" @click="editarLancamento(lancamento)"/>
            </q-td>
            <q-td class="col-md-1">
              <q-btn flat dense size="sm" color="red" icon="fas fa-trash-alt" @click="confirmarExclusao(lancamento)"/>
            </q-td>
            </div>
          </q-tr>
           </table>
        </q-card-section>
      </q-card>
    </div>
</template>
<script>
import api from 'components/util/api'
import util from 'components/util/util'
export default {
  data () {
    return {
      lancamentoList: [],
      lancamento: {}
    }
  },
  methods: {
    listarLancamento () {
      this.$axios.get(api.LANCAMENTO).then((result) => {
        this.lancamentoList = result.data
      }).catch((error) => {
        util.mensagemFalha(error)
      })
    },
    pesquisarLancamento () {
      var filtro = '?texto='.concat(this.lancamento.descricao.trim())
      var url = api.LANCAMENTO_FILTRAR_POR_TEXTO.concat(filtro)
      this.$axios.get(url).then((result) => {
        this.lancamentoList = result.data
      }).catch((error) => {
        util.mensagemFalha(error)
      })
    },
    novoLancamento () {
      var newPaginaStatus = {
        lancamento: {
          categoria: {},
          pessoa: {}
        }
      }
      this.$router.push({
        name: 'lancamentoCadastro',
        params: {
          paginaStatus: newPaginaStatus
        }
      })
    },
    visualizarLancamento (plancamento) {
      var newPaginaStatus = {
        lancamento: plancamento,
        desabilitarEdicao: true
      }
      this.$router.push({
        name: 'lancamentoCadastro',
        params: {
          paginaStatus: newPaginaStatus
        }
      })
    },
    editarLancamento (plancamento) {
      var newPaginaStatus = {
        lancamento: plancamento,
        desabilitarEdicao: false
      }
      this.$router.push({
        name: 'lancamentoCadastro',
        params: {
          paginaStatus: newPaginaStatus
        }
      })
    },
    excluirCategoria (lancamento) {
      var filtro = '/'.concat(lancamento.codigo)
      this.$axios.delete(api.LANCAMENTO.concat(filtro)).then((result) => {
        util.mensagemSucessoAoDeletar()
        this.listarLancamento()
      }).catch((error) => {
        util.mensagemFalha(error)
      })
    },
    confirmarExclusao (lancamento) {
      this.$q.dialog({
        title: 'excluir',
        message: 'deseja excluir......'.concat(lancamento.descricao).concat('?'),
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.excluirCategoria(lancamento)
      })
    }
  },
  mounted () {
    this.listarLancamento()
  }
}
</script>
<style>
  tr:nth-child(even) {background-color: #abdef5 }
</style>
