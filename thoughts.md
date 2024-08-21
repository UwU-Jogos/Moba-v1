
type Effect<R> = (gs: GameState) => [GameState, R];

function damage_most_life_player(damage: number): Effect<V2> {
  return (gs: GameState): [GameState, V2] => {
    let updated_gs = gs; // This should be the actual updated GameState
    let player_position: V2 = {x: 0, y: 0}; // This should be the actual player position
    return [updated_gs, player_position];
  };
}

function jump_to_position(entity_id: number, target: V2): Effect<void> {
  return (gs: GameState): [GameState, void] => {
    let updated_gs = gs;
    return [updated_gs, null];
  };
}


function apply_effects(gs: GameState): GameState {
  const [gs1, pos] = damage_most_life_player(10)(gs);
  const [gs2, _] = jump_to_position(1, pos)(gs1);
  return gs2;
}


//// Thing eh qqr coisa q ta dentro do mapa, entao no Thing (ou Body), vao ficar so as coisas estritamente 
//// necessarias para algo estar no mapa
//// Tudo q ta no mapa tem uma posicao, uma funcao tick, um hitbox, talvez um id... mas enfim isso fica dentro do Body.
//// E isso fica separado. 
////
//// O player n eh algo q ta dentro do mapa, mas ele pode estar conectado a uma thing q ta no jogo (q eh um character, por exemplo).
////
//// O tipo Hero (doll, sla) vai ter vida, move_speed, coisas exclusivas de cada boneco. 
//
////
////
//// Player
////  Boneco
////    Body
////
//// Player ta ok, mas tem q mudar essas paradas ai e separar nesses 3 tipos;
////
//// Pensar tbm na animacao do boneco

type Effect<R> = (gs: GameState) => [GameState, R];

type Body = {
  id : string;
  hitbox: Shape;
  tick: (gs: GameState) => GameState;
  draw? : (ctx: any) => void
  pos: V2
};

type Skill = {
  id: string;
  effects: Effect[];
};

type SkillCast = {
  skill: Skill;
  pos: V2;
  owner_id: string;
}

type Hero = {
  stats: Stats // can extract all here, no need for a type
  skills: Map<string, Skill>; // ????
  casted_skills: SkillCast[];
  id: string;
  //              skill_id
  animations: Map<string, Animation>; // ?????
  current_frame: number;
}

[Hero1, Parede1, Minion1, Torre2, ];
   \/      \/
  body    body

function hero1_tick() : (gs: GameState) => GameState {
  
}

const hero1 : Body = {
  id: "hero1",
  hitbox: Square,
  tick: 
}

tick_do_jogo(gs: GameState) => State {
  for (body in bodies) {
    gs = tick_body(body);
  }
}

tick_body(body: Body) => GameState { 
  body.tick(gs);
}


type Animation = (gs: GameState) => [GameState, number] // onde number eh o proximo frame q vai pra current_frame

const tick_yasuo : (gs: GameState) => State {

};

const yasuo_q : Skill = {
  id: "yasuo_q",
  effects: [
    take_damage,
  ];
};

const yasuo : Hero = {
  stats: {},
  casted_skills: [], // ??
  skills: {
    "Q": yasuo_q
  },
  id: "yasuo",
  current_frame: 0,
  animations: {
    "yasuo_q": q_animation 
  }
};

function q_animation(tick: number, effect: Effect) : Animation {
  return (gs: GameState): [GameState, number] => {
    if (tick === 0) {
      exec_effect(gs, effect);
    }
  } 
}

function take_damage(target_id: number, damage_to_take: number): Effect<void> {
  return (gs: GameState): [GameState, void] => {
    let player = find_player(target_id);
    const new_player = {
      ...player,
      life: player.life - damage_to_take
    };
    const new_players = players.set(target_id, new_player);
    const updated_gs = {
      ...gs,
      players: new_players
    };
    return [updated_gs, null];
  };
}

function apply_effects(gs: GameState): GameState {
  const [gs1, _] = take_damage(123, 10)(gs);
  return gs1;
}

// Body abstrai -> Player, Parede
// Como tu vai ligar cada uma dessas abstracoes aos seus respectivos bodies. 
// O body, ele abstrai o desenho e o tick de cada coisa
// oq significa q tu vai ter q implementar != ticks pra cada uma das coisas q o body abstrai
// Ex: Player: tick deve mover o player, deve checar colisao (pela hitbox do body), summonar skill se apertou algo, etc
// Ex: parede: n faz nada, so retorna o gs
// Implementacoes diferentes
// Como eu ligo um body qualquer ao seu respectivo outro tipo????????????????
// E.g: Paredes sao so bodies, n tem mais nada. 
// Hero tem mais propriedades, ele possui um body mas faz mais coisas, tipo castar skill, ter animacao, etc.
// Como inicializar cada body com suas propriedades corretas? Um mapa estatico eh ok, pq tu so deixa as funcoes escritas.
// COmo eu inicializo um hero (player) corretamente quando ele entra na sala?

// na hora q eu receber o setnick, eu tenho o PID e um nome
// nesse momento eu ja sei q eh um player e nao uma parede
// no nosso caso, todo player vai ter a mesma funcao de tick, q vai so movimentar o player baseado nas teclas q ele apertou
// mas o body do player deve estar no game_map tbm.
// oq significa q a gente teria algo como:
Player : {
  ... 
  body: Body
}

export type Body = {
  id: string;
  hitbox: Shape;
  pos: V2;
  tick: (gs: GameState) => GameState;
  draw: (ctx: CanvasRenderingContext2D) => void;
};

type Hero = {
  stats: Stats // can extract all here, no need for a type
  skills: Map<string, Skill>; // ????
  casted_skills: SkillCast[];
  id: string;
  animations: Map<string, Animation>; // ?????
  current_frame: number;
  body: Body;
  is_idle: boolean;
}

// path de arquivo
[frame1, frame2, frame3, frame4]
(gs, body, tick) => gs, prox_frame

[1,2,3,4] , tick1 faz fodase, tick2 faz fds

{
  "yasuo_q": [(1, 0), (2, 1)],
  "yasuo_ult": sdalkjlkdsa
  "yasuo_wal": laskdjlsak
  "idle": asldkjsdlakj
  "base_return" : aslkdjlsakdj
}


function tick_fn(body_id: string): (gs: GameState) => GameState {
  return (gs: GameState): GameState => {
    const body = gs.game_map.bodies.find(b => b.id === body_id);
    if (!body) return gs;

    const movement: V2 = { x: 1, y: 0 };
    const [updated_gs, _] = move(body, movement)(gs);
    return updated_gs;
  };
}

///yasuo.ts -> { check_movement() : olha teclas apertadas, move o body se WASD for apertado }
///rammus.ts -> { check_movement() : olha teclas apertadas, move o body se WASD for apertado }
///tower.ts -> { n vai checar movimento }

// o arquivo yasuo.ts vai ter q implementar o tick especifico daquele body e o draw. Isso significa q 
// diferentes bonecos podem ter diferentes ticks
// collision checking so acontece entre hitboxes do gameMap, de forma q a gente n precisa implementar isso
// dentro do hero / player / whatever, vai ser so um loop no gameMap logo dps de atualizar os players


// criar um body, com uma hitbox X, na posicao de nascimento do player
// pegar as funcoes padrao tick e draw do player e mandar pro body
// criar o player e botar esse body tanto no mapa do jogo quanto como atributo do player
// yasuo.ts -> Hero

const body = new_body(hitbox, position);
const body = new_body(hitbox, position, hero);

function tick_player_body(player: Player): (gs: GameState) => GameState {
  return (gs: GameState): GameState => {
    // if player pressed tecla W
    // move player up
    // else do nothing 
    // return updated state
  }
}








