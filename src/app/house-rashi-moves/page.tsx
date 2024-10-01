import { Container } from "@/components/ui/Container";
import { DataTable } from "@/components/ui/DataTable";
import houseLordMovesDatas from "@/data/house_lord_moves.json";
import rashiData from "@/data/rashis.json";
import { Metadata } from "next";
// import planetData from "@/data/planets.json";

export const metadata: Metadata = {
    title: "Rashis Moves to other Houses - AstroSoft",
    description: "Generated Bhava Calculator by create next app",
    keywords: ["Astro", "Next.js", "Tailwind CSS", "Bhava Calculator"],
}

const datas = houseLordMovesDatas.map((data) => {
    return {
        ...data,
        house_lord: rashiData.find((rashi) => rashi.id === data.house_id)?.name,
        moved_house: rashiData.find((rashi) => rashi.id === data.move_id)?.id + '. ' + rashiData.find((rashi) => rashi.id === data.move_id)?.name
    }
})

export default function Houses() {
    return (
        <Container>
            <DataTable title="House Rashi Moves"
                url="/house-lord-moves"
                // action={{
                //     create: false,
                // }}
                initLimit={12}
                limits={[12, 24]}
                items={datas}
                headers={["name", "house_lord", "moved_house", "description"]}
            />
        </Container>
    );
}