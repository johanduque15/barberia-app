import type { FormEventHandler } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

import Container from "../components/ui/Container/Container";
import Section from "../components/ui/Section/Section";
import Button from "../components/ui/Button/Button";
import Label from "../components/ui/Label/Label";
import Input from "../components/ui/Input/Input";
import useAuth from "../hooks/useAuth";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    const nombre = String(formData.get("nombre") ?? "").trim();
    const apellidos = String(formData.get("apellidos") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const movil = String(formData.get("movil") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      setIsSubmitting(false);
      return;
    }

    try {
      await register({
        nombre,
        apellidos,
        email,
        password,
        movil,
      });

      navigate("/reservar", { replace: true });
    } catch {
      setErrorMessage("No se pudo completar el registro. Revisa los datos o prueba con otro email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section>
      <Container>
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <span className="text-sm uppercase tracking-[0.2em] text-barber-gray">
              Registro de usuarios
            </span>

            <h1 className="text-4xl font-bold text-barber-gold md:text-5xl">
              Crea tu cuenta
            </h1>

            <p className="max-w-xl text-barber-gray">
              Regístrate para poder reservar citas, consultar tus reservas y ver tu historial.
            </p>

            <div className="space-y-4 rounded-2xl border border-barber-gray bg-zinc-900/60 p-6">
              <div>
                <h2 className="text-base font-semibold text-barber-gold">
                  Ventajas de tener cuenta
                </h2>

                <p className="mt-2 text-sm text-barber-gray">
                  Tendrás acceso a tus reservas y podrás modificarlas o cancelarlas.
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

          <article className="rounded-2xl border border-barber-gray bg-zinc-900 p-6 md:p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    type="text"
                    placeholder="Ingresa tu nombre"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="apellidos">Apellidos</Label>
                  <Input
                    id="apellidos"
                    name="apellidos"
                    type="text"
                    placeholder="Ingresa tus apellidos"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tucorreo@mail.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div>
                <Label htmlFor="movil">Teléfono</Label>
                <Input
                  id="movil"
                  name="movil"
                  type="tel"
                  placeholder="Ingresa tu número de móvil"
                  autoComplete="tel"
                  required
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
                    autoComplete="new-password"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirma tu contraseña</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirma tu contraseña"
                    autoComplete="new-password"
                    required
                  />
                </div>
              </div>

              {errorMessage && (
                <p className="text-sm text-red-500">{errorMessage}</p>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
              </Button>

              <p className="text-center text-sm text-barber-gray">
                ¿Ya tienes cuenta?{" "}
                <Link
                  to="/login"
                  className="font-medium text-barber-gold transition hover:opacity-80"
                >
                  Iniciar sesión
                </Link>
              </p>
            </form>
          </article>
        </div>
      </Container>
    </Section>
  );
}