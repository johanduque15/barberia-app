type ServiceCardProps = {
    title: string
    description: string
}

export default function ServiceCard({title,description}: ServiceCardProps){
    return(
        <div className="bg-zinc-900 rounded-lg p-6 border border-barber-gray hover:border-barber-gold transition">
            <h3 className="text-xl font-semibold text-barber-gold mb-2">
                {title}
            </h3>
            <p className="text-barber-gray text-sm leading-relaxed">
                {description}  
            </p>
        </div>
    )
}