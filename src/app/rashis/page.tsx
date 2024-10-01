import { Container } from "@/components/ui/Container";
import { DataTable } from "@/components/ui/DataTable";
import rashiDatas from "@/data/rashis.json";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Rashis - AstroSoft",
    description: "Generated Bhava Calculator by create next app",
    keywords: ["Astro", "Next.js", "Tailwind CSS", "Bhava Calculator"],
}

const datas = rashiDatas.map((data) => {
    return {
        ...data,
        degrees: data.degree_start + " - " + data.degree_end
    }
})

export default function Rashis() {
    return (
        <Container>
            <DataTable title="Rashis"
                url="/rashis"
                // action={{
                //     create: false,
                // }}
                initLimit={3}
                limits={[3,6, 12, 24]}
                items={datas}
                headers={["id", "name", "attributes", "type", "element", "degrees", "functional_benefics", "functional_malefics", "functional_diedly"]}
            />
        </Container>
    );
}