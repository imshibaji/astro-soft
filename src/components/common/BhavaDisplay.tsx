'use client';
import Hr from "@/components/ui/Hr";
import Input from "@/components/ui/Input";
import { Table, TableBody, TableHead, TD, TH, TR } from "@/components/ui/Table";
import TextArea from "@/components/ui/TextArea";
export function BhavaDisplay({ bhavas }: { bhavas: number[] }) {
    return (
        <>
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
                    bhavas.map((i)=>
                      <TR key={i}>
                        <TD className="w-5" align="center"><Input defaultValue={i} className="text-center" readOnly /></TD>
                        <TD className="min-w-44 sm:min-w-36" align="center"><Input defaultValue={"2° 51' 19\" Aqu"} readOnly /></TD>
                        <TD className="min-w-36" align="center"><Input defaultValue="Taurus" readOnly /></TD>
                        <TD className="min-w-36" align="center"><Input defaultValue="Sun" readOnly /></TD>
                        <TD className="min-w-96 md:w-1/2" align="center"><TextArea row="1" className="h-12" defaultValue="Good Fortune" readOnly /></TD>
                      </TR>
                    )
                  }
                </TableBody>
            </Table>
        </>)
}