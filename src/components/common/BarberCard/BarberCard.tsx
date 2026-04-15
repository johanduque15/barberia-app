type BarberCardProds = {
    name: string
    speciality: string
    image: string
}

export default function BarberCard({name, speciality, image}: BarberCardProds){
    return(
        <article className="overflow-hidden rounded-lg border border-barber-gray bg-zinc-900 transition hover:border-barber-gold">
            <img 
                src={image} 
                alt={`Foto de ${name}`}
                className="h-72 w-full object-cover"    
            />

            <div className="p-6">
                <h3 className="text-xl font-semibold text-barber-gold">
                    {name}
                </h3>

                <p className="mt-2 text-sm text-barber-gray">
                    {speciality}
                </p>
            </div>
        </article>
    )
}