import Header from "~/components/elements/header";

export default function Pricing() {
    return (
        <div className="flex flex-col items-center justify-center">
            <Header />
            <div className="lg:w-[900px] xl:w-[1000px] 2xl:w-[1100px] flex flex-col items-center justify-center mt-32">
                <h2 className="font-medium text-3xl ">Our pricing</h2>
                <p>We have a clear pricing. For discounts for teams please contact us.</p>
            </div>
        </div>
    )
}