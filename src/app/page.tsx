import { Card, CardBody, CardFooter, CardHeader } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import FloatingInput from "@/components/ui/FloatingInput";
import FloatingSelect from "@/components/ui/FloatingSelect";
import NumberInput from "@/components/ui/NumberInput";
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
            <div className="my-12">
              <h1 className="text-6xl font-bold text-center text-gray-800 dark:text-white">Enter Details</h1>
              <form action="/prediction" className="grid grid-cols-1 gap-4 mt-5">
                <div className="flex space-x-2">
                  <FloatingInput label="First Name" name="firstName" type="text" placeholder="First Name" required />
                  <FloatingInput label="Last Name" name="lastName" type="text" placeholder="Last Name" required />
                </div>

                <div className="flex space-x-2">
                  <NumberInput label="Date" name="date" min="1" max="31" placeholder="Date" defaultValue="10" />
                  <NumberInput label="Month" name="month" min="1" max="12" placeholder="Month" defaultValue="11" />
                  <NumberInput label="Year" name="year" placeholder="Year" defaultValue="1986" />
                </div>
                <div className="flex space-x-2">
                  <NumberInput label="Hour" name="hour" min="0" max="23" placeholder="Hour" defaultValue="20" />
                  <NumberInput label="Minute" name="minute" min="0" max="59" placeholder="Minute" defaultValue="5" />
                  <FloatingInput label="Time Zone" name="timeZone" type="number" placeholder="Time Zone" defaultValue="5.5" />
                </div>
                <div className="flex space-x-2">
                  <FloatingInput label="Latitude" name="latitude" type="text" placeholder="Latitude" defaultValue="22.5744" />
                  <FloatingInput label="Longitude" name="longitude" type="text" placeholder="Longitude" defaultValue="88.3629" />
                  <FloatingSelect label="Chart Style" name="chart_style">
                        <option value="north_india">North India</option>
                        <option value="south_india">South India</option>
                  </FloatingSelect>
                </div>
                <button type="submit" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-teal-500 text-teal-500 hover:border-teal-400 hover:text-teal-400 focus:outline-none focus:border-teal-400 focus:text-teal-400 disabled:opacity-50 disabled:pointer-events-none">
                  Know Prediction
                </button>
              </form>
            </div>
          </CardBody>
          <CardFooter>
            <p>Powered By AstroSoft. 2024</p>
          </CardFooter>
        </Card>
      </Container>
    </>
  );
}
