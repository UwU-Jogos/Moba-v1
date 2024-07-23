// login.ts
// document.getElementById('connectBtn')?.addEventListener('click', () => {
//   const roomId = (document.getElementById('roomId') as HTMLInputElement).value;
//   if (roomId) {
//       // Aqui você pode redirecionar para a tela do jogo ou fazer a conexão
//       window.location.href = `game.html?roomId=${encodeURIComponent(roomId)}`;
//   } else {
//       alert('Por favor, insira o ID da sala.');
//   }
// });
document.getElementById('connectBtn')?.addEventListener('click', () => {
  const roomId = (document.getElementById('roomId') as HTMLInputElement).value;
  const playerName = (document.getElementById('playerName') as HTMLInputElement).value;
  
  if (roomId && playerName) {
      // Redirecionar para a tela do jogo com os parâmetros de URL
      window.location.href = `src/game/game.html?roomId=${encodeURIComponent(roomId)}&playerName=${encodeURIComponent(playerName)}`;
  } else {
      alert('Por favor, insira o ID da sala e o nome do personagem.');
  }
});
