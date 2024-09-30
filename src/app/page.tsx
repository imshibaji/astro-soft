/* eslint-disable @typescript-eslint/no-explicit-any */
import BhavaCalculator from "@/components/common/BhavaCalculator";
import { Card, CardBody, CardFooter, CardHeader } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import Hr from "@/components/ui/Hr";
import Input from "@/components/ui/Input";
import { Table, TableBody, TableHead, TD, TH, TR } from "@/components/ui/Table";
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
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Bhava Calculator</h2>
          </CardHeader>
          <CardBody>
            <BhavaCalculator />
            <Hr />
            <h3 className="text-lg text-center font-bold text-gray-800 dark:text-white">Kundali Chart</h3>
            <Table>
                <TableHead>
                  <TH align="center">Houses</TH>
                  <TH align="center">Bhava Madha</TH>
                  <TH align="center">Bhava Sandhi</TH>
                  <TH align="center">Planets</TH>
                  <TH align="center">Results</TH>
                </TableHead>
                <TableBody>
                  {
                    [1,2,3,4,5,6,7,8,9,10,11,12].map((i)=>
                      <TR key={i}>
                        <TD className="w-5" align="center"><Input defaultValue={i} className="text-center" readOnly /></TD>
                        <TD className="min-w-44 sm:min-w-36" align="center"><Input defaultValue={"2° 51' 19\" Aqu"} readOnly /></TD>
                        <TD className="min-w-36" align="center"><Input defaultValue="Taurus" readOnly /></TD>
                        <TD className="min-w-36" align="center"><Input defaultValue="Sun" readOnly /></TD>
                        <TD className="min-w-96 md:w-1/2" align="center"><Input defaultValue="Good Fortune" readOnly /></TD>
                      </TR>
                    )
                  }
                </TableBody>
            </Table>
          </CardBody>
          <CardFooter>
            <p>Powered By AstroSoft. 2024</p>
          </CardFooter>
        </Card>
      </Container>
    </>
  );
}
