<template>
  <div class="q-pa-md q-gutter-xs" >
    <q-dialog v-model="dialogNovaCategoria">
      <q-card style="min-width: 60%">
        <q-card-section>
            <div class="text-10">Categoria</div>
          </q-card-section>
          <q-card-section>
        <q-input
              ref="refCategoriaNova"
              label="Nome"
              autofocus
              Type="text"
              counter
              maxlength="50"
              v-model="categoriaNova.nome"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Nome é obrigatório']"
              dense>
            </q-input>
        </q-card-section>
        <q-card-section>
          <div class="row">

            <div class="col-sm-6 text-left">
            <q-btn color="info" label="Sair" @click="dialogNovaCategoria = false">

            </q-btn>
          </div>
          <div class="col-sm-6 text-right">
            <q-btn
            color="positive"
            label="Salvar"
            type="submit"
            @click="salvar">
            </q-btn>
          </div>

          </div>

        </q-card-section>
      </q-card>
    </q-dialog>
    <q-card>
      <q-card-section>
        <div class="row q-gutter-sm"></div>
        <div class="col-6">
       <q-input
        ref="refNome"
        label="Nome"
        Type="text"
        counter
        maxlength="30"
        v-model="nomePesquisa"
        @keypress.enter="pesquisarCategoria"
        dense>
        </q-input>
        </div>
        <div class="row">
          <div class="col-sm-6 text-left">
            <q-btn icon="fas fa-search" label="Pesquisar" color="warning" @click="pesquisarCategoria()"></q-btn>
          </div>
           <div class="col-sm-6 text-left">
            <q-btn icon="fas fa-plus" label="Nova" color="primary" @click="dialogNovaCategoria=true"></q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card>
      <q-card-section>
        <table style="width: 100%">
          <q-tr>
            <q-th style="text-align: left;">Codigo</q-th>
            <q-th style="text-align: left;" >Nome</q-th>
            <div style="float: right;">
                <q-th>Operacao</q-th>
            </div>
          </q-tr>
          <q-tr v-for="categoria in categoriaList" v-bind:key="categoria.codigo" >
            <q-td>{{categoria.codigo}}</q-td>
            <q-td>{{categoria.nome}}</q-td>
            <div style="float: right;">
            <q-td class="col-md-1">
              <q-btn flat dense size="sm" color="blue" icon="fas fa-search" @click="visualizarCategoria(categoria)"/>
            </q-td>
            <q-td class="col-md-1">
              <q-btn flat dense size="sm" color="orange" icon="fas fa-pencil-alt" @click="editarCategoria(categoria)"/>
            </q-td>
            <q-td class="col-md-1">
              <q-btn flat dense size="sm" color="red" icon="fas fa-trash-alt" @click="confirmarExclusao(categoria)"/>
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
      nomePesquisa: ' ',
      categoriaList: [],
      categoriaNova: {},
      dialogNovaCategoria: false,
      desabilitarEdicao: false
    }
  },
  methods: {
    salvar () {
      this.$refs.refCategoriaNova.validate()
      if (this.$refs.refCategoriaNova.hasError) {
        this.formHasError = true
      } else {
        // verificar se existe um código atribuído
        if (!this.categoriaNova.codigo) {
          this.$axios.post(api.CATEGORIA, this.categoriaNova).then(result => {
            util.mensagemSucessoAoSalvar()
            this.limparObjetoCategoriaAoSalvar()
            this.listarCategori()
          }).catch((error) => {
            util.mensagemFalha(error)
          })
        } else {
          let filtro = '/'.concat(this.categoriaNova.codigo)
          // concatenando com a categoria
          this.$$axios.put(api.CATEGORIA.concat(filtro), this.categoriaNova).then((result) => {
            util.mensagemSucessoAoAtualizar()
            this.limparObjetoCategoriaAoSalvar()
            this.listarCategoria()
          }).catch((error) => {
            util.mensagemFalha(error)
          })
        }
      }
    },
    listarCategoria () {
      this.$axios.get(api.CATEGORIA).then((result) => {
        this.categoriaList = result.data
      }).catch((error) => {
        util.mensagemFalha(error)
      })
    },
    pesquisarCategoria () {
      var filtro = '?texto='.concat(this.nomePesquisa.trim())
      this.$axios.get(api.CATEGORIA_FILTRAR_POR_TEXTO.concat(filtro)).then((result) => {
        this.categoriaList = result.data
      }).catch((error) => {
        util.mensagemFalha(error)
      })
    },
    visualizarCategoria (categoria) {
      this.categoriaNova = categoria
      this.dialogNovaCategoria = true
      this.desabilitarEdicao = true
    },
    editarCategoria (categoria) {
      this.categoriaNova = categoria
      this.dialogNovaCategoria = true
      this.desabilitarEdicao = true
    },
    excluirCategoria (categoria) {
      var filtro = '/'.concat(categoria.codigo)
      this.$axios.delete(api.CATEGORIA.concat(filtro)).then((result) => {
        util.mensagemSucessoAoDeletar()
        this.listarCategoria()
      }).catch((error) => {
        util.mensagemFalha(error)
      })
    },
    confirmarExclusao (categoria) {
      this.$q.dialog({
        title: 'excluir',
        message: 'deseja excluir......'.concat(categoria.nome).concat('?'),
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.excluirCategoria(categoria)
      })
    },
    limparObjetoCategoriaAoSalvar () {
      this.categoriaNova = {}
      this.dialogNovaCategoria = false
    }
  },
  mounted () {
    this.listarCategoria()
  }
}
</script>
<style>
  tr:nth-child(even) {background-color: #abdef5 }
</style>
