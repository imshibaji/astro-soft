'use client';
import Hr from "@/components/ui/Hr";
import { Table, TableBody, TableHead, TD, TH, TR } from "@/components/ui/Table";
import { BhavaResult } from "@/types/BhavCal";
export function BhavaDisplay({ bhavas }: { bhavas: BhavaResult }) {
    return (
        <>
        <Hr />
            <h3 className="text-lg text-center font-bold text-gray-800 dark:text-white">Kundali Chart</h3>
            {bhavas? <>
              <Table>
                <TableHead>
                  <TH align="center">Julian Day</TH>
                  <TH align="center">Ascendant</TH>
                  <TH align="center">Ayanamsa</TH>
                  <TH align="center">Midheaven</TH>
                </TableHead>
                <TableBody>
                  <TR>
                    <TD align="center">{bhavas.main.julDay}</TD>
                    <TD align="center">{bhavas.main.asc}</TD>
                    <TD align="center">{bhavas.main.ayan}</TD>
                    <TD align="center">{bhavas.main.midHvn}</TD>
                  </TR>
                </TableBody>
            </Table>
          <Hr />
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
                    bhavas.bhavaMadhya.map((bm, i)=>
                      <TR key={i}>
                        <TD className="w-5" align="center">{i+1}</TD>
                        <TD className="min-w-44 sm:min-w-36" align="center">{bm}</TD>
                        <TD className="min-w-36" align="center">{bhavas.bhavaSandhi[i]}</TD>
                        <TD className="min-w-36" align="center">Sun</TD>
                        <TD className="min-w-96 md:w-1/2" align="center">Good Fortune</TD>
                      </TR>
                    )
                  }
                </TableBody>
            </Table>
            </>
            : <div className="flex flex-col justify-center h-96">
                <h1 className="text-lg text-center font-bold text-gray-800 dark:text-white">No Data</h1>
              </div>
            }
        </>)
}