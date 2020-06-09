const functions = require('firebase-functions');
const mercadopago = require('mercadopago');

mercadopago.configure({
  access_token: 'APP_USR-6717864324430689-051816-20baf9cd6ecd11e2549c93c614eb7b1d-570070788'
});

exports.createPreference = functions.https.onRequest(async (request, response) => {
  try {
    const { body: { init_point } } = await mercadopago.preferences.create({
      items: [
        {
          title: 'Recordar app',
          unit_price: 29.9,
          quantity: 1,
        }
      ],
      back_urls: {
        success: 'success',
      },
      binary_mode: true
    });
    return response.redirect(`${init_point}`);
  } catch ({ message }) {
    return response.send(message);
  }
});
