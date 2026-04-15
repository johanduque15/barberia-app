import Container from '../../ui/Container/Container';
import Section from "../../ui/Section/Section";
import BarberCard from "../BarberCard/BarberCard";

import barberOne from "../../../assets/andres-acosta.jpg"
import barberTwo from "../../../assets/jose-jimenez.jpg"
import barberThree from "../../../assets/pedro-perez.jpg"

export default function Barbers(){
    const barbers = [
        {
            name: "Andres Acosta",
            speciality: "Especialista en cortes clasicos y barba",
            image: barberOne,
        },
        {
            name: "jose Jimenez",
            speciality: "Barbero con mas de 10 años de expeciencia",
            image: barberTwo,
        },
        {
            name: "Pedro Perez",
            speciality: "Barbero con 5 años de experiencia, especialista en degradados",
            image: barberThree,
        },
    ]
    
    return(
        <Section>
            <Container>
                <div className='mb-12 text-center'>
                    <h2 className='text-3xl font-bold text-barber-gold md:text-4xl'>
                        Barberos
                    </h2>

                    <p className='mt-4 text-barber-gray'>
                        Conoce a nuestros barberos
                    </p>
                </div>

                <div className='grid  gap-8 md:grid-cols-2 lg:grid-cols-3'>
                    {barbers.map((barber) => (
                        <BarberCard
                            key = {barber.name}
                            name = {barber.name}
                            speciality = {barber.speciality}
                            image = {barber.image}
                        />
                    ))}
                </div>
            </Container>
        </Section>
    )
}