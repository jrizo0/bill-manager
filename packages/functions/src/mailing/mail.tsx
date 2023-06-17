import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface PayYourBillMailProps {
  userName: string
}

// Template from: https://demo.react.email/preview/koala-welcome?view=source&lang=jsx
export const PayYourBillMail = ({
  userName = 'Nombre',
}: PayYourBillMailProps) => (
  <Html>
    <Head />
    <Preview>Bill Manager tiene una notificacion para ti.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={paragraph}>Hola {userName},</Text>
        <Text style={paragraph}>
          Tu BillManager detectó que pronto esta por vencer una de tus facturas.
        </Text>
        <Section style={btnContainer}>
          <Button
            pX={12}
            pY={12}
            style={button}
            href='https://d2zwmapyy86bzj.cloudfront.net/'
          >
            Ir a BillManager
          </Button>
        </Section>
        <Hr style={hr} />
      </Container>
    </Body>
  </Html>
)

export default PayYourBillMail

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
}

const logo = {
  margin: '0 auto',
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
}

const btnContainer = {
  textAlign: 'center' as const,
}

const button = {
  backgroundColor: '#000000',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
}

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
}
