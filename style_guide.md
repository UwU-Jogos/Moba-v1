# Style Guide

## Naming Conventions

### Variables

Use snake_case

```typescript
let player_score = 0;
```

### Functions

Use snake_case

```typescript
function calculate_score() {
    // code
}
```

### Classes

Use CamelCase

```typescript
class PlayerCharacter { 
    // code
}
```

### Files

Use snake_case

```
game_state.ts
player_controller.ts
```

### Modules

Use CamelCase

```typescript
import * as GameLogic from './game_logic';
```

### Type Definitions

Use CamelCase

```typescript
type GameState = { };
interface PlayerData { }
```

Use `${Type}Data` for data types


### Constants

Use UPPERCASE_SNAKE_CASE

```typescript
const MAX_PLAYERS = 4;
```

## Comments

- Write in English
- Place above all code blocks

## Special Files

Files named `_.ts` define the main type of their folder

```lua
src/
  Player/
    _.ts  // Defines the main Player type
    movement.ts
    inventory.ts
```

---

☆: .｡. o(≧▽≦)o .｡.:☆
