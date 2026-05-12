import type { FormEventHandler } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import Container from "../components/ui/Container/Container";
import Section from "../components/ui/Section/Section";
import Button from "../components/ui/Button/Button";
import Input from "../components/ui/Input/Input";
import Label from "../components/ui/Label/Label";
import useAuth from "../hooks/useAuth";

type LoginLocationState = {
  from?: string;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const locationState = location.state as LoginLocationState | null;
  const redirectPath = locationState?.from ?? "/reservar";

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    try {
      await login(email, password);
      navigate(redirectPath, { replace: true });
    } catch {
      setErrorMessage("Email o contraseña incorrectos");
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
              Acceso de usuario
            </span>

            <h1 className="text-4xl font-bold text-barber-gold md:text-5xl">
              Inicia sesión en cuenta
            </h1>

            <p className="max-w-xl text-barber-gray">
              Accede para gestionar tus reservas: podrás modificar y cancelar cualquier servicio
              cuando gustes.
            </p>

            <div className="space-y-4 rounded-2xl border border-barber-gray bg-zinc-900/60 p-6">
              <div>
                <h2 className="text-base font-semibold text-barber-gold">
                  Acceso necesario para reservar
                </h2>

                <p className="mt-2 text-sm text-barber-gray">
                  Para poder reservar debes estar identificado. De esta forma puedes gestionar tus reservas
                  mucho más fácil.
                </p>
              </div>

              <Link
                to="/registro"
                className="inline-block text-sm font-medium text-barber-gold transition hover:opacity-80"
              >
                Crear Cuenta
              </Link>
            </div>
          </div>

          <article className="rounded-2xl border border-barber-gray bg-zinc-900 p-6 md:p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tuemail@email.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div>
                <div className="mb-2 items-center justify-between">
                  <Label htmlFor="password" className="mb-0">
                    Contraseña
                  </Label>

                  <button
                    type="button"
                    className="text-sm text-barber-gray transition hover:text-barber-gold"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Introduce tu contraseña"
                  autoComplete="current-password"
                  required
                />
              </div>

              {errorMessage && (
                <p className="text-sm text-red-500">{errorMessage}</p>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
              </Button>

              <p className="text-center text-sm text-barber-gray">
                ¿No tienes cuenta?{" "}
                <Link
                  to="/registro"
                  className="font-medium text-barber-gold transition hover:opacity-80"
                >
                  Regístrate aquí
                </Link>
              </p>
            </form>
          </article>
        </div>
      </Container>
    </Section>
  );
}