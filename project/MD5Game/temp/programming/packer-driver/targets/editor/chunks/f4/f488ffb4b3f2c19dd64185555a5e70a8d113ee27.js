System.register(["__unresolved_0", "cc", "crypto-js/md5"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, MD5, User, _crd;

  function _reportPossibleCrUseOfMD(extras) {
    _reporterNs.report("MD5", "crypto-js/md5", _context.meta, extras);
  }

  _export("User", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_cryptoJsMd) {
      MD5 = _cryptoJsMd.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "f0002U5kj1MgofBdAXaaBgB", "User", undefined);

      _export("User", User = class User {
        constructor(userName) {
          this.blood = void 0;
          //血量
          this.normalAttackHurt = void 0;
          //普攻伤害
          this.toEnemyHurt = void 0;
          //对敌伤害
          this.criticalStrikeHurt = void 0;
          this._userNameMD5 = void 0;
          this._userNameMD5 = (_crd && MD5 === void 0 ? (_reportPossibleCrUseOfMD({
            error: Error()
          }), MD5) : MD5)("hello").toString();
          this.init();
        }

        init() {
          this.blood = parseInt(this._userNameMD5.slice(0, 3), 16) % 1000 + 1000;
          this.normalAttackHurt = parseInt(this._userNameMD5.slice(4, 4), 16);
          this.toEnemyHurt = parseInt(this._userNameMD5.slice(5, 5), 16) * 4;
          this.criticalStrikeHurt = parseInt(this._userNameMD5.slice(7, 9), 16) * 4;
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=f488ffb4b3f2c19dd64185555a5e70a8d113ee27.js.map