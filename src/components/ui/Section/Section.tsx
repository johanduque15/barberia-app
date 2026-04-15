type SectionProps = {
    children: React.ReactNode 
}

export default function Section({children}: SectionProps){
    return(
        <section className="py-16 md:py-24">
            {children}
        </section>
    )
}