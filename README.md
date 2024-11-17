# Projeto de Sistema de Carregamento de Veículos Elétricos

Este é um projeto desenvolvido com React, Express, e SQLite, que visa fornecer uma interface para monitorar o status de recarga de veículos elétricos. O sistema permite que o usuário se cadastre, faça login, visualize o status da recarga e configure preferências para otimizar o processo de carregamento.

# Funcionalidades

#### Login de Usuário: Permite que o usuário faça login com um nome de usuário e senha.
#### Dashboard de Recarga: Exibe o status da recarga do veículo, incluindo a fonte de energia e o tempo restante de carregamento, utilizando um círculo de progresso interativo.
## Preferências de Carregamento: O usuário pode definir preferências, como utilizar apenas fontes de energia renováveis ou carregar em horários de menor demanda.
## Cadastro de Novo Usuário: Usuários podem se registrar para utilizar o sistema.

# Tecnologias Utilizadas

## Frontend: React, React Router, React Circular Progressbar
## Backend: Node.js, Express
## Banco de Dados: SQLite
## Autenticação: JWT (JSON Web Token)

# Como Iniciar

1. Clonar o repositório
Primeiro, clone o repositório para sua máquina local:

git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio

2. Instalar Dependências
No diretório raiz do projeto, instale as dependências do frontend e do backend:

Backend
Acesse o diretório backend e instale as dependências:

cd backend
npm install

Frontend
Acesse o diretório frontend e instale as dependências:

cd ../frontend
npm install

3. Configurar o Banco de Dados
O banco de dados é configurado automaticamente na primeira vez que o servidor é executado. Ele usa SQLite e cria uma tabela users para armazenar os dados de login.

4. Iniciar o Servidor
Para rodar o projeto, inicie primeiro o backend e depois o frontend:

Iniciar o Backend
No diretório backend, execute o seguinte comando:

npm start
O servidor backend estará rodando em http://localhost:5000.

Iniciar o Frontend
Agora, no diretório frontend, execute:

npm start
O frontend estará acessível em http://localhost:3000.

5. Acessar o Projeto
Após iniciar tanto o backend quanto o frontend, abra seu navegador e acesse o endereço http://localhost:3000 para visualizar o aplicativo. Você poderá realizar o login com um usuário existente ou registrar um novo.

# Estrutura do Projeto
A estrutura do projeto é dividida em duas partes principais:

![image](https://github.com/user-attachments/assets/b57b43de-4bd0-4def-b6e9-43b2015d4b7e)

# Como Contribuir

## 1- Faça um fork deste repositório.
## 2- Crie uma branch para sua modificação (git checkout -b minha-modificacao).
## 3- Faça suas alterações e faça commit (git commit -am 'Adiciona nova funcionalidade').
## 4- Envie sua branch para o GitHub (git push origin minha-modificacao).
## 5- Crie um Pull Request para este repositório.

# Licença

Este projeto é licenciado sob a MIT License.
