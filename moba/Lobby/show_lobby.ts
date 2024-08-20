/// Shows the lobby interface and hides the login interface.
///
/// # Description
///
/// This function toggles the visibility of the login and lobby containers,
/// hiding the login container and showing the lobby container.
///
/// # Side Effects
///
/// - Modifies the DOM by changing the display style of 'login-container' and 'lobby-container' elements.
/// - Logs an error to the console if either container is not found.
///
/// # Throws
///
/// This function doesn't throw any errors, but logs to console if there's an issue.

export function show_lobby(): void {
  const login_container = document.getElementById('login-container');
  const lobby_container = document.getElementById('lobby-container');

  if (login_container && lobby_container) {
    login_container.style.display = 'none';
    lobby_container.style.display = 'block';
  } else {
    console.error("Could not find login or lobby container");
  }
}
