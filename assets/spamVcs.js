async function BokepSaturn(target) {
    try {
        await sock.offerCall(target, { 
        video: true 
        });
        console.log(chalk.white.bold(`Success Send VCS Call To Target`));
    } catch (error) {
        console.error(chalk.white.bold(`Failed Send VCS Call To Target:`, error));
    }
}
// EFEK? SPAM VCS BY KYXZANxSATURN