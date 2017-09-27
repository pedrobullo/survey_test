Easynvest - Test Survey Form
=====================

### Objetivo
Formulário com finalidade de salvar os dados de uma única pessoa, incluindo sua foto de perfil, sendo possivel atualiza-los. Client-Side somente, utilizando o localStorage.

### Desenvolvimento de Projeto (Média de esforço x trabalho)
###### Tasks:
- Análise de recursos e criação do readme; (1 ponto)
- Desenvolvimento da estrutura; (3 pontos)
    - Criar repositório
    - Configurar WebPack
    - Definição de patterns e estrutura de pasta
    - Definição dos recursos de storage. (localStorage)
- Desenvolvimento ciclo do redux. (3 pontos)
    - Criação de actions e reducers
- Desenvolvimento da macânica de inputs (5 pontos)
- Desenvolvimento do styleguide (3 pontos)
- Desenvolvimento das validações e máscaras (5 pontos)
- Upload de imagem e geração de thumb (3 pontos)
- Implementação do autocomplete. (API do google) (2 pontos)
- Teste de integração (3 pontos) - x

### TODOS
- Reset no input error ao digitar.
- Default GoogleMaps location baseado no address.
- Usar o localStorage para fazer backup de todo redux.state, ao invés somente das respostas, no submit.
- Teste de integração

### Usage

```
npm install
npm start
open http://localhost:3000
```

### Dependencies

* React
* Webpack
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* [babel-loader](https://github.com/babel/babel-loader)
* [react-hot-loader](https://github.com/gaearon/react-hot-loader)
* [react-router](https://github.com/ReactTraining/react-router) - Declarative routing for React (v.3.0.5) 
* [classnames](https://github.com/JedWatson/classnames) - A simple JavaScript utility for conditionally joining classNames together. 
* [moment](https://github.com/moment/moment) - A lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.
* [revalidator](https://github.com/flatiron/revalidator) - JSON schema validator
* [sweetalert2](https://github.com/limonte/sweetalert2) - Replacement for JavaScript's popup boxes.
* [react-helmet](https://github.com/nfl/react-helmet) - A document head manager for React
* [Google Maps Native API](https://developers.google.com/maps/documentation/javascript/)

Test
* [ava]
* [redux-ava]

### Resources

* [react-hot-boilerplate](https://github.com/gaearon/react-hot-boilerplate)

### Design Patterns / LINT

* [AirBnB - React](https://github.com/airbnb/javascript/blob/master/react/README.md)
* [BEM - CSS](http://getbem.com/introduction/)
* [ESLINT](https://github.com/eslint/eslint)