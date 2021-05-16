/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/light");

var $root = ($protobuf.roots["default"] || ($protobuf.roots["default"] = new $protobuf.Root()))
    .addJSON({
      Paste: {
        fields: {
          id: {
            type: "string",
            id: 1
          },
          status: {
            type: "int32",
            id: 2
          },
          content: {
            type: "string",
            id: 3
          },
          lang: {
            type: "string",
            id: 4
          },
          password: {
            type: "bool",
            id: 5
          },
          error: {
            type: "string",
            id: 6
          },
          message: {
            type: "string",
            id: 7
          },
          tokenEncryption: {
            type: "string",
            id: 8
          }
        }
      },
      newPaste: {
        fields: {
          content: {
            type: "string",
            id: 1
          },
          lang: {
            type: "string",
            id: 2
          },
          password: {
            type: "bool",
            id: 3
          },
          once: {
            type: "bool",
            id: 4
          },
          tokenEncryption: {
            type: "string",
            id: 5
          },
          token: {
            type: "string",
            id: 6
          },
          xtoken: {
            type: "string",
            id: 7
          },
          timeline: {
            type: "int32",
            id: 8
          }
        }
      }
    });

module.exports = $root;
