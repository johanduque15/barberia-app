import Container from "../../ui/Container/Container";
import Section from "../../ui/Section/Section";
import ServiceCard from "../ServiceCard/ServiceCard";

export default function Services(){
    const services = [
        {
            title: "Corte clasico",
            description: "Un corte preciso y elegante adaptado a tu estilo personal."
        },
        {
            title: "Arreglo de Barba,",
            description: "Perfilado y cuidado profesional para una barba perfecta."
        },
        {
            title: "Afeitado tradicional",
            description: "Afeitado clasico con navaja y toalla caliente."
        }
    ]
    return(
            <Section>
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-barber-gold">
                            Servicios
                        </h2>
                        <p className="text-barber-gray mt-4">
                            Descubre nuestros servicios
                        </p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {services.map((service,index) => (
                            <ServiceCard 
                                key = {index}
                                title = {service.title}
                                description = {service.description}
                            />
                        ))}
                    </div>
                </Container>
            </Section>
    )
}