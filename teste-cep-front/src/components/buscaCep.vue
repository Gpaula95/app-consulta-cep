<template>
  <div class="central-box">
    <div class="card card-form">
      <div class="card-form-box">
        <input v-model="cep">
        <span class="card-form-box-alert" v-if="cep.length > 8">Para buscar o cep utilize um numero de 8 dígitos.</span>
      </div>
      <button type="button" @click="buscaCep(cep)" name="button">Buscar CEP</button>
    </div>
    <div v-if="endereco.rua" class="card card-info">
      <ul>
        <li><span>CEP:</span>{{endereco.cep}}</li>
        <li><span>Estado:</span>{{endereco.uf}}</li>
        <li><span>Cidade:</span>{{endereco.localidade}}</li>
        <li><span>Logradouro:</span>{{endereco.rua}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'buscaCep',
  data () {
    return {
      cep:'',
      endereco:{}
    }
  },
  methods:{
    buscaCep (cep) {
      if(!cep || cep.length < 8){
        this.$swal( { type: 'error',
                      title: 'Oops...',
                      text: 'Insira um CEP Válido!'});
      }else{
        axios.get(`http://localhost:3000/endereco/${cep}`)
        .then(response => {
          this.endereco = response.data
        })
        .catch(e => {
          this.$swal({ type: 'error',
                        title: 'Oops...',
                        text: 'Você inseriu caracteres invalidos!'});
          console.log('Aconteceu um erro ao consultar o cep')
        })
      }
      this.cep = ''
    }
  }
}
</script>
<style lang="scss" scoped>
$color-base: #e9e9e9;
$white: #fff;
$color-button: rgb(68, 68, 68);
$color-info: #7D7D7D;

.central-box{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 90vh
}

.card{
  background-color: $white;
  padding: 30px 50px;
  border: 1px solid $color-base;
  width: 30%;
  display: -webkit-box;
  justify-content: center;

  &-form{

    &-box{
      display: flex;
      flex-direction: column;

      &-alert{
        color: red;
        margin-top: 3px;
      }

      input{
        padding: 15px;
        border: 1px solid $color-base;
      }

    }

    button{
      padding: 15px;
      margin-left: 5px;
      height: 100%;
      background-color: $color-button;
      border: none;
      color: $white;
      font-size: 16px;
      font-weight: 500
    }

  }

  &-info{
    display: flex;
    flex-direction: column;
    color: $color-info;
    margin-top: 20px;

    li{
      list-style: none
    }
    span{
      font-weight: 600;
      padding-right: 5px
    }
  }
}
</style>
