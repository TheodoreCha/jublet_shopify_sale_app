import React, { useState, useCallback, useEffect } from 'react';
import { Button, Modal, TextContainer, Link, Stack, Banner } from '@shopify/polaris';
import { useMutation } from '@apollo/client';
import { UPDATE_STRIPE_CONNECT } from '../../../operations/mutation/shop';

const BankAccountModal = () => {
  const [active, setActive] = useState(false);
  const [stripeAccountLink, setStripeAccountLink] = useState('');
  const [updateStripeConnect, { loading: updateStripeConnectLoading, error }] = useMutation(UPDATE_STRIPE_CONNECT);
  const handleChange = useCallback(() => setActive(!active), [active]);

  const activator = <Button onClick={handleChange}>Process connect account</Button>;

  const handleUpdateStripeConnect = async () => {
    try {
      const { data: updateStripeConnectDate } = await updateStripeConnect();
      setStripeAccountLink(JSON.parse(updateStripeConnectDate.updateStripeConnect.connectLink).url);
    } catch (e) {
      console.error({ e });
    }
  };

  useEffect(() => {
    console.log(active);
    if (active) handleUpdateStripeConnect();
  }, [active]);
  return (
    <Modal activator={activator} open={active} onClose={handleChange} title="Let's add your bank details to get paid">
      {error && (
        <Banner title="Something went wrong" status="critical">
          <p>Please try again later or contact us</p>
        </Banner>
      )}
      <Modal.Section>
        <Stack vertical>
          <TextContainer>
            <p>
              Jublet uses Stripe to process payments. Stripe is a payment processing platform. It allows us to store
              your information in a safe way.{' '}
              <Link url="https://stripe.com/en-se/about" external>
                Learn more detail about Stripe
              </Link>
            </p>
          </TextContainer>
          <div style={{ float: 'right' }}>
            <Link url={stripeAccountLink} external>
              <Button primary loading={updateStripeConnectLoading} onClick={handleChange}>
                Go to add account
              </Button>
            </Link>
          </div>
        </Stack>
      </Modal.Section>
    </Modal>
  );
};

export default BankAccountModal;
