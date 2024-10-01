/* eslint-disable @typescript-eslint/no-explicit-any */
import BhavaCalculator from "@/components/common/BhavaCalculator";
import { Card, CardBody, CardFooter, CardHeader } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Astrology Bhava Calculator",
  description: "Generated Bhava Calculator by create next app",
  keywords: ["Astro", "Next.js", "Tailwind CSS", "Bhava Calculator"],
}


export default function Home() {
  return (
    <>
      <Container>
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Vedik Astrology - Bhava Calculator</h2>
          </CardHeader>
          <CardBody>
            <BhavaCalculator />
          </CardBody>
          <CardFooter>
            <p>Powered By AstroSoft. 2024</p>
          </CardFooter>
        </Card>
      </Container>
    </>
  );
}
