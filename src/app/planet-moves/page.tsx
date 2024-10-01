import { Container } from "@/components/ui/Container";
import { DataTable } from "@/components/ui/DataTable";
import planetModesDatas from "@/data/planet_moves.json";
import planetDatas from "@/data/planets.json";
import rashiData from "@/data/rashis.json";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Planet Moves - AstroSoft",
    description: "Generated Bhava Calculator by create next app",
    keywords: ["Astro", "Next.js", "Tailwind CSS", "Bhava Calculator"],
}


const datas = planetModesDatas.map((data) => {
    return {
        ...data,
        planet: planetDatas.find((planet) => planet.id === data.planet_id)?.name,
        house_name: rashiData.find((rashi) => rashi.id === data.house_id)?.id + " - " + rashiData.find((rashi) => rashi.id === data.house_id)?.name
    }
})


export default function Houses() {
    return (
        <Container>
            <DataTable title="Planets Moves"
                url="/planet-moves"
                // action={{
                //     create: false,
                // }}
                initLimit={12}
                limits={[12, 24]}
                items={datas}
                headers={["planet", "house_name", "name", "description"]}
            />
        </Container>
    );
}