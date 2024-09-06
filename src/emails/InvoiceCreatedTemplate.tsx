// import * as React from 'react';



// const host = 'http://localhost:3000';
// const companyName = 'Space Jelly';

// export const InvoiceCreatedTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
//   invoiceId,
//   name,
//   value,
// }) => (
//   <div>
//     <h1>Hello, { name }!</h1>
//     <p>An invoice was created by { companyName } for ${ value / 100 }</p>
//     <p>
      
//     </p>
//   </div>
// );


import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

interface EmailTemplateProps {
  fromName: string;
  invoiceId: number;
  name: string;
  value: number;
}

export const InvoiceCreatedTemplate = ({ name, value, invoiceId, fromName }: EmailTemplateProps) => (
  <Html>
    <Head />
    <Preview>A new invoice was created!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Text style={paragraph}>
            Hi { name },
          </Text>
          
          <Text style={paragraph}>
            A new invoice was created by {fromName} with the value of ${ value/100 }
          </Text>
          
          <Button style={button} href={`${baseUrl}/invoices/${invoiceId}/payment`}>
            Pay Invoice
          </Button>
          
          <Text style={paragraph}>— { fromName }</Text>
          <Hr style={hr} />
          <Text style={footer}>
            1337 Space Jelly Road
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default InvoiceCreatedTemplate;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  color: "#525f7f",

  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const anchor = {
  color: "#556cd6",
};

const button = {
  backgroundColor: "#656ee8",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "10px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};
