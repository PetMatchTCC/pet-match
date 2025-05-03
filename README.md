# Pet Match: Rede social de adoção de animais de estimação - TCC de Desenvolvimento de Sistemas (Etec)

## Como executar o projeto

**IMPORTANTE:** Este projeto requer o Node Package Manager (NPM) para gerenciar as dependências.

1. **Instalar o Node.js e o NPM**:
   - Baixe e instale o [Node.js](https://nodejs.org/), que já inclui o NPM.
2. **Verificar a instalação**:
   Após a instalação, abra um terminal e execute os seguintes comandos para verificar se o Node.js e o NPM foram instalados corretamente:

   ```shell
   node -v
   npm -v

   ```

3. **Instalar as dependências do projeto**: Com o NPM já instalado, execute o seguinte comando no diretório raiz do projeto:

   ```shell
   npm install
   ```

4. **Iniciar o servidor**: Após instaladas as dependências, execute na raiz do projeto:

   ```shell
   npm run dev
   ```

5. **Interromper o servidor**: Quando desejar interromper o servidor, basta pressionar `Ctrl + C` no terminal.

## Descrição das branches

### Principais

- `main`: Branch principal, onde o código está sempre estável e pronto para produção.

### Feature

- `feat/auth`: Implementação das funcionalidades de autenticação utilizando o Firebase Auth.

- `feat/form-validation`: Implementação da validação dos formulários de cadastro e tratamento de erro.

- `feat/pet-card`: Implementação dos cards de pets no feed

- `feat/pet-form`: Implementação do sistema de cadastro de pets em perfis do tipo abrigo

- `feat/routes`: Desenvolvimento e configuração do roteamento da aplicação.

- `feat/realtime-db`: Implementação das funcionalidades do Realtime Dabase.

- `feat/report`: Implementação da página de denúncias.

- `feat/ui`: Alterações gerais na estilização e interface do usuário.

- `feat/user-profile`: Construção da interface de perfil do usuário.
