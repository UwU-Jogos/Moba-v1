# Taemoba
Você pode então compilar os arquivos para o ambiente de navegador e Node.js separadamente usando os seguintes comandos:

```bash
# Para o ambiente de navegador
tsc -p tsconfig.browser.json

# Para o ambiente Node.js
tsc -p tsconfig.node.json
```

Se você quiser que a saída seja compilada em dist/ com base no ambiente, você pode ajustar a configuração do outDir conforme necessário.