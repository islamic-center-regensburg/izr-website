import { Box, Heading, Text, Link } from "@chakra-ui/react";

function PrivacyPolicy() {
  return (
    <Box p={8} maxWidth="800px" mx="auto">
      <Heading as="h1" mb={6} textAlign="center">
        Privacy Policy for IZR App
      </Heading>
      <Text mb={4}>
        Last Updated: <strong>[01.01.2025]</strong>
      </Text>
      <Text mb={4}>
        At <strong>IZR App</strong>, your privacy is our utmost priority. This Privacy Policy explains how we collect, use, and protect your information when you use our application. Please read this document carefully to understand our practices regarding your data and how we safeguard your privacy.
      </Text>

      <Heading as="h2" size="lg" mt={8} mb={4}>
        1. About IZR App
      </Heading>
      <Text mb={4}>
        IZR App is designed to provide accurate prayer times, geolocation-based features, and helpful resources for users, regardless of age or location. We are committed to creating a secure and private experience for all users without unnecessary data collection or tracking.
      </Text>

      <Heading as="h2" size="lg" mt={8} mb={4}>
        2. Data Collection
      </Heading>
      <Text mb={4}>
        <strong>a. No Personal Data Collection:</strong> IZR App does not collect, store, or track personal data such as your name, email address, phone number, or any other personally identifiable information.
      </Text>
      <Text mb={4}>
        <strong>b. Geolocation Data:</strong> To provide accurate prayer times based on your location, the app requests access to your device's geolocation. This data is used solely to calculate prayer times and is never stored, shared, or linked to any personal information.
      </Text>
      <Text mb={4}>
        <strong>c. No Age Restrictions:</strong> The IZR App is safe for users of all ages. We have ensured that no sensitive or inappropriate content is included, making it suitable for children, teenagers, and adults alike.
      </Text>
      <Text mb={4}>
        <strong>d. No Tracking or Analytics:</strong> The IZR App does not include any form of tracking technologies or analytics tools. We do not monitor your usage behavior, interactions, or any other activity within the app.
      </Text>

      <Heading as="h2" size="lg" mt={8} mb={4}>
        3. Permissions
      </Heading>
      <Text mb={4}>
        To deliver the app's core functionality, we request the following permissions:
      </Text>
      <Text mb={4}>
        - <strong>Location Access:</strong> Used solely to determine accurate prayer times based on your geographical location. This is an essential feature of the app, and location data is never stored or shared.
      </Text>
      <Text mb={4}>
        - <strong>Network Access:</strong> To fetch real-time updates for prayer times and related resources. No personal or usage data is transmitted over the network.
      </Text>

      <Heading as="h2" size="lg" mt={8} mb={4}>
        4. Data Security
      </Heading>
      <Text mb={4}>
        Although we do not collect or store your data, we take measures to ensure that any data processed within the app (such as geolocation) is secure:
      </Text>
      <Text mb={4}>
        - <strong>No Data Storage:</strong> Since no data is collected, there is no risk of unauthorized access to personal information.
      </Text>
      <Text mb={4}>
        - <strong>Secure Communication:</strong> Any network communication (e.g., fetching prayer times) is encrypted and follows secure protocols.
      </Text>
      <Text mb={4}>
        - <strong>Third-Party Libraries:</strong> The app does not rely on third-party libraries or services that compromise user privacy.
      </Text>

      <Heading as="h2" size="lg" mt={8} mb={4}>
        5. Children’s Privacy
      </Heading>
      <Text mb={4}>
        IZR App is safe and accessible for users of all ages, including children under the age of 13. The app does not collect personal information, ensuring compliance with child protection regulations such as COPPA (Children's Online Privacy Protection Act).
      </Text>

      <Heading as="h2" size="lg" mt={8} mb={4}>
        6. Third-Party Services
      </Heading>
      <Text mb={4}>
        IZR App does not integrate with or rely on third-party services, trackers, or analytics platforms. Your location data is processed exclusively within the app and is not shared with any external entities.
      </Text>

      <Heading as="h2" size="lg" mt={8} mb={4}>
        7. Contact Information
      </Heading>
      <Text mb={4}>
        If you have any questions, concerns, or feedback regarding this Privacy Policy or the app, please feel free to contact us:
      </Text>
      <Text mb={4}>
        <strong>Email:</strong>{" "}
        <Link href="mailto:info@iz-regensburg.com" color="teal.500">
          info@iz-regensburg.com
        </Link>
      </Text>

      <Heading as="h2" size="lg" mt={8} mb={4}>
        8. Your Rights
      </Heading>
      <Text mb={4}>
        As a user, you have the following rights:
      </Text>
      <Text mb={4}>
        - <strong>Access:</strong> Since no data is collected or stored, there is no personal data for you to access.
      </Text>
      <Text mb={4}>
        - <strong>Correction:</strong> There is no collected data requiring correction.
      </Text>
      <Text mb={4}>
        - <strong>Erasure:</strong> You can uninstall the app at any time to stop using its services. As we do not store data, no erasure requests are needed.
      </Text>

      <Heading as="h2" size="lg" mt={8} mb={4}>
        9. Updates to This Privacy Policy
      </Heading>
      <Text mb={4}>
        We may update this Privacy Policy from time to time to reflect changes in our app or legal requirements. Any updates will be communicated within the app or through our website.
      </Text>

      <Heading as="h2" size="lg" mt={8} mb={4}>
        10. Disclaimer
      </Heading>
      <Text mb={4}>
        The IZR App is provided as a free service for users seeking prayer times and Islamic resources. While we strive for accuracy and reliability, the app is offered "as is" without warranties of any kind. Your use of the app indicates acceptance of this Privacy Policy.
      </Text>

      <Text mt={8}>
        By using the IZR App, you agree to the terms of this Privacy Policy. We are committed to providing you with a private and secure experience. Thank you for trusting us!
      </Text>
    </Box>
  );
}

export default PrivacyPolicy;
