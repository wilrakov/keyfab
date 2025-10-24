import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { type, orderDetails, description, email, message } = await request.json();

    let emailHtml = '';
    let subject = '';
    let replyTo = email;

    if (type === 'parts') {
      subject = '🎉 Nouveau projet clavier chez Keyfab !';
      replyTo = orderDetails.email;
      emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
            body { 
              font-family: 'Inter', Arial, sans-serif; 
              line-height: 1.6; 
              color: #E5E7EB; /* light gray */
              background-color: #111827; /* dark gray */
              margin: 0;
              padding: 0;
            }
            .container { 
              max-width: 600px; 
              margin: 40px auto; 
              padding: 30px; 
              border: 1px solid #374151; /* gray */
              border-radius: 12px; 
              background-color: #1F2937; /* darker gray */
              box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              font-size: 2.5em;
              font-weight: bold;
              color: #60A5FA; /* light blue */
            }
            h2 { 
              color: #93C5FD; /* lighter blue */
              border-bottom: 2px solid #374151;
              padding-bottom: 10px;
              margin-top: 25px;
            }
            ul { 
              list-style: none; 
              padding: 0; 
            }
            li { 
              margin-bottom: 15px; 
              background-color: #374151;
              padding: 15px;
              border-radius: 8px;
            }
            strong {
              color: #93C5FD;
            }
            .price { 
              font-weight: bold; 
              color: #34D399; /* green */
              font-size: 1.5em; 
              text-align: right;
              margin-top: 20px;
            }
            .custom-link { 
              color: #60A5FA; 
              text-decoration: none; 
              word-break: break-all;
            }
            .custom-link:hover {
              text-decoration: underline;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              font-size: 1.1em;
              color: #9CA3AF; /* medium gray */
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">Keyfab</div>
            <h2>Un nouveau clavier de rêve à assembler !</h2>
            <p>Félicitations ! Une nouvelle commande personnalisée vient d'arriver. Voici les détails pour ce petit bijou :</p>
            <p><strong>Email du client :</strong> <a href="mailto:${orderDetails.email}" class="custom-link">${orderDetails.email}</a></p>
            
            <h3>Composants choisis :</h3>
            <ul>
              ${orderDetails.barebone.enabled ? `
                <li><strong>Kit Barebone :</strong> ${orderDetails.barebone.selection || 'Non spécifié'}
                  ${orderDetails.barebone.custom ? `<br/>Lien personnalisé : <a href="${orderDetails.barebone.custom}" class="custom-link">${orderDetails.barebone.custom}</a>` : ''}
                  ${orderDetails.barebone.color ? `<br/>Couleur : ${orderDetails.barebone.color}` : ''}
                </li>
              ` : ''}
              ${orderDetails.switches.enabled ? `
                <li><strong>Switches :</strong> ${orderDetails.switches.selection || 'Non spécifié'}
                  ${orderDetails.switches.custom ? `<br/>Lien personnalisé : <a href="${orderDetails.switches.custom}" class="custom-link">${orderDetails.switches.custom}</a>` : ''}
                </li>
              ` : ''}
              ${orderDetails.keycaps.enabled ? `
                <li><strong>Keycaps :</strong> ${orderDetails.keycaps.selection || 'Non spécifié'}
                  ${orderDetails.keycaps.custom ? `<br/>Lien personnalisé : <a href="${orderDetails.keycaps.custom}" class="custom-link">${orderDetails.keycaps.custom}</a>` : ''}
                </li>
              ` : ''}
            </ul>
            <p class="price">Prix Estimé : ${orderDetails.totalPrice}€</p>
            <p class="footer">À toi de jouer pour créer une nouvelle merveille ! 🚀</p>
          </div>
        </body>
        </html>
      `;
    } else if (type === 'description') {
      subject = '💡 Nouvelle inspiration pour un clavier sur mesure !';
      emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
            body { 
              font-family: 'Inter', Arial, sans-serif; 
              line-height: 1.6; 
              color: #E5E7EB; 
              background-color: #111827; 
              margin: 0;
              padding: 0;
            }
            .container { 
              max-width: 600px; 
              margin: 40px auto; 
              padding: 30px; 
              border: 1px solid #374151; 
              border-radius: 12px; 
              background-color: #1F2937; 
              box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              font-size: 2.5em;
              font-weight: bold;
              color: #60A5FA;
            }
            h2 { 
              color: #93C5FD; 
              border-bottom: 2px solid #374151;
              padding-bottom: 10px;
            }
            .description-box {
              background-color: #374151; 
              padding: 20px; 
              border-left: 4px solid #60A5FA; 
              margin-top: 20px;
              border-radius: 8px;
              font-style: italic;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              font-size: 1.1em;
              color: #9CA3AF;
            }
            .custom-link { 
              color: #60A5FA; 
              text-decoration: none; 
            }
            .custom-link:hover {
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">Keyfab</div>
            <h2>Une nouvelle vision à réaliser !</h2>
            <p><strong>Email du client :</strong> <a href="mailto:${email}" class="custom-link">${email}</a></p>
            <p>Une nouvelle demande de clavier sur mesure vient d'arriver, pleine d'inspiration. Voici la description :</p>
            <div class="description-box">
              <p>${description}</p>
            </div>
            <p class="footer">C'est le moment de prendre contact et de donner vie à ce projet ! ✨</p>
          </div>
        </body>
        </html>
      `;
    } else if (type === 'contact') {
        subject = `📨 Nouveau message de ${email}`;
        emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
            body { 
              font-family: 'Inter', Arial, sans-serif; 
              line-height: 1.6; 
              color: #E5E7EB; 
              background-color: #111827; 
              margin: 0;
              padding: 0;
            }
            .container { 
              max-width: 600px; 
              margin: 40px auto; 
              padding: 30px; 
              border: 1px solid #374151; 
              border-radius: 12px; 
              background-color: #1F2937; 
              box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              font-size: 2.5em;
              font-weight: bold;
              color: #60A5FA;
            }
            h2 { 
              color: #93C5FD; 
              border-bottom: 2px solid #374151;
              padding-bottom: 10px;
            }
            .description-box {
              background-color: #374151; 
              padding: 20px; 
              border-left: 4px solid #60A5FA; 
              margin-top: 20px;
              border-radius: 8px;
              font-style: italic;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">Keyfab Contact</div>
            <h2>Nouveau message de la page contact</h2>
            <p><strong>De :</strong> <a href="mailto:${email}">${email}</a></p>
            <div class="description-box">
              <p>${message}</p>
            </div>
          </div>
        </body>
        </html>
      `;
    } else {
      return NextResponse.json({ error: 'Type de requête invalide' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // N'oubliez pas de vérifier ce domaine avec Resend !
      to: ['wilrakov@proton.me'], // L'adresse e-mail du destinataire
      subject: subject,
      html: emailHtml,
      reply_to: replyTo,
    });

    if (error) {
      console.error('Erreur Resend :', error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Erreur API :', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}