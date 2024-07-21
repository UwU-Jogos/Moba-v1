### Prototipagem e Desenvolvimento do Jogo

#### 1. **Prototipagem Inicial**
   - **Objetivo**: Criar um protótipo jogável básico o mais rápido possível.
   - **Ação**:
     - Desenvolver um MVP com uma simples bolinha se movendo em uma tela.
     - Implementar um canvas básico onde a bolinha pode ser movida usando as setas do teclado.
     - Testar a funcionalidade de conexão e comunicação em uma sala de jogo.
     - Usar puro canvas para evitar dependências de frameworks.

#### 2. **Funcionalidade Multiplayer**
   - **Objetivo**: Implementar uma solução básica para multiplayer.
   - **Ação**:
     - Ultilizar um sistema de chat para enviar e receber mensagens (UwUchat).
     <!-- - Implementar a lógica de rollback com dois mecanismos possíveis:
       - **Computar Estado**: Ajustar o estado do jogo conforme mensagens recebidas, aceitando o delay.
       - **Perdoar Mensagens Atrasadas**: Reverter para o estado anterior e recomputar frames para manter consistência. -->
   - **Notas**:
     - Hospedar o servidor no Brasil (SP).
     <!-- - Utilizar uma LinkedList para gerenciar estados de jogo, salvando estados exponencialmente distantes. -->

#### 3. **Tela de Login e Jogo**
   - **Objetivo**: Criar as telas de login e jogo e gerenciar o estado do jogo.
   - **Ação**:
     - **Tela de Login**: Implementar uma tela HTML para entrada do ID da sala e conexão.
     - **Tela de Jogo**: Implementar a tela onde o jogo acontece.
     - Criar um estado inicial vazio ao conectar em uma sala e processar mensagens de eventos.
     - Implementar a função `compute_state(state, event) -> state` para calcular o estado do jogo.
     - Garantir que a função `compute_state` seja pura e não mutável.
   - **Notas**:
     - A função `draw` deve ser responsável por desenhar o estado atual do jogo no canvas.

#### 4. **Gerenciamento de Estado**
   - **Objetivo**: Gerenciar o histórico de estados e otimizar a computação.
   - **Ação**:
     - Salvar todos os estados (state_history) com uma entrada para cada tick.
     - Utilizar `immutable.js` para gerenciar estados imutáveis e armazenar apenas as diferenças (diffs) para otimização.
   - **Notas**:
     - A função `compute_state` deve gerenciar as posições e eventos sem alterar o estado original.

