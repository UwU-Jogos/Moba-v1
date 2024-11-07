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

function $Bool$and$(_$0/*:Bool*/,_$1/*:Bool*/) {var $x1 = _$0;switch ($x1.$) { case "False": { var $x0 = ({$: "False"}); break; } case "True": { var $x0 = _$1; break; } }return $x0; }
const $Bool$and = _$0 => _$1 => $Bool$and$(_$0,_$1)

function $Bool$eq$(_$0/*:Bool*/) {var $x1 = _$0;switch ($x1.$) { case "False": { var $x0 = ($__0$0 => {var $x3 = $__0$0;switch ($x3.$) { case "False": { var $x2 = ({$: "True"}); break; } default: { var $x2 = ({$: "False"}); break; } }return $x2;}); break; } case "True": { var $x0 = ($__0$0 => {var $x5 = $__0$0;switch ($x5.$) { case "True": { var $x4 = ({$: "True"}); break; } default: { var $x4 = ({$: "False"}); break; } }return $x4;}); break; } default: { var $x6 = /*Type*/null;var $x7 = $x1;var $x0 = ($x6)($x7); break; } }return $x0; }
const $Bool$eq = _$0 => $Bool$eq$(_$0)

function $Bool$if$(_$0/*:Type*/,_$1/*:Bool*/,_$2/*:null*/,_$3/*:null*/) {var $x1 = _$1;switch ($x1.$) { case "False": { var $x0 = _$3; break; } case "True": { var $x0 = _$2; break; } }return $x0; }
const $Bool$if = _$0 => _$1 => _$2 => _$3 => $Bool$if$(_$0,_$1,_$2,_$3)

const $Char$ = (() => {var $x0 = /*BigInt*/null;return $x0; })()
const $Char = $Char$

function $U64$to_bool$(_$0/*:BigInt*/) {var $x1 = _$0;if ($x1 === 0n) { var $x0 = ({$: "False"}); } else { var $x0 = ({$: "True"}); }return $x0; }
const $U64$to_bool = _$0 => $U64$to_bool$(_$0)

function $U64$eql$(_$0/*:BigInt*/,_$1/*:BigInt*/) {var $x1 = _$0;var $x2 = _$1;var $x0 = BigInt.asUintN(64, $x1 === $x2);return $x0; }
const $U64$eql = _$0 => _$1 => $U64$eql$(_$0,_$1)

const $Cmp$ = (() => {var $x0 = /*{$:'LT'} | {$:'EQ'} | {$:'GT'}*/null;return $x0; })()
const $Cmp = $Cmp$

function $U64$compare$(_$0/*:BigInt*/,_$1/*:BigInt*/) {var $x3 = _$0;var $x4 = _$1;var $x2 = $U64$eql$($x3, $x4);var $x1 = $U64$to_bool$($x2);switch ($x1.$) { case "True": { var $x0 = ({$: "EQ"}); break; } case "False": { var $x7 = _$0;var $x8 = _$1;var $x6 = BigInt.asUintN(64, $x7 < $x8);var $x5 = $U64$to_bool$($x6);switch ($x5.$) { case "True": { var $x0 = ({$: "LT"}); break; } case "False": { var $x0 = ({$: "GT"}); break; } } break; } }return $x0; }
const $U64$compare = _$0 => _$1 => $U64$compare$(_$0,_$1)

function $Char$compare$(_$0/*:Char*/,_$1/*:Char*/) {var $x1 = _$0;var $x2 = _$1;var $x0 = $U64$compare$($x1, $x2);return $x0; }
const $Char$compare = _$0 => _$1 => $Char$compare$(_$0,_$1)

function $Ord$(_$0/*:Type*/) {var $x0 = /*{$:'Ord', compare: ($x$0:_$0) => ($y$1:_$0) => Cmp}*/null;return $x0; }
const $Ord = _$0 => $Ord$(_$0)

const $Char$Ord$ = (() => {var $x0 = ({$: "Ord"});var $x1 = $Char$compare;$x0.compare = $x1;return $x0; })()
const $Char$Ord = $Char$Ord$

function $Equal$(_$0/*:Type*/,_$1/*:null*/,_$2/*:null*/) {var $x0 = /*{$:'Refl'}*/null;return $x0; }
const $Equal = _$0 => _$1 => _$2 => $Equal$(_$0,_$1,_$2)

function $F64$add$(_$0/*:Number*/,_$1/*:Number*/) {var $x1 = _$0;var $x2 = _$1;var $x0 = $x1 + $x2;return $x0; }
const $F64$add = _$0 => _$1 => $F64$add$(_$0,_$1)

function $F64$div$(_$0/*:Number*/,_$1/*:Number*/) {var $x1 = _$0;var $x2 = _$1;var $x0 = $x1 / $x2;return $x0; }
const $F64$div = _$0 => _$1 => $F64$div$(_$0,_$1)

function $F64$eql$(_$0/*:Number*/,_$1/*:Number*/) {var $x1 = _$0;var $x2 = _$1;var $x0 = BigInt.asUintN(64, $x1 === $x2);return $x0; }
const $F64$eql = _$0 => _$1 => $F64$eql$(_$0,_$1)

function $F64$eq$(_$0/*:Number*/,_$1/*:Number*/) {var $x2 = _$0;var $x3 = _$1;var $x1 = $F64$eql$($x2, $x3);var $x0 = $U64$to_bool$($x1);return $x0; }
const $F64$eq = _$0 => _$1 => $F64$eq$(_$0,_$1)

function $F64$is_zero$(_$0/*:Number*/) {var $x2 = _$0;var $x3 = 0.0;var $x1 = BigInt.asUintN(64, $x2 === $x3);var $x0 = $U64$to_bool$($x1);return $x0; }
const $F64$is_zero = _$0 => $F64$is_zero$(_$0)

function $F64$lt$(_$0/*:Number*/,_$1/*:Number*/) {var $x2 = _$0;var $x3 = _$1;var $x1 = BigInt.asUintN(64, $x2 < $x3);var $x0 = $U64$to_bool$($x1);return $x0; }
const $F64$lt = _$0 => _$1 => $F64$lt$(_$0,_$1)

function $F64$min$(_$0/*:Number*/,_$1/*:Number*/) {var $x3 = _$0;var $x4 = _$1;var $x2 = BigInt.asUintN(64, $x3 <= $x4);var $x1 = $U64$to_bool$($x2);switch ($x1.$) { case "True": { var $x0 = _$0; break; } case "False": { var $x0 = _$1; break; } }return $x0; }
const $F64$min = _$0 => _$1 => $F64$min$(_$0,_$1)

function $F64$mul$(_$0/*:Number*/,_$1/*:Number*/) {var $x1 = _$0;var $x2 = _$1;var $x0 = $x1 * $x2;return $x0; }
const $F64$mul = _$0 => _$1 => $F64$mul$(_$0,_$1)

function $F64$sqrt_go$(_$0/*:Number*/,_$1/*:Number*/,_$2/*:BigInt*/) {while(1){var $x1 = _$2;if ($x1 === 0n) { var $x0 = _$1; } else { var $x3 = _$1;var $x5 = _$0;var $x6 = _$1;var $x4 = $F64$div$($x5, $x6);var $x2 = $F64$add$($x3, $x4);var $x7 = 2.0;var $next$0 = $F64$div$($x2, $x7);var $x9 = _$1;var $x10 = $next$0;var $x8 = $F64$eq$($x9, $x10);switch ($x8.$) { case "True": { var $x0 = $next$0; break; } case "False": { var $x11 = _$0;var $x12 = $next$0;var $x14 = $x1;var $x15 = 1n;var $x13 = BigInt.asUintN(64, $x14 - $x15);_$0 = $x11;_$1 = $x12;_$2 = $x13;/*TCO*/continue; break; } } }return $x0; }}
const $F64$sqrt_go = _$0 => _$1 => _$2 => $F64$sqrt_go$(_$0,_$1,_$2)

function $F64$sqrt$(_$0/*:Number*/) {var $x2 = _$0;var $x1 = $F64$is_zero$($x2);switch ($x1.$) { case "True": { var $x0 = _$0; break; } case "False": { var $x3 = _$0;var $x5 = _$0;var $x6 = 2.0;var $x4 = $F64$div$($x5, $x6);var $x7 = 10n;var $x0 = $F64$sqrt_go$($x3, $x4, $x7); break; } }return $x0; }
const $F64$sqrt = _$0 => $F64$sqrt$(_$0)

function $F64$sub$(_$0/*:Number*/,_$1/*:Number*/) {var $x1 = _$0;var $x2 = _$1;var $x0 = $x1 - $x2;return $x0; }
const $F64$sub = _$0 => _$1 => $F64$sub$(_$0,_$1)

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

function $List$foldl$(_$0/*:Type*/,_$1/*:List<null>*/,_$2/*:Type*/,_$3/*:null*/,_$4/*:($_$4:null) => ($_$5:null) => null*/) {while(1){var $x1 = _$1;switch ($x1.$) { case "Cons": { var $x2 = _$0;var $x3 = $x1.tail;var $x4 = _$2;var $x7 = _$4;var $x8 = _$3;var $x6 = ($x7)($x8);var $x9 = $x1.head;var $x5 = ($x6)($x9);var $x10 = _$4;_$0 = $x2;_$1 = $x3;_$2 = $x4;_$3 = $x5;_$4 = $x10;/*TCO*/continue; break; } case "Nil": { var $x0 = _$3; break; } }return $x0; }}
const $List$foldl = _$0 => _$1 => _$2 => _$3 => _$4 => $List$foldl$(_$0,_$1,_$2,_$3,_$4)

const $MOUSECLICK$ = (() => {var $x0 = 1n;return $x0; })()
const $MOUSECLICK = $MOUSECLICK$

const $MOUSEMOVE$ = (() => {var $x0 = 3n;return $x0; })()
const $MOUSEMOVE = $MOUSEMOVE$

function $Maybe$none$(_$0/*:Type*/) {var $x0 = ({$: "None"});return $x0; }
const $Maybe$none = _$0 => $Maybe$none$(_$0)

const $Nat$ = (() => {var $x0 = /*{$:'Zero'} | {$:'Succ', pred: Nat}*/null;return $x0; })()
const $Nat = $Nat$

function $Nat$add$(_$0/*:Nat*/,_$1/*:Nat*/) {var $x1 = _$0;switch ($x1.$) { case "Succ": { var $x0 = ({$: "Succ"});var $x3 = $x1.pred;var $x4 = _$1;var $x2 = $Nat$add$($x3, $x4);$x0.pred = $x2; break; } case "Zero": { var $x0 = _$1; break; } }return $x0; }
const $Nat$add = _$0 => _$1 => $Nat$add$(_$0,_$1)

function $Nat$lte$(_$0/*:Nat*/,_$1/*:Nat*/) {while(1){var $x1 = _$0;switch ($x1.$) { case "Succ": { var $x2 = _$1;switch ($x2.$) { case "Succ": { var $x3 = $x1.pred;var $x4 = $x2.pred;_$0 = $x3;_$1 = $x4;/*TCO*/continue; break; } case "Zero": { var $x0 = ({$: "False"}); break; } } break; } case "Zero": { var $x0 = ({$: "True"}); break; } }return $x0; }}
const $Nat$lte = _$0 => _$1 => $Nat$lte$(_$0,_$1)

function $Nat$gte$(_$0/*:Nat*/,_$1/*:Nat*/) {var $x1 = _$1;var $x2 = _$0;var $x0 = $Nat$lte$($x1, $x2);return $x0; }
const $Nat$gte = _$0 => _$1 => $Nat$gte$(_$0,_$1)

function $Nat$max$(_$0/*:Nat*/,_$1/*:Nat*/) {var $x1 = $Nat;var $x3 = _$0;var $x4 = _$1;var $x2 = $Nat$gte$($x3, $x4);var $x5 = _$0;var $x6 = _$1;var $x0 = $Bool$if$($x1, $x2, $x5, $x6);return $x0; }
const $Nat$max = _$0 => _$1 => $Nat$max$(_$0,_$1)

function $Ord$compare$(_$0/*:Type*/,_$1/*:Ord<null>*/,_$2/*:null*/,_$3/*:null*/) {var $x1 = _$1;var $x3 = $x1.compare;var $x4 = _$2;var $x2 = ($x3)($x4);var $x5 = _$3;var $x0 = ($x2)($x5);return $x0; }
const $Ord$compare = _$0 => _$1 => _$2 => _$3 => $Ord$compare$(_$0,_$1,_$2,_$3)

function $Pair$(_$0/*:Type*/,_$1/*:Type*/) {var $x0 = /*{$:'Pair', fst: _$0, snd: _$1}*/null;return $x0; }
const $Pair = _$0 => _$1 => $Pair$(_$0,_$1)

const $OrdTree$Balance$ = (() => {var $x0 = /*{$:'MinusOne'} | {$:'Zero'} | {$:'PlusOne'}*/null;return $x0; })()
const $OrdTree$Balance = $OrdTree$Balance$

function $OrdTree$(_$0/*:Type*/,_$1/*:Type*/) {var $x0 = /*{$:'Leaf'} | {$:'Node', key_value: Pair<_$0><_$1>, balance: OrdTree/Balance, left: OrdTree<_$0><_$1>, right: OrdTree<_$0><_$1>}*/null;return $x0; }
const $OrdTree = _$0 => _$1 => $OrdTree$(_$0,_$1)

function $OrdTree$Balance$rotate_left$(_$0/*:Type*/,_$1/*:Type*/,_$2/*:OrdTree<null><null>*/) {var $x1 = _$2;switch ($x1.$) { case "Leaf": { var $x0 = ({$: "Pair"});var $x2 = ({$: "Leaf"});$x0.fst = $x2;var $x3 = ({$: "False"});$x0.snd = $x3; break; } case "Node": { var $x4 = $x1.balance;switch ($x4.$) { case "PlusOne": { var $x5 = $x1.right;switch ($x5.$) { case "Node": { var $x6 = $x5.balance;switch ($x6.$) { case "MinusOne": { var $x7 = $x5.left;switch ($x7.$) { case "Node": { var $x8 = $x7.balance;switch ($x8.$) { case "MinusOne": { var $x0 = ({$: "Pair"});var $x9 = ({$: "Node"});var $x10 = $x7.key_value;$x9.key_value = $x10;var $x11 = ({$: "Zero"});$x9.balance = $x11;var $x12 = ({$: "Node"});var $x13 = $x1.key_value;$x12.key_value = $x13;var $x14 = ({$: "Zero"});$x12.balance = $x14;var $x15 = $x1.left;$x12.left = $x15;var $x16 = $x7.left;$x12.right = $x16;$x9.left = $x12;var $x17 = ({$: "Node"});var $x18 = $x5.key_value;$x17.key_value = $x18;var $x19 = ({$: "PlusOne"});$x17.balance = $x19;var $x20 = $x7.right;$x17.left = $x20;var $x21 = $x5.right;$x17.right = $x21;$x9.right = $x17;$x0.fst = $x9;var $x22 = ({$: "False"});$x0.snd = $x22; break; } case "PlusOne": { var $x0 = ({$: "Pair"});var $x23 = ({$: "Node"});var $x24 = $x7.key_value;$x23.key_value = $x24;var $x25 = ({$: "Zero"});$x23.balance = $x25;var $x26 = ({$: "Node"});var $x27 = $x1.key_value;$x26.key_value = $x27;var $x28 = ({$: "MinusOne"});$x26.balance = $x28;var $x29 = $x1.left;$x26.left = $x29;var $x30 = $x7.left;$x26.right = $x30;$x23.left = $x26;var $x31 = ({$: "Node"});var $x32 = $x5.key_value;$x31.key_value = $x32;var $x33 = ({$: "Zero"});$x31.balance = $x33;var $x34 = $x7.right;$x31.left = $x34;var $x35 = $x5.right;$x31.right = $x35;$x23.right = $x31;$x0.fst = $x23;var $x36 = ({$: "False"});$x0.snd = $x36; break; } case "Zero": { var $x0 = ({$: "Pair"});var $x37 = ({$: "Node"});var $x38 = $x7.key_value;$x37.key_value = $x38;var $x39 = ({$: "Zero"});$x37.balance = $x39;var $x40 = ({$: "Node"});var $x41 = $x1.key_value;$x40.key_value = $x41;var $x42 = ({$: "Zero"});$x40.balance = $x42;var $x43 = $x1.left;$x40.left = $x43;var $x44 = $x7.left;$x40.right = $x44;$x37.left = $x40;var $x45 = ({$: "Node"});var $x46 = $x5.key_value;$x45.key_value = $x46;var $x47 = ({$: "Zero"});$x45.balance = $x47;var $x48 = $x7.right;$x45.left = $x48;var $x49 = $x5.right;$x45.right = $x49;$x37.right = $x45;$x0.fst = $x37;var $x50 = ({$: "False"});$x0.snd = $x50; break; } } break; } default: { var $x0 = ({$: "Pair"});var $x51 = ({$: "Node"});var $x52 = $x1.key_value;$x51.key_value = $x52;var $x53 = ({$: "PlusOne"});$x51.balance = $x53;var $x54 = $x1.left;$x51.left = $x54;var $x55 = ({$: "Node"});var $x56 = $x5.key_value;$x55.key_value = $x56;var $x57 = ({$: "MinusOne"});$x55.balance = $x57;var $x58 = $x7;$x55.left = $x58;var $x59 = $x5.right;$x55.right = $x59;$x51.right = $x55;$x0.fst = $x51;var $x60 = ({$: "False"});$x0.snd = $x60; break; } } break; } case "PlusOne": { var $x0 = ({$: "Pair"});var $x61 = ({$: "Node"});var $x62 = $x5.key_value;$x61.key_value = $x62;var $x63 = ({$: "Zero"});$x61.balance = $x63;var $x64 = ({$: "Node"});var $x65 = $x1.key_value;$x64.key_value = $x65;var $x66 = ({$: "Zero"});$x64.balance = $x66;var $x67 = $x1.left;$x64.left = $x67;var $x68 = $x5.left;$x64.right = $x68;$x61.left = $x64;var $x69 = $x5.right;$x61.right = $x69;$x0.fst = $x61;var $x70 = ({$: "False"});$x0.snd = $x70; break; } case "Zero": { var $x0 = ({$: "Pair"});var $x71 = ({$: "Node"});var $x72 = $x5.key_value;$x71.key_value = $x72;var $x73 = ({$: "MinusOne"});$x71.balance = $x73;var $x74 = ({$: "Node"});var $x75 = $x1.key_value;$x74.key_value = $x75;var $x76 = ({$: "PlusOne"});$x74.balance = $x76;var $x77 = $x1.left;$x74.left = $x77;var $x78 = $x5.left;$x74.right = $x78;$x71.left = $x74;var $x79 = $x5.right;$x71.right = $x79;$x0.fst = $x71;var $x80 = ({$: "True"});$x0.snd = $x80; break; } default: { var $x83 = /*Type*/null;var $x84 = $x6;var $x82 = ($x83)($x84);var $x85 = $x5.left;var $x81 = ($x82)($x85);var $x86 = $x5.right;var $x0 = ($x81)($x86); break; } } break; } default: { var $x0 = ({$: "Pair"});var $x87 = ({$: "Node"});var $x88 = $x1.key_value;$x87.key_value = $x88;var $x89 = ({$: "PlusOne"});$x87.balance = $x89;var $x90 = $x1.left;$x87.left = $x90;var $x91 = $x5;$x87.right = $x91;$x0.fst = $x87;var $x92 = ({$: "False"});$x0.snd = $x92; break; } } break; } default: { var $x0 = ({$: "Pair"});var $x93 = ({$: "Node"});var $x94 = $x1.key_value;$x93.key_value = $x94;var $x95 = $x4;$x93.balance = $x95;var $x96 = $x1.left;$x93.left = $x96;var $x97 = $x1.right;$x93.right = $x97;$x0.fst = $x93;var $x98 = ({$: "False"});$x0.snd = $x98; break; } } break; } default: { var $x99 = /*Type*/null;var $x100 = $x1;var $x0 = ($x99)($x100); break; } }return $x0; }
const $OrdTree$Balance$rotate_left = _$0 => _$1 => _$2 => $OrdTree$Balance$rotate_left$(_$0,_$1,_$2)

function $OrdTree$Balance$rotate_right$(_$0/*:Type*/,_$1/*:Type*/,_$2/*:OrdTree<null><null>*/) {var $x1 = _$2;switch ($x1.$) { case "Leaf": { var $x0 = ({$: "Pair"});var $x2 = ({$: "Leaf"});$x0.fst = $x2;var $x3 = ({$: "False"});$x0.snd = $x3; break; } case "Node": { var $x4 = $x1.balance;switch ($x4.$) { case "MinusOne": { var $x5 = $x1.left;switch ($x5.$) { case "Node": { var $x6 = $x5.balance;switch ($x6.$) { case "MinusOne": { var $x0 = ({$: "Pair"});var $x7 = ({$: "Node"});var $x8 = $x5.key_value;$x7.key_value = $x8;var $x9 = ({$: "Zero"});$x7.balance = $x9;var $x10 = $x5.left;$x7.left = $x10;var $x11 = ({$: "Node"});var $x12 = $x1.key_value;$x11.key_value = $x12;var $x13 = ({$: "Zero"});$x11.balance = $x13;var $x14 = $x5.right;$x11.left = $x14;var $x15 = $x1.right;$x11.right = $x15;$x7.right = $x11;$x0.fst = $x7;var $x16 = ({$: "False"});$x0.snd = $x16; break; } case "PlusOne": { var $x17 = $x5.right;switch ($x17.$) { case "Node": { var $x18 = $x17.balance;switch ($x18.$) { case "MinusOne": { var $x0 = ({$: "Pair"});var $x19 = ({$: "Node"});var $x20 = $x17.key_value;$x19.key_value = $x20;var $x21 = ({$: "Zero"});$x19.balance = $x21;var $x22 = ({$: "Node"});var $x23 = $x5.key_value;$x22.key_value = $x23;var $x24 = ({$: "Zero"});$x22.balance = $x24;var $x25 = $x5.left;$x22.left = $x25;var $x26 = $x17.left;$x22.right = $x26;$x19.left = $x22;var $x27 = ({$: "Node"});var $x28 = $x1.key_value;$x27.key_value = $x28;var $x29 = ({$: "PlusOne"});$x27.balance = $x29;var $x30 = $x17.right;$x27.left = $x30;var $x31 = $x1.right;$x27.right = $x31;$x19.right = $x27;$x0.fst = $x19;var $x32 = ({$: "False"});$x0.snd = $x32; break; } case "PlusOne": { var $x0 = ({$: "Pair"});var $x33 = ({$: "Node"});var $x34 = $x17.key_value;$x33.key_value = $x34;var $x35 = ({$: "Zero"});$x33.balance = $x35;var $x36 = ({$: "Node"});var $x37 = $x5.key_value;$x36.key_value = $x37;var $x38 = ({$: "MinusOne"});$x36.balance = $x38;var $x39 = $x5.left;$x36.left = $x39;var $x40 = $x17.left;$x36.right = $x40;$x33.left = $x36;var $x41 = ({$: "Node"});var $x42 = $x1.key_value;$x41.key_value = $x42;var $x43 = ({$: "Zero"});$x41.balance = $x43;var $x44 = $x17.right;$x41.left = $x44;var $x45 = $x1.right;$x41.right = $x45;$x33.right = $x41;$x0.fst = $x33;var $x46 = ({$: "False"});$x0.snd = $x46; break; } case "Zero": { var $x0 = ({$: "Pair"});var $x47 = ({$: "Node"});var $x48 = $x17.key_value;$x47.key_value = $x48;var $x49 = ({$: "Zero"});$x47.balance = $x49;var $x50 = ({$: "Node"});var $x51 = $x5.key_value;$x50.key_value = $x51;var $x52 = ({$: "Zero"});$x50.balance = $x52;var $x53 = $x5.left;$x50.left = $x53;var $x54 = $x17.left;$x50.right = $x54;$x47.left = $x50;var $x55 = ({$: "Node"});var $x56 = $x1.key_value;$x55.key_value = $x56;var $x57 = ({$: "Zero"});$x55.balance = $x57;var $x58 = $x17.right;$x55.left = $x58;var $x59 = $x1.right;$x55.right = $x59;$x47.right = $x55;$x0.fst = $x47;var $x60 = ({$: "False"});$x0.snd = $x60; break; } } break; } default: { var $x0 = ({$: "Pair"});var $x61 = ({$: "Node"});var $x62 = $x1.key_value;$x61.key_value = $x62;var $x63 = ({$: "MinusOne"});$x61.balance = $x63;var $x64 = ({$: "Node"});var $x65 = $x5.key_value;$x64.key_value = $x65;var $x66 = ({$: "PlusOne"});$x64.balance = $x66;var $x67 = $x5.left;$x64.left = $x67;var $x68 = $x17;$x64.right = $x68;$x61.left = $x64;var $x69 = $x1.right;$x61.right = $x69;$x0.fst = $x61;var $x70 = ({$: "False"});$x0.snd = $x70; break; } } break; } case "Zero": { var $x0 = ({$: "Pair"});var $x71 = ({$: "Node"});var $x72 = $x5.key_value;$x71.key_value = $x72;var $x73 = ({$: "PlusOne"});$x71.balance = $x73;var $x74 = $x5.left;$x71.left = $x74;var $x75 = ({$: "Node"});var $x76 = $x1.key_value;$x75.key_value = $x76;var $x77 = ({$: "MinusOne"});$x75.balance = $x77;var $x78 = $x5.right;$x75.left = $x78;var $x79 = $x1.right;$x75.right = $x79;$x71.right = $x75;$x0.fst = $x71;var $x80 = ({$: "True"});$x0.snd = $x80; break; } default: { var $x84 = /*Type*/null;var $x85 = $x6;var $x83 = ($x84)($x85);var $x86 = $x5.left;var $x82 = ($x83)($x86);var $x87 = $x5.right;var $x81 = ($x82)($x87);var $x88 = $x1.right;var $x0 = ($x81)($x88); break; } } break; } default: { var $x0 = ({$: "Pair"});var $x89 = ({$: "Node"});var $x90 = $x1.key_value;$x89.key_value = $x90;var $x91 = ({$: "MinusOne"});$x89.balance = $x91;var $x92 = $x5;$x89.left = $x92;var $x93 = $x1.right;$x89.right = $x93;$x0.fst = $x89;var $x94 = ({$: "False"});$x0.snd = $x94; break; } } break; } default: { var $x0 = ({$: "Pair"});var $x95 = ({$: "Node"});var $x96 = $x1.key_value;$x95.key_value = $x96;var $x97 = $x4;$x95.balance = $x97;var $x98 = $x1.left;$x95.left = $x98;var $x99 = $x1.right;$x95.right = $x99;$x0.fst = $x95;var $x100 = ({$: "False"});$x0.snd = $x100; break; } } break; } default: { var $x101 = /*Type*/null;var $x102 = $x1;var $x0 = ($x101)($x102); break; } }return $x0; }
const $OrdTree$Balance$rotate_right = _$0 => _$1 => _$2 => $OrdTree$Balance$rotate_right$(_$0,_$1,_$2)

function $OrdTree$empty$(_$0/*:Type*/,_$1/*:Type*/) {var $x0 = ({$: "Leaf"});return $x0; }
const $OrdTree$empty = _$0 => _$1 => $OrdTree$empty$(_$0,_$1)

function $OrdTree$fold$(_$0/*:Type*/,_$1/*:Type*/,_$2/*:OrdTree<null><null>*/,_$3/*:Type*/,_$4/*:null*/,_$5/*:($_$5:Pair<null><null>) => ($_$6:null) => null*/) {while(1){var $x1 = _$2;switch ($x1.$) { case "Leaf": { var $x0 = _$4; break; } case "Node": { var $x2 = _$0;var $x3 = _$1;var $x4 = $x1.left;var $x5 = _$3;var $x6 = _$4;var $x7 = _$5;var $left_result$0 = $OrdTree$fold$($x2, $x3, $x4, $x5, $x6, $x7);var $x9 = _$5;var $x10 = $x1.key_value;var $x8 = ($x9)($x10);var $x11 = $left_result$0;var $curr_result$1 = ($x8)($x11);var $x12 = _$0;var $x13 = _$1;var $x14 = $x1.right;var $x15 = _$3;var $x16 = $curr_result$1;var $x17 = _$5;_$0 = $x12;_$1 = $x13;_$2 = $x14;_$3 = $x15;_$4 = $x16;_$5 = $x17;/*TCO*/continue; break; } }return $x0; }}
const $OrdTree$fold = _$0 => _$1 => _$2 => _$3 => _$4 => _$5 => $OrdTree$fold$(_$0,_$1,_$2,_$3,_$4,_$5)

function $OrdTree$get$(_$0/*:Type*/,_$1/*:Type*/,_$2/*:Ord<null>*/,_$3/*:OrdTree<null><null>*/) {var $x1 = _$3;switch ($x1.$) { case "Leaf": { var $x0 = ($key$0 => {var $x2 = ({$: "None"});return $x2;}); break; } case "Node": { var $x3 = $x1.key_value;var $x0 = ($key$0 => {var $x6 = _$0;var $x7 = _$2;var $x8 = $x3.fst;var $x9 = $key$0;var $x5 = $Ord$compare$($x6, $x7, $x8, $x9);switch ($x5.$) { case "EQ": { var $x4 = ({$: "Some"});var $x10 = $x3.snd;$x4.value = $x10; break; } case "GT": { var $x12 = _$0;var $x13 = _$1;var $x14 = _$2;var $x15 = $x1.right;var $x11 = $OrdTree$get$($x12, $x13, $x14, $x15);var $x16 = $key$0;var $x4 = ($x11)($x16); break; } case "LT": { var $x18 = _$0;var $x19 = _$1;var $x20 = _$2;var $x21 = $x1.left;var $x17 = $OrdTree$get$($x18, $x19, $x20, $x21);var $x22 = $key$0;var $x4 = ($x17)($x22); break; } }return $x4;}); break; } }return $x0; }
const $OrdTree$get = _$0 => _$1 => _$2 => _$3 => $OrdTree$get$(_$0,_$1,_$2,_$3)

function $OrdTree$height$(_$0/*:Type*/,_$1/*:Type*/,_$2/*:OrdTree<null><null>*/) {var $x1 = _$2;switch ($x1.$) { case "Leaf": { var $x0 = ({$: "Zero"}); break; } case "Node": { var $x0 = ({$: "Succ"});var $x4 = _$0;var $x5 = _$1;var $x6 = $x1.left;var $x3 = $OrdTree$height$($x4, $x5, $x6);var $x8 = _$0;var $x9 = _$1;var $x10 = $x1.right;var $x7 = $OrdTree$height$($x8, $x9, $x10);var $x2 = $Nat$max$($x3, $x7);$x0.pred = $x2; break; } }return $x0; }
const $OrdTree$height = _$0 => _$1 => _$2 => $OrdTree$height$(_$0,_$1,_$2)

function $Pair$get_fst$(_$0/*:Type*/,_$1/*:Type*/,_$2/*:Pair<null><null>*/) {var $x1 = _$2;var $x0 = $x1.fst;return $x0; }
const $Pair$get_fst = _$0 => _$1 => _$2 => $Pair$get_fst$(_$0,_$1,_$2)

function $OrdTree$insert$go$(_$0/*:Type*/,_$1/*:Type*/,_$2/*:Ord<null>*/,_$3/*:OrdTree<null><null>*/) {var $x1 = _$3;switch ($x1.$) { case "Leaf": { var $x0 = ($kv$0 => {var $x2 = ({$: "Pair"});var $x3 = ({$: "Node"});var $x4 = $kv$0;$x3.key_value = $x4;var $x5 = ({$: "Zero"});$x3.balance = $x5;var $x6 = ({$: "Leaf"});$x3.left = $x6;var $x7 = ({$: "Leaf"});$x3.right = $x7;$x2.fst = $x3;var $x8 = ({$: "True"});$x2.snd = $x8;return $x2;}); break; } case "Node": { var $x9 = $x1.key_value;var $x0 = ($__8$0 => {var $x11 = $__8$0;var $x13 = _$0;var $x14 = _$2;var $x15 = $x11.fst;var $x16 = $x9.fst;var $x12 = $Ord$compare$($x13, $x14, $x15, $x16);switch ($x12.$) { case "EQ": { var $x10 = ({$: "Pair"});var $x17 = ({$: "Node"});var $x18 = ({$: "Pair"});var $x19 = $x11.fst;$x18.fst = $x19;var $x20 = $x11.snd;$x18.snd = $x20;$x17.key_value = $x18;var $x21 = $x1.balance;$x17.balance = $x21;var $x22 = $x1.left;$x17.left = $x22;var $x23 = $x1.right;$x17.right = $x23;$x10.fst = $x17;var $x24 = ({$: "False"});$x10.snd = $x24; break; } case "GT": { var $x26 = _$0;var $x27 = _$1;var $x28 = _$2;var $x29 = $x1.right;var $x25 = $OrdTree$insert$go$($x26, $x27, $x28, $x29);var $x30 = ({$: "Pair"});var $x31 = $x11.fst;$x30.fst = $x31;var $x32 = $x11.snd;$x30.snd = $x32;var $got$1 = ($x25)($x30);var $x33 = $got$1;var $x34 = $x33.snd;switch ($x34.$) { case "True": { var $x35 = $x1.balance;switch ($x35.$) { case "PlusOne": { var $x36 = _$0;var $x37 = _$1;var $x38 = ({$: "Node"});var $x39 = ({$: "Pair"});var $x40 = $x9.fst;$x39.fst = $x40;var $x41 = $x9.snd;$x39.snd = $x41;$x38.key_value = $x39;var $x42 = ({$: "PlusOne"});$x38.balance = $x42;var $x43 = $x1.left;$x38.left = $x43;var $x44 = $x33.fst;$x38.right = $x44;var $x10 = $OrdTree$Balance$rotate_left$($x36, $x37, $x38); break; } case "Zero": { var $x10 = ({$: "Pair"});var $x45 = ({$: "Node"});var $x46 = ({$: "Pair"});var $x47 = $x9.fst;$x46.fst = $x47;var $x48 = $x9.snd;$x46.snd = $x48;$x45.key_value = $x46;var $x49 = ({$: "PlusOne"});$x45.balance = $x49;var $x50 = $x1.left;$x45.left = $x50;var $x51 = $x33.fst;$x45.right = $x51;$x10.fst = $x45;var $x52 = ({$: "True"});$x10.snd = $x52; break; } case "MinusOne": { var $x10 = ({$: "Pair"});var $x53 = ({$: "Node"});var $x54 = ({$: "Pair"});var $x55 = $x9.fst;$x54.fst = $x55;var $x56 = $x9.snd;$x54.snd = $x56;$x53.key_value = $x54;var $x57 = ({$: "Zero"});$x53.balance = $x57;var $x58 = $x1.left;$x53.left = $x58;var $x59 = $x33.fst;$x53.right = $x59;$x10.fst = $x53;var $x60 = ({$: "False"});$x10.snd = $x60; break; } } break; } case "False": { var $x10 = ({$: "Pair"});var $x61 = ({$: "Node"});var $x62 = ({$: "Pair"});var $x63 = $x9.fst;$x62.fst = $x63;var $x64 = $x9.snd;$x62.snd = $x64;$x61.key_value = $x62;var $x65 = $x1.balance;$x61.balance = $x65;var $x66 = $x1.left;$x61.left = $x66;var $x67 = $x33.fst;$x61.right = $x67;$x10.fst = $x61;var $x68 = ({$: "False"});$x10.snd = $x68; break; } } break; } case "LT": { var $x70 = _$0;var $x71 = _$1;var $x72 = _$2;var $x73 = $x1.left;var $x69 = $OrdTree$insert$go$($x70, $x71, $x72, $x73);var $x74 = ({$: "Pair"});var $x75 = $x11.fst;$x74.fst = $x75;var $x76 = $x11.snd;$x74.snd = $x76;var $got$1 = ($x69)($x74);var $x77 = $got$1;var $x78 = $x77.snd;switch ($x78.$) { case "True": { var $x79 = $x1.balance;switch ($x79.$) { case "PlusOne": { var $x10 = ({$: "Pair"});var $x80 = ({$: "Node"});var $x81 = ({$: "Pair"});var $x82 = $x9.fst;$x81.fst = $x82;var $x83 = $x9.snd;$x81.snd = $x83;$x80.key_value = $x81;var $x84 = ({$: "Zero"});$x80.balance = $x84;var $x85 = $x77.fst;$x80.left = $x85;var $x86 = $x1.right;$x80.right = $x86;$x10.fst = $x80;var $x87 = ({$: "False"});$x10.snd = $x87; break; } case "Zero": { var $x10 = ({$: "Pair"});var $x88 = ({$: "Node"});var $x89 = ({$: "Pair"});var $x90 = $x9.fst;$x89.fst = $x90;var $x91 = $x9.snd;$x89.snd = $x91;$x88.key_value = $x89;var $x92 = ({$: "MinusOne"});$x88.balance = $x92;var $x93 = $x77.fst;$x88.left = $x93;var $x94 = $x1.right;$x88.right = $x94;$x10.fst = $x88;var $x95 = ({$: "True"});$x10.snd = $x95; break; } case "MinusOne": { var $x96 = _$0;var $x97 = _$1;var $x98 = ({$: "Node"});var $x99 = ({$: "Pair"});var $x100 = $x9.fst;$x99.fst = $x100;var $x101 = $x9.snd;$x99.snd = $x101;$x98.key_value = $x99;var $x102 = ({$: "MinusOne"});$x98.balance = $x102;var $x103 = $x77.fst;$x98.left = $x103;var $x104 = $x1.right;$x98.right = $x104;var $x10 = $OrdTree$Balance$rotate_right$($x96, $x97, $x98); break; } } break; } case "False": { var $x10 = ({$: "Pair"});var $x105 = ({$: "Node"});var $x106 = ({$: "Pair"});var $x107 = $x9.fst;$x106.fst = $x107;var $x108 = $x9.snd;$x106.snd = $x108;$x105.key_value = $x106;var $x109 = $x1.balance;$x105.balance = $x109;var $x110 = $x77.fst;$x105.left = $x110;var $x111 = $x1.right;$x105.right = $x111;$x10.fst = $x105;var $x112 = ({$: "False"});$x10.snd = $x112; break; } } break; } }return $x10;}); break; } }return $x0; }
const $OrdTree$insert$go = _$0 => _$1 => _$2 => _$3 => $OrdTree$insert$go$(_$0,_$1,_$2,_$3)

function $OrdTree$insert$(_$0/*:Type*/,_$1/*:Type*/,_$2/*:Ord<null>*/,_$3/*:OrdTree<null><null>*/,_$4/*:Pair<null><null>*/) {var $x2 = _$0;var $x3 = _$1;var $x1 = $OrdTree$($x2, $x3);var $x4 = $Bool;var $x7 = _$0;var $x8 = _$1;var $x9 = _$2;var $x10 = _$3;var $x6 = $OrdTree$insert$go$($x7, $x8, $x9, $x10);var $x11 = _$4;var $x5 = ($x6)($x11);var $x0 = $Pair$get_fst$($x1, $x4, $x5);return $x0; }
const $OrdTree$insert = _$0 => _$1 => _$2 => _$3 => _$4 => $OrdTree$insert$(_$0,_$1,_$2,_$3,_$4)

function $OrdTree$keys$(_$0/*:Type*/,_$1/*:Type*/,_$2/*:OrdTree<null><null>*/) {var $x1 = _$2;switch ($x1.$) { case "Leaf": { var $x0 = ({$: "Nil"}); break; } case "Node": { var $x2 = $x1.key_value;var $x3 = _$0;var $x4 = _$1;var $x5 = $x1.left;var $left_keys$0 = $OrdTree$keys$($x3, $x4, $x5);var $x6 = _$0;var $x7 = _$1;var $x8 = $x1.right;var $right_keys$1 = $OrdTree$keys$($x6, $x7, $x8);var $x9 = _$0;var $x10 = $left_keys$0;var $x11 = ({$: "Cons"});var $x12 = $x2.fst;$x11.head = $x12;var $x13 = $right_keys$1;$x11.tail = $x13;var $x0 = $List$append$($x9, $x10, $x11); break; } }return $x0; }
const $OrdTree$keys = _$0 => _$1 => _$2 => $OrdTree$keys$(_$0,_$1,_$2)

function $OrdTree$singleton$(_$0/*:Type*/,_$1/*:Type*/,_$2/*:Pair<null><null>*/) {var $x0 = ({$: "Node"});var $x1 = _$2;$x0.key_value = $x1;var $x2 = ({$: "Zero"});$x0.balance = $x2;var $x3 = ({$: "Leaf"});$x0.left = $x3;var $x4 = ({$: "Leaf"});$x0.right = $x4;return $x0; }
const $OrdTree$singleton = _$0 => _$1 => _$2 => $OrdTree$singleton$(_$0,_$1,_$2)

function $OrdTree$size$(_$0/*:Type*/,_$1/*:Type*/,_$2/*:OrdTree<null><null>*/) {var $x1 = _$2;switch ($x1.$) { case "Leaf": { var $x0 = ({$: "Zero"}); break; } case "Node": { var $x2 = _$0;var $x3 = _$1;var $x4 = $x1.left;var $left_size$0 = $OrdTree$size$($x2, $x3, $x4);var $x5 = _$0;var $x6 = _$1;var $x7 = $x1.right;var $right_size$1 = $OrdTree$size$($x5, $x6, $x7);var $x0 = ({$: "Succ"});var $x9 = $left_size$0;var $x10 = $right_size$1;var $x8 = $Nat$add$($x9, $x10);$x0.pred = $x8; break; } }return $x0; }
const $OrdTree$size = _$0 => _$1 => _$2 => $OrdTree$size$(_$0,_$1,_$2)

function $OrdTree$values$(_$0/*:Type*/,_$1/*:Type*/,_$2/*:OrdTree<null><null>*/) {var $x1 = _$2;switch ($x1.$) { case "Leaf": { var $x0 = ({$: "Nil"}); break; } case "Node": { var $x2 = $x1.key_value;var $x3 = _$0;var $x4 = _$1;var $x5 = $x1.left;var $left_values$0 = $OrdTree$values$($x3, $x4, $x5);var $x6 = _$0;var $x7 = _$1;var $x8 = $x1.right;var $right_values$1 = $OrdTree$values$($x6, $x7, $x8);var $x9 = _$1;var $x10 = $left_values$0;var $x11 = ({$: "Cons"});var $x12 = $x2.snd;$x11.head = $x12;var $x13 = $right_values$1;$x11.tail = $x13;var $x0 = $List$append$($x9, $x10, $x11); break; } }return $x0; }
const $OrdTree$values = _$0 => _$1 => _$2 => $OrdTree$values$(_$0,_$1,_$2)

const $SETNICK$ = (() => {var $x0 = 101n;return $x0; })()
const $SETNICK = $SETNICK$

const $String$ = (() => {var $x1 = $Char;var $x0 = $List$($x1);return $x0; })()
const $String = $String$

function $String$compare$(_$0/*:String*/,_$1/*:String*/) {while(1){var $x1 = _$0;switch ($x1.$) { case "Cons": { var $x2 = _$1;switch ($x2.$) { case "Cons": { var $x4 = $Char;var $x5 = $Char$Ord;var $x6 = $x1.head;var $x7 = $x2.head;var $x3 = $Ord$compare$($x4, $x5, $x6, $x7);switch ($x3.$) { case "LT": { var $x0 = ({$: "LT"}); break; } case "EQ": { var $x8 = $x1.tail;var $x9 = $x2.tail;_$0 = $x8;_$1 = $x9;/*TCO*/continue; break; } case "GT": { var $x0 = ({$: "GT"}); break; } } break; } case "Nil": { var $x0 = ({$: "GT"}); break; } } break; } case "Nil": { var $x10 = _$1;switch ($x10.$) { case "Cons": { var $x0 = ({$: "LT"}); break; } case "Nil": { var $x0 = ({$: "EQ"}); break; } } break; } }return $x0; }}
const $String$compare = _$0 => _$1 => $String$compare$(_$0,_$1)

const $String$Ord$ = (() => {var $x0 = ({$: "Ord"});var $x1 = $String$compare;$x0.compare = $x1;return $x0; })()
const $String$Ord = $String$Ord$

const $U64$Ord$ = (() => {var $x0 = ({$: "Ord"});var $x1 = $U64$compare;$x0.compare = $x1;return $x0; })()
const $U64$Ord = $U64$Ord$

function $U64$add$(_$0/*:BigInt*/,_$1/*:BigInt*/) {var $x1 = _$0;var $x2 = _$1;var $x0 = BigInt.asUintN(64, $x1 + $x2);return $x0; }
const $U64$add = _$0 => _$1 => $U64$add$(_$0,_$1)

function $U64$div$(_$0/*:BigInt*/,_$1/*:BigInt*/) {var $x1 = _$0;var $x2 = _$1;var $x0 = BigInt.asUintN(64, $x1 / $x2);return $x0; }
const $U64$div = _$0 => _$1 => $U64$div$(_$0,_$1)

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

function $U64$neq$(_$0/*:BigInt*/,_$1/*:BigInt*/) {var $x2 = _$0;var $x3 = _$1;var $x1 = BigInt.asUintN(64, $x2 !== $x3);var $x0 = $U64$to_bool$($x1);return $x0; }
const $U64$neq = _$0 => _$1 => $U64$neq$(_$0,_$1)

function $U64$sub$(_$0/*:BigInt*/,_$1/*:BigInt*/) {var $x1 = _$0;var $x2 = _$1;var $x0 = BigInt.asUintN(64, $x1 - $x2);return $x0; }
const $U64$sub = _$0 => _$1 => $U64$sub$(_$0,_$1)

function $U64$to_bits$(_$0/*:BigInt*/) {var $x1 = _$0;if ($x1 === 0n) { var $x0 = ({$: "E"}); } else { var $x3 = $x1;var $x4 = 1n;var $x2 = BigInt.asUintN(64, $x3 - $x4);if ($x2 === 0n) { var $x0 = ({$: "I"});var $x5 = ({$: "E"});$x0.tail = $x5; } else { var $x7 = 2n;var $x9 = $x2;var $x10 = 1n;var $x8 = BigInt.asUintN(64, $x9 - $x10);var $x6 = BigInt.asUintN(64, $x7 + $x8);var $x11 = 2n;var $quotient$0 = $U64$div$($x6, $x11);var $x13 = 2n;var $x15 = $x2;var $x16 = 1n;var $x14 = BigInt.asUintN(64, $x15 - $x16);var $x12 = BigInt.asUintN(64, $x13 + $x14);var $x17 = 2n;var $remainder$1 = $U64$mod$($x12, $x17);var $x19 = $remainder$1;var $x18 = $U64$to_bool$($x19);switch ($x18.$) { case "True": { var $x0 = ({$: "I"});var $x21 = $quotient$0;var $x20 = $U64$to_bits$($x21);$x0.tail = $x20; break; } case "False": { var $x0 = ({$: "O"});var $x23 = $quotient$0;var $x22 = $U64$to_bits$($x23);$x0.tail = $x22; break; } } } }return $x0; }
const $U64$to_bits = _$0 => $U64$to_bits$(_$0)

const $UG$Collision$Collidable$ = (() => {var $x0 = /*{$:'Hard'} | {$:'TakesEffects'} | {$:'Untouchable'}*/null;return $x0; })()
const $UG$Collision$Collidable = $UG$Collision$Collidable$

const $UG$SIPD$Action$ = (() => {var $x0 = /*{$:'SetNick', time: BigInt, pid: BigInt, nick: String}*/null;return $x0; })()
const $UG$SIPD$Action = $UG$SIPD$Action$

const $V2$ = (() => {var $x0 = /*{$:'V2', x: Number, y: Number}*/null;return $x0; })()
const $V2 = $V2$

const $UG$Shape$ = (() => {var $x0 = /*{$:'Circle', center: V2, radius: Number} | {$:'Polygon', center: V2, vertices: List<V2>}*/null;return $x0; })()
const $UG$Shape = $UG$Shape$

const $UG$SIPD$Effect$ = (() => {var $x0 = /*($_$0:UG/SIPD/State) => UG/SIPD/State*/null;return $x0; })()
const $UG$SIPD$Effect = $UG$SIPD$Effect$

const $UG$SIPD$Skill$ = (() => {var $x0 = /*{$:'Skill', name: String, effects: List<UG/SIPD/Effect>, cooldown: BigInt}*/null;return $x0; })()
const $UG$SIPD$Skill = $UG$SIPD$Skill$

const $UG$SIPD$Hero$ = (() => {var $x0 = /*{$:'Hero', owner_id: BigInt, name: String, skills: OrdTree<String><UG/SIPD/Skill>, body_id: BigInt}*/null;return $x0; })()
const $UG$SIPD$Hero = $UG$SIPD$Hero$

const $UG$SIPD$Player$ = (() => {var $x0 = /*{$:'Player', id: BigInt, name: String, keys: OrdTree<String><Pair<Bool><V2>>, target: V2, hero: UG/SIPD/Hero}*/null;return $x0; })()
const $UG$SIPD$Player = $UG$SIPD$Player$

const $UG$SIPD$Hero$HeroState$ = (() => {var $x0 = /*{$:'HeroState', cooldowns: OrdTree<String><BigInt>}*/null;return $x0; })()
const $UG$SIPD$Hero$HeroState = $UG$SIPD$Hero$HeroState$

const $UG$SIPD$GameMap$ = (() => {var $x0 = /*{$:'GameMap', width: BigInt, height: BigInt, bodies: OrdTree<BigInt><UG/SIPD/Body>}*/null;return $x0; })()
const $UG$SIPD$GameMap = $UG$SIPD$GameMap$

const $UG$SIPD$State$ = (() => {var $x0 = /*{$:'State', next_id: BigInt, tick: BigInt, players: OrdTree<BigInt><UG/SIPD/Player>, hero_states: OrdTree<BigInt><UG/SIPD/Hero/HeroState>, game_map: UG/SIPD/GameMap}*/null;return $x0; })()
const $UG$SIPD$State = $UG$SIPD$State$

const $UG$SIPD$Body$ = (() => {var $x0 = /*{$:'Body', id: BigInt, hitbox: UG/Shape, tick: ($_$0:UG/SIPD/State) => UG/SIPD/State, effects: List<UG/SIPD/Effect>, collidable: UG/Collision/Collidable}*/null;return $x0; })()
const $UG$SIPD$Body = $UG$SIPD$Body$

function $UG$SIPD$Body$set_effects$(_$0/*:UG/SIPD/Body*/,_$1/*:List<UG/SIPD/Effect>*/) {var $x1 = _$0;var $x0 = ({$: "Body"});var $x2 = $x1.id;$x0.id = $x2;var $x3 = $x1.hitbox;$x0.hitbox = $x3;var $x4 = $x1.tick;$x0.tick = $x4;var $x5 = _$1;$x0.effects = $x5;var $x6 = $x1.collidable;$x0.collidable = $x6;return $x0; }
const $UG$SIPD$Body$set_effects = _$0 => _$1 => $UG$SIPD$Body$set_effects$(_$0,_$1)

function $UG$SIPD$Body$apply_effects$go$(_$0/*:UG/SIPD/Body*/,_$1/*:UG/SIPD/State*/,_$2/*:List<UG/SIPD/Effect>*/) {while(1){var $x1 = _$2;switch ($x1.$) { case "Cons": { var $x2 = _$0;var $x3 = $x1.tail;var $updated_body$0 = $UG$SIPD$Body$set_effects$($x2, $x3);var $x4 = $x1.head;var $x5 = _$1;var $updated_state$1 = ($x4)($x5);var $x6 = $updated_body$0;var $x7 = $updated_state$1;var $x8 = $x1.tail;_$0 = $x6;_$1 = $x7;_$2 = $x8;/*TCO*/continue; break; } case "Nil": { var $x0 = _$1; break; } }return $x0; }}
const $UG$SIPD$Body$apply_effects$go = _$0 => _$1 => _$2 => $UG$SIPD$Body$apply_effects$go$(_$0,_$1,_$2)

function $UG$SIPD$Body$apply_effects$(_$0/*:UG/SIPD/Body*/,_$1/*:UG/SIPD/State*/) {var $x1 = _$0;var $x2 = ({$: "Body"});var $x3 = $x1.id;$x2.id = $x3;var $x4 = $x1.hitbox;$x2.hitbox = $x4;var $x5 = $x1.tick;$x2.tick = $x5;var $x6 = $x1.effects;$x2.effects = $x6;var $x7 = $x1.collidable;$x2.collidable = $x7;var $x8 = _$1;var $x9 = $x1.effects;var $x0 = $UG$SIPD$Body$apply_effects$go$($x2, $x8, $x9);return $x0; }
const $UG$SIPD$Body$apply_effects = _$0 => _$1 => $UG$SIPD$Body$apply_effects$(_$0,_$1)

function $UG$SIPD$Body$tick$(_$0/*:UG/SIPD/Body*/) {var $x1 = _$0;var $x0 = $x1.tick;return $x0; }
const $UG$SIPD$Body$tick = _$0 => $UG$SIPD$Body$tick$(_$0)

function $UG$Shape$get_center$(_$0/*:UG/Shape*/) {var $x1 = _$0;switch ($x1.$) { case "Circle": { var $x0 = $x1.center; break; } case "Polygon": { var $x0 = $x1.center; break; } }return $x0; }
const $UG$Shape$get_center = _$0 => $UG$Shape$get_center$(_$0)

function $V2$sub$(_$0/*:V2*/,_$1/*:V2*/) {var $x1 = _$0;var $x2 = _$1;var $x0 = ({$: "V2"});var $x4 = $x1.x;var $x5 = $x2.x;var $x3 = $F64$sub$($x4, $x5);$x0.x = $x3;var $x7 = $x1.y;var $x8 = $x2.y;var $x6 = $F64$sub$($x7, $x8);$x0.y = $x6;return $x0; }
const $V2$sub = _$0 => _$1 => $V2$sub$(_$0,_$1)

function $V2$length$(_$0/*:V2*/) {var $x1 = _$0;var $x4 = $x1.x;var $x5 = $x1.x;var $x3 = $F64$mul$($x4, $x5);var $x7 = $x1.y;var $x8 = $x1.y;var $x6 = $F64$mul$($x7, $x8);var $x2 = $F64$add$($x3, $x6);var $x0 = $F64$sqrt$($x2);return $x0; }
const $V2$length = _$0 => $V2$length$(_$0)

function $V2$div_scalar$(_$0/*:V2*/,_$1/*:Number*/) {var $x1 = _$0;var $x3 = _$1;var $x2 = $F64$is_zero$($x3);switch ($x2.$) { case "True": { var $x0 = ({$: "V2"});var $x4 = 0.0;$x0.x = $x4;var $x5 = 0.0;$x0.y = $x5; break; } case "False": { var $x0 = ({$: "V2"});var $x7 = $x1.x;var $x8 = _$1;var $x6 = $F64$div$($x7, $x8);$x0.x = $x6;var $x10 = $x1.y;var $x11 = _$1;var $x9 = $F64$div$($x10, $x11);$x0.y = $x9; break; } }return $x0; }
const $V2$div_scalar = _$0 => _$1 => $V2$div_scalar$(_$0,_$1)

function $V2$is_zero$(_$0/*:V2*/) {var $x1 = _$0;var $x3 = $x1.x;var $x2 = $F64$is_zero$($x3);var $x5 = $x1.y;var $x4 = $F64$is_zero$($x5);var $x0 = $Bool$and$($x2, $x4);return $x0; }
const $V2$is_zero = _$0 => $V2$is_zero$(_$0)

function $V2$normalize$(_$0/*:V2*/) {var $x2 = _$0;var $x1 = $V2$is_zero$($x2);switch ($x1.$) { case "True": { var $x0 = _$0; break; } case "False": { var $x3 = _$0;var $x5 = _$0;var $x4 = $V2$length$($x5);var $x0 = $V2$div_scalar$($x3, $x4); break; } }return $x0; }
const $V2$normalize = _$0 => $V2$normalize$(_$0)

function $V2$mul_scalar$(_$0/*:V2*/,_$1/*:Number*/) {var $x1 = _$0;var $x0 = ({$: "V2"});var $x3 = $x1.x;var $x4 = _$1;var $x2 = $F64$mul$($x3, $x4);$x0.x = $x2;var $x6 = $x1.y;var $x7 = _$1;var $x5 = $F64$mul$($x6, $x7);$x0.y = $x5;return $x0; }
const $V2$mul_scalar = _$0 => _$1 => $V2$mul_scalar$(_$0,_$1)

function $V2$add$(_$0/*:V2*/,_$1/*:V2*/) {var $x1 = _$0;var $x2 = _$1;var $x0 = ({$: "V2"});var $x4 = $x1.x;var $x5 = $x2.x;var $x3 = $F64$add$($x4, $x5);$x0.x = $x3;var $x7 = $x1.y;var $x8 = $x2.y;var $x6 = $F64$add$($x7, $x8);$x0.y = $x6;return $x0; }
const $V2$add = _$0 => _$1 => $V2$add$(_$0,_$1)

function $UG$Shape$move$(_$0/*:UG/Shape*/,_$1/*:V2*/) {var $x1 = _$0;switch ($x1.$) { case "Circle": { var $x0 = ({$: "Circle"});var $x3 = $x1.center;var $x4 = _$1;var $x2 = $V2$add$($x3, $x4);$x0.center = $x2;var $x5 = $x1.radius;$x0.radius = $x5; break; } case "Polygon": { var $x0 = ({$: "Polygon"});var $x7 = $x1.center;var $x8 = _$1;var $x6 = $V2$add$($x7, $x8);$x0.center = $x6;var $x9 = $x1.vertices;$x0.vertices = $x9; break; } }return $x0; }
const $UG$Shape$move = _$0 => _$1 => $UG$Shape$move$(_$0,_$1)

function $UG$SIPD$GameMap$insert_body$(_$0/*:UG/SIPD/GameMap*/,_$1/*:UG/SIPD/Body*/) {var $x1 = _$0;var $x2 = _$1;var $x3 = /*BigInt*/null;var $x4 = $UG$SIPD$Body;var $x5 = $U64$Ord;var $x6 = $x1.bodies;var $x7 = ({$: "Pair"});var $x8 = $x2.id;$x7.fst = $x8;var $x9 = ({$: "Body"});var $x10 = $x2.id;$x9.id = $x10;var $x11 = $x2.hitbox;$x9.hitbox = $x11;var $x12 = $x2.tick;$x9.tick = $x12;var $x13 = $x2.effects;$x9.effects = $x13;var $x14 = $x2.collidable;$x9.collidable = $x14;$x7.snd = $x9;var $bodies$0 = $OrdTree$insert$($x3, $x4, $x5, $x6, $x7);var $x0 = ({$: "GameMap"});var $x15 = $x1.width;$x0.width = $x15;var $x16 = $x1.height;$x0.height = $x16;var $x17 = $bodies$0;$x0.bodies = $x17;return $x0; }
const $UG$SIPD$GameMap$insert_body = _$0 => _$1 => $UG$SIPD$GameMap$insert_body$(_$0,_$1)

function $UG$SIPD$State$insert_body$(_$0/*:UG/SIPD/State*/,_$1/*:UG/SIPD/Body*/) {var $x1 = _$0;var $x2 = $x1.game_map;var $x3 = _$1;var $new_game_map$0 = $UG$SIPD$GameMap$insert_body$($x2, $x3);var $x0 = ({$: "State"});var $x4 = $x1.next_id;$x0.next_id = $x4;var $x5 = $x1.tick;$x0.tick = $x5;var $x6 = $x1.players;$x0.players = $x6;var $x7 = $x1.hero_states;$x0.hero_states = $x7;var $x8 = $new_game_map$0;$x0.game_map = $x8;return $x0; }
const $UG$SIPD$State$insert_body = _$0 => _$1 => $UG$SIPD$State$insert_body$(_$0,_$1)

function $UG$SIPD$Player$get_player$(_$0/*:OrdTree<BigInt><UG/SIPD/Player>*/,_$1/*:BigInt*/) {var $x2 = /*BigInt*/null;var $x3 = $UG$SIPD$Player;var $x4 = $U64$Ord;var $x5 = _$0;var $x1 = $OrdTree$get$($x2, $x3, $x4, $x5);var $x6 = _$1;var $x0 = ($x1)($x6);return $x0; }
const $UG$SIPD$Player$get_player = _$0 => _$1 => $UG$SIPD$Player$get_player$(_$0,_$1)

function $UG$SIPD$GameMap$get_body$(_$0/*:OrdTree<BigInt><UG/SIPD/Body>*/,_$1/*:BigInt*/) {var $x2 = /*BigInt*/null;var $x3 = $UG$SIPD$Body;var $x4 = $U64$Ord;var $x5 = _$0;var $x1 = $OrdTree$get$($x2, $x3, $x4, $x5);var $x6 = _$1;var $x0 = ($x1)($x6);return $x0; }
const $UG$SIPD$GameMap$get_body = _$0 => _$1 => $UG$SIPD$GameMap$get_body$(_$0,_$1)

function $UG$SIPD$Effect$move$(_$0/*:BigInt*/,_$1/*:BigInt*/,_$2/*:UG/SIPD/State*/) {var $x1 = _$2;var $x2 = $x1.game_map;var $x3 = ({$: "Pair"});var $x5 = $x1.players;var $x6 = _$0;var $x4 = $UG$SIPD$Player$get_player$($x5, $x6);$x3.fst = $x4;var $x8 = $x2.bodies;var $x9 = _$1;var $x7 = $UG$SIPD$GameMap$get_body$($x8, $x9);$x3.snd = $x7;var $x10 = $x3.fst;switch ($x10.$) { case "None": { var $x11 = $x3.snd;switch ($x11.$) { case "None": { var $x0 = ({$: "State"});var $x12 = $x1.next_id;$x0.next_id = $x12;var $x13 = $x1.tick;$x0.tick = $x13;var $x14 = $x1.players;$x0.players = $x14;var $x15 = $x1.hero_states;$x0.hero_states = $x15;var $x16 = ({$: "GameMap"});var $x17 = $x2.width;$x16.width = $x17;var $x18 = $x2.height;$x16.height = $x18;var $x19 = $x2.bodies;$x16.bodies = $x19;$x0.game_map = $x16; break; } default: { var $x0 = ({$: "State"});var $x20 = $x1.next_id;$x0.next_id = $x20;var $x21 = $x1.tick;$x0.tick = $x21;var $x22 = $x1.players;$x0.players = $x22;var $x23 = $x1.hero_states;$x0.hero_states = $x23;var $x24 = ({$: "GameMap"});var $x25 = $x2.width;$x24.width = $x25;var $x26 = $x2.height;$x24.height = $x26;var $x27 = $x2.bodies;$x24.bodies = $x27;$x0.game_map = $x24; break; } } break; } case "Some": { var $x28 = $x10.value;switch ($x28.$) { case "Player": { var $x29 = $x3.snd;switch ($x29.$) { case "None": { var $x0 = ({$: "State"});var $x30 = $x1.next_id;$x0.next_id = $x30;var $x31 = $x1.tick;$x0.tick = $x31;var $x32 = $x1.players;$x0.players = $x32;var $x33 = $x1.hero_states;$x0.hero_states = $x33;var $x34 = ({$: "GameMap"});var $x35 = $x2.width;$x34.width = $x35;var $x36 = $x2.height;$x34.height = $x36;var $x37 = $x2.bodies;$x34.bodies = $x37;$x0.game_map = $x34; break; } case "Some": { var $x38 = $x29.value;var $x39 = $x38.hitbox;var $hitbox_center$0 = $UG$Shape$get_center$($x39);var $x40 = $x28.target;var $x41 = $hitbox_center$0;var $distance_to_target$1 = $V2$sub$($x40, $x41);var $x42 = $distance_to_target$1;var $ln$2 = $V2$length$($x42);var $x44 = $ln$2;var $x45 = 0.1;var $x43 = $F64$lt$($x44, $x45);switch ($x43.$) { case "True": { var $x0 = ({$: "State"});var $x46 = $x1.next_id;$x0.next_id = $x46;var $x47 = $x1.tick;$x0.tick = $x47;var $x48 = $x1.players;$x0.players = $x48;var $x49 = $x1.hero_states;$x0.hero_states = $x49;var $x50 = ({$: "GameMap"});var $x51 = $x2.width;$x50.width = $x51;var $x52 = $x2.height;$x50.height = $x52;var $x53 = $x2.bodies;$x50.bodies = $x53;$x0.game_map = $x50; break; } case "False": { var $constant_speed$3 = 3.0;var $x54 = $distance_to_target$1;var $direction$4 = $V2$normalize$($x54);var $x55 = $direction$4;var $x57 = $constant_speed$3;var $x58 = $ln$2;var $x56 = $F64$min$($x57, $x58);var $movement$5 = $V2$mul_scalar$($x55, $x56);var $x59 = $hitbox_center$0;var $x60 = $movement$5;var $new_center$6 = $V2$add$($x59, $x60);var $x61 = $x38.hitbox;var $x63 = $movement$5;var $x64 = $hitbox_center$0;var $x62 = $V2$sub$($x63, $x64);var $new_hitbox$7 = $UG$Shape$move$($x61, $x62);var $x65 = ({$: "State"});var $x66 = $x1.next_id;$x65.next_id = $x66;var $x67 = $x1.tick;$x65.tick = $x67;var $x68 = $x1.players;$x65.players = $x68;var $x69 = $x1.hero_states;$x65.hero_states = $x69;var $x70 = ({$: "GameMap"});var $x71 = $x2.width;$x70.width = $x71;var $x72 = $x2.height;$x70.height = $x72;var $x73 = $x2.bodies;$x70.bodies = $x73;$x65.game_map = $x70;var $x74 = ({$: "Body"});var $x75 = $x38.id;$x74.id = $x75;var $x76 = $new_hitbox$7;$x74.hitbox = $x76;var $x77 = $x38.tick;$x74.tick = $x77;var $x78 = $x38.effects;$x74.effects = $x78;var $x79 = $x38.collidable;$x74.collidable = $x79;var $x0 = $UG$SIPD$State$insert_body$($x65, $x74); break; } } break; } } break; } default: { var $x81 = /*Type*/null;var $x82 = $x28;var $x80 = ($x81)($x82);var $x83 = $x3.snd;var $x0 = ($x80)($x83); break; } } break; } default: { var $x85 = /*Type*/null;var $x86 = $x10;var $x84 = ($x85)($x86);var $x87 = $x3.snd;var $x0 = ($x84)($x87); break; } }return $x0; }
const $UG$SIPD$Effect$move = _$0 => _$1 => _$2 => $UG$SIPD$Effect$move$(_$0,_$1,_$2)

const $UG$SIPD$Event$Click$ = (() => {var $x0 = /*{$:'LeftButton'} | {$:'RightButton'}*/null;return $x0; })()
const $UG$SIPD$Event$Click = $UG$SIPD$Event$Click$

const $UG$SIPD$Event$ = (() => {var $x0 = /*{$:'KeyEvent', time: BigInt, pid: BigInt, key: String, pressed: Bool} | {$:'MouseClick', time: BigInt, pid: BigInt, click: UG/SIPD/Event/Click, x: Number, y: Number} | {$:'KeyMouse', time: BigInt, pid: BigInt, key: String, pressed: Bool, x: Number, y: Number} | {$:'MouseMove', time: BigInt, pid: BigInt, x: Number, y: Number} | {$:'ActionEvent', action: UG/SIPD/Action}*/null;return $x0; })()
const $UG$SIPD$Event = $UG$SIPD$Event$

function $UG$SIPD$Event$get_event_pid$(_$0/*:UG/SIPD/Event*/) {var $x1 = _$0;switch ($x1.$) { case "ActionEvent": { var $x2 = $x1.action;var $x0 = $x2.pid; break; } case "KeyEvent": { var $x0 = $x1.pid; break; } case "KeyMouse": { var $x0 = $x1.pid; break; } case "MouseClick": { var $x0 = $x1.pid; break; } case "MouseMove": { var $x0 = $x1.pid; break; } }return $x0; }
const $UG$SIPD$Event$get_event_pid = _$0 => $UG$SIPD$Event$get_event_pid$(_$0)

function $UG$SM$Game$(_$0/*:Type*/,_$1/*:Type*/) {var $x0 = /*{$:'Game', init: _$0, when: ($_$0:_$1) => ($_$1:_$0) => _$0, tick: ($_$0:_$0) => _$0}*/null;return $x0; }
const $UG$SM$Game = _$0 => _$1 => $UG$SM$Game$(_$0,_$1)

const $UG$SIPD$Game$ = (() => {var $x1 = $UG$SIPD$State;var $x2 = $UG$SIPD$Event;var $x0 = $UG$SM$Game$($x1, $x2);return $x0; })()
const $UG$SIPD$Game = $UG$SIPD$Game$

function $UG$SIPD$GameMap$init$(_$0/*:BigInt*/,_$1/*:BigInt*/) {var $x0 = ({$: "GameMap"});var $x1 = _$0;$x0.width = $x1;var $x2 = _$1;$x0.height = $x2;var $x4 = /*BigInt*/null;var $x5 = $UG$SIPD$Body;var $x3 = $OrdTree$empty$($x4, $x5);$x0.bodies = $x3;return $x0; }
const $UG$SIPD$GameMap$init = _$0 => _$1 => $UG$SIPD$GameMap$init$(_$0,_$1)

const $UG$SIPD$Game$init$ = (() => {var $x0 = ({$: "State"});var $x1 = 0n;$x0.next_id = $x1;var $x2 = 0n;$x0.tick = $x2;var $x4 = /*BigInt*/null;var $x5 = $UG$SIPD$Player;var $x3 = $OrdTree$empty$($x4, $x5);$x0.players = $x3;var $x7 = /*BigInt*/null;var $x8 = $UG$SIPD$Hero$HeroState;var $x6 = $OrdTree$empty$($x7, $x8);$x0.hero_states = $x6;var $x10 = 1200n;var $x11 = 1200n;var $x9 = $UG$SIPD$GameMap$init$($x10, $x11);$x0.game_map = $x9;return $x0; })()
const $UG$SIPD$Game$init = $UG$SIPD$Game$init$

function $update_cooldown$(_$0/*:Pair<String><BigInt>*/,_$1/*:OrdTree<String><BigInt>*/) {var $x1 = _$0;var $x4 = $x1.snd;var $x5 = 0n;var $x3 = BigInt.asUintN(64, $x4 === $x5);var $x2 = $U64$to_bool$($x3);switch ($x2.$) { case "True": { var $x0 = _$1; break; } case "False": { var $x6 = $String;var $x7 = /*BigInt*/null;var $x8 = $String$Ord;var $x9 = _$1;var $x10 = ({$: "Pair"});var $x11 = $x1.fst;$x10.fst = $x11;var $x13 = $x1.snd;var $x14 = 1n;var $x12 = BigInt.asUintN(64, $x13 - $x14);$x10.snd = $x12;var $x0 = $OrdTree$insert$($x6, $x7, $x8, $x9, $x10); break; } }return $x0; }
const $update_cooldown = _$0 => _$1 => $update_cooldown$(_$0,_$1)

function $decrement_cooldowns$(_$0/*:UG/SIPD/Hero/HeroState*/) {var $x1 = _$0;var $x2 = $String;var $x3 = /*BigInt*/null;var $x4 = $x1.cooldowns;var $x6 = $String;var $x7 = /*BigInt*/null;var $x5 = $OrdTree$($x6, $x7);var $x8 = $x1.cooldowns;var $x9 = $update_cooldown;var $new_cooldowns$0 = $OrdTree$fold$($x2, $x3, $x4, $x5, $x8, $x9);var $x0 = ({$: "HeroState"});var $x10 = $new_cooldowns$0;$x0.cooldowns = $x10;return $x0; }
const $decrement_cooldowns = _$0 => $decrement_cooldowns$(_$0)

function $update_hero_state$(_$0/*:Pair<BigInt><UG/SIPD/Hero/HeroState>*/,_$1/*:UG/SIPD/State*/) {var $x1 = _$0;var $x2 = _$1;var $x3 = /*BigInt*/null;var $x4 = $UG$SIPD$Hero$HeroState;var $x5 = $U64$Ord;var $x6 = $x2.hero_states;var $x7 = ({$: "Pair"});var $x8 = $x1.fst;$x7.fst = $x8;var $x10 = $x1.snd;var $x9 = $decrement_cooldowns$($x10);$x7.snd = $x9;var $new_hero_states$0 = $OrdTree$insert$($x3, $x4, $x5, $x6, $x7);var $x0 = ({$: "State"});var $x11 = $x2.next_id;$x0.next_id = $x11;var $x12 = $x2.tick;$x0.tick = $x12;var $x13 = $x2.players;$x0.players = $x13;var $x14 = $new_hero_states$0;$x0.hero_states = $x14;var $x15 = $x2.game_map;$x0.game_map = $x15;return $x0; }
const $update_hero_state = _$0 => _$1 => $update_hero_state$(_$0,_$1)

function $update_cooldowns$(_$0/*:UG/SIPD/State*/) {var $x1 = _$0;var $x2 = /*BigInt*/null;var $x3 = $UG$SIPD$Hero$HeroState;var $x4 = $x1.hero_states;var $x5 = $UG$SIPD$State;var $x6 = ({$: "State"});var $x7 = $x1.next_id;$x6.next_id = $x7;var $x8 = $x1.tick;$x6.tick = $x8;var $x9 = $x1.players;$x6.players = $x9;var $x10 = $x1.hero_states;$x6.hero_states = $x10;var $x11 = $x1.game_map;$x6.game_map = $x11;var $x12 = $update_hero_state;var $x0 = $OrdTree$fold$($x2, $x3, $x4, $x5, $x6, $x12);return $x0; }
const $update_cooldowns = _$0 => $update_cooldowns$(_$0)

function $UG$SIPD$Game$tick$(_$0/*:UG/SIPD/State*/) {var $x1 = _$0;var $got$0 = $x1.game_map;var $x2 = $got$0;var $x3 = /*BigInt*/null;var $x4 = $UG$SIPD$Body;var $x5 = $x2.bodies;var $body_values$1 = $OrdTree$values$($x3, $x4, $x5);var $x6 = $UG$SIPD$Body;var $x7 = $body_values$1;var $x8 = $UG$SIPD$State;var $x9 = ({$: "State"});var $x10 = $x1.next_id;$x9.next_id = $x10;var $x11 = $x1.tick;$x9.tick = $x11;var $x12 = $x1.players;$x9.players = $x12;var $x13 = $x1.hero_states;$x9.hero_states = $x13;var $x14 = $x1.game_map;$x9.game_map = $x14;var $x15 = ($body$2 => $acc$3 => {var $x18 = $body$2;var $x17 = $UG$SIPD$Body$tick$($x18);var $x19 = $acc$3;var $x16 = ($x17)($x19);return $x16;});var $updated_gs$2 = $List$fold$($x6, $x7, $x8, $x9, $x15);var $got$3 = $updated_gs$2;var $x20 = $got$3;var $x21 = $x20.tick;var $x22 = 1n;var $updated_tick$4 = $U64$add$($x21, $x22);var $x23 = ({$: "State"});var $x24 = $x20.next_id;$x23.next_id = $x24;var $x25 = $updated_tick$4;$x23.tick = $x25;var $x26 = $x20.players;$x23.players = $x26;var $x27 = $x20.hero_states;$x23.hero_states = $x27;var $x28 = $x20.game_map;$x23.game_map = $x28;var $x0 = $update_cooldowns$($x23);return $x0; }
const $UG$SIPD$Game$tick = _$0 => $UG$SIPD$Game$tick$(_$0)

function $get_player_name$(_$0/*:UG/SIPD/Event*/) {var $x1 = _$0;switch ($x1.$) { case "ActionEvent": { var $x2 = $x1.action;switch ($x2.$) { case "SetNick": { var $x0 = $x2.nick; break; } default: { var $x3 = /*Type*/null;var $x4 = $x2;var $x0 = ($x3)($x4); break; } } break; } default: { var $x0 = JSTR_TO_LIST(`Anon`); break; } }return $x0; }
const $get_player_name = _$0 => $get_player_name$(_$0)

function $UG$SIPD$State$generate_id$(_$0/*:UG/SIPD/State*/) {var $x1 = _$0;var $x2 = $x1.next_id;var $x3 = 1n;var $nxt_next_id$0 = BigInt.asUintN(64, $x2 + $x3);var $x0 = ({$: "Pair"});var $x4 = $x1.next_id;$x0.fst = $x4;var $x5 = ({$: "State"});var $x6 = $nxt_next_id$0;$x5.next_id = $x6;var $x7 = $x1.tick;$x5.tick = $x7;var $x8 = $x1.players;$x5.players = $x8;var $x9 = $x1.hero_states;$x5.hero_states = $x9;var $x10 = $x1.game_map;$x5.game_map = $x10;$x0.snd = $x5;return $x0; }
const $UG$SIPD$State$generate_id = _$0 => $UG$SIPD$State$generate_id$(_$0)

function $UG$Shape$circle$(_$0/*:V2*/,_$1/*:Number*/) {var $x0 = ({$: "Circle"});var $x1 = _$0;$x0.center = $x1;var $x2 = _$1;$x0.radius = $x2;return $x0; }
const $UG$Shape$circle = _$0 => _$1 => $UG$Shape$circle$(_$0,_$1)

function $get_body_effects_state$(_$0/*:Maybe<UG/SIPD/Body>*/,_$1/*:UG/SIPD/State*/) {var $x1 = _$0;switch ($x1.$) { case "None": { var $x0 = _$1; break; } case "Some": { var $x2 = $x1.value;var $x3 = _$1;var $x0 = $UG$SIPD$Body$apply_effects$($x2, $x3); break; } }return $x0; }
const $get_body_effects_state = _$0 => _$1 => $get_body_effects_state$(_$0,_$1)

function $UG$SIPD$Hero$HeroState$key_on_cooldown$(_$0/*:String*/,_$1/*:OrdTree<String><BigInt>*/) {var $x3 = $String;var $x4 = /*BigInt*/null;var $x5 = $String$Ord;var $x6 = _$1;var $x2 = $OrdTree$get$($x3, $x4, $x5, $x6);var $x7 = _$0;var $x1 = ($x2)($x7);switch ($x1.$) { case "None": { var $x0 = ({$: "True"}); break; } case "Some": { var $x8 = $x1.value;var $x9 = 0n;var $x0 = $U64$neq$($x8, $x9); break; } }return $x0; }
const $UG$SIPD$Hero$HeroState$key_on_cooldown = _$0 => _$1 => $UG$SIPD$Hero$HeroState$key_on_cooldown$(_$0,_$1)

function $UG$SIPD$Skill$apply$(_$0/*:UG/SIPD/Skill*/,_$1/*:UG/SIPD/State*/) {var $x1 = _$0;var $x2 = $UG$SIPD$Effect;var $x3 = $x1.effects;var $x4 = $UG$SIPD$State;var $x5 = _$1;var $x6 = ($state$0 => $effect$1 => {var $x8 = $effect$1;var $x9 = $state$0;var $x7 = ($x8)($x9);return $x7;});var $x0 = $List$foldl$($x2, $x3, $x4, $x5, $x6);return $x0; }
const $UG$SIPD$Skill$apply = _$0 => _$1 => $UG$SIPD$Skill$apply$(_$0,_$1)

function $get_skill$(_$0/*:OrdTree<String><UG/SIPD/Skill>*/,_$1/*:String*/) {var $x2 = $String;var $x3 = $UG$SIPD$Skill;var $x4 = $String$Ord;var $x5 = _$0;var $x1 = $OrdTree$get$($x2, $x3, $x4, $x5);var $x6 = _$1;var $x0 = ($x1)($x6);return $x0; }
const $get_skill = _$0 => _$1 => $get_skill$(_$0,_$1)

function $UG$SIPD$Player$is_player_key_pressed$(_$0/*:String*/,_$1/*:OrdTree<String><Pair<Bool><V2>>*/) {var $x3 = $String;var $x5 = $Bool;var $x6 = $V2;var $x4 = $Pair$($x5, $x6);var $x7 = $String$Ord;var $x8 = _$1;var $x2 = $OrdTree$get$($x3, $x4, $x7, $x8);var $x9 = _$0;var $x1 = ($x2)($x9);switch ($x1.$) { case "None": { var $x0 = ({$: "False"}); break; } case "Some": { var $x10 = $x1.value;var $x0 = $x10.fst; break; } }return $x0; }
const $UG$SIPD$Player$is_player_key_pressed = _$0 => _$1 => $UG$SIPD$Player$is_player_key_pressed$(_$0,_$1)

function $UG$SIPD$Hero$apply_skill_if_pressed$(_$0/*:String*/,_$1/*:BigInt*/,_$2/*:OrdTree<String><UG/SIPD/Skill>*/,_$3/*:OrdTree<String><Pair<Bool><V2>>*/,_$4/*:OrdTree<String><BigInt>*/,_$5/*:UG/SIPD/State*/) {var $x1 = ({$: "Pair"});var $x3 = _$2;var $x4 = _$0;var $x2 = $get_skill$($x3, $x4);$x1.fst = $x2;var $x6 = _$0;var $x7 = _$3;var $x5 = $UG$SIPD$Player$is_player_key_pressed$($x6, $x7);$x1.snd = $x5;var $x8 = $x1.fst;switch ($x8.$) { case "None": { var $x9 = $x1.snd;switch ($x9.$) { case "False": { var $x0 = _$5; break; } case "True": { var $x0 = _$5; break; } } break; } case "Some": { var $x10 = $x1.snd;switch ($x10.$) { case "False": { var $x0 = _$5; break; } case "True": { var $x11 = _$0;var $x12 = _$4;var $on_cooldown$0 = $UG$SIPD$Hero$HeroState$key_on_cooldown$($x11, $x12);var $x15 = $on_cooldown$0;var $x14 = $Bool$eq$($x15);var $x16 = ({$: "True"});var $x13 = ($x14)($x16);switch ($x13.$) { case "True": { var $x0 = _$5; break; } case "False": { var $x17 = $x8.value;var $x18 = _$5;var $x0 = $UG$SIPD$Skill$apply$($x17, $x18); break; } } break; } } break; } }return $x0; }
const $UG$SIPD$Hero$apply_skill_if_pressed = _$0 => _$1 => _$2 => _$3 => _$4 => _$5 => $UG$SIPD$Hero$apply_skill_if_pressed$(_$0,_$1,_$2,_$3,_$4,_$5)

function $UG$SIPD$Hero$apply_pressed_skills$(_$0/*:List<String>*/,_$1/*:BigInt*/,_$2/*:OrdTree<String><UG/SIPD/Skill>*/,_$3/*:OrdTree<String><Pair<Bool><V2>>*/,_$4/*:OrdTree<String><BigInt>*/,_$5/*:UG/SIPD/State*/) {while(1){var $x1 = _$0;switch ($x1.$) { case "Cons": { var $x2 = $x1.head;var $x3 = _$1;var $x4 = _$2;var $x5 = _$3;var $x6 = _$4;var $x7 = _$5;var $new_state$0 = $UG$SIPD$Hero$apply_skill_if_pressed$($x2, $x3, $x4, $x5, $x6, $x7);var $x8 = $x1.tail;var $x9 = _$1;var $x10 = _$2;var $x11 = _$3;var $x12 = _$4;var $x13 = $new_state$0;_$0 = $x8;_$1 = $x9;_$2 = $x10;_$3 = $x11;_$4 = $x12;_$5 = $x13;/*TCO*/continue; break; } case "Nil": { var $x0 = _$5; break; } }return $x0; }}
const $UG$SIPD$Hero$apply_pressed_skills = _$0 => _$1 => _$2 => _$3 => _$4 => _$5 => $UG$SIPD$Hero$apply_pressed_skills$(_$0,_$1,_$2,_$3,_$4,_$5)

function $apply_skill_if_not_on_cooldown$(_$0/*:UG/SIPD/Skill*/,_$1/*:BigInt*/,_$2/*:UG/SIPD/State*/) {var $x2 = _$1;var $x3 = 0n;var $x1 = $U64$eq$($x2, $x3);switch ($x1.$) { case "True": { var $x4 = _$0;var $x5 = _$2;var $x0 = $UG$SIPD$Skill$apply$($x4, $x5); break; } case "False": { var $x0 = _$2; break; } }return $x0; }
const $apply_skill_if_not_on_cooldown = _$0 => _$1 => _$2 => $apply_skill_if_not_on_cooldown$(_$0,_$1,_$2)

function $tick$(_$0/*:BigInt*/,_$1/*:UG/SIPD/State*/) {var $x1 = _$1;var $x2 = $x1.game_map;var $x5 = /*BigInt*/null;var $x6 = $UG$SIPD$Player;var $x7 = $U64$Ord;var $x8 = $x1.players;var $x4 = $OrdTree$get$($x5, $x6, $x7, $x8);var $x9 = _$0;var $x3 = ($x4)($x9);switch ($x3.$) { case "None": { var $x0 = ({$: "State"});var $x10 = $x1.next_id;$x0.next_id = $x10;var $x11 = $x1.tick;$x0.tick = $x11;var $x12 = $x1.players;$x0.players = $x12;var $x13 = $x1.hero_states;$x0.hero_states = $x13;var $x14 = ({$: "GameMap"});var $x15 = $x2.width;$x14.width = $x15;var $x16 = $x2.height;$x14.height = $x16;var $x17 = $x2.bodies;$x14.bodies = $x17;$x0.game_map = $x14; break; } case "Some": { var $x18 = $x3.value;var $x19 = $x18.hero;var $x22 = /*BigInt*/null;var $x23 = $UG$SIPD$Hero$HeroState;var $x24 = $U64$Ord;var $x25 = $x1.hero_states;var $x21 = $OrdTree$get$($x22, $x23, $x24, $x25);var $x26 = _$0;var $x20 = ($x21)($x26);switch ($x20.$) { case "None": { var $x0 = ({$: "State"});var $x27 = $x1.next_id;$x0.next_id = $x27;var $x28 = $x1.tick;$x0.tick = $x28;var $x29 = $x1.players;$x0.players = $x29;var $x30 = $x1.hero_states;$x0.hero_states = $x30;var $x31 = ({$: "GameMap"});var $x32 = $x2.width;$x31.width = $x32;var $x33 = $x2.height;$x31.height = $x33;var $x34 = $x2.bodies;$x31.bodies = $x34;$x0.game_map = $x31; break; } case "Some": { var $x35 = $x20.value;var $x37 = /*BigInt*/null;var $x38 = $UG$SIPD$Body;var $x39 = $U64$Ord;var $x40 = $x2.bodies;var $x36 = $OrdTree$get$($x37, $x38, $x39, $x40);var $x41 = $x19.body_id;var $maybe_hero_body$0 = ($x36)($x41);var $x42 = $maybe_hero_body$0;var $x43 = ({$: "State"});var $x44 = $x1.next_id;$x43.next_id = $x44;var $x45 = $x1.tick;$x43.tick = $x45;var $x46 = $x1.players;$x43.players = $x46;var $x47 = $x1.hero_states;$x43.hero_states = $x47;var $x48 = ({$: "GameMap"});var $x49 = $x2.width;$x48.width = $x49;var $x50 = $x2.height;$x48.height = $x50;var $x51 = $x2.bodies;$x48.bodies = $x51;$x43.game_map = $x48;var $body_effects_state$1 = $get_body_effects_state$($x42, $x43);var $x52 = JSTR_TO_LIST(`AYO`);var $x54 = $String;var $x55 = $UG$SIPD$Skill;var $x56 = $x19.skills;var $skill_keys$2 = $OrdTree$keys$($x54, $x55, $x56);var $x57 = $skill_keys$2;var $x58 = _$0;var $x59 = $x19.skills;var $x60 = $x18.keys;var $x61 = $x35.cooldowns;var $x62 = $body_effects_state$1;var $state_after_skills$3 = $UG$SIPD$Hero$apply_pressed_skills$($x57, $x58, $x59, $x60, $x61, $x62);var $x64 = $String;var $x65 = $UG$SIPD$Skill;var $x66 = $String$Ord;var $x67 = $x19.skills;var $x63 = $OrdTree$get$($x64, $x65, $x66, $x67);var $x68 = JSTR_TO_LIST(`RightClick`);var $maybe_right_click$4 = ($x63)($x68);var $x69 = $maybe_right_click$4;switch ($x69.$) { case "None": { var $x53 = $state_after_skills$3; break; } case "Some": { var $x72 = $String;var $x73 = /*BigInt*/null;var $x74 = $String$Ord;var $x75 = $x35.cooldowns;var $x71 = $OrdTree$get$($x72, $x73, $x74, $x75);var $x76 = JSTR_TO_LIST(`RightClick`);var $x70 = ($x71)($x76);switch ($x70.$) { case "None": { var $x53 = $state_after_skills$3; break; } case "Some": { var $x77 = $x69.value;var $x78 = $x70.value;var $x79 = $state_after_skills$3;var $x53 = $apply_skill_if_not_on_cooldown$($x77, $x78, $x79); break; } } break; } }var $x0 = (console.log(LIST_TO_JSTR($x52)), $x53); break; } } break; } }return $x0; }
const $tick = _$0 => _$1 => $tick$(_$0,_$1)

function $insert_skill$(_$0/*:OrdTree<String><UG/SIPD/Skill>*/,_$1/*:String*/,_$2/*:UG/SIPD/Skill*/) {var $x1 = $String;var $x2 = $UG$SIPD$Skill;var $x3 = $String$Ord;var $x4 = _$0;var $x5 = ({$: "Pair"});var $x6 = _$1;$x5.fst = $x6;var $x7 = _$2;$x5.snd = $x7;var $x0 = $OrdTree$insert$($x1, $x2, $x3, $x4, $x5);return $x0; }
const $insert_skill = _$0 => _$1 => _$2 => $insert_skill$(_$0,_$1,_$2)

function $UG$SIPD$Skill$move$(_$0/*:BigInt*/,_$1/*:BigInt*/,_$2/*:BigInt*/) {var $x0 = ({$: "Skill"});var $x1 = JSTR_TO_LIST(`move`);$x0.name = $x1;var $x2 = ({$: "Cons"});var $x5 = $UG$SIPD$Effect$move;var $x6 = _$0;var $x4 = ($x5)($x6);var $x7 = _$1;var $x3 = ($x4)($x7);$x2.head = $x3;var $x8 = ({$: "Nil"});$x2.tail = $x8;$x0.effects = $x2;var $x9 = _$2;$x0.cooldown = $x9;return $x0; }
const $UG$SIPD$Skill$move = _$0 => _$1 => _$2 => $UG$SIPD$Skill$move$(_$0,_$1,_$2)

function $insert_cooldown$(_$0/*:OrdTree<String><BigInt>*/,_$1/*:String*/,_$2/*:BigInt*/) {var $x1 = $String;var $x2 = /*BigInt*/null;var $x3 = $String$Ord;var $x4 = _$0;var $x5 = ({$: "Pair"});var $x6 = _$1;$x5.fst = $x6;var $x7 = _$2;$x5.snd = $x7;var $x0 = $OrdTree$insert$($x1, $x2, $x3, $x4, $x5);return $x0; }
const $insert_cooldown = _$0 => _$1 => _$2 => $insert_cooldown$(_$0,_$1,_$2)

function $make_skills$(_$0/*:UG/SIPD/State*/,_$1/*:BigInt*/,_$2/*:BigInt*/) {var $x1 = _$0;var $x2 = $String;var $x3 = $UG$SIPD$Skill;var $s$0 = $OrdTree$empty$($x2, $x3);var $x4 = $s$0;var $x5 = JSTR_TO_LIST(`RightClick`);var $x7 = _$1;var $x8 = _$2;var $x9 = 0n;var $x6 = $UG$SIPD$Skill$move$($x7, $x8, $x9);var $s$1 = $insert_skill$($x4, $x5, $x6);var $x10 = $String;var $x11 = /*BigInt*/null;var $s_cooldowns$2 = $OrdTree$empty$($x10, $x11);var $x12 = $s_cooldowns$2;var $x13 = JSTR_TO_LIST(`RightClick`);var $x14 = 0n;var $s_cooldowns$3 = $insert_cooldown$($x12, $x13, $x14);var $x15 = /*BigInt*/null;var $x16 = $UG$SIPD$Hero$HeroState;var $x17 = $U64$Ord;var $x18 = $x1.hero_states;var $x19 = ({$: "Pair"});var $x20 = _$1;$x19.fst = $x20;var $x21 = ({$: "HeroState"});var $x22 = $s_cooldowns$3;$x21.cooldowns = $x22;$x19.snd = $x21;var $new_hero_states$4 = $OrdTree$insert$($x15, $x16, $x17, $x18, $x19);var $x0 = ({$: "Pair"});var $x23 = $s$1;$x0.fst = $x23;var $x24 = ({$: "State"});var $x25 = $x1.next_id;$x24.next_id = $x25;var $x26 = $x1.tick;$x24.tick = $x26;var $x27 = $x1.players;$x24.players = $x27;var $x28 = $new_hero_states$4;$x24.hero_states = $x28;var $x29 = $x1.game_map;$x24.game_map = $x29;$x0.snd = $x24;return $x0; }
const $make_skills = _$0 => _$1 => _$2 => $make_skills$(_$0,_$1,_$2)

function $UG$SIPD$Hero$li_ming$(_$0/*:UG/SIPD/State*/,_$1/*:BigInt*/,_$2/*:V2*/) {var $name$0 = JSTR_TO_LIST(`Li-Ming`);var $x1 = _$2;var $x2 = 20.0;var $shape$1 = $UG$Shape$circle$($x1, $x2);var $x3 = _$0;var $x4 = ({$: "Body"});var $x5 = _$1;$x4.id = $x5;var $x6 = $shape$1;$x4.hitbox = $x6;var $x8 = $tick;var $x9 = _$1;var $x7 = ($x8)($x9);$x4.tick = $x7;var $x10 = ({$: "Nil"});$x4.effects = $x10;var $x11 = ({$: "TakesEffects"});$x4.collidable = $x11;var $state$2 = $UG$SIPD$State$insert_body$($x3, $x4);var $x12 = $state$2;var $x13 = _$1;var $x14 = _$1;var $got$3 = $make_skills$($x12, $x13, $x14);var $x15 = $got$3;var $x0 = ({$: "Pair"});var $x16 = ({$: "Hero"});var $x17 = _$1;$x16.owner_id = $x17;var $x18 = $name$0;$x16.name = $x18;var $x19 = $x15.fst;$x16.skills = $x19;var $x20 = _$1;$x16.body_id = $x20;$x0.fst = $x16;var $x21 = $x15.snd;$x0.snd = $x21;return $x0; }
const $UG$SIPD$Hero$li_ming = _$0 => _$1 => _$2 => $UG$SIPD$Hero$li_ming$(_$0,_$1,_$2)

function $p_hero$(_$0/*:UG/SIPD/State*/,_$1/*:BigInt*/) {var $x1 = _$0;var $x2 = _$1;var $x3 = ({$: "V2"});var $x4 = 0.0;$x3.x = $x4;var $x5 = 0.0;$x3.y = $x5;var $x0 = $UG$SIPD$Hero$li_ming$($x1, $x2, $x3);return $x0; }
const $p_hero = _$0 => _$1 => $p_hero$(_$0,_$1)

const $initial_keys$ = (() => {var $x1 = $String;var $x3 = $Bool;var $x4 = $V2;var $x2 = $Pair$($x3, $x4);var $x0 = $OrdTree$empty$($x1, $x2);return $x0; })()
const $initial_keys = $initial_keys$

function $UG$SIPD$Player$init$(_$0/*:UG/SIPD/State*/) {var $x1 = _$0;var $got$0 = $UG$SIPD$State$generate_id$($x1);var $x2 = $got$0;var $x3 = $x2.snd;var $x4 = $x2.fst;var $got$1 = $p_hero$($x3, $x4);var $x5 = $got$1;var $x0 = ({$: "Pair"});var $x6 = ({$: "Player"});var $x7 = $x2.fst;$x6.id = $x7;var $x8 = JSTR_TO_LIST(`Anon`);$x6.name = $x8;var $x9 = $initial_keys;$x6.keys = $x9;var $x10 = ({$: "V2"});var $x11 = 0.0;$x10.x = $x11;var $x12 = 0.0;$x10.y = $x12;$x6.target = $x10;var $x13 = $x5.fst;$x6.hero = $x13;$x0.fst = $x6;var $x14 = $x5.snd;$x0.snd = $x14;return $x0; }
const $UG$SIPD$Player$init = _$0 => $UG$SIPD$Player$init$(_$0)

function $players_get$(_$0/*:OrdTree<BigInt><UG/SIPD/Player>*/,_$1/*:BigInt*/) {var $x2 = /*BigInt*/null;var $x3 = $UG$SIPD$Player;var $x4 = $U64$Ord;var $x5 = _$0;var $x1 = $OrdTree$get$($x2, $x3, $x4, $x5);var $x6 = _$1;var $x0 = ($x1)($x6);return $x0; }
const $players_get = _$0 => _$1 => $players_get$(_$0,_$1)

function $handle_new_player$(_$0/*:BigInt*/,_$1/*:UG/SIPD/Event*/,_$2/*:UG/SIPD/State*/) {var $x1 = _$2;var $x3 = $x1.players;var $x4 = _$0;var $x2 = $players_get$($x3, $x4);switch ($x2.$) { case "None": { var $x5 = _$1;var $initial_name$0 = $get_player_name$($x5);var $x6 = ({$: "State"});var $x7 = $x1.next_id;$x6.next_id = $x7;var $x8 = $x1.tick;$x6.tick = $x8;var $x9 = $x1.players;$x6.players = $x9;var $x10 = $x1.hero_states;$x6.hero_states = $x10;var $x11 = $x1.game_map;$x6.game_map = $x11;var $got$1 = $UG$SIPD$Player$init$($x6);var $x12 = $got$1;var $got$2 = $x12.snd;var $x13 = $got$2;var $x14 = /*BigInt*/null;var $x15 = $UG$SIPD$Player;var $x16 = $U64$Ord;var $x17 = $x13.players;var $x18 = ({$: "Pair"});var $x19 = _$0;$x18.fst = $x19;var $x20 = $x12.fst;$x18.snd = $x20;var $updated_players$3 = $OrdTree$insert$($x14, $x15, $x16, $x17, $x18);var $x0 = ({$: "State"});var $x21 = $x13.next_id;$x0.next_id = $x21;var $x22 = $x13.tick;$x0.tick = $x22;var $x23 = $updated_players$3;$x0.players = $x23;var $x24 = $x13.hero_states;$x0.hero_states = $x24;var $x25 = $x13.game_map;$x0.game_map = $x25; break; } case "Some": { var $x26 = $x2.value;var $x0 = ({$: "State"});var $x27 = $x1.next_id;$x0.next_id = $x27;var $x28 = $x1.tick;$x0.tick = $x28;var $x29 = $x1.players;$x0.players = $x29;var $x30 = $x1.hero_states;$x0.hero_states = $x30;var $x31 = $x1.game_map;$x0.game_map = $x31; break; } }return $x0; }
const $handle_new_player = _$0 => _$1 => _$2 => $handle_new_player$(_$0,_$1,_$2)

function $update_player_name$(_$0/*:Maybe<UG/SIPD/Player>*/,_$1/*:String*/,_$2/*:BigInt*/,_$3/*:OrdTree<BigInt><UG/SIPD/Player>*/) {var $x1 = _$0;switch ($x1.$) { case "None": { var $x0 = _$3; break; } case "Some": { var $x2 = $x1.value;var $x3 = /*BigInt*/null;var $x4 = $UG$SIPD$Player;var $x5 = $U64$Ord;var $x6 = _$3;var $x7 = ({$: "Pair"});var $x8 = _$2;$x7.fst = $x8;var $x9 = ({$: "Player"});var $x10 = $x2.id;$x9.id = $x10;var $x11 = _$1;$x9.name = $x11;var $x12 = $x2.keys;$x9.keys = $x12;var $x13 = $x2.target;$x9.target = $x13;var $x14 = $x2.hero;$x9.hero = $x14;$x7.snd = $x9;var $x0 = $OrdTree$insert$($x3, $x4, $x5, $x6, $x7); break; } }return $x0; }
const $update_player_name = _$0 => _$1 => _$2 => _$3 => $update_player_name$(_$0,_$1,_$2,_$3)

function $get_mouse_pos$(_$0/*:Maybe<Pair<Bool><V2>>*/) {var $x1 = _$0;switch ($x1.$) { case "None": { var $x0 = ({$: "V2"});var $x2 = 0.0;$x0.x = $x2;var $x3 = 0.0;$x0.y = $x3; break; } case "Some": { var $x4 = $x1.value;var $x0 = $x4.snd; break; } }return $x0; }
const $get_mouse_pos = _$0 => $get_mouse_pos$(_$0)

function $get_key_value$(_$0/*:String*/,_$1/*:Maybe<UG/SIPD/Player>*/) {var $x1 = _$1;switch ($x1.$) { case "None": { var $x0 = ({$: "None"}); break; } case "Some": { var $x2 = $x1.value;var $x4 = $String;var $x6 = $Bool;var $x7 = $V2;var $x5 = $Pair$($x6, $x7);var $x8 = $String$Ord;var $x9 = $x2.keys;var $x3 = $OrdTree$get$($x4, $x5, $x8, $x9);var $x10 = _$0;var $x0 = ($x3)($x10); break; } }return $x0; }
const $get_key_value = _$0 => _$1 => $get_key_value$(_$0,_$1)

function $update_player_key$(_$0/*:Maybe<UG/SIPD/Player>*/,_$1/*:String*/,_$2/*:Bool*/,_$3/*:BigInt*/,_$4/*:V2*/,_$5/*:OrdTree<BigInt><UG/SIPD/Player>*/) {var $x1 = _$0;switch ($x1.$) { case "None": { var $x0 = _$5; break; } case "Some": { var $x2 = $x1.value;var $x3 = $String;var $x5 = $Bool;var $x6 = $V2;var $x4 = $Pair$($x5, $x6);var $x7 = $String$Ord;var $x8 = $x2.keys;var $x9 = ({$: "Pair"});var $x10 = _$1;$x9.fst = $x10;var $x11 = ({$: "Pair"});var $x12 = _$2;$x11.fst = $x12;var $x13 = _$4;$x11.snd = $x13;$x9.snd = $x11;var $new_keys$0 = $OrdTree$insert$($x3, $x4, $x7, $x8, $x9);var $x14 = /*BigInt*/null;var $x15 = $UG$SIPD$Player;var $x16 = $U64$Ord;var $x17 = _$5;var $x18 = ({$: "Pair"});var $x19 = _$3;$x18.fst = $x19;var $x20 = ({$: "Player"});var $x21 = $x2.id;$x20.id = $x21;var $x22 = $x2.name;$x20.name = $x22;var $x23 = $new_keys$0;$x20.keys = $x23;var $x24 = $x2.target;$x20.target = $x24;var $x25 = $x2.hero;$x20.hero = $x25;$x18.snd = $x20;var $x0 = $OrdTree$insert$($x14, $x15, $x16, $x17, $x18); break; } }return $x0; }
const $update_player_key = _$0 => _$1 => _$2 => _$3 => _$4 => _$5 => $update_player_key$(_$0,_$1,_$2,_$3,_$4,_$5)

function $update_player_target$(_$0/*:Maybe<UG/SIPD/Player>*/,_$1/*:Number*/,_$2/*:Number*/,_$3/*:BigInt*/,_$4/*:OrdTree<BigInt><UG/SIPD/Player>*/) {var $x1 = _$0;switch ($x1.$) { case "None": { var $x0 = _$4; break; } case "Some": { var $x2 = $x1.value;var $x3 = /*BigInt*/null;var $x4 = $UG$SIPD$Player;var $x5 = $U64$Ord;var $x6 = _$4;var $x7 = ({$: "Pair"});var $x8 = _$3;$x7.fst = $x8;var $x9 = ({$: "Player"});var $x10 = $x2.id;$x9.id = $x10;var $x11 = $x2.name;$x9.name = $x11;var $x12 = $x2.keys;$x9.keys = $x12;var $x13 = ({$: "V2"});var $x14 = _$1;$x13.x = $x14;var $x15 = _$2;$x13.y = $x15;$x9.target = $x13;var $x16 = $x2.hero;$x9.hero = $x16;$x7.snd = $x9;var $x0 = $OrdTree$insert$($x3, $x4, $x5, $x6, $x7); break; } }return $x0; }
const $update_player_target = _$0 => _$1 => _$2 => _$3 => _$4 => $update_player_target$(_$0,_$1,_$2,_$3,_$4)

function $handle_event$(_$0/*:UG/SIPD/Event*/) {var $x1 = _$0;switch ($x1.$) { case "ActionEvent": { var $x2 = $x1.action;var $x0 = ($__3$0 => {var $x4 = $__3$0;var $x5 = $x4.players;var $x6 = $x2.pid;var $action_player$1 = $players_get$($x5, $x6);var $x7 = $action_player$1;var $x8 = $x2.nick;var $x9 = $x2.pid;var $x10 = $x4.players;var $updated_players$2 = $update_player_name$($x7, $x8, $x9, $x10);var $x3 = ({$: "State"});var $x11 = $x4.next_id;$x3.next_id = $x11;var $x12 = $x4.tick;$x3.tick = $x12;var $x13 = $updated_players$2;$x3.players = $x13;var $x14 = $x4.hero_states;$x3.hero_states = $x14;var $x15 = $x4.game_map;$x3.game_map = $x15;return $x3;}); break; } case "KeyEvent": { var $x0 = ($__4$0 => {var $x17 = $__4$0;var $x18 = $x17.players;var $x19 = $x1.pid;var $action_player$1 = $players_get$($x18, $x19);var $x21 = $x1.key;var $x22 = $action_player$1;var $x20 = $get_key_value$($x21, $x22);var $old_value$2 = $get_mouse_pos$($x20);var $x23 = $action_player$1;var $x24 = $x1.key;var $x25 = $x1.pressed;var $x26 = $x1.pid;var $x27 = $old_value$2;var $x28 = $x17.players;var $updated_players$3 = $update_player_key$($x23, $x24, $x25, $x26, $x27, $x28);var $x16 = ({$: "State"});var $x29 = $x17.next_id;$x16.next_id = $x29;var $x30 = $x17.tick;$x16.tick = $x30;var $x31 = $updated_players$3;$x16.players = $x31;var $x32 = $x17.hero_states;$x16.hero_states = $x32;var $x33 = $x17.game_map;$x16.game_map = $x33;return $x16;}); break; } case "KeyMouse": { var $x0 = ($__6$0 => {var $x35 = $__6$0;var $x36 = $x35.players;var $x37 = $x1.pid;var $action_player$1 = $players_get$($x36, $x37);var $x38 = $action_player$1;var $x39 = $x1.key;var $x40 = $x1.pressed;var $x41 = $x1.pid;var $x42 = ({$: "V2"});var $x43 = $x1.x;$x42.x = $x43;var $x44 = $x1.y;$x42.y = $x44;var $x45 = $x35.players;var $updated_players$2 = $update_player_key$($x38, $x39, $x40, $x41, $x42, $x45);var $x34 = ({$: "State"});var $x46 = $x35.next_id;$x34.next_id = $x46;var $x47 = $x35.tick;$x34.tick = $x47;var $x48 = $updated_players$2;$x34.players = $x48;var $x49 = $x35.hero_states;$x34.hero_states = $x49;var $x50 = $x35.game_map;$x34.game_map = $x50;return $x34;}); break; } case "MouseClick": { var $x51 = $x1.click;switch ($x51.$) { case "LeftButton": { var $x0 = ($__4$0 => {var $x53 = $__4$0;var $x54 = $x53.players;var $x55 = $x1.pid;var $action_player$1 = $players_get$($x54, $x55);var $x56 = $action_player$1;var $x57 = $x1.x;var $x58 = $x1.y;var $x59 = $x1.pid;var $x60 = $x53.players;var $updated_players$2 = $update_player_target$($x56, $x57, $x58, $x59, $x60);var $x52 = ({$: "State"});var $x61 = $x53.next_id;$x52.next_id = $x61;var $x62 = $x53.tick;$x52.tick = $x62;var $x63 = $updated_players$2;$x52.players = $x63;var $x64 = $x53.hero_states;$x52.hero_states = $x64;var $x65 = $x53.game_map;$x52.game_map = $x65;return $x52;}); break; } case "RightButton": { var $x0 = ($__4$0 => {var $x67 = $__4$0;var $x68 = $x67.players;var $x69 = $x1.pid;var $action_player$1 = $players_get$($x68, $x69);var $x70 = $action_player$1;var $x71 = $x1.x;var $x72 = $x1.y;var $x73 = $x1.pid;var $x74 = $x67.players;var $updated_players$2 = $update_player_target$($x70, $x71, $x72, $x73, $x74);var $x66 = ({$: "State"});var $x75 = $x67.next_id;$x66.next_id = $x75;var $x76 = $x67.tick;$x66.tick = $x76;var $x77 = $updated_players$2;$x66.players = $x77;var $x78 = $x67.hero_states;$x66.hero_states = $x78;var $x79 = $x67.game_map;$x66.game_map = $x79;return $x66;}); break; } } break; } case "MouseMove": { var $x0 = ($__4$0 => {var $x81 = $__4$0;var $x80 = ({$: "State"});var $x82 = $x81.next_id;$x80.next_id = $x82;var $x83 = $x81.tick;$x80.tick = $x83;var $x84 = $x81.players;$x80.players = $x84;var $x85 = $x81.hero_states;$x80.hero_states = $x85;var $x86 = $x81.game_map;$x80.game_map = $x86;return $x80;}); break; } }return $x0; }
const $handle_event = _$0 => $handle_event$(_$0)

function $UG$SIPD$Game$when$(_$0/*:UG/SIPD/Event*/,_$1/*:UG/SIPD/State*/) {var $x1 = _$0;var $pid$0 = $UG$SIPD$Event$get_event_pid$($x1);var $x2 = $pid$0;var $x3 = _$0;var $x4 = _$1;var $state$1 = $handle_new_player$($x2, $x3, $x4);var $x6 = _$0;var $x5 = $handle_event$($x6);var $x7 = $state$1;var $state$2 = ($x5)($x7);var $x0 = $state$2;return $x0; }
const $UG$SIPD$Game$when = _$0 => _$1 => $UG$SIPD$Game$when$(_$0,_$1)

function $UG$SM$ActionLogs$(_$0/*:Type*/) {var $x2 = _$0;var $x1 = $List$($x2);var $x0 = $BinMap$($x1);return $x0; }
const $UG$SM$ActionLogs = _$0 => $UG$SM$ActionLogs$(_$0)

const $UG$SM$Tick$ = (() => {var $x0 = /*BigInt*/null;return $x0; })()
const $UG$SM$Tick = $UG$SM$Tick$

function $UG$SM$ActionLogs$add_action$(_$0/*:Type*/,_$1/*:UG/SM/ActionLogs<null>*/,_$2/*:UG/SM/Tick*/,_$3/*:null*/) {var $x3 = _$0;var $x2 = $List$($x3);var $x4 = _$1;var $x6 = _$2;var $x5 = $U64$to_bits$($x6);var $x1 = $BinMap$get$($x2, $x4, $x5);switch ($x1.$) { case "None": { var $x8 = _$0;var $x7 = $List$($x8);var $x9 = _$1;var $x11 = _$2;var $x10 = $U64$to_bits$($x11);var $x12 = ({$: "Cons"});var $x13 = _$3;$x12.head = $x13;var $x14 = ({$: "Nil"});$x12.tail = $x14;var $x0 = $BinMap$set$($x7, $x9, $x10, $x12); break; } case "Some": { var $x16 = _$0;var $x15 = $List$($x16);var $x17 = _$1;var $x19 = _$2;var $x18 = $U64$to_bits$($x19);var $x21 = _$0;var $x22 = $x1.value;var $x23 = ({$: "Cons"});var $x24 = _$3;$x23.head = $x24;var $x25 = ({$: "Nil"});$x23.tail = $x25;var $x20 = $List$append$($x21, $x22, $x23);var $x0 = $BinMap$set$($x15, $x17, $x18, $x20); break; } }return $x0; }
const $UG$SM$ActionLogs$add_action = _$0 => _$1 => _$2 => _$3 => $UG$SM$ActionLogs$add_action$(_$0,_$1,_$2,_$3)

function $UG$SM$ActionLogs$get_actions$(_$0/*:Type*/,_$1/*:UG/SM/ActionLogs<null>*/,_$2/*:UG/SM/Tick*/) {var $x1 = _$2;var $key$0 = $U64$to_bits$($x1);var $x4 = _$0;var $x3 = $List$($x4);var $x5 = _$1;var $x6 = $key$0;var $x2 = $BinMap$get$($x3, $x5, $x6);switch ($x2.$) { case "None": { var $x0 = ({$: "Nil"}); break; } case "Some": { var $x0 = $x2.value; break; } }return $x0; }
const $UG$SM$ActionLogs$get_actions = _$0 => _$1 => _$2 => $UG$SM$ActionLogs$get_actions$(_$0,_$1,_$2)

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

function $default_hero$(_$0/*:BigInt*/,_$1/*:BigInt*/) {var $x0 = ({$: "Hero"});var $x1 = _$0;$x0.owner_id = $x1;var $x2 = JSTR_TO_LIST(`Default`);$x0.name = $x2;var $x4 = $String;var $x5 = $UG$SIPD$Skill;var $x3 = $OrdTree$empty$($x4, $x5);$x0.skills = $x3;var $x6 = _$1;$x0.body_id = $x6;return $x0; }
const $default_hero = _$0 => _$1 => $default_hero$(_$0,_$1)

const $export_compute$ = (() => {var $x0 = $UG$SM$compute;return $x0; })()
const $export_compute = $export_compute$

const $export_game$ = (() => {var $x0 = ({$: "Game"});var $x1 = $UG$SIPD$Game$init;$x0.init = $x1;var $x2 = $UG$SIPD$Game$when;$x0.when = $x2;var $x3 = $UG$SIPD$Game$tick;$x0.tick = $x3;return $x0; })()
const $export_game = $export_game$

const $export_game_init$ = (() => {var $x0 = $UG$SIPD$Game$init;return $x0; })()
const $export_game_init = $export_game_init$

const $export_game_tick$ = (() => {var $x0 = $UG$SIPD$Game$tick;return $x0; })()
const $export_game_tick = $export_game_tick$

const $export_game_when$ = (() => {var $x0 = $UG$SIPD$Game$when;return $x0; })()
const $export_game_when = $export_game_when$

const $export_register_action$ = (() => {var $x0 = $UG$SM$register_action;return $x0; })()
const $export_register_action = $export_register_action$

const $export_time_action$ = (() => {var $x0 = $UG$SM$TimedAction$time_action;return $x0; })()
const $export_time_action = $export_time_action$

const $test$0$ = (() => {var $x0 = ({$: "Refl"});return $x0; })()
const $test$0 = $test$0$

const $test$1$ = (() => {var $x0 = ({$: "Refl"});return $x0; })()
const $test$1 = $test$1$

const $test$10$ = (() => {var $x0 = ({$: "Refl"});return $x0; })()
const $test$10 = $test$10$

const $test$2$ = (() => {var $x0 = ({$: "Refl"});return $x0; })()
const $test$2 = $test$2$

const $test$3$ = (() => {var $x0 = ({$: "Refl"});return $x0; })()
const $test$3 = $test$3$

const $test$4$ = (() => {var $x0 = ({$: "Refl"});return $x0; })()
const $test$4 = $test$4$

const $test$5$ = (() => {var $x0 = ({$: "Refl"});return $x0; })()
const $test$5 = $test$5$

const $test$6$ = (() => {var $x0 = ({$: "Refl"});return $x0; })()
const $test$6 = $test$6$

const $test$7$ = (() => {var $x0 = ({$: "Refl"});return $x0; })()
const $test$7 = $test$7$

const $test$8$ = (() => {var $x0 = ({$: "Refl"});return $x0; })()
const $test$8 = $test$8$

const $test$9$ = (() => {var $x0 = ({$: "Refl"});return $x0; })()
const $test$9 = $test$9$


export { $BinTree, $Maybe, $BinMap, $BinMap$empty, $Bits, $BinMap$get, $BinMap$new, $BinMap$set, $Bool, $Bool$and, $Bool$eq, $Bool$if, $Char, $U64$to_bool, $U64$eql, $Cmp, $U64$compare, $Char$compare, $Ord, $Char$Ord, $Equal, $F64$add, $F64$div, $F64$eql, $F64$eq, $F64$is_zero, $F64$lt, $F64$min, $F64$mul, $F64$sqrt_go, $F64$sqrt, $F64$sub, $KEYEVENT, $KEYMOUSE, $List, $List$append, $List$foldr, $List$fold, $List$foldl, $MOUSECLICK, $MOUSEMOVE, $Maybe$none, $Nat, $Nat$add, $Nat$lte, $Nat$gte, $Nat$max, $Ord$compare, $Pair, $OrdTree$Balance, $OrdTree, $OrdTree$Balance$rotate_left, $OrdTree$Balance$rotate_right, $OrdTree$empty, $OrdTree$fold, $OrdTree$get, $OrdTree$height, $Pair$get_fst, $OrdTree$insert$go, $OrdTree$insert, $OrdTree$keys, $OrdTree$singleton, $OrdTree$size, $OrdTree$values, $SETNICK, $String, $String$compare, $String$Ord, $U64$Ord, $U64$add, $U64$div, $U64$eq, $U64$from_bool, $U64$gt, $U64$lt, $U64$max, $U64$min, $U64$mod, $U64$mul, $U64$neq, $U64$sub, $U64$to_bits, $UG$Collision$Collidable, $UG$SIPD$Action, $V2, $UG$Shape, $UG$SIPD$Effect, $UG$SIPD$Skill, $UG$SIPD$Hero, $UG$SIPD$Player, $UG$SIPD$Hero$HeroState, $UG$SIPD$GameMap, $UG$SIPD$State, $UG$SIPD$Body, $UG$SIPD$Body$set_effects, $UG$SIPD$Body$apply_effects$go, $UG$SIPD$Body$apply_effects, $UG$SIPD$Body$tick, $UG$Shape$get_center, $V2$sub, $V2$length, $V2$div_scalar, $V2$is_zero, $V2$normalize, $V2$mul_scalar, $V2$add, $UG$Shape$move, $UG$SIPD$GameMap$insert_body, $UG$SIPD$State$insert_body, $UG$SIPD$Player$get_player, $UG$SIPD$GameMap$get_body, $UG$SIPD$Effect$move, $UG$SIPD$Event$Click, $UG$SIPD$Event, $UG$SIPD$Event$get_event_pid, $UG$SM$Game, $UG$SIPD$Game, $UG$SIPD$GameMap$init, $UG$SIPD$Game$init, $update_cooldown, $decrement_cooldowns, $update_hero_state, $update_cooldowns, $UG$SIPD$Game$tick, $get_player_name, $UG$SIPD$State$generate_id, $UG$Shape$circle, $get_body_effects_state, $UG$SIPD$Hero$HeroState$key_on_cooldown, $UG$SIPD$Skill$apply, $get_skill, $UG$SIPD$Player$is_player_key_pressed, $UG$SIPD$Hero$apply_skill_if_pressed, $UG$SIPD$Hero$apply_pressed_skills, $apply_skill_if_not_on_cooldown, $tick, $insert_skill, $UG$SIPD$Skill$move, $insert_cooldown, $make_skills, $UG$SIPD$Hero$li_ming, $p_hero, $initial_keys, $UG$SIPD$Player$init, $players_get, $handle_new_player, $update_player_name, $get_mouse_pos, $get_key_value, $update_player_key, $update_player_target, $handle_event, $UG$SIPD$Game$when, $UG$SM$ActionLogs, $UG$SM$Tick, $UG$SM$ActionLogs$add_action, $UG$SM$ActionLogs$get_actions, $UG$SM$Game$init, $UG$SM$Game$tick, $UG$SM$Game$when, $UG$SM$StateLogs$StateNode, $UG$SM$StateLogs, $UG$SM$Mach, $UG$SM$Mach$action_logs, $UG$SM$Mach$cached_tick, $UG$SM$StateLogs$StateNode$keep, $UG$SM$StateLogs$StateNode$life, $UG$SM$StateLogs$StateNode$older, $UG$SM$StateLogs$StateNode$set_keep, $UG$SM$StateLogs$StateNode$set_life, $UG$SM$StateLogs$StateNode$state, $UG$SM$StateLogs$StateNode$tick, $UG$SM$StateLogs$find_rollback_amount$go, $UG$SM$StateLogs$find_rollback_amount, $UG$SM$StateLogs$push$go$life, $UG$SM$StateLogs$push$go, $UG$SM$StateLogs$push, $UG$SM$StateLogs$rollback$go, $UG$SM$StateLogs$rollback, $UG$SM$Time, $UG$SM$Time$time_to_tick, $UG$SM$TimedAction, $UG$SM$TimedAction$time_action, $UG$SM$add_action_to_logs, $UG$SM$get_initial_state, $UG$SM$update_mach, $UG$SM$compute$go, $UG$SM$compute, $UG$SM$new_mach, $UG$SM$update_genesis_tick, $UG$SM$update_cached_tick, $UG$SM$remove_future_states, $UG$SM$register_action, $default_hero, $export_compute, $export_game, $export_game_init, $export_game_tick, $export_game_when, $export_register_action, $export_time_action, $test$0, $test$1, $test$10, $test$2, $test$3, $test$4, $test$5, $test$6, $test$7, $test$8, $test$9 }
