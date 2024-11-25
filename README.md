# Projeto de Sistema de Carregamento de Veículos Elétricos

Este é um projeto desenvolvido com React, Express, e SQLite, que visa fornecer uma interface para monitorar o status de recarga de veículos elétricos. O sistema permite que o usuário se cadastre, faça login, visualize o status da recarga e configure preferências para otimizar o processo de carregamento.

## Demonstração
[Assista à demonstração](https://www.youtube.com/watch?v=1csUPOI4o6o)

---

## Funcionalidades

- **Login de Usuário**: Permite que o usuário faça login com um nome de usuário e senha.
- **Dashboard de Recarga**: Exibe o status da recarga do veículo, incluindo a fonte de energia e o tempo restante de carregamento, utilizando um círculo de progresso interativo.
- **Preferências de Carregamento**: O usuário pode definir preferências, como utilizar apenas fontes de energia renováveis ou carregar em horários de menor demanda.
- **Cadastro de Novo Usuário**: Usuários podem se registrar para utilizar o sistema.

---

## Tecnologias Utilizadas

- **Frontend**: React, React Router, React Circular Progressbar
- **Backend**: Node.js, Express
- **Banco de Dados**: SQLite
- **Autenticação**: JWT (JSON Web Token)

---

## Como Iniciar

### 1. Clonar o Repositório
Clone o repositório para sua máquina local:

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
```

### 2. Instalar Dependências

#### Backend
Acesse o diretório backend e instale as dependências:

```bash
cd backend
npm install
```

#### Frontend
Acesse o diretório frontend e instale as dependências:

```bash
cd ../frontend
npm install
```

### 3. Configurar o Banco de Dados
O banco de dados é configurado automaticamente na primeira vez que o servidor é executado. Ele usa SQLite e cria uma tabela `users` para armazenar os dados de login.

### 4. Iniciar o Servidor

#### Iniciar o Backend
No diretório backend, execute o seguinte comando:

```bash
node src/server.js
```
O servidor backend estará rodando em [http://localhost:5000](http://localhost:5000).

#### Iniciar o Frontend
Agora, no diretório frontend, execute:

```bash
npm start
```
O frontend estará acessível em [http://localhost:3000](http://localhost:3000).

### 5. Acessar o Projeto
Após iniciar tanto o backend quanto o frontend, abra seu navegador e acesse [http://localhost:3000](http://localhost:3000) para visualizar o aplicativo. Você poderá realizar o login com um usuário existente ou registrar um novo.

---

## Estrutura do Projeto

O projeto está dividido em duas partes principais:

- **Frontend**: Contém o código React para a interface do usuário.
- **Backend**: Inclui o servidor Express e a configuração do banco de dados SQLite.

### Representação Visual
![Estrutura do Projeto](https://github.com/user-attachments/assets/b57b43de-4bd0-4def-b6e9-43b2015d4b7e)

---

## Como Contribuir

1. Faça um fork deste repositório.
2. Crie uma branch para sua modificação:
   ```bash
   git checkout -b minha-modificacao
   ```
3. Faça suas alterações e faça commit:
   ```bash
   git commit -am 'Adiciona nova funcionalidade'
   ```
4. Envie sua branch para o GitHub:
   ```bash
   git push origin minha-modificacao
   ```
5. Crie um Pull Request para este repositório.

---

## Licença

Este projeto é licenciado sob a [MIT License](https://opensource.org/licenses/MIT).
