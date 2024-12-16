/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/basic.json`.
 */
export type Basic = {
  "address": "E4i1Laj8H5ZgcoynwLs3W8NCpg1uDJ2iCQYAbkCNTk6T",
  "metadata": {
    "name": "basic",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "addRoute",
      "discriminator": [
        183,
        27,
        10,
        225,
        90,
        113,
        228,
        7
      ],
      "accounts": [
        {
          "name": "route",
          "writable": true,
          "signer": true
        },
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "routeId",
          "type": "u64"
        },
        {
          "name": "details",
          "type": "string"
        },
        {
          "name": "distance",
          "type": "u64"
        }
      ]
    },
    {
      "name": "bookTicket",
      "discriminator": [
        191,
        17,
        87,
        4,
        177,
        83,
        123,
        211
      ],
      "accounts": [
        {
          "name": "ticket",
          "writable": true,
          "signer": true
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "user",
          "type": "pubkey"
        },
        {
          "name": "routeId",
          "type": "u64"
        },
        {
          "name": "price",
          "type": "u64"
        }
      ]
    },
    {
      "name": "getCurrentTimestamp",
      "discriminator": [
        186,
        183,
        125,
        74,
        145,
        141,
        120,
        16
      ],
      "accounts": [
        {
          "name": "data",
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "greet",
      "discriminator": [
        203,
        194,
        3,
        150,
        228,
        58,
        181,
        62
      ],
      "accounts": [],
      "args": []
    },
    {
      "name": "modifyRoute",
      "discriminator": [
        68,
        150,
        186,
        52,
        254,
        33,
        234,
        196
      ],
      "accounts": [
        {
          "name": "route",
          "writable": true
        },
        {
          "name": "admin",
          "writable": true,
          "signer": true
        }
      ],
      "args": [
        {
          "name": "newDetails",
          "type": "string"
        },
        {
          "name": "newDistance",
          "type": "u64"
        }
      ]
    },
    {
      "name": "viewTickets",
      "discriminator": [
        89,
        253,
        178,
        78,
        52,
        181,
        104,
        89
      ],
      "accounts": [
        {
          "name": "tickets",
          "writable": true
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "route",
      "discriminator": [
        80,
        179,
        58,
        115,
        52,
        19,
        146,
        134
      ]
    },
    {
      "name": "ticket",
      "discriminator": [
        41,
        228,
        24,
        165,
        78,
        90,
        235,
        200
      ]
    },
    {
      "name": "ticketList",
      "discriminator": [
        199,
        68,
        200,
        187,
        58,
        64,
        242,
        212
      ]
    }
  ],
  "types": [
    {
      "name": "route",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "distance",
            "type": "u64"
          },
          {
            "name": "routeId",
            "type": "u64"
          },
          {
            "name": "details",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "ticket",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u64"
          },
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "routeId",
            "type": "u64"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "ticketList",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tickets",
            "type": {
              "vec": {
                "defined": {
                  "name": "ticket"
                }
              }
            }
          }
        ]
      }
    }
  ]
};
