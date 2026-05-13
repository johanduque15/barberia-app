import Container from '../../ui/Container/Container'
import Button from '../../ui/Button/Button'
import HeroImage from "../../../assets/barber-shop3.jpg"
import { Link } from 'react-router'

export default function Hero() {
    return (
        <section className="py-20 md:py-28">
            <Container>
                <div className='grid gap-10 md:grid-cols-2 items-center'>
                    <div className='space-y-6'>
                        <h1 className='text-4xl md:text-5xl font-bold leading-tight text-barber-gold'>
                            Estilo clasico para el hombre moderno
                        </h1>

                        <p className='text-barber-gray text-lg max-w-xl'>
                            Reserva tu cita online
                        </p>
                        <Link to="/reservar">
                            <Button>
                                Reservar cita
                            </Button>
                        </Link>
                    </div>
                    <div className='relative'>
                        <img
                            src={HeroImage}
                            alt="silla de barberia"
                            className='rounded-lg object-cover h-[420] w-full'
                        />
                    </div>
                </div>
            </Container>
        </section>
    )

}
