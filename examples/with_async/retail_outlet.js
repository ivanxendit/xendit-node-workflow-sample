const x = require('../xendit');

const RetailOutlet = x.RetailOutlet;
const ro = new RetailOutlet({});

(async function() {
  try {
    const pmCode = await ro.createFixedPaymentCode({
      externalID: '123',
      retailOutletName: 'ALFAMART',
      name: 'Ervan Adetya',
      expectedAmt: 10000,
    });
    // eslint-disable-next-line no-console
    console.log('fixed payment code created:', pmCode);

    const { id } = pmCode;
    const retrievedPmCode = await ro.getFixedPaymentCode({ id });
    // eslint-disable-next-line no-console
    console.log('fixed payment code details:', retrievedPmCode);

    const updatedPmCode = await ro.updateFixedPaymentCode({
      id,
      expectedAmt: 12000,
    });
    // eslint-disable-next-line no-console
    console.log('updated payment code details:', updatedPmCode);

    await ro.simulatePayment({
      retailOutletName: 'ALFAMART',
      paymentCode: updatedPmCode.payment_code,
      transferAmount: 12000,
    });
    // eslint-disable-next-line no-console
    console.log('simulated payment:', updatedPmCode);

    const paymentsByCodeId = await ro.getPaymentsByFixedPaymentCodeId({ id });
    // eslint-disable-next-line no-console
    console.log('payments by fixed payment code ID:', paymentsByCodeId);

    process.exit(0);
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  }
})();
