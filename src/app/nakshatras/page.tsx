import { Container } from "@/components/ui/Container";
import { DataTable } from "@/components/ui/DataTable";
import nakDatas from "@/data/nakshatras.json";
import planetData from "@/data/planets.json";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Nakshatras - AstroSoft",
    description: "Generated Bhava Calculator by create next app",
    keywords: ["Astro", "Next.js", "Tailwind CSS", "Bhava Calculator"],
}

export default function Nakshatras(){
    const datas = nakDatas.map((data) => {
        return {
            ...data,
            lord_planet: planetData.find((planet) => planet.id === data.planet_id)?.name
        }
    })
    return (
        <Container>
            <DataTable title="Nakshatras"
                // action={{
                //     create: false,
                //     view: false,
                //     edit: false,
                //     delete: false
                // }}
                url="/nakshatras"
                items={datas}
                headers={["name", "lord_planet", "first_pada", "second_pada", "third_pada", "fourth_pada"]}
            />
        </Container>
    )
}