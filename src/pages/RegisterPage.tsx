
import type { SubmitEventHandler } from "react";
import { Link } from "react-router";

import Container from "../components/ui/Container/Container";
import Section from "../components/ui/Section/Section";
import Button from "../components/ui/Button/Button";
import Label from "../components/ui/Label/Label";
import Input from "../components/ui/Input/Input";

export default function RegisterPage() {
    const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
    }

    return (
        <Section>
            <Container>
                <div className=" mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
                    <div className="space-y-6">
                        <span className="text-sm uppercase tracking-[0.2em] text-barber-gray">
                            Registro de usuarios
                        </span>

                        <h1 className="text-4xl font-bold text-barber-gold md:text-5xl">
                            Crea tu cuenta
                        </h1>

                        <p className="max-w-xl text-barber-gray">
                            Registrate para poder reservar citas, consultar tus reservas y
                            ver tu historial.
                        </p>

                        <div className="space-y-4 rounded-2xl border border-barber-gray bg-zinc-900/60 p-6">
                            <div>
                                <h2 className="text-base font-semibold text-barber-gold">
                                    Ventajas de tener cuenta
                                </h2>

                                <p className="mt-2 text-sm text-barber-gray">
                                    Tendras acceso a tus reservas y podras modificarla o cancelarla
                                </p>
                            </div>

                            <Link
                                to="/login"
                                className="inline-block text-sm font-medium text-barber-gold transition hover:opacity-80"
                            >
                                Ya tengo cuenta
                            </Link>
                        </div>
                    </div>

                    <article className="rounded 2xl border border-barber-gray bg-zinc-900 p-6 md:p-8">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="firstName">Nombre </Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        placeholder="Ingresa tu nombre"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="lastName">Apellidos </Label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        placeholder="Ingresa tus apellidos"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="email">Correo Electrónico </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="tucorreo@mail.com"
                                />
                            </div>
                            <div>
                                <Label htmlFor="phone">Teléfono </Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="phone"
                                    placeholder="Ingresa tu numero de movil"
                                />
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="password">Contraseña</Label>
                                    <Input 
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Ingresa una contraseña"
                                    />
                                </div>
                                
                                <div>
                                    <Label htmlFor="confirmdPassword">Confirma tu contraseña</Label>
                                    <Input 
                                        id="confirmdPassword"
                                        name="confirmdPassword"
                                        type="password"
                                        placeholder="Confirma tu contraseña"
                                    />
                                </div>
                            </div>

                        <Button type="submit" className="w-full">
                            Crear cuenta
                        </Button>

                        <p className="text-center text-sm text-barber-gray">
                            ¿Ya tienes cuenta? {" "}
                            <Link 
                                to="/login"
                                className="font-medium text-barber-gold transition hover:opacity-80"
                            >
                                Iniciar Sesión
                            </Link>
                        </p>
                        </form>
                    </article>
                </div>
            </Container>
        </Section>
    )
}