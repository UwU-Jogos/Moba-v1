function LIST_TO_JSTR(list) {
  try {
    let result = '';
    let current = list;
    while (current.$ === 'Cons') {
      result += String.fromCodePoint(Number(current.head));
      current = current.tail;
    }
    if (current.$ === 'Nil') {
      return result;
    }
  } catch (e) {}
  return list;
}

function JSTR_TO_LIST(str) {
  let list = {$: 'Nil'};
  for (let i = str.length - 1; i >= 0; i--) {
    list = {$: 'Cons', head: BigInt(str.charCodeAt(i)), tail: list};
  }
  return list;
}

let MEMORY = new Map();
function SWAP(key, val) {
  var old = MEMORY.get(key) || 0n;
  MEMORY.set(key, val);
  return old;
}


function $BinTree$(_$0/*:Type*/) {var $x0 = /*{$:'Node', val: _$0, lft: BinTree<_$0>, rgt: BinTree<_$0>} | {$:'Leaf'}*/null;return $x0; }
const $BinTree = _$0 => $BinTree$(_$0)

function $Maybe$(_$0/*:Type*/) {var $x0 = /*{$:'None'} | {$:'Some', value: _$0}*/null;return $x0; }
const $Maybe = _$0 => $Maybe$(_$0)

function $BinMap$(_$0/*:Type*/) {var $x2 = _$0;var $x1 = $Maybe$($x2);var $x0 = $BinTree$($x1);return $x0; }
const $BinMap = _$0 => $BinMap$(_$0)

function $BinMap$empty$(_$0/*:Type*/) {var $x0 = ({$: "Leaf"});return $x0; }
const $BinMap$empty = _$0 => $BinMap$empty$(_$0)

const $Bits$ = (() => {var $x0 = /*{$:'O', tail: Bits} | {$:'I', tail: Bits} | {$:'E'}*/null;return $x0; })()
const $Bits = $Bits$

function $BinMap$get$(_$0/*:Type*/,_$1/*:BinMap<null>*/,_$2/*:Bits*/) {while(1){var $x1 = _$1;switch ($x1.$) { case "Leaf": { var $x0 = ({$: "None"}); break; } case "Node": { var $x2 = _$2;switch ($x2.$) { case "E": { var $x0 = $x1.val; break; } case "I": { var $x3 = _$0;var $x4 = $x1.rgt;var $x5 = $x2.tail;_$0 = $x3;_$1 = $x4;_$2 = $x5;/*TCO*/continue; break; } case "O": { var $x6 = _$0;var $x7 = $x1.lft;var $x8 = $x2.tail;_$0 = $x6;_$1 = $x7;_$2 = $x8;/*TCO*/continue; break; } } break; } }return $x0; }}
const $BinMap$get = _$0 => _$1 => _$2 => $BinMap$get$(_$0,_$1,_$2)

function $BinMap$new$(_$0/*:Type*/) {var $x1 = _$0;var $x0 = $BinMap$empty$($x1);return $x0; }
const $BinMap$new = _$0 => $BinMap$new$(_$0)

function $BinMap$set$(_$0/*:Type*/,_$1/*:BinMap<null>*/,_$2/*:Bits*/,_$3/*:null*/) {var $x1 = _$1;switch ($x1.$) { case "Leaf": { var $x2 = _$2;switch ($x2.$) { case "E": { var $x0 = ({$: "Node"});var $x3 = ({$: "Some"});var $x4 = _$3;$x3.value = $x4;$x0.val = $x3;var $x5 = ({$: "Leaf"});$x0.lft = $x5;var $x6 = ({$: "Leaf"});$x0.rgt = $x6; break; } case "I": { var $x0 = ({$: "Node"});var $x7 = ({$: "None"});$x0.val = $x7;var $x8 = ({$: "Leaf"});$x0.lft = $x8;var $x10 = _$0;var $x11 = ({$: "Leaf"});var $x12 = $x2.tail;var $x13 = _$3;var $x9 = $BinMap$set$($x10, $x11, $x12, $x13);$x0.rgt = $x9; break; } case "O": { var $x0 = ({$: "Node"});var $x14 = ({$: "None"});$x0.val = $x14;var $x16 = _$0;var $x17 = ({$: "Leaf"});var $x18 = $x2.tail;var $x19 = _$3;var $x15 = $BinMap$set$($x16, $x17, $x18, $x19);$x0.lft = $x15;var $x20 = ({$: "Leaf"});$x0.rgt = $x20; break; } } break; } case "Node": { var $x21 = _$2;switch ($x21.$) { case "E": { var $x0 = ({$: "Node"});var $x22 = ({$: "Some"});var $x23 = _$3;$x22.value = $x23;$x0.val = $x22;var $x24 = $x1.lft;$x0.lft = $x24;var $x25 = $x1.rgt;$x0.rgt = $x25; break; } case "I": { var $x0 = ({$: "Node"});var $x26 = $x1.val;$x0.val = $x26;var $x27 = $x1.lft;$x0.lft = $x27;var $x29 = _$0;var $x30 = $x1.rgt;var $x31 = $x21.tail;var $x32 = _$3;var $x28 = $BinMap$set$($x29, $x30, $x31, $x32);$x0.rgt = $x28; break; } case "O": { var $x0 = ({$: "Node"});var $x33 = $x1.val;$x0.val = $x33;var $x35 = _$0;var $x36 = $x1.lft;var $x37 = $x21.tail;var $x38 = _$3;var $x34 = $BinMap$set$($x35, $x36, $x37, $x38);$x0.lft = $x34;var $x39 = $x1.rgt;$x0.rgt = $x39; break; } } break; } }return $x0; }
const $BinMap$set = _$0 => _$1 => _$2 => _$3 => $BinMap$set$(_$0,_$1,_$2,_$3)

const $Bool$ = (() => {var $x0 = /*{$:'True'} | {$:'False'}*/null;return $x0; })()
const $Bool = $Bool$

function $Bool$eq$(_$0/*:Bool*/) {var $x1 = _$0;switch ($x1.$) { case "False": { var $x0 = ($__0$0 => {var $x3 = $__0$0;switch ($x3.$) { case "False": { var $x2 = ({$: "True"}); break; } default: { var $x2 = ({$: "False"}); break; } }return $x2;}); break; } case "True": { var $x0 = ($__0$0 => {var $x5 = $__0$0;switch ($x5.$) { case "True": { var $x4 = ({$: "True"}); break; } default: { var $x4 = ({$: "False"}); break; } }return $x4;}); break; } default: { var $x6 = /*Type*/null;var $x7 = $x1;var $x0 = ($x6)($x7); break; } }return $x0; }
const $Bool$eq = _$0 => $Bool$eq$(_$0)

const $Char$ = (() => {var $x0 = /*BigInt*/null;return $x0; })()
const $Char = $Char$

function $Equal$(_$0/*:Type*/,_$1/*:null*/,_$2/*:null*/) {var $x0 = /*{$:'Refl'}*/null;return $x0; }
const $Equal = _$0 => _$1 => _$2 => $Equal$(_$0,_$1,_$2)

const $GameAction$ = (() => {var $x0 = /*{$:'Increment'}*/null;return $x0; })()
const $GameAction = $GameAction$

function $GameAction$eq$(_$0/*:GameAction*/,_$1/*:GameAction*/) {var $x1 = _$0;var $x2 = _$1;var $x0 = ({$: "True"});return $x0; }
const $GameAction$eq = _$0 => _$1 => $GameAction$eq$(_$0,_$1)

const $GameState$ = (() => {var $x0 = /*{$:'GameState', counter: BigInt}*/null;return $x0; })()
const $GameState = $GameState$

function $GameState$counter$(_$0/*:GameState*/) {var $x1 = _$0;var $x0 = $x1.counter;return $x0; }
const $GameState$counter = _$0 => $GameState$counter$(_$0)

const $KEYEVENT$ = (() => {var $x0 = 0n;return $x0; })()
const $KEYEVENT = $KEYEVENT$

const $KEYMOUSE$ = (() => {var $x0 = 2n;return $x0; })()
const $KEYMOUSE = $KEYMOUSE$

function $List$(_$0/*:Type*/) {var $x0 = /*{$:'Nil'} | {$:'Cons', head: _$0, tail: List<_$0>}*/null;return $x0; }
const $List = _$0 => $List$(_$0)

function $List$append$(_$0/*:Type*/,_$1/*:List<null>*/,_$2/*:List<null>*/) {var $x1 = _$1;switch ($x1.$) { case "Cons": { var $x0 = ({$: "Cons"});var $x2 = $x1.head;$x0.head = $x2;var $x4 = _$0;var $x5 = $x1.tail;var $x6 = _$2;var $x3 = $List$append$($x4, $x5, $x6);$x0.tail = $x3; break; } case "Nil": { var $x0 = _$2; break; } }return $x0; }
const $List$append = _$0 => _$1 => _$2 => $List$append$(_$0,_$1,_$2)

function $List$foldr$(_$0/*:Type*/,_$1/*:List<null>*/,_$2/*:Type*/,_$3/*:null*/,_$4/*:($_$4:null) => ($_$5:null) => null*/) {var $x1 = _$1;switch ($x1.$) { case "Cons": { var $x3 = _$4;var $x4 = $x1.head;var $x2 = ($x3)($x4);var $x6 = _$0;var $x7 = $x1.tail;var $x8 = _$2;var $x9 = _$3;var $x10 = _$4;var $x5 = $List$foldr$($x6, $x7, $x8, $x9, $x10);var $x0 = ($x2)($x5); break; } case "Nil": { var $x0 = _$3; break; } }return $x0; }
const $List$foldr = _$0 => _$1 => _$2 => _$3 => _$4 => $List$foldr$(_$0,_$1,_$2,_$3,_$4)

function $List$fold$(_$0/*:Type*/,_$1/*:List<null>*/,_$2/*:Type*/,_$3/*:null*/,_$4/*:($_$4:null) => ($_$5:null) => null*/) {var $x1 = _$0;var $x2 = _$1;var $x3 = _$2;var $x4 = _$3;var $x5 = _$4;var $x0 = $List$foldr$($x1, $x2, $x3, $x4, $x5);return $x0; }
const $List$fold = _$0 => _$1 => _$2 => _$3 => _$4 => $List$fold$(_$0,_$1,_$2,_$3,_$4)

const $MOUSECLICK$ = (() => {var $x0 = 1n;return $x0; })()
const $MOUSECLICK = $MOUSECLICK$

const $MOUSEMOVE$ = (() => {var $x0 = 3n;return $x0; })()
const $MOUSEMOVE = $MOUSEMOVE$

function $Maybe$none$(_$0/*:Type*/) {var $x0 = ({$: "None"});return $x0; }
const $Maybe$none = _$0 => $Maybe$none$(_$0)

const $Nat$ = (() => {var $x0 = /*{$:'Zero'} | {$:'Succ', pred: Nat}*/null;return $x0; })()
const $Nat = $Nat$

function $Pair$(_$0/*:Type*/,_$1/*:Type*/) {var $x0 = /*{$:'Pair', fst: _$0, snd: _$1}*/null;return $x0; }
const $Pair = _$0 => _$1 => $Pair$(_$0,_$1)

const $SETNICK$ = (() => {var $x0 = 101n;return $x0; })()
const $SETNICK = $SETNICK$

const $String$ = (() => {var $x1 = $Char;var $x0 = $List$($x1);return $x0; })()
const $String = $String$

function $U64$add$(_$0/*:BigInt*/,_$1/*:BigInt*/) {var $x1 = _$0;var $x2 = _$1;var $x0 = BigInt.asUintN(64, $x1 + $x2);return $x0; }
const $U64$add = _$0 => _$1 => $U64$add$(_$0,_$1)

function $U64$div$(_$0/*:BigInt*/,_$1/*:BigInt*/) {var $x1 = _$0;var $x2 = _$1;var $x0 = BigInt.asUintN(64, $x1 / $x2);return $x0; }
const $U64$div = _$0 => _$1 => $U64$div$(_$0,_$1)

function $U64$to_bool$(_$0/*:BigInt*/) {var $x1 = _$0;if ($x1 === 0n) { var $x0 = ({$: "False"}); } else { var $x0 = ({$: "True"}); }return $x0; }
const $U64$to_bool = _$0 => $U64$to_bool$(_$0)

function $U64$eql$(_$0/*:BigInt*/,_$1/*:BigInt*/) {var $x1 = _$0;var $x2 = _$1;var $x0 = BigInt.asUintN(64, $x1 === $x2);return $x0; }
const $U64$eql = _$0 => _$1 => $U64$eql$(_$0,_$1)

function $U64$eq$(_$0/*:BigInt*/,_$1/*:BigInt*/) {var $x2 = _$0;var $x3 = _$1;var $x1 = $U64$eql$($x2, $x3);var $x0 = $U64$to_bool$($x1);return $x0; }
const $U64$eq = _$0 => _$1 => $U64$eq$(_$0,_$1)

function $U64$from_bool$(_$0/*:Bool*/) {var $x1 = _$0;switch ($x1.$) { case "False": { var $x0 = 0n; break; } case "True": { var $x0 = 1n; break; } }return $x0; }
const $U64$from_bool = _$0 => $U64$from_bool$(_$0)

function $U64$gt$(_$0/*:BigInt*/,_$1/*:BigInt*/) {var $x2 = _$0;var $x3 = _$1;var $x1 = BigInt.asUintN(64, $x2 > $x3);var $x0 = $U64$to_bool$($x1);return $x0; }
const $U64$gt = _$0 => _$1 => $U64$gt$(_$0,_$1)

function $U64$lt$(_$0/*:BigInt*/,_$1/*:BigInt*/) {var $x2 = _$0;var $x3 = _$1;var $x1 = BigInt.asUintN(64, $x2 < $x3);var $x0 = $U64$to_bool$($x1);return $x0; }
const $U64$lt = _$0 => _$1 => $U64$lt$(_$0,_$1)

function $U64$max$(_$0/*:BigInt*/,_$1/*:BigInt*/) {var $x3 = _$0;var $x4 = _$1;var $x2 = BigInt.asUintN(64, $x3 >= $x4);var $x1 = $U64$to_bool$($x2);switch ($x1.$) { case "True": { var $x0 = _$0; break; } case "False": { var $x0 = _$1; break; } }return $x0; }
const $U64$max = _$0 => _$1 => $U64$max$(_$0,_$1)

function $U64$min$(_$0/*:BigInt*/,_$1/*:BigInt*/) {var $x3 = _$0;var $x4 = _$1;var $x2 = BigInt.asUintN(64, $x3 <= $x4);var $x1 = $U64$to_bool$($x2);switch ($x1.$) { case "True": { var $x0 = _$0; break; } case "False": { var $x0 = _$1; break; } }return $x0; }
const $U64$min = _$0 => _$1 => $U64$min$(_$0,_$1)

function $U64$mod$(_$0/*:BigInt*/,_$1/*:BigInt*/) {var $x1 = _$0;var $x2 = _$1;var $x0 = BigInt.asUintN(64, $x1 % $x2);return $x0; }
const $U64$mod = _$0 => _$1 => $U64$mod$(_$0,_$1)

function $U64$mul$(_$0/*:BigInt*/,_$1/*:BigInt*/) {var $x1 = _$0;var $x2 = _$1;var $x0 = BigInt.asUintN(64, $x1 * $x2);return $x0; }
const $U64$mul = _$0 => _$1 => $U64$mul$(_$0,_$1)

function $U64$sub$(_$0/*:BigInt*/,_$1/*:BigInt*/) {var $x1 = _$0;var $x2 = _$1;var $x0 = BigInt.asUintN(64, $x1 - $x2);return $x0; }
const $U64$sub = _$0 => _$1 => $U64$sub$(_$0,_$1)

function $U64$to_bits$(_$0/*:BigInt*/) {var $x1 = _$0;if ($x1 === 0n) { var $x0 = ({$: "E"}); } else { var $x3 = $x1;var $x4 = 1n;var $x2 = BigInt.asUintN(64, $x3 - $x4);if ($x2 === 0n) { var $x0 = ({$: "I"});var $x5 = ({$: "E"});$x0.tail = $x5; } else { var $x7 = 2n;var $x9 = $x2;var $x10 = 1n;var $x8 = BigInt.asUintN(64, $x9 - $x10);var $x6 = BigInt.asUintN(64, $x7 + $x8);var $x11 = 2n;var $quotient$0 = $U64$div$($x6, $x11);var $x13 = 2n;var $x15 = $x2;var $x16 = 1n;var $x14 = BigInt.asUintN(64, $x15 - $x16);var $x12 = BigInt.asUintN(64, $x13 + $x14);var $x17 = 2n;var $remainder$1 = $U64$mod$($x12, $x17);var $x19 = $remainder$1;var $x18 = $U64$to_bool$($x19);switch ($x18.$) { case "True": { var $x0 = ({$: "I"});var $x21 = $quotient$0;var $x20 = $U64$to_bits$($x21);$x0.tail = $x20; break; } case "False": { var $x0 = ({$: "O"});var $x23 = $quotient$0;var $x22 = $U64$to_bits$($x23);$x0.tail = $x22; break; } } } }return $x0; }
const $U64$to_bits = _$0 => $U64$to_bits$(_$0)

const $UG$SIPD$Action$ = (() => {var $x0 = /*{$:'SetNick', time: BigInt, pid: BigInt, nick: String}*/null;return $x0; })()
const $UG$SIPD$Action = $UG$SIPD$Action$

const $UG$SIPD$Event$Click$ = (() => {var $x0 = /*{$:'LeftButton'} | {$:'RightButton'}*/null;return $x0; })()
const $UG$SIPD$Event$Click = $UG$SIPD$Event$Click$

const $UG$SIPD$Event$ = (() => {var $x0 = /*{$:'KeyEvent', time: BigInt, pid: BigInt, key: String, pressed: Bool} | {$:'MouseClick', time: BigInt, pid: BigInt, click: UG/SIPD/Event/Click, x: Number, y: Number} | {$:'KeyMouse', time: BigInt, pid: BigInt, key: String, pressed: Bool, x: Number, y: Number} | {$:'MouseMove', time: BigInt, pid: BigInt, x: Number, y: Number} | {$:'ActionEvent', action: UG/SIPD/Action}*/null;return $x0; })()
const $UG$SIPD$Event = $UG$SIPD$Event$

function $UG$SM$ActionLogs$(_$0/*:Type*/) {var $x2 = _$0;var $x1 = $List$($x2);var $x0 = $BinMap$($x1);return $x0; }
const $UG$SM$ActionLogs = _$0 => $UG$SM$ActionLogs$(_$0)

const $UG$SM$Tick$ = (() => {var $x0 = /*BigInt*/null;return $x0; })()
const $UG$SM$Tick = $UG$SM$Tick$

function $UG$SM$ActionLogs$add_action$(_$0/*:Type*/,_$1/*:UG/SM/ActionLogs<null>*/,_$2/*:UG/SM/Tick*/,_$3/*:null*/) {var $x3 = _$0;var $x2 = $List$($x3);var $x4 = _$1;var $x6 = _$2;var $x5 = $U64$to_bits$($x6);var $x1 = $BinMap$get$($x2, $x4, $x5);switch ($x1.$) { case "None": { var $x8 = _$0;var $x7 = $List$($x8);var $x9 = _$1;var $x11 = _$2;var $x10 = $U64$to_bits$($x11);var $x12 = ({$: "Cons"});var $x13 = _$3;$x12.head = $x13;var $x14 = ({$: "Nil"});$x12.tail = $x14;var $x0 = $BinMap$set$($x7, $x9, $x10, $x12); break; } case "Some": { var $x16 = _$0;var $x15 = $List$($x16);var $x17 = _$1;var $x19 = _$2;var $x18 = $U64$to_bits$($x19);var $x21 = _$0;var $x22 = $x1.value;var $x23 = ({$: "Cons"});var $x24 = _$3;$x23.head = $x24;var $x25 = ({$: "Nil"});$x23.tail = $x25;var $x20 = $List$append$($x21, $x22, $x23);var $x0 = $BinMap$set$($x15, $x17, $x18, $x20); break; } }return $x0; }
const $UG$SM$ActionLogs$add_action = _$0 => _$1 => _$2 => _$3 => $UG$SM$ActionLogs$add_action$(_$0,_$1,_$2,_$3)

function $UG$SM$ActionLogs$get_actions$(_$0/*:Type*/,_$1/*:UG/SM/ActionLogs<null>*/,_$2/*:UG/SM/Tick*/) {var $x1 = _$2;var $key$0 = $U64$to_bits$($x1);var $x4 = _$0;var $x3 = $List$($x4);var $x5 = _$1;var $x6 = $key$0;var $x2 = $BinMap$get$($x3, $x5, $x6);switch ($x2.$) { case "None": { var $x0 = ({$: "Nil"}); break; } case "Some": { var $x0 = $x2.value; break; } }return $x0; }
const $UG$SM$ActionLogs$get_actions = _$0 => _$1 => _$2 => $UG$SM$ActionLogs$get_actions$(_$0,_$1,_$2)

function $UG$SM$Game$(_$0/*:Type*/,_$1/*:Type*/) {var $x0 = /*{$:'Game', init: _$0, when: ($_$0:_$1) => ($_$1:_$0) => _$0, tick: ($_$0:_$0) => _$0}*/null;return $x0; }
const $UG$SM$Game = _$0 => _$1 => $UG$SM$Game$(_$0,_$1)

function $UG$SM$Game$init$(_$0/*:Type*/,_$1/*:Type*/,_$2/*:UG/SM/Game<null><null>*/) {var $x1 = _$2;var $x0 = $x1.init;return $x0; }
const $UG$SM$Game$init = _$0 => _$1 => _$2 => $UG$SM$Game$init$(_$0,_$1,_$2)

function $UG$SM$Game$tick$(_$0/*:Type*/,_$1/*:Type*/,_$2/*:UG/SM/Game<null><null>*/) {var $x1 = _$2;var $x0 = $x1.tick;return $x0; }
const $UG$SM$Game$tick = _$0 => _$1 => _$2 => $UG$SM$Game$tick$(_$0,_$1,_$2)

function $UG$SM$Game$when$(_$0/*:Type*/,_$1/*:Type*/,_$2/*:UG/SM/Game<null><null>*/) {var $x1 = _$2;var $x0 = $x1.when;return $x0; }
const $UG$SM$Game$when = _$0 => _$1 => _$2 => $UG$SM$Game$when$(_$0,_$1,_$2)

function $UG$SM$StateLogs$StateNode$(_$0/*:Type*/) {var $x0 = /*{$:'StateNode', tick: UG/SM/Tick, keep: BigInt, life: BigInt, state: _$0, older: Maybe<UG/SM/StateLogs/StateNode<_$0>>}*/null;return $x0; }
const $UG$SM$StateLogs$StateNode = _$0 => $UG$SM$StateLogs$StateNode$(_$0)

function $UG$SM$StateLogs$(_$0/*:Type*/) {var $x2 = _$0;var $x1 = $UG$SM$StateLogs$StateNode$($x2);var $x0 = $Maybe$($x1);return $x0; }
const $UG$SM$StateLogs = _$0 => $UG$SM$StateLogs$(_$0)

function $UG$SM$Mach$(_$0/*:Type*/,_$1/*:Type*/) {var $x0 = /*{$:'Mach', ticks_per_second: BigInt, genesis_tick: UG/SM/Tick, cached_tick: UG/SM/Tick, state_logs: UG/SM/StateLogs<_$0>, action_logs: UG/SM/ActionLogs<_$1>, action_eq: ($_$0:_$1) => ($_$1:_$1) => Bool}*/null;return $x0; }
const $UG$SM$Mach = _$0 => _$1 => $UG$SM$Mach$(_$0,_$1)

function $UG$SM$Mach$action_logs$(_$0/*:Type*/,_$1/*:Type*/,_$2/*:UG/SM/Mach<null><null>*/) {var $x1 = _$2;var $x0 = $x1.action_logs;return $x0; }
const $UG$SM$Mach$action_logs = _$0 => _$1 => _$2 => $UG$SM$Mach$action_logs$(_$0,_$1,_$2)

function $UG$SM$Mach$cached_tick$(_$0/*:Type*/,_$1/*:Type*/,_$2/*:UG/SM/Mach<null><null>*/) {var $x1 = _$2;var $x0 = $x1.cached_tick;return $x0; }
const $UG$SM$Mach$cached_tick = _$0 => _$1 => _$2 => $UG$SM$Mach$cached_tick$(_$0,_$1,_$2)

function $UG$SM$StateLogs$StateNode$keep$(_$0/*:Type*/,_$1/*:UG/SM/StateLogs/StateNode<null>*/) {var $x1 = _$1;var $x0 = $x1.keep;return $x0; }
const $UG$SM$StateLogs$StateNode$keep = _$0 => _$1 => $UG$SM$StateLogs$StateNode$keep$(_$0,_$1)

function $UG$SM$StateLogs$StateNode$life$(_$0/*:Type*/,_$1/*:UG/SM/StateLogs/StateNode<null>*/) {var $x1 = _$1;var $x0 = $x1.life;return $x0; }
const $UG$SM$StateLogs$StateNode$life = _$0 => _$1 => $UG$SM$StateLogs$StateNode$life$(_$0,_$1)

function $UG$SM$StateLogs$StateNode$older$(_$0/*:Type*/,_$1/*:UG/SM/StateLogs/StateNode<null>*/) {var $x1 = _$1;var $x0 = $x1.older;return $x0; }
const $UG$SM$StateLogs$StateNode$older = _$0 => _$1 => $UG$SM$StateLogs$StateNode$older$(_$0,_$1)

function $UG$SM$StateLogs$StateNode$set_keep$(_$0/*:Type*/,_$1/*:BigInt*/,_$2/*:UG/SM/StateLogs/StateNode<null>*/) {var $x1 = _$2;var $x0 = ({$: "StateNode"});var $x2 = $x1.tick;$x0.tick = $x2;var $x3 = _$1;$x0.keep = $x3;var $x4 = $x1.life;$x0.life = $x4;var $x5 = $x1.state;$x0.state = $x5;var $x6 = $x1.older;$x0.older = $x6;return $x0; }
const $UG$SM$StateLogs$StateNode$set_keep = _$0 => _$1 => _$2 => $UG$SM$StateLogs$StateNode$set_keep$(_$0,_$1,_$2)

function $UG$SM$StateLogs$StateNode$set_life$(_$0/*:Type*/,_$1/*:BigInt*/,_$2/*:UG/SM/StateLogs/StateNode<null>*/) {var $x1 = _$2;var $x0 = ({$: "StateNode"});var $x2 = $x1.tick;$x0.tick = $x2;var $x3 = $x1.keep;$x0.keep = $x3;var $x4 = _$1;$x0.life = $x4;var $x5 = $x1.state;$x0.state = $x5;var $x6 = $x1.older;$x0.older = $x6;return $x0; }
const $UG$SM$StateLogs$StateNode$set_life = _$0 => _$1 => _$2 => $UG$SM$StateLogs$StateNode$set_life$(_$0,_$1,_$2)

function $UG$SM$StateLogs$StateNode$state$(_$0/*:Type*/,_$1/*:UG/SM/StateLogs/StateNode<null>*/) {var $x1 = _$1;var $x0 = $x1.state;return $x0; }
const $UG$SM$StateLogs$StateNode$state = _$0 => _$1 => $UG$SM$StateLogs$StateNode$state$(_$0,_$1)

function $UG$SM$StateLogs$StateNode$tick$(_$0/*:Type*/,_$1/*:UG/SM/StateLogs/StateNode<null>*/) {var $x1 = _$1;var $x0 = $x1.tick;return $x0; }
const $UG$SM$StateLogs$StateNode$tick = _$0 => _$1 => $UG$SM$StateLogs$StateNode$tick$(_$0,_$1)

function $UG$SM$StateLogs$find_rollback_amount$go$(_$0/*:Type*/,_$1/*:UG/SM/Tick*/,_$2/*:UG/SM/StateLogs<null>*/,_$3/*:BigInt*/) {while(1){var $x1 = _$2;switch ($x1.$) { case "None": { var $x0 = _$3; break; } case "Some": { var $x2 = $x1.value;var $x3 = _$1;var $x4 = $x2.tick;var $is_target_greater$0 = $U64$lt$($x3, $x4);var $x5 = $is_target_greater$0;switch ($x5.$) { case "True": { var $x6 = _$0;var $x7 = _$1;var $x8 = $x2.older;var $x10 = 1n;var $x11 = _$3;var $x9 = $U64$add$($x10, $x11);_$0 = $x6;_$1 = $x7;_$2 = $x8;_$3 = $x9;/*TCO*/continue; break; } case "False": { var $x0 = _$3; break; } } break; } }return $x0; }}
const $UG$SM$StateLogs$find_rollback_amount$go = _$0 => _$1 => _$2 => _$3 => $UG$SM$StateLogs$find_rollback_amount$go$(_$0,_$1,_$2,_$3)

function $UG$SM$StateLogs$find_rollback_amount$(_$0/*:Type*/,_$1/*:UG/SM/Tick*/,_$2/*:UG/SM/StateLogs<null>*/) {var $x1 = _$0;var $x2 = _$1;var $x3 = _$2;var $x4 = 0n;var $x0 = $UG$SM$StateLogs$find_rollback_amount$go$($x1, $x2, $x3, $x4);return $x0; }
const $UG$SM$StateLogs$find_rollback_amount = _$0 => _$1 => _$2 => $UG$SM$StateLogs$find_rollback_amount$(_$0,_$1,_$2)

function $UG$SM$StateLogs$push$go$life$(_$0/*:Type*/,_$1/*:null*/,_$2/*:UG/SM/StateLogs/StateNode<null>*/,_$3/*:UG/SM/Tick*/,_$4/*:BigInt*/) {var $x1 = _$4;if ($x1 === 0n) { var $x2 = _$0;var $x3 = 0n;var $x4 = _$2;var $updated_node$0 = $UG$SM$StateLogs$StateNode$set_keep$($x2, $x3, $x4);var $x0 = ({$: "Some"});var $x5 = ({$: "StateNode"});var $x6 = _$3;$x5.tick = $x6;var $x7 = 0n;$x5.keep = $x7;var $x9 = _$0;var $x10 = _$2;var $x8 = $UG$SM$StateLogs$StateNode$life$($x9, $x10);$x5.life = $x8;var $x11 = _$1;$x5.state = $x11;var $x12 = ({$: "Some"});var $x13 = $updated_node$0;$x12.value = $x13;$x5.older = $x12;$x0.value = $x5; } else { var $x14 = _$0;var $x15 = 0n;var $x17 = _$0;var $x19 = $x1;var $x20 = 1n;var $x18 = BigInt.asUintN(64, $x19 - $x20);var $x21 = _$2;var $x16 = $UG$SM$StateLogs$StateNode$set_life$($x17, $x18, $x21);var $updated_node$0 = $UG$SM$StateLogs$StateNode$set_keep$($x14, $x15, $x16);var $x0 = ({$: "Some"});var $x22 = ({$: "StateNode"});var $x23 = _$3;$x22.tick = $x23;var $x24 = 0n;$x22.keep = $x24;var $x25 = 0n;$x22.life = $x25;var $x26 = _$1;$x22.state = $x26;var $x27 = ({$: "Some"});var $x28 = $updated_node$0;$x27.value = $x28;$x22.older = $x27;$x0.value = $x22; }return $x0; }
const $UG$SM$StateLogs$push$go$life = _$0 => _$1 => _$2 => _$3 => _$4 => $UG$SM$StateLogs$push$go$life$(_$0,_$1,_$2,_$3,_$4)

function $UG$SM$StateLogs$push$go$(_$0/*:Type*/,_$1/*:null*/,_$2/*:UG/SM/StateLogs/StateNode<null>*/,_$3/*:UG/SM/Tick*/,_$4/*:BigInt*/) {var $x1 = _$4;if ($x1 === 0n) { var $x0 = ({$: "Some"});var $x3 = _$0;var $x4 = 1n;var $x5 = _$2;var $x2 = $UG$SM$StateLogs$StateNode$set_keep$($x3, $x4, $x5);$x0.value = $x2; } else { var $x6 = _$0;var $x7 = _$2;var $life$0 = $UG$SM$StateLogs$StateNode$life$($x6, $x7);var $x8 = _$0;var $x9 = _$1;var $x10 = _$2;var $x11 = _$3;var $x12 = $life$0;var $x0 = $UG$SM$StateLogs$push$go$life$($x8, $x9, $x10, $x11, $x12); }return $x0; }
const $UG$SM$StateLogs$push$go = _$0 => _$1 => _$2 => _$3 => _$4 => $UG$SM$StateLogs$push$go$(_$0,_$1,_$2,_$3,_$4)

function $UG$SM$StateLogs$push$(_$0/*:Type*/,_$1/*:null*/,_$2/*:UG/SM/StateLogs<null>*/,_$3/*:UG/SM/Tick*/) {var $x1 = _$2;switch ($x1.$) { case "None": { var $x0 = ({$: "Some"});var $x2 = ({$: "StateNode"});var $x3 = _$3;$x2.tick = $x3;var $x4 = 0n;$x2.keep = $x4;var $x5 = 0n;$x2.life = $x5;var $x6 = _$1;$x2.state = $x6;var $x7 = ({$: "None"});$x2.older = $x7;$x0.value = $x2; break; } case "Some": { var $x8 = _$0;var $x9 = $x1.value;var $keep$0 = $UG$SM$StateLogs$StateNode$keep$($x8, $x9);var $x10 = _$0;var $x11 = _$1;var $x12 = $x1.value;var $x13 = _$3;var $x14 = $keep$0;var $x0 = $UG$SM$StateLogs$push$go$($x10, $x11, $x12, $x13, $x14); break; } }return $x0; }
const $UG$SM$StateLogs$push = _$0 => _$1 => _$2 => _$3 => $UG$SM$StateLogs$push$(_$0,_$1,_$2,_$3)

function $UG$SM$StateLogs$rollback$go$(_$0/*:Type*/,_$1/*:BigInt*/,_$2/*:BigInt*/,_$3/*:UG/SM/StateLogs<null>*/,_$4/*:BigInt*/) {while(1){var $x1 = _$2;var $x2 = _$1;var $is_done$0 = $U64$lt$($x1, $x2);var $x5 = $is_done$0;var $x4 = $U64$from_bool$($x5);var $x3 = $U64$to_bool$($x4);switch ($x3.$) { case "True": { var $x0 = ({$: "Pair"});var $x6 = _$3;$x0.fst = $x6;var $x7 = _$4;$x0.snd = $x7; break; } case "False": { var $x8 = _$3;switch ($x8.$) { case "None": { var $x0 = ({$: "Pair"});var $x9 = ({$: "None"});$x0.fst = $x9;var $x10 = _$4;$x0.snd = $x10; break; } case "Some": { var $x11 = _$4;var $x14 = _$0;var $x15 = $x8.value;var $x13 = $UG$SM$StateLogs$StateNode$life$($x14, $x15);var $x16 = 1n;var $x12 = $U64$add$($x13, $x16);var $cut$1 = $U64$add$($x11, $x12);var $x17 = _$0;var $x18 = $x8.value;var $states$2 = $UG$SM$StateLogs$StateNode$older$($x17, $x18);var $x19 = _$0;var $x21 = _$1;var $x22 = 1n;var $x20 = $U64$add$($x21, $x22);var $x23 = _$2;var $x24 = $states$2;var $x25 = $cut$1;_$0 = $x19;_$1 = $x20;_$2 = $x23;_$3 = $x24;_$4 = $x25;/*TCO*/continue; break; } } break; } }return $x0; }}
const $UG$SM$StateLogs$rollback$go = _$0 => _$1 => _$2 => _$3 => _$4 => $UG$SM$StateLogs$rollback$go$(_$0,_$1,_$2,_$3,_$4)

function $UG$SM$StateLogs$rollback$(_$0/*:Type*/,_$1/*:BigInt*/,_$2/*:UG/SM/StateLogs<null>*/) {var $x1 = _$2;switch ($x1.$) { case "None": { var $x0 = ({$: "None"}); break; } case "Some": { var $x2 = _$0;var $x3 = 0n;var $x4 = _$1;var $x5 = _$2;var $x6 = 0n;var $pair$0 = $UG$SM$StateLogs$rollback$go$($x2, $x3, $x4, $x5, $x6);var $x7 = $pair$0;var $x8 = $x7.fst;switch ($x8.$) { case "None": { var $x0 = ({$: "None"}); break; } case "Some": { var $x9 = _$0;var $x10 = $x8.value;var $tick$1 = $UG$SM$StateLogs$StateNode$tick$($x9, $x10);var $x12 = _$0;var $x13 = $x8.value;var $x11 = $UG$SM$StateLogs$StateNode$life$($x12, $x13);var $x14 = $x7.snd;var $life$2 = $U64$add$($x11, $x14);var $x15 = _$0;var $x16 = $x8.value;var $state$3 = $UG$SM$StateLogs$StateNode$state$($x15, $x16);var $x17 = _$0;var $x18 = $x8.value;var $older$4 = $UG$SM$StateLogs$StateNode$older$($x17, $x18);var $x0 = ({$: "Some"});var $x19 = ({$: "StateNode"});var $x20 = $tick$1;$x19.tick = $x20;var $x21 = 0n;$x19.keep = $x21;var $x22 = $life$2;$x19.life = $x22;var $x23 = $state$3;$x19.state = $x23;var $x24 = $older$4;$x19.older = $x24;$x0.value = $x19; break; } } break; } }return $x0; }
const $UG$SM$StateLogs$rollback = _$0 => _$1 => _$2 => $UG$SM$StateLogs$rollback$(_$0,_$1,_$2)

const $UG$SM$Time$ = (() => {var $x0 = /*BigInt*/null;return $x0; })()
const $UG$SM$Time = $UG$SM$Time$

function $UG$SM$Time$time_to_tick$(_$0/*:Type*/,_$1/*:Type*/,_$2/*:UG/SM/Mach<null><null>*/,_$3/*:UG/SM/Time*/) {var $x1 = _$2;var $x2 = _$3;var $x3 = $x1.ticks_per_second;var $ticks$0 = $U64$mul$($x2, $x3);var $x4 = $ticks$0;var $x5 = 1000n;var $x0 = $U64$div$($x4, $x5);return $x0; }
const $UG$SM$Time$time_to_tick = _$0 => _$1 => _$2 => _$3 => $UG$SM$Time$time_to_tick$(_$0,_$1,_$2,_$3)

function $UG$SM$TimedAction$(_$0/*:Type*/) {var $x0 = /*{$:'TimedAction', action: _$0, time: UG/SM/Time}*/null;return $x0; }
const $UG$SM$TimedAction = _$0 => $UG$SM$TimedAction$(_$0)

function $UG$SM$TimedAction$time_action$(_$0/*:Type*/,_$1/*:UG/SM/Time*/,_$2/*:null*/) {var $x0 = ({$: "TimedAction"});var $x1 = _$2;$x0.action = $x1;var $x2 = _$1;$x0.time = $x2;return $x0; }
const $UG$SM$TimedAction$time_action = _$0 => _$1 => _$2 => $UG$SM$TimedAction$time_action$(_$0,_$1,_$2)

function $UG$SM$add_action_to_logs$(_$0/*:Type*/,_$1/*:Type*/,_$2/*:UG/SM/Mach<null><null>*/,_$3/*:UG/SM/Tick*/,_$4/*:null*/) {var $x1 = _$2;var $x2 = _$1;var $x3 = $x1.action_logs;var $x4 = _$3;var $x5 = _$4;var $new_logs$0 = $UG$SM$ActionLogs$add_action$($x2, $x3, $x4, $x5);var $x0 = ({$: "Mach"});var $x6 = $x1.ticks_per_second;$x0.ticks_per_second = $x6;var $x7 = $x1.genesis_tick;$x0.genesis_tick = $x7;var $x8 = $x1.cached_tick;$x0.cached_tick = $x8;var $x9 = $x1.state_logs;$x0.state_logs = $x9;var $x10 = $new_logs$0;$x0.action_logs = $x10;var $x11 = $x1.action_eq;$x0.action_eq = $x11;return $x0; }
const $UG$SM$add_action_to_logs = _$0 => _$1 => _$2 => _$3 => _$4 => $UG$SM$add_action_to_logs$(_$0,_$1,_$2,_$3,_$4)

function $UG$SM$get_initial_state$(_$0/*:Type*/,_$1/*:Type*/,_$2/*:UG/SM/Mach<null><null>*/,_$3/*:UG/SM/Game<null><null>*/) {var $x1 = _$2;var $x2 = $x1.state_logs;switch ($x2.$) { case "None": { var $x0 = ({$: "Pair"});var $x4 = _$0;var $x5 = _$1;var $x6 = _$3;var $x3 = $UG$SM$Game$init$($x4, $x5, $x6);$x0.fst = $x3;var $x7 = $x1.genesis_tick;$x0.snd = $x7; break; } case "Some": { var $x0 = ({$: "Pair"});var $x9 = _$0;var $x10 = $x2.value;var $x8 = $UG$SM$StateLogs$StateNode$state$($x9, $x10);$x0.fst = $x8;var $x12 = _$0;var $x13 = $x2.value;var $x11 = $UG$SM$StateLogs$StateNode$tick$($x12, $x13);$x0.snd = $x11; break; } }return $x0; }
const $UG$SM$get_initial_state = _$0 => _$1 => _$2 => _$3 => $UG$SM$get_initial_state$(_$0,_$1,_$2,_$3)

function $UG$SM$update_mach$(_$0/*:Type*/,_$1/*:Type*/,_$2/*:UG/SM/Mach<null><null>*/,_$3/*:UG/SM/Tick*/,_$4/*:null*/) {var $x1 = _$2;var $x2 = $x1.cached_tick;var $x3 = _$3;var $new_cached_tick$0 = $U64$max$($x2, $x3);var $x4 = _$0;var $x5 = _$4;var $x6 = $x1.state_logs;var $x7 = _$3;var $new_state_logs$1 = $UG$SM$StateLogs$push$($x4, $x5, $x6, $x7);var $x0 = ({$: "Mach"});var $x8 = $x1.ticks_per_second;$x0.ticks_per_second = $x8;var $x9 = $x1.genesis_tick;$x0.genesis_tick = $x9;var $x10 = $new_cached_tick$0;$x0.cached_tick = $x10;var $x11 = $new_state_logs$1;$x0.state_logs = $x11;var $x12 = $x1.action_logs;$x0.action_logs = $x12;var $x13 = $x1.action_eq;$x0.action_eq = $x13;return $x0; }
const $UG$SM$update_mach = _$0 => _$1 => _$2 => _$3 => _$4 => $UG$SM$update_mach$(_$0,_$1,_$2,_$3,_$4)

function $UG$SM$compute$go$(_$0/*:Type*/,_$1/*:Type*/,_$2/*:UG/SM/Mach<null><null>*/,_$3/*:UG/SM/Game<null><null>*/,_$4/*:null*/,_$5/*:UG/SM/Tick*/,_$6/*:UG/SM/Tick*/) {while(1){var $x2 = _$5;var $x3 = _$6;var $x1 = $U64$eq$($x2, $x3);switch ($x1.$) { case "True": { var $x0 = ({$: "Pair"});var $x4 = _$4;$x0.fst = $x4;var $x5 = _$2;$x0.snd = $x5; break; } case "False": { var $x6 = _$5;var $x7 = 1n;var $next_tick$0 = $U64$add$($x6, $x7);var $x8 = _$1;var $x10 = _$0;var $x11 = _$1;var $x12 = _$2;var $x9 = $UG$SM$Mach$action_logs$($x10, $x11, $x12);var $x13 = _$5;var $actions$1 = $UG$SM$ActionLogs$get_actions$($x8, $x9, $x13);var $x14 = _$1;var $x15 = $actions$1;var $x16 = _$0;var $x17 = _$4;var $x19 = _$0;var $x20 = _$1;var $x21 = _$3;var $x18 = $UG$SM$Game$when$($x19, $x20, $x21);var $state_with_actions$2 = $List$foldr$($x14, $x15, $x16, $x17, $x18);var $x23 = _$0;var $x24 = _$1;var $x25 = _$3;var $x22 = $UG$SM$Game$tick$($x23, $x24, $x25);var $x26 = $state_with_actions$2;var $next_state$3 = ($x22)($x26);var $x27 = _$0;var $x28 = _$1;var $x29 = _$2;var $x30 = _$5;var $x31 = _$4;var $updated_mach$4 = $UG$SM$update_mach$($x27, $x28, $x29, $x30, $x31);var $x32 = _$0;var $x33 = _$1;var $x34 = $updated_mach$4;var $x35 = _$3;var $x36 = $next_state$3;var $x37 = $next_tick$0;var $x38 = _$6;_$0 = $x32;_$1 = $x33;_$2 = $x34;_$3 = $x35;_$4 = $x36;_$5 = $x37;_$6 = $x38;/*TCO*/continue; break; } }return $x0; }}
const $UG$SM$compute$go = _$0 => _$1 => _$2 => _$3 => _$4 => _$5 => _$6 => $UG$SM$compute$go$(_$0,_$1,_$2,_$3,_$4,_$5,_$6)

function $UG$SM$compute$(_$0/*:Type*/,_$1/*:Type*/,_$2/*:UG/SM/Mach<null><null>*/,_$3/*:UG/SM/Game<null><null>*/,_$4/*:UG/SM/Time*/) {var $x1 = _$0;var $x2 = _$1;var $x3 = _$2;var $x4 = _$4;var $end_t$0 = $UG$SM$Time$time_to_tick$($x1, $x2, $x3, $x4);var $x5 = _$0;var $x6 = _$1;var $x7 = _$2;var $x8 = _$3;var $got$1 = $UG$SM$get_initial_state$($x5, $x6, $x7, $x8);var $x9 = $got$1;var $x10 = $end_t$0;var $x11 = $x9.snd;var $diff$2 = $U64$sub$($x10, $x11);var $x13 = $diff$2;var $x14 = 1000n;var $x12 = $U64$gt$($x13, $x14);switch ($x12.$) { case "True": { var $x0 = ({$: "Pair"});var $x15 = $x9.fst;$x0.fst = $x15;var $x16 = _$2;$x0.snd = $x16; break; } case "False": { var $x17 = _$0;var $x18 = _$1;var $x19 = _$2;var $x20 = _$3;var $x21 = $x9.fst;var $x22 = $x9.snd;var $x23 = $end_t$0;var $x0 = $UG$SM$compute$go$($x17, $x18, $x19, $x20, $x21, $x22, $x23); break; } }return $x0; }
const $UG$SM$compute = _$0 => _$1 => _$2 => _$3 => _$4 => $UG$SM$compute$(_$0,_$1,_$2,_$3,_$4)

function $UG$SM$new_mach$(_$0/*:Type*/,_$1/*:Type*/,_$2/*:BigInt*/,_$3/*:($_$3:null) => ($_$4:null) => Bool*/) {var $x0 = ({$: "Mach"});var $x1 = _$2;$x0.ticks_per_second = $x1;var $x2 = 687399551400673280n;$x0.genesis_tick = $x2;var $x3 = 0n;$x0.cached_tick = $x3;var $x6 = _$0;var $x5 = $UG$SM$StateLogs$StateNode$($x6);var $x4 = $Maybe$none$($x5);$x0.state_logs = $x4;var $x9 = _$1;var $x8 = $List$($x9);var $x7 = $BinMap$new$($x8);$x0.action_logs = $x7;var $x10 = _$3;$x0.action_eq = $x10;return $x0; }
const $UG$SM$new_mach = _$0 => _$1 => _$2 => _$3 => $UG$SM$new_mach$(_$0,_$1,_$2,_$3)

function $UG$SM$update_genesis_tick$(_$0/*:Type*/,_$1/*:Type*/,_$2/*:UG/SM/Mach<null><null>*/,_$3/*:UG/SM/Tick*/) {var $x1 = _$2;var $x2 = _$3;var $x3 = $x1.genesis_tick;var $new_genesis$0 = $U64$min$($x2, $x3);var $x0 = ({$: "Mach"});var $x4 = $x1.ticks_per_second;$x0.ticks_per_second = $x4;var $x5 = $new_genesis$0;$x0.genesis_tick = $x5;var $x6 = $x1.cached_tick;$x0.cached_tick = $x6;var $x7 = $x1.state_logs;$x0.state_logs = $x7;var $x8 = $x1.action_logs;$x0.action_logs = $x8;var $x9 = $x1.action_eq;$x0.action_eq = $x9;return $x0; }
const $UG$SM$update_genesis_tick = _$0 => _$1 => _$2 => _$3 => $UG$SM$update_genesis_tick$(_$0,_$1,_$2,_$3)

function $UG$SM$update_cached_tick$(_$0/*:Type*/,_$1/*:Type*/,_$2/*:UG/SM/Mach<null><null>*/,_$3/*:UG/SM/Tick*/) {var $x1 = _$2;var $x3 = _$3;var $x4 = $x1.cached_tick;var $x2 = $U64$lt$($x3, $x4);switch ($x2.$) { case "True": { var $x0 = ({$: "Mach"});var $x5 = $x1.ticks_per_second;$x0.ticks_per_second = $x5;var $x6 = $x1.genesis_tick;$x0.genesis_tick = $x6;var $x7 = _$3;$x0.cached_tick = $x7;var $x8 = $x1.state_logs;$x0.state_logs = $x8;var $x9 = $x1.action_logs;$x0.action_logs = $x9;var $x10 = $x1.action_eq;$x0.action_eq = $x10; break; } case "False": { var $x0 = ({$: "Mach"});var $x11 = $x1.ticks_per_second;$x0.ticks_per_second = $x11;var $x12 = $x1.genesis_tick;$x0.genesis_tick = $x12;var $x13 = $x1.cached_tick;$x0.cached_tick = $x13;var $x14 = $x1.state_logs;$x0.state_logs = $x14;var $x15 = $x1.action_logs;$x0.action_logs = $x15;var $x16 = $x1.action_eq;$x0.action_eq = $x16; break; } }return $x0; }
const $UG$SM$update_cached_tick = _$0 => _$1 => _$2 => _$3 => $UG$SM$update_cached_tick$(_$0,_$1,_$2,_$3)

function $UG$SM$remove_future_states$(_$0/*:Type*/,_$1/*:Type*/,_$2/*:UG/SM/Mach<null><null>*/,_$3/*:UG/SM/Tick*/) {var $x1 = _$2;var $x2 = _$0;var $x3 = _$3;var $x4 = $x1.state_logs;var $rollback_amount$0 = $UG$SM$StateLogs$find_rollback_amount$($x2, $x3, $x4);var $x5 = _$0;var $x6 = $rollback_amount$0;var $x7 = $x1.state_logs;var $new_logs$1 = $UG$SM$StateLogs$rollback$($x5, $x6, $x7);var $x0 = ({$: "Mach"});var $x8 = $x1.ticks_per_second;$x0.ticks_per_second = $x8;var $x9 = $x1.genesis_tick;$x0.genesis_tick = $x9;var $x10 = $x1.cached_tick;$x0.cached_tick = $x10;var $x11 = $new_logs$1;$x0.state_logs = $x11;var $x12 = $x1.action_logs;$x0.action_logs = $x12;var $x13 = $x1.action_eq;$x0.action_eq = $x13;return $x0; }
const $UG$SM$remove_future_states = _$0 => _$1 => _$2 => _$3 => $UG$SM$remove_future_states$(_$0,_$1,_$2,_$3)

function $UG$SM$register_action$(_$0/*:Type*/,_$1/*:Type*/,_$2/*:UG/SM/Mach<null><null>*/,_$3/*:UG/SM/TimedAction<null>*/) {var $x1 = _$3;var $x2 = _$0;var $x3 = _$1;var $x4 = _$2;var $x5 = $x1.time;var $tick$0 = $UG$SM$Time$time_to_tick$($x2, $x3, $x4, $x5);var $x6 = _$0;var $x7 = _$1;var $x8 = _$2;var $x9 = $tick$0;var $mach$1 = $UG$SM$update_genesis_tick$($x6, $x7, $x8, $x9);var $x10 = _$0;var $x11 = _$1;var $x12 = $mach$1;var $x13 = $tick$0;var $mach$2 = $UG$SM$update_cached_tick$($x10, $x11, $x12, $x13);var $x14 = _$0;var $x15 = _$1;var $x16 = $mach$2;var $x17 = $tick$0;var $mach$3 = $UG$SM$remove_future_states$($x14, $x15, $x16, $x17);var $x18 = _$0;var $x19 = _$1;var $x20 = $mach$3;var $x21 = $tick$0;var $x22 = $x1.action;var $x0 = $UG$SM$add_action_to_logs$($x18, $x19, $x20, $x21, $x22);return $x0; }
const $UG$SM$register_action = _$0 => _$1 => _$2 => _$3 => $UG$SM$register_action$(_$0,_$1,_$2,_$3)

const $another_game$ = (() => {var $x0 = ({$: "Game"});var $x1 = ({$: "GameState"});var $x2 = 0n;$x1.counter = $x2;$x0.init = $x1;var $x3 = ($action$0 => $state$1 => {var $x4 = $state$1;return $x4;});$x0.when = $x3;var $x5 = ($state$0 => {var $x6 = $state$0;return $x6;});$x0.tick = $x5;return $x0; })()
const $another_game = $another_game$

const $event$ = (() => {var $x0 = ({$: "KeyEvent"});var $x1 = 0n;$x0.time = $x1;var $x2 = 0n;$x0.pid = $x2;var $x3 = JSTR_TO_LIST(`a`);$x0.key = $x3;var $x4 = ({$: "False"});$x0.pressed = $x4;return $x0; })()
const $event = $event$

const $event1$ = (() => {var $x0 = ({$: "MouseClick"});var $x1 = 0n;$x0.time = $x1;var $x2 = 0n;$x0.pid = $x2;var $x3 = ({$: "LeftButton"});$x0.click = $x3;var $x4 = 1.0;$x0.x = $x4;var $x5 = 1.0;$x0.y = $x5;return $x0; })()
const $event1 = $event1$

const $event2$ = (() => {var $x0 = ({$: "KeyMouse"});var $x1 = 0n;$x0.time = $x1;var $x2 = 0n;$x0.pid = $x2;var $x3 = JSTR_TO_LIST(`a`);$x0.key = $x3;var $x4 = ({$: "True"});$x0.pressed = $x4;var $x5 = 1.0;$x0.x = $x5;var $x6 = 1.0;$x0.y = $x6;return $x0; })()
const $event2 = $event2$

const $event3$ = (() => {var $x0 = ({$: "MouseMove"});var $x1 = 0n;$x0.time = $x1;var $x2 = 0n;$x0.pid = $x2;var $x3 = 1.0;$x0.x = $x3;var $x4 = 1.0;$x0.y = $x4;return $x0; })()
const $event3 = $event3$

const $event4$ = (() => {var $x0 = ({$: "ActionEvent"});var $x1 = ({$: "SetNick"});var $x2 = 1n;$x1.time = $x2;var $x3 = 1n;$x1.pid = $x3;var $x4 = JSTR_TO_LIST(`hey`);$x1.nick = $x4;$x0.action = $x1;return $x0; })()
const $event4 = $event4$

const $gm$ = (() => {var $x0 = ({$: "GameState"});var $x1 = 3n;$x0.counter = $x1;return $x0; })()
const $gm = $gm$

function $simulate_game$(_$0/*:BigInt*/) {var $x1 = $GameState;var $x2 = $GameAction;var $x3 = 60n;var $x4 = $GameAction$eq;var $mach$0 = $UG$SM$new_mach$($x1, $x2, $x3, $x4);var $x5 = $GameState;var $x6 = $GameAction;var $x7 = $mach$0;var $x8 = ({$: "TimedAction"});var $x9 = ({$: "Increment"});$x8.action = $x9;var $x10 = 0n;$x8.time = $x10;var $mach$1 = $UG$SM$register_action$($x5, $x6, $x7, $x8);var $x11 = $GameState;var $x12 = $GameAction;var $x13 = $mach$1;var $x14 = $another_game;var $x15 = 10n;var $mach_and_state$2 = $UG$SM$compute$($x11, $x12, $x13, $x14, $x15);var $x0 = $mach$1;return $x0; }
const $simulate_game = _$0 => $simulate_game$(_$0)

const $mach$ = (() => {var $x1 = 1n;var $x0 = $simulate_game$($x1);return $x0; })()
const $mach = $mach$

const $main$ = (() => {var $x0 = ({$: "Mach"});var $x1 = 60n;$x0.ticks_per_second = $x1;var $x2 = 0n;$x0.genesis_tick = $x2;var $x3 = 0n;$x0.cached_tick = $x3;var $x4 = ({$: "None"});$x0.state_logs = $x4;var $x5 = ({$: "Node"});var $x6 = ({$: "Some"});var $x7 = ({$: "Cons"});var $x8 = ({$: "Increment"});$x7.head = $x8;var $x9 = ({$: "Nil"});$x7.tail = $x9;$x6.value = $x7;$x5.val = $x6;var $x10 = ({$: "Leaf"});$x5.lft = $x10;var $x11 = ({$: "Leaf"});$x5.rgt = $x11;$x0.action_logs = $x5;var $x12 = $GameAction$eq;$x0.action_eq = $x12;return $x0; })()
const $main = $main$

function $whenn$(_$0/*:UG/SIPD/Event*/) {var $x1 = _$0;switch ($x1.$) { case "MouseClick": { var $x2 = $x1.click;switch ($x2.$) { case "LeftButton": { var $x0 = ($state$0 => {var $x3 = ({$: "GameState"});var $x6 = $state$0;var $x5 = $GameState$counter$($x6);var $x7 = 1n;var $x4 = $U64$add$($x5, $x7);$x3.counter = $x4;return $x3;}); break; } default: { var $x0 = ($state$0 => {var $x8 = $state$0;return $x8;}); break; } } break; } default: { var $x0 = ($state$0 => {var $x9 = $state$0;return $x9;}); break; } }return $x0; }
const $whenn = _$0 => $whenn$(_$0)

const $simple_game$ = (() => {var $x0 = ({$: "Game"});var $x1 = ({$: "GameState"});var $x2 = 0n;$x1.counter = $x2;$x0.init = $x1;var $x3 = $whenn;$x0.when = $x3;var $x4 = ($state$0 => {var $x5 = $state$0;return $x5;});$x0.tick = $x4;return $x0; })()
const $simple_game = $simple_game$

const $test$0$ = (() => {var $x0 = ({$: "Refl"});return $x0; })()
const $test$0 = $test$0$

const $test$1$ = (() => {var $x0 = ({$: "Refl"});return $x0; })()
const $test$1 = $test$1$

const $test$2$ = (() => {var $x0 = ({$: "Refl"});return $x0; })()
const $test$2 = $test$2$

const $test$3$ = (() => {var $x0 = ({$: "Refl"});return $x0; })()
const $test$3 = $test$3$

const $test$4$ = (() => {var $x0 = ({$: "Refl"});return $x0; })()
const $test$4 = $test$4$

const $timedEv1$ = (() => {var $x1 = $UG$SIPD$Event;var $x2 = 1n;var $x3 = $event1;var $x0 = $UG$SM$TimedAction$time_action$($x1, $x2, $x3);return $x0; })()
const $timedEv1 = $timedEv1$


export { $BinTree, $Maybe, $BinMap, $BinMap$empty, $Bits, $BinMap$get, $BinMap$new, $BinMap$set, $Bool, $Bool$eq, $Char, $Equal, $GameAction, $GameAction$eq, $GameState, $GameState$counter, $KEYEVENT, $KEYMOUSE, $List, $List$append, $List$foldr, $List$fold, $MOUSECLICK, $MOUSEMOVE, $Maybe$none, $Nat, $Pair, $SETNICK, $String, $U64$add, $U64$div, $U64$to_bool, $U64$eql, $U64$eq, $U64$from_bool, $U64$gt, $U64$lt, $U64$max, $U64$min, $U64$mod, $U64$mul, $U64$sub, $U64$to_bits, $UG$SIPD$Action, $UG$SIPD$Event$Click, $UG$SIPD$Event, $UG$SM$ActionLogs, $UG$SM$Tick, $UG$SM$ActionLogs$add_action, $UG$SM$ActionLogs$get_actions, $UG$SM$Game, $UG$SM$Game$init, $UG$SM$Game$tick, $UG$SM$Game$when, $UG$SM$StateLogs$StateNode, $UG$SM$StateLogs, $UG$SM$Mach, $UG$SM$Mach$action_logs, $UG$SM$Mach$cached_tick, $UG$SM$StateLogs$StateNode$keep, $UG$SM$StateLogs$StateNode$life, $UG$SM$StateLogs$StateNode$older, $UG$SM$StateLogs$StateNode$set_keep, $UG$SM$StateLogs$StateNode$set_life, $UG$SM$StateLogs$StateNode$state, $UG$SM$StateLogs$StateNode$tick, $UG$SM$StateLogs$find_rollback_amount$go, $UG$SM$StateLogs$find_rollback_amount, $UG$SM$StateLogs$push$go$life, $UG$SM$StateLogs$push$go, $UG$SM$StateLogs$push, $UG$SM$StateLogs$rollback$go, $UG$SM$StateLogs$rollback, $UG$SM$Time, $UG$SM$Time$time_to_tick, $UG$SM$TimedAction, $UG$SM$TimedAction$time_action, $UG$SM$add_action_to_logs, $UG$SM$get_initial_state, $UG$SM$update_mach, $UG$SM$compute$go, $UG$SM$compute, $UG$SM$new_mach, $UG$SM$update_genesis_tick, $UG$SM$update_cached_tick, $UG$SM$remove_future_states, $UG$SM$register_action, $another_game, $event, $event1, $event2, $event3, $event4, $gm, $simulate_game, $mach, $main, $whenn, $simple_game, $test$0, $test$1, $test$2, $test$3, $test$4, $timedEv1 }
