import { Container } from "@/components/ui/Container";
import { DataTable } from "@/components/ui/DataTable";
import datas from "@/data/planets.json";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Planets - AstroSoft",
    description: "Generated Bhava Calculator by create next app",
    keywords: ["Astro", "Next.js", "Tailwind CSS", "Bhava Calculator"],
}

export default function Planets(){

    return (
        <Container>
            <DataTable title="Planets"
                // action={{
                //     create: false,
                //     view: true,
                //     edit: true,
                //     delete: false
                // }}
                initLimit={6}
                limits={[6, 9, 18]}
                url="/planets"
                items={datas}
                headers={["id","name", "aspect", "impact", "ruling_houses", "transit_time", "friendly_houses", "unfriendly_houses", "neutral_houses", "friendly_planets", "neutral_planets", "enemy_planets", "exaltation", "debilition", "mool_trikona", "highly_exaltation"]}
            />
        </Container>
    )
}